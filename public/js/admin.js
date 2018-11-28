// Initialize Firebase
var config = {
  apiKey: "AIzaSyD3MilHE9snBQOveViZ4hICUpFYOBheeNY",
  authDomain: "yune-puppy.firebaseapp.com",
  databaseURL: "https://yune-puppy.firebaseio.com",
  projectId: "yune-puppy",
  storageBucket: "yune-puppy.appspot.com",
  messagingSenderId: "413099070956"
};
firebase.initializeApp(config);

var db = firebase.database();
var ref;
var id;
var key;

/**홈/케이스  */
function initHomeTitle() {
	var ref = db.ref("root/home/title");
	ref.on("child_added", homeTitleAdd);
    ref.on("child_changed", homeTitleAdd);
}
function homeTitleAdd(data) {
    $("#top_title").val(data.val());
    $("#case_top_title").html(data.val());
}
initHomeTitle();

function initHomeTitle2() {
	var ref = db.ref("root/home2/title");
	ref.on("child_added", homeTitleAdd2);
    ref.on("child_changed", homeTitleAdd2);
}
function homeTitleAdd2(data) {
    $("#bot_title").val(data.val());
    $("#case_bot_title").html(data.val());
}
initHomeTitle2();


function initHome() {
	$("#case_index > .home_ul > li").remove();
	var ref = db.ref("root/home/list");
	ref.on("child_added", homeAdd);
	ref.on("child_removed", homeRev);
    ref.on("child_changed", homeChg);
}
initHome();

function initHome2() {
	$("#case_bot_index > .home_ul > li").remove();
	var ref = db.ref("root/home2/list");
	ref.on("child_added", homeAdd2);
	ref.on("child_removed", homeRev2);
    ref.on("child_changed", homeChg2);
}
initHome2();



/*생성*/
function homeAdd(data) {
    homeMake(data, $("#case_index"));
}
function homeAdd2(data) {
    homeMake(data, $("#case_bot_index"));
}

/**리스트 */
function homeMake(data, parent){ 
    var id = data.key;
    var html = '';
    html += '<ul class="case_ul clear home_ul" id="' + id + '">';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html +='<input type="text"  class="case_input case_in_link" placeholder="링크" value="'+ data.val().link+'">';
    html+='</li>';
    html += '<li class="case_time">'+data.val().wdate+'</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt home_del" onclick="homeDel(this);">삭제</button>';
    html += '<button class="case_bt home_re"  onclick="homeUp(this);">수정</button>';
    html+='</li>'
    html += '</ul>';
    parent.append(html);
}

/*
function homebotMake(data){    
    var id = data.key;
    var html = '';
    html += '<ul class="case_ul clear home_ul" id="' + id + '">';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().hbtitle + '"></li>';
    html += '<li class="case_li">';
    html +='<input type="text"  class="case_input case_in_link" placeholder="링크" value="'+ data.val().hblink+'">';
    html +='</li>';
    html += '<li class="case_time">'+data.val().hbwdate+'</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt home_del" onclick="homeDel2(this);">삭제</button>';
    html += '<button class="case_bt home_re"  onclick="homeUp2(this);">수정</button>';
    html+='</li>'
    html += '</ul>';
    $("#case_bot_index").append(html);
};
*/

/**제목 생성*/
function homeTop(data){
    var id = data.key;
    var tophtml = '';
    tophtml += '<ul class="hometop_ul clear" id="' + id + '">';
    tophtml += '<li class="hometop_li">';
    tophtml += '<input type="text" class="hometop" placeholder="카테고리제목" value="' + data.val().toptitle + '"></input>'
    tophtml += '</li>';
    tophtml += '<li class="hometop_li">';
    tophtml += '<button class="hometop_del" onclick="hometopDel(this);">삭제</button>';
    tophtml += '<button class="hometop_re" onclick="hometopUp(this);">수정</button>';
    tophtml += '</li>';
    tophtml += '</ul>';
    $("#case_top_title").append(tophtml);
}

function homeBot(data){
    var id = data.key;
    var bothtml = '';
    bothtml += '<ul class="hometop_ul clear" id="' + id + '">';
    bothtml += '<li class="hometop_li">';
    bothtml += '<input type="text" class="hometop" placeholder="카테고리제목" value="' + data.val().bottitle + '"></input>'
    bothtml += '</li>';
    bothtml += '<li class="hometop_li">';
    bothtml += '<button class="hometop_del" onclick="homebotDel(this);">삭제</button>';
    bothtml += '<button class="hometop_re" onclick="homebotUp(this);">수정</button>';
    bothtml += '</li>';
    bothtml += '</ul>';
    $("#case_bot_title").append(bothtml);
};

/***저장 등록 */

$("#home_save").click(function(){
    ref = db.ref("root/home/list");
    // var ul = $(this).parent().parent();
    var title = $("#title").val();
    var link = $("#link").val();
    if(title == "" || link == ""){
        alert("내용을 입력하세요.");
        return false;
    }
    else{
        ref.push({
            title : title,
            link: link,
            wdate : new Date().getTime()
        }).key;
        alert("등록되었습니다.");
    }
});

/**아래 카테고리 */
$("#homebot_save").click(function(){
    ref = db.ref("root/home2/list");
    // var ul = $(this).parent().parent();
    var title = $("#hb_title").val();
    var link = $("#hb_link").val();
    if(title == "" || link == ""){
        alert("내용을 입력하세요.");
        return false;
    }
    else{
        ref.push({
            title : title,
            link: link,
            wdate : new Date().getTime()
        }).key;
        alert("등록되었습니다.");
    }
});


/** 제목 클릭저장**/
$("#top_save").click(function(){
    ref = db.ref("root/home/title");
    var toptitle = $("#top_title").val();
    if(toptitle == ""){
        alert("내용을 입력하세요");
        return false;
    }
    else{
        ref.update({
            toptitle : toptitle
        });
        alert("등록되었습니다.");
    }
});


$("#bot_save").click(function(){
    ref= db.ref("root/home2/title");
    var bottitle = $("#bot_title").val();
    if(bottitle == ""){
        alert("내용을 입력하세요");
        return false;
    }
    else{
        ref.update({
            bottitle : bottitle
        });
        alert("등록되었습니다.");
    }
});


/*삭제*/
function homeRev(data) {
    $("#"+data.key).remove();
}

function homeRev2(data) {
    $("#"+data.key).remove();
}

function homeDel(obj) {
	if (confirm("정말로 삭제하시겠습니까?")) {
		//var id = obj.parentNode.parentNode.parentNode.id;
        var id = $(obj).parent().parent().attr("id");
		if (id != "") {
			db.ref("root/home/list/" + id).remove();
		}
	}
}

function homeDel2(obj) {
	if (confirm("정말로 삭제하시겠습니까?")) {
		//var id = obj.parentNode.parentNode.parentNode.id;
        var id = $(obj).parent().parent().attr("id");
		if (id != "") {
			db.ref("root/home2/list/" + id).remove();
		}
	}
}


/**제목삭제 */
function hometopDel(obj){
  if(confirm("정말로 삭제하시겠습니까")){
      var id = $(obj).parent().parent().attr("id");
      console.log(id);
      if(id != ""){
          db.ref("root/home/" + id).remove();
      }
  }
};

function homebotDel(obj){
    if(confirm("정말로 삭제하시겠습니까")){
        var id = $(obj).parent().parent().attr("id");
        if(id != ""){
            db.ref("root/home2/" + id).remove();
        }
    }
  };


/*수정 */
function homeChg(data){

    if(data.val().toptitle){
     var id = data.key;
    var tophtml = '';
    tophtml += '<li class="hometop_li">';
    tophtml += '<input type="text" class="hometop" placeholder="카테고리제목" value="' + data.val().toptitle + '"></input>'
    tophtml += '</li>';
    tophtml += '<li class="hometop_li">';
    tophtml += '<button class="hometop_del" onclick="hometopDel(this);">삭제</button>';
    tophtml += '<button class="hometop_re" onclick="hometopUp(this);">수정</button>';
    tophtml += '</li>';
    $("#"+id).html(tophtml);
    alert("수정되었습니다.");
    }
    else{
    var id = data.key;
    var html = '';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html +='<input type="text"  class="case_input case_in_link" placeholder="링크" value="'+ data.val().link+'">';
    html+='</li>';
    html += '<li class="case_time">'+data.val().wdate+'</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt home_del" onclick="homeDel(this);">삭제</button>';
    html += '<button class="case_bt home_re"  onclick="homeUp(this);">수정</button>';
    html+='</li>'
    $("#"+id).html(html);
    alert("수정되었습니다.");
    }
};

function homeUp(obj){
    var ul = $(obj).parent().parent();
	var id = ul.attr("id");
	var title = ul.find(".case_title").val();
    var link = ul.find(".case_in_link").val();
    console.log(id, title, link);
	if (title == '' || link == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/home/" + id);
		ref.update({
			title: title,
			link: link
		});
	}
} 

function homeChg2(data){
    if(data.val().bottitle){
    var id = data.key;
    var bothtml = '';
    bothtml += '<li class="hometop_li">';
    bothtml += '<input type="text" class="hometop" placeholder="카테고리제목" value="' + data.val().bottitle + '"></input>'
    bothtml += '</li>';
    bothtml += '<li class="hometop_li">';
    bothtml += '<button class="hometop_del" onclick="homebotDel(this);">삭제</button>';
    bothtml += '<button class="hometop_re" onclick="homebotUp(this);">수정</button>';
    bothtml += '</li>';
 
    $("#"+ id).html(bothtml);
    alert("수정되었습니다.");
    }
    else{
    var id = data.key;
    var html = '';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().hbtitle + '"></li>';
    html += '<li class="case_li">';
    html +='<input type="text"  class="case_input case_in_link" placeholder="링크" value="'+ data.val().hblink+'">';
    html+='</li>';
    html += '<li class="case_time">'+data.val().hbwdate+'</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt home_del" onclick="homeDel(this);">삭제</button>';
    html += '<button class="case_bt home_re"  onclick="homeUp(this);">수정</button>';
    html+='</li>'
    $("#"+id).html(html);
    alert("수정되었습니다.");
    }
};


function homeUp2(obj){
    var ul = $(obj).parent().parent();
	var id = ul.attr("id");
	var hbtitle = ul.find(".case_title").val();
    var hblink = ul.find(".case_in_link").val();
    console.log(id, title, link);
	if (hbtitle == '' || hblink == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/home2/" + id);
		ref.update({
			hbtitle: hbtitle,
			hblink: hblink
		});
	}
} 
 
/**제목수정 */
function hometopUp(obj){
    var ul = $(obj).parent().parent();
	var id = ul.attr("id");
	var toptitle = ul.find(".hometop").val();
    // console.log(id, title, link);
	if (toptitle == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/home/" + id);
		ref.update({
			toptitle: toptitle
		});
	}
};

function homebotUp(obj){
    var ul = $(obj).parent().parent();
	var id = ul.attr("id");
	var bottitle = ul.find(".hometop").val();
    // console.log(id, title, link);
	if (bottitle == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/home2/" + id);
		ref.update({
			bottitle: bottitle
		});
	}
};
        


/***************************************************************************/
/**패션 및 외출 */

/**큰카테고리 */
function initFashion_toptitle() {
 var ref = db.ref("root/fashion/top/title");
 ref.on("child_added", fashionTopAdd);
 ref.on("child_changed", fashionTopAdd);
}
initFashion_toptitle()

function fashionTopAdd(data){
    $("#f_top_title").val(data.val());
    $("#fashion_top_title").html(data.val());
}

/**위 리스트 */
function initFashion_toplist() {
    var ref = db.ref("root/fashion/top/list");
    ref.on("child_added", fashionToplistAdd);
    // ref.on("child_removed", fashionToplistRev);
    // ref.on("child_changed", fashionToplistChg);
   }
initFashion_toplist()

/**큰카테고리 */
   function initFashion_bottitle() {
    var ref = db.ref("root/fashion/bottom/title");
     ref.on("child_added", fashionBotAdd);
    ref.on("child_changed",  fashionBotAdd);
   }
initFashion_bottitle()

function fashionBotAdd(data){
    $("#f_bot_title").val(data.val());
    $("#fashion_bot_title").html(data.val());
}

/**아래 리스트 */
   function initFashion_botlist() {
    var ref = db.ref("root/fashion/bottom/list");
    ref.on("child_added", fashionBotlistAdd);
    // ref.on("child_removed", fashionBotlistRev);
    // ref.on("child_changed", fashionBotlistChg);
   }
   initFashion_botlist()


/*생성*/
function fashionMake(data,parent){
    var id = data.key;
    var html = '';
    html += '<ul class="case_ul clear fashion_ul" id="' + id + '">';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html +='<input type="text"  class="case_input case_in_link" placeholder="링크" value="'+ data.val().link+'">';
    html+='</li>';
    html += '<li class="case_time">'+data.val().wdate+'</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt fashion_del" onclick="fashionDel(this);">삭제</button>';
    html += '<button class="case_bt fashion_re"  onclick="fashionUp(this);">수정</button>';
    html+='</li>'
    html += '</ul>';
    parent.append(html);
};


function fashionToplistAdd(data) {
  fashionMake(data, $("#fashion_index"));
   
}
function fashionBotlistAdd(data){
    console.log(data);
    fashionMake(data, $("#fashion_bot_index"));
}



/*저장 입력*/

$("#fashion_save").click(function(){
    ref = db.ref("root/fashion/top/list");
    var title = $("#f_title").val();
    var link = $("#f_link").val();
    console.log(title.link);
    if(title == "" | link == ""){
      alert("내용을 입력하세요");
      return false;
    }
    else{
        ref.push({
            title : title,
            link : link,
            wdate : new Date().getTime()
        }).key;
      
        alert("등록되었습니다.");
    }
});

$("#fashion_bot_save").click(function(){
    ref = db.ref("root/fashion/bottom/list");
    var title = $("#f_b_list_title").val();
    var link = $("#f_b_list_link").val();
    if(title == "" | link == ""){
      alert("내용을 입력하세요");
      return false;
    }
    else{
        ref.push({
            title : title,
            link : link,
            wdate : new Date().getTime()
        }).key;
        // console.log(title.link);
        alert("등록되었습니다.");
    }
});

/**제목 클릭저장 */
$("#f_top_save").click(function(){
    ref = db.ref("root/fashion/top/title");
    var toptitle = $("#f_top_title").val();
    if(toptitle == ""){
        alert("내용을 입력하세요");
        return false;
    }
    else{
        ref.update({
            toptitle : toptitle
        });
        alert("등록되었습니다.");
    }
});

$("#f_bot_save").click(function(){
    ref = db.ref("root/fashion/bottom/title");
    var toptitle = $("#f_bot_title").val();
    if(toptitle == ""){
        alert("내용을 입력하세요");
        return false;
    }
    else{
        ref.update({
            toptitle : toptitle
        });
        alert("등록되었습니다.");
    }
});


/*삭제*/
function fashionRev(data) {
    $("#"+data.key).remove();
}


function fashionDel(obj) {
	if (confirm("정말로 삭제하시겠습니까?")) {
		//var id = obj.parentNode.parentNode.parentNode.id;
        var id = $(obj).parent().parent().attr("id");
        console.log(id);
		if (id != "") {
			db.ref("root/fashion/" + id).remove();
		}
	}
}

/**수정 */
function fashionUp(obj){
    var ul = $(obj).parent().parent();
	var id = ul.attr("id");
	var title = ul.find(".case_title").val();
    var link = ul.find(".case_in_link").val();
    console.log(id, title, link);
	if (title == '' || link == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/fashion/" + id);
		ref.update({
			title: title,
			link: link
		});
	}
} 

function fashionChg(data){
    var id = data.key;
    var html = '';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html +='<input type="text"  class="case_input case_in_link" placeholder="링크" value="'+ data.val().link+'">';
    html+='</li>';
    html += '<li class="case_time">'+data.val().wdate+'</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt fashion_del" onclick="fashionDel(this);">삭제</button>';
    html += '<button class="case_bt fashion_re"  onclick="fashionUp(this);">수정</button>';
    html+='</li>'
    $("#"+id).html(html);
    alert("수정되었습니다.");
}
 



/******************************************************************** */
/**장난감 */
function initToy() {
	$(".toy_ul >li").remove();
	ref = db.ref("root/toy/");
	ref.on("child_added", toyAdd);
	ref.on("child_removed", toyRev);
	ref.on("child_changed", toyChg);
}
initToy();

/*생성*/
function toyMake(data){
    var id = data.key;
    var html = '';
    html += '<ul class="case_ul clear toy_ul" id="' + id + '">';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html +='<input type="text"  class="case_input case_in_link" placeholder="링크" value="'+ data.val().link+'">';
    html+='</li>';
    html += '<li class="case_time">'+data.val().wdate+'</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt toy_del" onclick="toyDel(this);">삭제</button>';
    html += '<button class="case_bt toy_re"  onclick="toyUp(this);">수정</button>';
    html+='</li>'
    html += '</ul>';
    $("#toy_index").append(html);
}


function toyAdd(data){
    var id = data.key;
	toyMake(data);
}

$("#toy_save").click(function(){
    ref = db.ref("root/toy/");
    var title = $("#to_title").val();
    var link = $("#to_link").val();
    if(title == "" | link == ""){
        alert("내용을 입력하세요");
        return false;
    }
    else{
        ref.push({
            title : title,
            link : link,
            wdate : new Date().getTime()
        }).key;
        alert("등록되었습니다.");

    }
});

/*삭제*/
function toyRev(data){
    $("#"+data.key).remove();
}


function toyDel(obj){
    if (confirm("정말로 삭제하시겠습니까?")) {
		//var id = obj.parentNode.parentNode.parentNode.id;
        var id = $(obj).parent().parent().attr("id");
        console.log(id);
		if (id != "") {
			db.ref("root/toy/" + id).remove();
		}
	}
}

/*수정*/
function toyUp(obj){
    var ul = $(obj).parent().parent();
	var id = ul.attr("id");
	var title = ul.find(".case_title").val();
    var link = ul.find(".case_in_link").val();
    console.log(id, title, link);
	if (title == '' || link == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/toy/" + id);
		ref.update({
			title: title,
			link: link
		});
	}
} 

function toyChg(data){
    var id = data.key;
    var html = '';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html +='<input type="text"  class="case_input case_in_link" placeholder="링크" value="'+ data.val().link+'">';
    html+='</li>';
    html += '<li class="case_time">'+data.val().wdate+'</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt toy_del" onclick="toyDel(this);">삭제</button>';
    html += '<button class="case_bt toy_re"  onclick="toyUp(this);">수정</button>';
    html+='</li>'
    $("#"+id).html(html);
    alert("수정되었습니다.");
}