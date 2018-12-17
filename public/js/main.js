/*
$(".navi> .nav> li").hover(function(){
 $(".menu_modal").stop().fadeOut();
 $(this).children(".menu_modal").stop().fadeIn(100);
},function(){
    $(".menu_modal").stop().fadeOut();
});
*/


/**Banner slide */

/** 
/* 
var banNow = 0;
$(".main-title .main-navi").click(function () {
    $(".banner").children("li").hide();
    $(".banner").children("li").eq(banNow).show();
    $(".banner").children("li").eq(banNow).find(".ban_img").addClass("img_ani");
    $(".banner").children("li").eq(banNow).find(".txt_ani").each(function (i) {
        $(this).css("animation-delay", i / 5 + "s").addClass("ban_ani");
    });
    if (banNow == 5) banNow = -1;
    banNow++;
}).trigger("click");*/

$(".ban_img").mousemove(function (evt) {
    var delta = 30;
    var cX = evt.clientX;
    var cY = evt.clientY;
    var iX = $(this).width() / 2;
    var iY = $(this).height() / 2;
    var mX = (iX - cX) / delta;
    var mY = (iY - cY) / delta;
    $(this).css("transform", "translate(" + mX + "px, " + mY + "px)");
});

/**banner animation */
var n = 1;
var depth = 3;
var interval;

$("#slide_ul").children(".slide").each(function () {
    var name = $(this).data("name");
    var html = '<li onclick="paging(this)">' + name + '</li>';
    $(this).parent().next(".main-navi").append(html);
})

$("#slide_ul .slide").eq(0).css({
    "z-index": 2
});
$(".main-navi").children("li").eq(0).css({
    "color": "#000"
});
interval = setInterval(slide, 4000);

function slide() {
    $(".main-navi").children("li").css({
        "color": "#666"
    });
    $(".main-navi").children("li").eq(n).css({
        "color": "#000"
    });
    $("#slide_ul .slide").eq(n).css({
        "display": "none",
        "z-index": depth++
    }).stop().fadeIn(1000, function () {
        if (n == 4) n = -1;
        n++;
    });
}

function paging(obj) {
    n = $(obj).index();
    clearInterval(interval);
    slide();
    interval = setInterval(slide, 3000);
}

$("#slide_ul").hover(function () {
    clearInterval(interval);
}, function () {
    interval = setInterval(slide, 3000);
});

/*sub banner*/

$(".evbanner > li").mouseenter(function () {
    $(this).find(".ev_ani").each(function (i) {
        $(this).css("animation-delay", i / 5 + "s").addClass("ban_ani");
    });
});

$(".evbanner > li").mouseleave(function () {
    $(".ev_ani").removeClass("ban_ani");
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
$(".navi-bar").mouseleave(function () {
    $(".menu_modal").stop().fadeOut(100);
});

/**************************/
/**사료 */
/**************************/
var cates = [{
    main: {
        title: "브랜드별사료"
    },
    sub: [{
            title: "ANF",
            link: "#"
        }, {
            title: "GO",
            link: "#"
        }, {
            title: "K9",
            link: "#"
        }, {
            title: "NOW",
            link: "#"
        },
        {
            title: "네츄럴코어",
            link: "#"
        }, {
            title: "뉴트리언스",
            link: "#"
        }, {
            title: "더독(닥터소프트)",
            link: "#"
        }, {
            title: "도그랑",
            link: "#"
        }, {
            title: "도그밥(수제사료)",
            link: "#"
        }, {
            title: "로얄캐닌",
            link: "#"
        }, {
            title: "로직(LOGIC)",
            link: "#"
        },
        {
            title: "로투스",
            link: "#"
        }, {
            title: "럭셔리 발란스",
            link: "#"
        }, {
            title: "맛선",
            link: "#"
        }, {
            title: "메라독",
            link: "#"
        }, {
            title: "비코푸드",
            link: "#"
        }, {
            title: "보레알",
            link: "#"
        }, {
            title: "시저",
            link: "#"
        },
        {
            title: "아나멧",
            link: "#"
        }, {
            title: "아보덤(피너클)",
            link: "#"
        }, {
            title: "아침애 수제사료",
            link: "#"
        }
    ]
}, {
    main: {
        title: "기능별사료"
    },
    sub: [{
            title: "분유/이유식",
            link: "#"
        }, {
            title: "자견용",
            link: "#"
        },
        {
            title: "성견용",
            link: "#"
        }, {
            title: "전연령",
            link: "#"
        }, {
            title: "노견용",
            link: "#"
        }, {
            title: "소형견용",
            link: "#"
        }, {
            title: "대형견용",
            link: "#"
        },
        {
            title: "비만견용",
            link: "#"
        }, {
            title: "임신/수유견",
            link: "#"
        },
        {
            title: "그레인프리 사료",
            link: "#"
        }, {
            title: " 뼈/관절 사료",
            link: "#"
        }, {
            title: "피부,모질 사료",
            link: "#"
        }, {
            title: "기타 기능성 사료",
            link: "#"
        }, {
            title: "위장개선 사료",
            link: "#"
        },
        {
            title: "대포장사료",
            link: "#"
        }, {
            title: "저알러지사료",
            link: "#"
        },
        {
            title: "소프트사료 ",
            link: "#"
        }, {
            title: "수제사료",
            link: "#"
        }, {
            title: "오븐에 구운 사료",
            link: "#"
        }, {
            title: "",
            link: "#"
        }
    ]
}]

function modalMake1() {
    var html = '';
    for (var i = 0; i < cates.length; i++) {
        html = '<div>';
        html += '<div class="title">';
        html += '<a href="' + cates[i].main.link + '">' + cates[i].main.title + '</a>';
        html += '</div>';

        for (var j = 0; j < cates[i].sub.length; j++) {
            if (j % 7 == 0) html += '<ul style="float:left;width:33%;">';
            html += '<li class="cont">';
            html += '<a href=' + cates[i].sub[j].link + '>' + cates[i].sub[j].title + '</a>';
            html += '</li>';
            if (j % 7 == 6) html += '</ul>';
        }
        html += '</div>';
        $("#modal1").append(html);
    }
}

modalMake1();

/**************************/
/**간식 **/
/**************************/
var cates2 = [{
        title: "육포/사시미간식(대용량)",
        link: "#"
    }, {
        title: "육포/져키간식(소용량)",
        link: "#"
    }, {
        title: "명품수제간식",
        link: "#"
    }, {
        title: "강아지 덴탈껌",
        link: "#"
    }, {
        title: "습식간식/소시지",
        link: "#"
    }, {
        title: "캔/파우치",
        link: "#"
    },
    {
        title: "비스켓/쿠키",
        link: "#"
    }, {
        title: "건어물",
        link: "#"
    }, {
        title: "중대형견",
        link: "#"
    }, {
        title: "기타",
        link: "#"
    }
]


function modalMake2() {
    var html = '';
    html += '<ul class="clear">';
    for (i = 0; i < cates2.length; i++) {

        html += '<li class="snack_cont">';
        html += '<a href="' + cates2[i].link + '">' + cates2[i].title + '</a>';
        html += '</li>';
    }

    html += '</ul>';
    $("#modal2").append(html);
}

modalMake2();

/**************************/
/**영양제*/
/**************************/
var cates3 = [{
        title: "종합영양제",
        link: "#"
    }, {
        title: "피부/모질영양제",
        link: "#"
    }, {
        title: "칼슘/관절영양제",
        link: "#"
    }, {
        title: "장/소화관련",
        link: "#"
    }, {
        title: "눈관련",
        link: "#"
    }, {
        title: "구강관련",
        link: "#"
    }, {
        title: "귀 관련",
        link: "#"
    }, {
        title: "의약부외품",
        link: "#"
    },
    {
        title: "어린강아지용",
        link: "#"
    }, {
        title: "임신견",
        link: "#"
    }, {
        title: "기타",
        link: "#"
    }
]


function modalMake3() {
    var html = '';
    html += '<ul class="clear">';
    for (i = 0; i < cates3.length; i++) {

        html += '<li>';
        html += '<a href="' + cates3[i].link + '">' + cates3[i].title + '</a>';
        html += '</li>';
    }

    html += '</ul>';
    $("#modal3").append(html);
}

modalMake3();

/**************************/
/**영양제*/
/**************************/
$.ajax({
    url: "../json/cate4.json",
    type: "get",
    datatype: "json",
    data: {},
    success: function (data) {
        var cmt = data.result.length;
        var html = '';
        html += '<ul class="clear">';
        for (var i = 0; i < cmt; i++) {
            html += '<li>';
            html += '<a href="' + data.result[i].link + '">' + data.result[i].title + '</a>';
            html += '</li>';
        }
        html += '</ul>';
        $("#modal4").append(html);
        console.log(html);
    },
    error: function (xhr, status, error) {
        console.log(xhr, status, error);
    }
});

/**************************/
/**영양제*/
/**************************/
$.ajax({
    url: "../json/cate5.json",
    type: "get",
    datatype: "json",
    data: {},
    success: function (data) {
        var cmt = data.result.length;
        var html = '';
        html += '<ul class="clear">';
        for (i = 0; i < cmt; i++) {
            html += '<li>';
            html += '<a href="' + data.result[i].link + '">' + data.result[i].title + '</a>';
            html += '</li>';
        }
        html += '</ul>';
        $("#modal5").append(html);
        console.log(html);
    },
    error: function (xhr, status, error) {
        console.log(xhr, status, error);
    }
});



/**firebase 로 불러오기 */
var db = firebase.database();

/**************************/
/************홈/  식기이동장 ************/
/**************************/


/**홈1 타이틀 init*/
function initHomeTitle() {
    var ref = db.ref("root/home/title/");
    ref.on("child_added", homeTitleAdd);
    ref.on("child_changed", homeTitleAdd);
}
initHomeTitle();


/**홈1 타이틀 만들기**/
function homeTitleAdd(data) {
    var html = '';
    html += '<a href="#">' + data.val() + '</a>';
    $("#modal6 > .mo6_left > div").append(html);
}

/**홈1 리스트 init*/
function initHome() {
    $("#case_index > .home_ul > li").remove();
    var ref = db.ref("root/home/list/");
    ref.on("child_added", homeMake);
    ref.on("child_removed", homeRev);
    ref.on("child_changed", homeChg);
}
initHome();

/**홈1 리스트만들기*/
function homeMake(data) {
    var id = data.key;

    var html = '';
    html += '<li class="cont" id="' + id + '">';
    html += '<a href=' + data.val().link + '>' + data.val().title + '</a>';
    html += '</li>';
    $("#modal6 > .mo6_left > .mo6_list1").append(html);
}
/**홈1 리스트 삭제  */
function homeRev(data) {
    var id = data.key;
    $("#" + id).remove();
}

/**홈1 리스트 수정  */
function homeChg(data) {
    var id = data.key;
    var html = '';
    html += '<li class="cont" id="' + id + '">';
    html += '<a href=' + data.val().link + '>' + data.val().title + '</a>';
    html += '</li>';
    $("#" + id).html(html);
}


/**홈2 타이틀 init*/
function initHomeTitle2() {
    var ref = db.ref("root/home2/title/");
    ref.on("child_added", homeTitleAdd2);
    ref.on("child_changed", homeTitleAdd2);
}
initHomeTitle2();

/**홈2 타이틀 만들기**/
function homeTitleAdd2(data) {
    console.log(data.val());
    var html = '';
    html += '<a href="#">' + data.val() + '</a>';
    $("#modal6 > .mo6_right > div").append(html);
}


/**홈2 리스트*/
function initHome2() {
    $("#case_bot_index > .home_ul > li").remove();
    var ref = db.ref("root/home2/list/");
    ref.on("child_added", homeMake2);
    ref.on("child_removed", homeRev2);
    ref.on("child_changed", homeChg2);
}
initHome2();

/**홈2 리스트만들기*/
function homeMake2(data) {
    var id = data.key;
    var html = '';
    html += '<li class="cont" id="' + id + '">';
    html += '<a href=' + data.val().link + '>' + data.val().title + '</a>';
    html += '</li>';
    $("#modal6 > .mo6_right > .mo6_list2").append(html);
}

/*홈 2리스트 삭제 */
function homeRev2(data) {
    var id = data.key;
    $("#" + id).remove();
}

/*홈 2리스트 수정 */
function homeChg2(data) {
    var id = data.key;
    var html = '';
    html += '<li class="cont" id="' + id + '">';
    html += '<a href=' + data.val().link + '>' + data.val().title + '</a>';
    html += '</li>';
    $("#" + id).html(html);
}



/************************ 패션 **************************/
/**패션1 타이틀 init*/
function initFashionTitle() {
    var ref = db.ref("root/fashion/top/title");
    ref.on("child_added", fashionTitleAdd);
    ref.on("child_changed", fashionTitleAdd);
}
initFashionTitle();

/**패션1 타이틀 만들기*/
function fashionTitleAdd(data) {
    console.log(data.val());
    var html = '';
    html += '<a href="#">' + data.val() + '</a>';
    $("#modal7 > .mo7_left > div").append(html);
}

/**패션1 리스트 init*/
function initFashion() {
    $("#fashion_index >fashion_ul>li").remove();
    var ref = db.ref("root/fashion/top/list/");
    ref.on("child_added", fashionMake);
    ref.on("child_removed", fashionRev);
    ref.on("child_changed", fashionChg);
}
initFashion();

/**패션1 리스트 만들기*/
function fashionMake(data) {
    console.log(data.val().title);
    var id = data.key;
    var html = '';
    html += '<li class="cont" id="' + id + '">';
    html += '<a href=' + data.val().link + '>' + data.val().title + '</a>';
    html += '</li>';
    $("#modal7 > .mo7_left > .mo7_list1").append(html);
}

/*패션 1리스트 삭제 */
function fashionRev(data) {
    var id = data.key;
    $("#" + id).remove();
}

/*패션 1 리스트 수정 */
function fashionChg(data) {
    var id = data.key;
    var html = '';
    html += '<li class="cont" id="' + id + '">';
    html += '<a href=' + data.val().link + '>' + data.val().title + '</a>';
    html += '</li>';
    $("#" + id).html(html);
}



/**패션2타이틀 init*/
function initFashionTitle2() {
    var ref = db.ref("root/fashion/bottom/title");
    ref.on("child_added", fashionTitleAdd2);
    ref.on("child_changed", fashionTitleAdd2);
}
initFashionTitle2();

/**패션2 타이틀 만들기*/
function fashionTitleAdd2(data) {
    var html = '';
    html += '<a href="#">' + data.val() + '</a>';
    $("#modal7 > .mo7_right > div").append(html);
}



/**패션2 리스트 init*/
function initFashion2() {
    $("#fashion_bot_index >fashion_ul>li").remove();
    var ref = db.ref("root/fashion/bottom/list/");
    ref.on("child_added", fashionMake2);
    ref.on("child_removed", fashionRev2);
    ref.on("child_changed", fashionChg2);
}
initFashion2();

/**패션2 리스트 만들기*/
function fashionMake2(data) {
    console.log(data.val().title);
    var id = data.key;
    var html = '';
    html += '<li class="cont" id="' + id + '">';
    html += '<a href=' + data.val().link + '>' + data.val().title + '</a>';
    html += '</li>';
    $("#modal7 > .mo7_right > .mo7_list2").append(html);
}

/*패션 2리스트 삭제 */
function fashionRev2(data) {
    var id = data.key;
    $("#" + id).remove();
}

/*패션 2 리스트 수정 */
function fashionChg2(data) {
    var id = data.key;
    var html = '';
    html += '<li class="cont" id="' + id + '">';
    html += '<a href=' + data.val().link + '>' + data.val().title + '</a>';
    html += '</li>';
    $("#" + id).html(html);
}



/************************ 장난감 **************************/
function initToy() {
    $(".toy_ul >li").remove();
    ref = db.ref("root/toy/");
    ref.on("child_added", toyAdd);
    ref.on("child_removed", toyRev);
    ref.on("child_changed", toyChg);
}
initToy();


function toyAdd(data) {
    var id = data.key;
    var html = '';
    html += '<li id="' + id + '">';
    html += '<a href="' + data.val().link + '">' + data.val().title + '</a>';
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
    $("#" + id).remove();
}

function toyChg(data) {
    var id = data.key;
    var html = '';
    html += '<li id="' + id + '">';
    html += '<a href="' + data.val().link + '">' + data.val().title + '</a>';
    html += '</li>'
    $("#" + id).html(html);
}


/************************ BEST **************************/
var idx = 1;
function initBest() {
    idx = 1;
    ref = db.ref("root/best/");
    ref.on("child_added", bestMake);
    ref.on("child_removed", bestRev);
    // ref.on("child_changed", bestChg);
}
initBest();

/**생성 */
function bestMake(data) {
    var id = data.key;
    var title = data.val().title;
    var titlespan = data.val().titlespan;
    var link = data.val().link;
    var ori_img = data.val().ori_img;
    var ho_img = data.val().ho_img;
    var ori_price = data.val().ori_price;
    var dis_price = data.val().dis_price;
    var src1 = '../images/best/' + ori_img;
    var src2 = '../images/best/' + ho_img;
    var html = '';
    html += '<li id="'+id+'">';
    html += '<a href="'+link+'">'
    html += '<div class="best-title">BEST'+(idx++)+'</div>';
    html += '<div class="best-img">';
    html += '<div class="best_imgbox">';
    html += '<img src="'+src1+'" class="best_ori_img"/>';
    html += '<img src="'+src2+'" class="best_hover_img">'
    html += '</div>'
    html += '<div class="best_cart best_icon"><i class="fa fa-shopping-cart" aria-hidden="true"></i>'
    html += '</div>'
    html += '<div class="cart_tip" id="cart_tooltip">장바구니'
    html += '<div class="tip_arrow"></div>'
    html += '</div>'
    html += '<div class="best_heart best_icon"><i class="fa fa-heart" aria-hidden="true"></i></div>'
    html += '<div class="cart_tip heart_tip">찜하기'
    html += '<div class="tip_arrow hear_arrow"></div>'
    html += '</div>'
    html += '</div>'
    html += '<div class="bestblock">'
    html += '<h3>'+title+'';
    html += '<span class="best_sp">'+titlespan+'</span></h3>'
    html += '<hr />'
    html += '<p><span class="le-ma"><del>'+ori_price+'원</del></span>'
    html += '<span class="dis_price">'+dis_price+'원</span> </p>'
    html += '</div>'
    html +='</a>';
    html += '</li>'
    $(".best-product").append(html);

    
/**best image */
$(".best_hover_img").hover(function () {
    $(this).stop().animate({
        "opacity": 1
    }, 200).css({
        "animation-name": "bestImg"
    });
}, function () {
    $(this).stop().animate({
        "opacity": 0
    }, 200).css({
        "animation-name": "bestImgBack"
    });
});

/**best tootip */
$(".best-img").hover(function () {
    $(this).find(".best_icon").show();
}, function () {
    $(this).find(".best_icon").hide();
})

$(".best_cart").mouseenter(function () {
    $(this).next("#cart_tooltip").show();
})
$(".best_cart").mouseleave(function () {
    $(this).next("#cart_tooltip").hide();
})


$(".best_heart").mouseenter(function () {
    $(this).next(".heart_tip").show();
})
$(".best_heart").mouseleave(function () {
    $(this).next(".heart_tip").hide();
})
}

/**삭제 */
function bestRev(data) {
    var id = data.key;
    $("#" + id).remove();
}

/**수정*/
function bestChg(data) {
    var id = data.key;
    var title = data.val().title;
    var titlespan = data.val().titlespan;
    var link = data.val().link;
    var ori_img = data.val().ori_img;
    var ho_img = data.val().ho_img;
    var ori_price = data.val().ori_price;
    var dis_price = data.val().dis_price;
    var src1 = '../images/best/' + ori_img;
    var src2 = '../images/best/' + ho_img;

    var li = $("#" + id);
    $("a",li).attr("href", link);
    $(".best_ori_img",li).attr("src",src1);
    $(".best_hover_img",li).attr("src",src2);
    $(".bestblock > h3",li).html(title);
    if(titlespan)$(".best_sp",li).html(titlespan);
    $(".bestblock span.le-ma",li).html(ori_price);
    $(".bestblock span.dis_price",li).html(dis_price);

}

/************************ Recommend **************************/
function initReco() {
    ref = db.ref("root/reco");
    ref.on("child_added", recoAdd);
    ref.on("child_removed", recoRev);
    ref.on("child_changed", recoChg);
}
initReco();

/**생성 */
function recoAdd(data) {
    var id = data.key;
    var title = data.val().title;
    var link = data.val().link;
    var img = data.val().img;
    var src = '../images/rec/' + img;
    var html = '';
    html+= '<li id="'+id+'">';
    html += '<a href="'+link+'">'
    html+= '<div class="rec-cir-img">';
    html+= '<div class="rec_imgbx">';
    html+= '<img src="'+src+'" class="img"/>';
    html+= '</div>';
    html+=  '</div>';
      html+=  '<p>'+title+'</p>';
      html+= '</a>'
      html+=  '</li>';
    $(".rec-cir-list").append(html);

/**rec */
/*************/
$(".square").hover(function () {
    $(this).children("img").css({
        "animation-name": "featuredAni"
    });
}, function () {
    $(this).children("img").css({
        "animation-name": "featuredAniBack"
    });
});

$(".rec_imgbx").hover(function () {
    $(this).children("img").css({
        "animation-name": "featuredAni"
    });
}, function () {
    $(this).children("img").css({
        "animation-name": "featuredAniBack"
    });
});

}

/**삭제 */
function recoRev(data) {
    var id = data.key;
    $("#" + id).remove();
}


/**수정 */
function recoChg(data) {
    var id = data.key;
    var title = data.val().title;
    var link = data.val().link;
    var img = data.val().img;
    var src = '../images/rec/' + img;
    var li = $("#" + id);
    $("img", li).attr("src", src);
    $("a", li).attr("href",link);
    $("p",li).html(title);
}


/***********************/
/**instagram**/
/***********************/
$(".insta-list > li").mouseenter(function () {
    $(this).find(".insta_over").show();
})
$(".insta-list > li").mouseleave(function () {
    $(this).find(".insta_over").hide();
})

$(".infotdet > li").mouseenter(function () {
    $(this).find(".info_over").fadeIn();
});

$(".infotdet > li").mouseleave(function () {
    $(this).find(".info_over").fadeOut();
});
