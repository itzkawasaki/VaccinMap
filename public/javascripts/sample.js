var geocoder;
var map;
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

function codeAddress() {
	var geocoder = new google.maps.Geocoder();
	var startingPoint = {};
  var req = {address: document.getElementById("address").value};
  geocoder.geocode(req, function(results, status){
   	if(status == google.maps.GeocoderStatus.OK){
   		//基準点
			var info = results[0].geometry.location;
			startingPoint.latitude = info.lat();
			startingPoint.longitude = info.lng();

			//対象データ
			var data = jsonData100;
			for(var i=0; i<data.length; i++){
				//距離計算
				var ido = data[i].latitude;
				var keido = data[i].longitude;
				data[i].distance = calcGeoDistance(startingPoint.latitude, startingPoint.longitude, ido, keido, 5);
				//data[i].distance = getDistance(startingPoint.latitude, startingPoint.longitude, ido, keido);
			}
			data.sort(sort_by('distance', false, parseInt));  //距離の昇順にソート
			
			//マーキング
			var opts = {
					zoom: 15,
					center: new google.maps.LatLng(startingPoint.latitude, startingPoint.longitude),  //中心
					mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById("map_canvas"), opts);

			//直近5件の病院
			for (var i=0; i<5; i++) {
				var latlng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
				createMarker(latlng, data[i].hospitalName, map);
			}

   	}else{
   		alert("逆ジオコーディング失敗");	
   	}
  });
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

function createMarker(latlng,name,map){
	var infoWindow = new google.maps.InfoWindow();
	var marker = new google.maps.Marker({position: latlng,map: map});
	
	/* addListener を使ってイベントリスナを追加 */
	/* 地図上のmarkerがクリックされると｛｝内の処理を実行。*/
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(name);
		infoWindow.open(map,marker);  //マーカーに情報ウィンドウを表示
	});
} 

function markMap(map, input, list) {

	//直近5件の病院
	for (var i=0; i<5; i++) {
		var latlng = new google.maps.LatLng(list[i].latitude, list[i].longitude);
		
		var infoWindow = new google.maps.InfoWindow();
		var marker = new google.maps.Marker({position: latlng, map: map});
		
		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.setContent(list[i].hospitalName);
			infoWindow.open(map, marker);
		});
	}
}

