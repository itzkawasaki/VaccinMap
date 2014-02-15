var geocoder;
var map;
var currentWindow = null;
var maplist = new Array();
var cnt = 0;
function initialize() {
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(35.466188, 139.622715);
	var opts = {
		zoom: 10,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
 }
	map = new google.maps.Map(document.getElementById("map_canvas"), opts);

}

function dispSchedule(){
	var list = getSchedule();
	for(var i=0; i<list.length; i++){
		var name = list[i].name;
		var displayFlg = list[i].displayFlg;
		var recommendFlg = list[i].recommendFlg;
		var recommendedTime = list[i].recommendedTime;
		if (displayFlg) {
			alert(name+"\r\n推奨F:"+recommendFlg+"\r\n推奨時期:"+recommendedTime);
		}
	}

}

/**
 *選択された予防接種種類の中から直近5件の病院をマークする
 *
 */
function markHospital(list, callback) {
	$("#best5list").empty();  //表示リストの初期化

	var geocoder = new google.maps.Geocoder();
	var startingPoint = {};  //入力された住所オブジェクト
  var req = {address: $("#address").val()};

  geocoder.geocode(req, Mark);
  function Mark(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      //基準点
      var info = results[0].geometry.location;
      startingPoint.latitude = info.lat();
      startingPoint.longitude = info.lng();

      //対象データ
      var data = mappingData(list);  //検索結果に緯度経度をマッピング

      for (var i = 0; i < data.length; i++) {
        //距離計算
        var ido = data[i].latitude;
        var keido = data[i].longitude;
        data[i].distance = calcGeoDistance(startingPoint.latitude, startingPoint.longitude, ido, keido, 5);
      }
      data.sort(sort_by('distance', false, parseInt));  //距離の昇順にソート

      //マーキング
      var opts = {
        //zoom: 15,
        center: new google.maps.LatLng(startingPoint.latitude, startingPoint.longitude),  //中心
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      //Map作成
      var map = new google.maps.Map(document.getElementById("map_canvas"), opts);
      var centerlatlng = new google.maps.LatLng(startingPoint.latitude, startingPoint.longitude);
      var centerMaker = new google.maps.Marker({ position: centerlatlng, icon: "http://www.google.com/mapfiles/marker.png", map: map });

      //直近5件の病院
      var markerBounds = new google.maps.LatLngBounds();  //マーカー領域
      var rtnList = new Array();
      for (var i = 0; i < 5; i++) {
        var icons = 'http://www.google.com/mapfiles/marker' + String.fromCharCode(65 + i) + '.png';  //アルファベットマーカー

        if (data.length > i && "latitude" in data[i] && "longitude" in data[i]) {
          //緯度経度情報がある場合
          var pos = new google.maps.LatLng(data[i].latitude, data[i].longitude);
          var latlng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
          var content = "<a href=http://www.google.co.jp/search?q=" + encodeURI("横浜市") + "+" + encodeURI(data[i].hospitalName) + " target=_blank>"
            + data[i].hospitalName + "</a><br />" + data[i].address.toOneByteAlphaNumeric() + "<br />tel:" + data[i].tel;  //吹き出しに表示する情報
          createMarker(latlng, content, icons, map);
          markerBounds.extend(pos); // マーカー領域を更新する
//          $("#best5list").append("<li>" + data[i].hospitalName + "</>");  //リストに病院名を入れる
          //リターン用病院情報
          var hospital = new HospitalData(hospitalIdArray[i], data[i].hospitalName, data[i].address, data[i].tel, data[i].latitude, data[i].longitude);
          rtnList.push(hospital);
        }

      }
      map.fitBounds(markerBounds);  //マーカー領域にあわせて中心・ズームレベルを変更

      //リストクリックイベント
      $(function () {
        $('#best5list')[i].row.click(function () {
          var no = $('#best5list')[i].row.index(this);
          google.maps.event.trigger(maplist[no], "click");
        });
      });
    } else {
      alert("逆ジオコーディング失敗");
    }
    callback(rtnList);
  };
}

/**
 * 検索結果と緯度経度情報のマッピング
 * 緯度経度データ(latlong.jsのlatlongMap)
 *
 * @param list SQACLEの検索結果
 * @return
 *
 */
var sampleSpaqle =
  [
    { byoin: { type: 'literal', value: '古川病院' },
      address: { type: 'literal', value: '横浜市神奈川区子安通２－２８６　' },
      wakuchin_name: { type: 'literal', value: '二種混合' },
      tel: { type: 'literal', value: '441-3366' } },
    { byoin: { type: 'literal', value: 'とくうえ内科クリニック' },
      address: { type: 'literal', value: '横浜市青葉区新石川３－１５－１６' },
      wakuchin_name: { type: 'literal', value: '二種混合' },
      tel: { type: 'literal', value: '910-0115' } },
    { byoin: { type: 'literal', value: '渡辺医院' },
      address: { type: 'literal', value: '横浜市鶴見区潮田町３－１３３－２' },
      wakuchin_name: { type: 'literal', value: '二種混合' },
      tel: { type: 'literal', value: '501-6457' } }
  ];
function mappingData(list) {
	var mappingList = new Array();
  for(var i in list){
//  for(var i in sampleSpaqle){
    var mappingData = {};
    mappingData.hospitalName = list[i].byoin.value;
    mappingData.address = list[i].address.value;
    mappingData.tel = list[i].tel.value;
    if(mappingData.hospitalName in latlongMap){
      //緯度経度情報あり
      var latlong = latlongMap[mappingData.hospitalName].split(',');  //カンマ区切り
      mappingData.latitude = latlong[0];
      mappingData.longitude = latlong[1];
    }else{
      //緯度経度情報なし
      mappingData.latlong = "";
    }
    mappingList.push(mappingData);
  }
  return mappingList;
}

/**
 *マーカー処理
 */
function createMarker(latlng,content,icons,map){
	var infoWindow = new google.maps.InfoWindow();
	var marker = new google.maps.Marker({position:latlng, icon:icons, map:map});

	/* addListener を使ってイベントリスナを追加 */
	/* 地図上のmarkerがクリックされると｛｝内の処理を実行。*/
	google.maps.event.addListener(marker, 'click', function() {
		if(currentWindow) currentWindow.close();  //開くウィンドウを1つだけにする
		infoWindow.setContent(content);
		infoWindow.open(map,marker);  //マーカーに情報ウィンドウを表示
			currentWindow = infoWindow;
	});
	maplist[cnt++] = marker;
}


/**
 *２点間の距離を計算
 *decimalは小数点以下の桁数
 */
function calcGeoDistance(lat1, lng1, lat2, lng2, precision) {
	// 引数　precision は小数点以下の桁数（距離の精度）
	var distance = 0;
	if ((Math.abs(lat1 - lat2) < 0.00001) && (Math.abs(lng1 - lng2) < 0.00001)) {
		distance = 0;
	} else {
		lat1 = lat1 * Math.PI / 180;
		lng1 = lng1 * Math.PI / 180;
		lat2 = lat2 * Math.PI / 180;
		lng2 = lng2 * Math.PI / 180;

		var A = 6378140;
		var B = 6356755;
		var F = (A - B) / A;

		var P1 = Math.atan((B / A) * Math.tan(lat1));
		var P2 = Math.atan((B / A) * Math.tan(lat2));

		var X = Math.acos(Math.sin(P1) * Math.sin(P2) + Math.cos(P1) * Math.cos(P2) * Math.cos(lng1 - lng2));
		var L = (F / 8) * ((Math.sin(X) - X) * Math.pow((Math.sin(P1) + Math.sin(P2)), 2) / Math.pow(Math.cos(X / 2), 2) - (Math.sin(X) - X) * Math.pow(Math.sin(P1) - Math.sin(P2), 2) / Math.pow(Math.sin(X), 2));
		// alert("A="+A+", X="+X+", L="+L );
		distance = A * (X + L);
		var decimal_no = Math.pow(10, precision);
		distance = Math.round(decimal_no * distance / 1) / decimal_no;   // kmに変換するときは(1000で割る)
	}
	return distance;
}

/**
 *　ソート
 */
var sort_by = function(field, reverse, primer){
   reverse = (reverse) ? -1 : 1;
   return function(a,b){
       a = a[field];
       b = b[field];
       if (typeof(primer) != 'undefined'){
           a = primer(a);
           b = primer(b);
       }
       if (a<b) return reverse * -1;
       if (a>b) return reverse * 1;
       return 0;
   }
}

// 全角英数字文字列を半角文字列に変換する
String.prototype.toOneByteAlphaNumeric = function(){
  return this.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

/**
 *病院オブジェクト
 */
var hospitalIdArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var HospitalData = function (id, byoin, address, tel, latitude, longitude) {
  this.id = id;
  this.byoin = byoin;
  this.address = address;
  this.tel = tel;
  this.latitude = latitude;
  this.longitude = longitude;
}