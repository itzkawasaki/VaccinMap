var nowDate = new Date();function getVaccinByBirth(birthDay){	//１、ワクチン名と開始可能時期のリストを取得	//２、生年月日に１の開始可能時期を加算	//３、今日の日付と２を比較し、２の方が大きければ接種可能リストに追加}function dateDiff(dt1,dt2){    //2007-8-10と2007-7-31を比較します    //処理Aが実行されます    var dt1 = new Date(2007, 8 - 1, 10);    var dt2 = new Date(2007, 7 - 1, 31);    if(dt1.getTime() > dt2.getTime()) {        //処理A        return true;    } else {        //処理B    	return false;    }}