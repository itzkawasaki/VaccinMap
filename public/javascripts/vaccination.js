var vaccinationList =
[
  {"id":1,"name":"二種混合"},
  {"id":2,"name":"日本脳炎２期"},
  {"id":3,"name":"子宮頸がん"},
  {"id":4,"name":"乳幼児健診"},
  {"id":5,"name":"ＢＣＧ"},
  {"id":6,"name":"ヒブ"},
  {"id":7,"name":"小児用肺炎球菌"},
  {"id":8,"name":"四(三)種混合"},
  {"id":9,"name":"不活化ポリオ"},
  {"id":10,"name":"麻しん風しん"},
  {"id":11,"name":"日本脳炎１期"}
];

/**
 *予防接種推奨時期取得
 *
 *参考：横浜市保健所(http://www.city.yokohama.lg.jp/kenko/hokenjo/genre/kansensyo/vaccination.html)
 *
 *return オブジェクト{id, name, displayFlg(boolean), recommendFlg(boolean), recommendedTime(文字列)}の配列
 *
 */
function getSchedule() {

  var userAge = calcAge();

  var array = new Array();
  array.push(vaccination1(userAge));
  array.push(vaccination2(userAge));
  array.push(vaccination3(userAge));
  array.push(vaccination4(userAge));
  array.push(vaccination5(userAge));
  array.push(vaccination6(userAge));
  array.push(vaccination7(userAge));
  array.push(vaccination8(userAge));
  array.push(vaccination9(userAge));
  array.push(vaccination10(userAge));
  array.push(vaccination11(userAge));

  return array;

}

/*
 *予防接種オブジェクト
 *
 */
var vaccination = function(id, name, displayFlg, recommendFlg, recommendedTime){
  this.id = id;
  this.name = name;
  this.displayFlg = displayFlg;
  this.recommendFlg = recommendFlg;
  this.recommendedTime = recommendedTime;
};


/**
 *年齢計算
 *
 *return json{year, month}
 *
 */
function calcAge(){
  //現在から、誕生日を引き、基準日に足す
  //つまり、現在から、誕生日の日にち分の時間だけ引く
  myNow = new Date();
  myBirth = new Date( 1970, 0, $("#birthDay").val() );
  myBirth.setTime( myNow.getTime() - myBirth.getTime() );

  //求めた年月日から基準日を引く
  myYear = myBirth.getUTCFullYear() - $("#birthYear").val();
  myMonth = myBirth.getUTCMonth() - ($("#birthMonth").val() - 1);
  if(myMonth < 0){ //月がマイナスなので年から繰り下げ
   myYear --;
   myMonth += 12;
  }
  myDate = myBirth.getUTCDate();
  //alert("歳は "+myYear+"才 "+myMonth+"ヶ月と "+myDate+"日目");
  var myAge = {year:myYear, month:myMonth};
  return myAge;
}

/**
 *ID:1
 *2種混合
 *
 *推奨時期：(2期)11歳中に1回
 *
 */
function vaccination1(userAge) {
  var id = 1;
  var name = "2種混合";
  var displayFlg = false;
  var recommendFlg = false;
  var recommendedTime = "(2期)11歳中に1回";

  var userYear = Number(userAge.year);  //年齢取得
  if (10 <= userYear && userYear <= 11 ){
    //10≦年齢≦11の場合、表示
    displayFlg = true;
    if (userYear == 11) {
      //11歳の場合、推奨
    recommendFlg = true;
    }
  }

  return new vaccination(id, name, displayFlg, recommendFlg, recommendedTime);
}

/**
 *ID:2
 *日本脳炎２期
 *
 *推奨時期：9歳中に１回（1期追加接種終了後おおむね5年後）
 *
 */
function vaccination2(userAge) {
  var id = 2;
  var name = "日本脳炎２期";
  var displayFlg = false;
  var recommendFlg = false;
  var recommendedTime = "9歳中に１回（1期追加接種終了後おおむね5年後）";

  var userYear = Number(userAge.year);  //年齢取得
  if (8 <= userYear && userYear <= 9 ){
    //8≦年齢≦9の場合、表示
    displayFlg = true;
    if (userYear == 9) {
      //9歳の場合、推奨
    recommendFlg = true;
    }
  }

  return new vaccination(id, name, displayFlg, recommendFlg, recommendedTime);
}

/**
 *ID:3
 *子宮頸がん
 *
 *推奨時期：中学1年生の間に3回
 *とりあえず12歳～13歳ということで…
 *
 */
function vaccination3(userAge) {
  var id = 3;
  var name = "子宮頸がん";
  var displayFlg = false;
  var recommendFlg = false;
  var recommendedTime = "中学1年生の間に3回";

  var userYear = Number(userAge.year);  //年齢取得
  if (11 <= userYear && userYear <= 13 ){
    //11≦年齢≦13の場合、表示
    displayFlg = true;
    if (12 <= userYear && userYear <= 13) {
      //12≦年齢≦13の場合、推奨
    recommendFlg = true;
    }
  }

  return new vaccination(id, name, displayFlg, recommendFlg, recommendedTime);
}


/**
 *ID:4
 *乳幼児健診
 *
 *推奨時期：生後12か月（13か月未満）までに３回受診することができます
 *
 *参考:横浜市こども青少年局(http://www.city.yokohama.lg.jp/kodomo/katei/kosodate/muryouikujisoudan.html)
 *
 */
function vaccination4(userAge) {
  var id = 4;
  var name = "乳幼児健診";
  var displayFlg = false;
  var recommendFlg = false;
  var recommendedTime = "生後12か月（13か月未満）までに３回受診することができます";

  var userYear = Number(userAge.year);  //年齢取得
  if (userYear == 0){
    //年齢＝0の場合、表示・推奨
    displayFlg = true;
    recommendFlg = true;
  }

  return new vaccination(id, name, displayFlg, recommendFlg, recommendedTime);
}

/**
 *ID:5
 *BCG
 *
 *推奨時期：生後5か月～8か月未満の間に１回
 *
 */
function vaccination5(userAge) {
  var id = 5;
  var name = "BCG";
  var displayFlg = false;
  var recommendFlg = false;
  var recommendedTime = "生後5か月～8か月未満の間に１回";

  var userYear = Number(userAge.year);  //年齢取得
  var userMonth = Number(userAge.month);  //年齢取得
  if (userYear == 0 && userMonth <= 7 ){
    //0歳0ヶ月≦年齢≦0歳7ヶ月の場合、表示
    displayFlg = true;
    if (5 <= userMonth && userMonth <= 7) {
      ////0歳5ヶ月≦年齢≦0歳7ヶ月の場合、推奨
    recommendFlg = true;
    }
  }

  return new vaccination(id, name, displayFlg, recommendFlg, recommendedTime);
}

/**
 *ID:6
 *ヒブ
 *
 *推奨時期(初回)：生後２か月～７か月未満の間に４～８週間の間隔で３回
 *推奨時期(追加)：初回接種終了後、７か月～13か月の間に１回
 *
 */
function vaccination6(userAge) {
  var id = 6;
  var name = "ヒブ";
  var displayFlg = false;
  var recommendFlg = false;
  var recommendedTime = "";

  var userYear = Number(userAge.year);  //年齢取得
  var userMonth = Number(userAge.month);  //年齢取得

  if (userYear == 0 && userMonth <= 6 ){
    //0歳0ヶ月≦年齢≦0歳6ヶ月の場合、表示(初回)
    displayFlg = true;
    recommendedTime = "[初回]生後２か月～７か月未満の間に４～８週間の間隔で３回";
    if (userMonth >= 2) {
      //0歳2ヶ月以上の場合、推奨(初回)
      recommendFlg = true;
    }
  }else if ((userYear == 0 && userMonth >= 1) || (userYear == 1 && userMonth <= 1)) {
    //0歳1ヶ月≦年齢≦1歳1ヶ月の場合、表示
    displayFlg = true;
    recommendedTime = "[追加]初回接種終了後、７か月～13か月の間に１回";
    if ((userYear == 0 && userMonth >= 7) || (userYear == 1 && userMonth <= 1)) {
      //0歳7ヶ月≦年齢≦1歳1ヶ月の場合、推奨
      recommendFlg = true;
    }
  }

  return new vaccination(id, name, displayFlg, recommendFlg, recommendedTime);
}

/**
 *ID:7
 *小児用肺炎球菌
 *
 *推奨時期(初回)：生後2か月～7か月未満の間に27日以上の間隔で３回
 *推奨時期(追加):初回接種終了後、60日以上の間隔で１回（生後12か月～15か月）
 *
 */
function vaccination7(userAge) {
  var id = 7;
  var name = "小児用肺炎球菌";
  var displayFlg = false;
  var recommendFlg = false;
  var recommendedTime = "";

  var userYear = Number(userAge.year);  //年齢取得
  var userMonth = Number(userAge.month);  //年齢取得

  if (userYear == 0 && userMonth <= 6 ){
    //0歳0ヶ月≦年齢≦0歳6ヶ月の場合、表示(初回)
    displayFlg = true;
    recommendedTime = "[初回]生後2か月～7か月未満の間に4～8週間の間隔で3回";
    if (userMonth >= 2) {
      //0歳2ヶ月以上の場合、推奨(初回)
      recommendFlg = true;
    }
  }else if ((userYear == 0 && userMonth >= 6) || (userYear == 1 && userMonth <= 3)) {
    //0歳6ヶ月≦年齢≦1歳3ヶ月の場合、表示
    displayFlg = true;
    recommendedTime = "[追加]初回接種終了後、60日以上の間隔で1回（生後12か月～15か月）";
    if (userYear == 1 && userMonth <= 3) {
      //1歳0ヶ月≦年齢≦1歳3ヶ月の場合、推奨
      recommendFlg = true;
    }
  }

  return new vaccination(id, name, displayFlg, recommendFlg, recommendedTime);
}

/**
 *ID:8
 *四(三)種混合
 *
 *推奨時期(1期初回)：生後3か月～12か月の間に20日～56日の間隔で3回
 *推奨時期(1期追加):初回接種終了後12か月～18か月の間に1回
 *
 */
function vaccination8(userAge) {
  var id = 8;
  var name = "四(三)種混合";
  var displayFlg = false;
  var recommendFlg = false;
  var recommendedTime = "";

  var userYear = Number(userAge.year);  //年齢取得
  var userMonth = Number(userAge.month);  //年齢取得

  if ((userYear == 0 && userMonth <= 11) || (userYear == 1 && userMonth <= 0) ){
    //0歳0ヶ月≦年齢≦1歳0ヶ月の場合、表示(初回)
    displayFlg = true;
    recommendedTime = "[1期初回]生後3か月～12か月の間に20日～56日の間隔で3回";
    if (userMonth >= 3) {
      //0歳3ヶ月以上の場合、推奨(初回)
      recommendFlg = true;
    }
  }else if ((userYear == 0 && userMonth >= 6) || (userYear == 1 && userMonth <= 6)) {
    //0歳6ヶ月≦年齢≦1歳3ヶ月の場合、表示
    displayFlg = true;
    recommendedTime = "[1期追加]初回接種終了後12か月～18か月の間に1回";
    if (userYear == 1 && userMonth <= 6) {
      //1歳0ヶ月≦年齢≦1歳3ヶ月の場合、推奨
      recommendFlg = true;
    }
  }

  return new vaccination(id, name, displayFlg, recommendFlg, recommendedTime);
}

/**
 *ID:9
 *不活化ポリオ
 *
 *推奨時期(1期初回)：生後3か月～12か月の間に20日～56日の間隔で3回
 *推奨時期(1期追加):初回接種終了後12か月～18か月の間に1回
 *
 *参考(http://www.city.yokohama.lg.jp/kenko/hokenjo/genre/kansensyo/vaccination/240427.pdf)
 *
 */
function vaccination9(userAge) {
  var id = 9;
  var name = "不活化ポリオ";
  var displayFlg = false;
  var recommendFlg = false;
  var recommendedTime = "";

  var userYear = Number(userAge.year);  //年齢取得
  var userMonth = Number(userAge.month);  //年齢取得

  if ((userYear == 0 && userMonth <= 11) || (userYear == 1 && userMonth <= 0) ){
    //0歳0ヶ月≦年齢≦1歳0ヶ月の場合、表示(初回)
    displayFlg = true;
    recommendedTime = "[1期初回]生後3か月～12か月の間に20日～56日の間隔で3回";
    if (userMonth >= 3) {
      //0歳3ヶ月以上の場合、推奨(初回)
      recommendFlg = true;
    }
  }else if ((userYear == 0 && userMonth >= 6) || (userYear == 1 && userMonth <= 6)) {
    //0歳6ヶ月≦年齢≦1歳3ヶ月の場合、表示
    displayFlg = true;
    recommendedTime = "[1期追加]初回接種終了後12か月～18か月の間に1回";
    if (userYear == 1 && userMonth <= 6) {
      //1歳0ヶ月≦年齢≦1歳3ヶ月の場合、推奨
      recommendFlg = true;
    }
  }

  return new vaccination(id, name, displayFlg, recommendFlg, recommendedTime);
}

/**
 *ID:10
 *麻しん風しん
 *
 *推奨時期(1期)：生後12か月～24か月未満の間に1回
 *推奨時期(2期):5歳～7歳未満で、小学校入学1年前の4月1日から入学の年の3月31日まで間に1回
 *
 */
function vaccination10(userAge) {
  var id = 10;
  var name = "麻しん風しん";
  var displayFlg = false;
  var recommendFlg = false;
  var recommendedTime = "";

  var userYear = Number(userAge.year);  //年齢取得
  var userMonth = Number(userAge.month);  //年齢取得

  if ((userYear == 0 && userMonth <= 6) || (userYear == 1 && userMonth <= 0) ){
    //0歳6ヶ月≦年齢≦2歳0ヶ月の場合、表示(初回)
    displayFlg = true;
    recommendedTime = "[1期]生後12か月～24か月未満の間に1回";
    if (1 <= userYear && userYear <= 2) {
      //1歳0ヶ月≦年齢≦2歳0ヶ月の場合、推奨(初回)
      recommendFlg = true;
    }
  }else if (4 <= userYear && userYear <= 6) {
    //4歳≦年齢≦6歳の場合、表示
    displayFlg = true;
    recommendedTime = "[2期]5歳～7歳未満で、小学校入学1年前の4月1日から入学の年の3月31日まで間に1回";
    if (5 <= userYear && userYear <= 6) {
      //5歳≦年齢≦6歳の場合、推奨
      recommendFlg = true;
    }
  }

  return new vaccination(id, name, displayFlg, recommendFlg, recommendedTime);
}

/**
 *ID:11
 *日本脳炎１期
 *
 *推奨時期(初回)：3歳中に6日～28日の間隔で2回
 *推奨時期(初回追加):4歳中に1回（1期初回接種終了後おおむね1年後）
 *
 */
function vaccination11(userAge) {
  var id = 11;
  var name = "日本脳炎１期";
  var displayFlg = false;
  var recommendFlg = false;
  var recommendedTime = "";

  var userYear = Number(userAge.year);  //年齢取得
  var userMonth = Number(userAge.month);  //年齢取得

  if (2 <= userYear && userYear < 3 ){
    //2歳≦年齢≦3歳の場合、表示(初回)
    displayFlg = true;
    recommendedTime = "[初回]生後12か月～24か月未満の間に1回";
    if (userYear == 3) {
      //3歳の場合、推奨(初回)
      recommendFlg = true;
    }
  }else if (userYear == 3) {
    //3歳の場合
    displayFlg = true;
    recommendFlg = true;
    recommendedTime = "[初回]生後12か月～24か月未満の間に1回\r\n"+
                      "[初回追加]5歳～7歳未満で、小学校入学1年前の4月1日から入学の年の3月31日まで間に1回";
  }else if (userYear == 4) {
    //4歳の場合、表示
    displayFlg = true;
    recommendFlg = true;
    recommendedTime = "[初回追加]5歳～7歳未満で、小学校入学1年前の4月1日から入学の年の3月31日まで間に1回";
  }

  return new vaccination(id, name, displayFlg, recommendFlg, recommendedTime);
}
