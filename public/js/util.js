
/**Timestamp 값을 GMT 표기로 바꾸는 함수  */
function timeConverter(ts){
	var a = new Date(ts);
	var months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
	var year = a.getFullYear();
	//var month = months[a.getMonth()]; 
	var month = a.getMonth()+1;
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	//var str = String(year).substr(2)+"년 "+month+" "+date+"일 "+amPm(hour)+"시 "+addZero(min)+"분 "+addZero(sec) +"초";
	var str = String(year).substr(2)+"-"+addZero(month)+"-"+addZero(date)+"";
  return str;
  /*string 2018을 문자열로 바꿔서.   year + "년"  과 같음 . */
}

/**0~9까지의 숫자의 앞에 0을 붙이는 함수.  */
function addZero(n) {
	if(n<10) return "0"+n;
  else return n;
  /*01,02~~ 10,11 */
}

/** 오전/ 오후 붙여주는 함수  */
function amPm(h) {
	if(h<12) return "오전 "+addZero(h);
	else if(h>12) return "오후 "+addZero(h-12);
	else return "오후 12";
}
