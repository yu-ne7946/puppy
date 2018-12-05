/*
$(".navi> .nav> li").hover(function(){
 $(".menu_modal").stop().fadeOut();
 $(this).children(".menu_modal").stop().fadeIn(100);
},function(){
    $(".menu_modal").stop().fadeOut();
});
*/
/**Banner slide */
var n =1;
var chk =1;
var interval;

$("#slide_ul").find(".slide").each(function(){
	var name = $(this).data("name");
	var html = '<span class="w3-bar-item w3-button w3-white" onclick="paging3(this);">'+name+'</span>';
	$(this).parent().next().find(".pager").append(html);
});

interval3 = setInterval(slide3,3000);

function slide3(){
	$("#slides3").parent().find(".pager").find("span").removeClass("w3-text-red");
	$("#slides3").parent().find(".pager").find("span").eq(n).addClass("w3-text-red");
	$("#slides3").stop().animate({
		"left":-(n *100) + "%"
	}, 700 , function(){
		if (n ==0) chk =1;
		else if (n ==5)chk = -1;
		n +=chk;
	})
}

function paging3(obj){
	n = $(obj).index();
    clearInterval(interval3);
    slide3();
    interval3 = setInterval(slide3,3000);
}

$("#slides3").hover(function(){
	clearInterval(interval3);
}, function(){
	interval3 = setInterval(slide3, 3000);
});


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
  

$(".nav > li").mouseover(function () {
    var now = $(this).index() - 1;
    $(".menu_modal").stop().fadeOut(100, function () {
        $(".menu_modal").eq(now).stop().fadeIn(100);
    });
});
$(".navi-bar").mouseleave(function(){
    $(".menu_modal").stop().fadeOut(100);
});

/**사료 */
var cates=[{main:{title:"브랜드별사료"},sub:[{title:"ANF",link:"#"},{title:"GO",link:"#"},{title:"K9",link:"#"},{title:"NOW",link:"#"},
{title:"네츄럴코어",link:"#"},{title:"뉴트리언스",link:"#"},{title:"더독(닥터소프트)",link:"#"},{title:"도그랑",link:"#"},{title:"도그밥(수제사료)",link:"#"},{title:"로얄캐닌",link:"#"},{title:"로직(LOGIC)",link:"#"},
{title:"로투스",link:"#"},{title:"럭셔리 발란스",link:"#"},{title:"맛선",link:"#"},{title:"메라독",link:"#"},{title:"비코푸드",link:"#"},{title:"보레알",link:"#"},{title:"시저",link:"#"},
{title:"아나멧",link:"#"},{title:"아보덤(피너클)",link:"#"},{title:"아침애 수제사료",link:"#"}]},{main:{title:"기능별사료"},sub:[{title:"분유/이유식",link:"#"},{title:"자견용",link:"#"},
{title:"성견용",link:"#"},{title:"전연령",link:"#"},{title:"노견용",link:"#"},{title:"소형견용",link:"#"},{title:"대형견용",link:"#"},
{title:"비만견용",link:"#"},{title:"임신/수유견",link:"#"},
{title:"그레인프리 사료",link:"#"},{title:" 뼈/관절 사료",link:"#"},{title:"피부,모질 사료",link:"#"},{title:"기타 기능성 사료",link:"#"},{title:"위장개선 사료",link:"#"},
{title:"대포장사료",link:"#"},{title:"저알러지사료",link:"#"},
{title:"소프트사료 ",link:"#"},{title:"수제사료",link:"#"},{title:"오븐에 구운 사료",link:"#"},{title:"",link:"#"}]}]

function modalMake1(){
    var html = '';
    for (var i=0; i<cates.length; i++){
        html ='<div>';
        html += '<div class="title">';
        html += '<a href="'+cates[i].main.link+'">'+ cates[i].main.title+'</a>';
        html += '</div>';

        for(var j=0; j<cates[i].sub.length; j++){
            if(j%7 == 0) html += '<ul style="float:left;width:33%;">';
            html += '<li class="cont">';
            html += '<a href='+cates[i].sub[j].link+'>'+cates[i].sub[j].title+'</a>';
            html += '</li>';
            if(j%7 == 6) html += '</ul>';
        }
        html+= '</div>';
        $("#modal1").append(html);
    }
}

modalMake1();


/**간식 */
var cates2=[{title:"육포/사시미간식(대용량)",link:"#"},{title:"육포/져키간식(소용량)",link:"#"},{title:"명품수제간식",link:"#"},{title:"강아지 덴탈껌",link:"#"},{title:"습식간식/소시지",link:"#"},{title:"캔/파우치",link:"#"},
    {title:"비스켓/쿠키",link:"#"},{title:"건어물",link:"#"},{title:"중대형견",link:"#"},{title:"기타",link:"#"}]


function modalMake2(){
    var html = '';
    html += '<ul class="clear">';
    for(i=0; i<cates2.length; i++){
      
        html += '<li class="snack_cont">';
        html += '<a href="'+cates2[i].link+'">'+ cates2[i].title+'</a>';
        html +='</li>';}

        html+='</ul>';
        $("#modal2").append(html);
    }

modalMake2();


/**영양제*/
var cates3 = [{title:"종합영양제",link:"#"},{title:"피부/모질영양제",link:"#"},{title:"칼슘/관절영양제",link:"#"},{title:"장/소화관련",link:"#"},{title:"눈관련",link:"#"},{title:"구강관련",link:"#"},{title:"귀 관련",link:"#"},{title:"의약부외품",link:"#"},
    {title:"어린강아지용",link:"#"},{title:"임신견",link:"#"},{title:"기타",link:"#"}]


    function modalMake3(){
        var html = '';
        html += '<ul class="clear">';
        for(i=0; i<cates3.length; i++){
          
            html += '<li>';
            html += '<a href="'+cates3[i].link+'">'+ cates3[i].title+'</a>';
            html +='</li>';}
    
            html+='</ul>';
            $("#modal3").append(html);
        }
    
    modalMake3();


/**목욕/미용*/
    $.ajax({
        url:"../json/cate4.json",
        type:"get",
        datatype:"json",
        data:{},
        success:function(data){
            var cmt=data.result.length;
            var html ='';
            html += '<ul class="clear">';
            for(var i=0; i<cmt; i++){
                html += '<li>';
                html += '<a href="'+data.result[i].link+'">'+data.result[i].title+'</a>';
                html += '</li>';
            }
            html+='</ul>';
            $("#modal4").append(html);
            console.log(html);
        },
        error:function(xhr,status,error){
            console.log(xhr,status,error);
        }
    });

    /**배변위생 */
    $.ajax({
        url:"../json/cate5.json",
        type:"get",
        datatype:"json",
        data:{},
        success:function(data){
            var cmt= data.result.length;
            var html = '';
            html += '<ul class="clear">';
            for(i=0; i<cmt; i++){
                html += '<li>';
                html += '<a href="'+data.result[i].link+'">'+data.result[i].title+'</a>';
                html +='</li>';
            }
            html += '</ul>';
            $("#modal5").append(html);
            console.log(html);
        },
        error:function(xhr,status,error){
            console.log(xhr,status,error);
        }
    });



/**firebase 로 불러오기 */
var db = firebase.database();

    /**식기/이동장 */

/**홈1 리스트*/
function initHome() {
    $("#case_index > .home_ul > li").remove();
    var ref = db.ref("root/home/list/");
    ref.on("child_added", homeMake);
    // ref.on("child_removed", homeRev);
    // ref.on("child_changed", homeChg);
}
function initHomeTitle() {
    $("#case_index > .home_ul > li").remove();
    var ref = db.ref("root/home/title/");
    ref.on("child_added", homeTitleMake);
    // ref.on("child_removed", homeRev);
    // ref.on("child_changed", homeChg);
}
initHomeTitle();

/*
function homeTitleAdd(data){
  homeMake(data);
}
function homeAdd(data){
   homeMake(data);
}
*/


function homeTitleMake(data) {
    var html = '';
    html  = '<div>';
    html += '<div class="title">';
    html += '<a href="#">'+ data.val()+'</a>';
    html += '</div>';
    html += '<ul style="float:left;width:33%;">';
    html += '</ul>';
    html += '</div>';
    $("#modal6").append(html);
    initHome();
}


function homeMake(data) {
    var html = ''; 
    html += '<li class="cont">';
    html += '<a href='+data.val().link+'>'+data.val().title+'</a>';
    html += '</li>';
    $("#modal6 > div > ul").append(html);
}



/**장난감 */
function initToy() {
	$(".toy_ul >li").remove();
	ref = db.ref("root/toy/");
	ref.on("child_added", toyAdd);
	ref.on("child_removed", toyRev);
	// ref.on("child_changed", toyChg);
}
initToy();

    
function toyAdd(data) {
    var html = '';
    html += '<li>';
    html += '<a href="'+data.val().link+'">'+data.val().title+'</a>';
    html += '</li>'

   /*  html +='<ul class="house clear">';
    html += '<li>';
    html += '<a href="'+data.val().link+'">'+data.val().title+'</a>';
    html += '</li>'
    html += '</ul>'; */
    $("#modal8").append(html);
}

function toyRev(data) {
    var id = data.key;
    $("#" + id).remove();}
