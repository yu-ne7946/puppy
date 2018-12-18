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

/**홈1에 타이틀 변하면 */
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

/**홈2에 타이틀 변하면 */
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

/**홈1리스트*/
function initHome() {
    $("#case_index > .home_ul > li").remove();
    var ref = db.ref("root/home/list");
    ref.on("child_added", homeAdd);
    ref.on("child_removed", homeRev);
    ref.on("child_changed", homeChg);
}
initHome();

/**홈2리스트*/
function initHome2() {
    $("#case_bot_index > .home_ul > li").remove();
    var ref = db.ref("root/home2/list");
    ref.on("child_added", homeAdd2);
    ref.on("child_removed", homeRev2);
    ref.on("child_changed", homeChg2);
}
initHome2();



/*리스트생성*/
function homeAdd(data) {
    homeMake(data);
}

function homeAdd2(data) {
    homebotMake(data);
}

/**홈1위리스트 */
function homeMake(data) {
    var id = data.key;
    var html = '';
    html += '<ul class="case_ul clear home_ul" id="' + id + '">';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html += '<input type="text"  class="case_input case_in_link" placeholder="링크" value="' + data.val().link + '">';
    html += '</li>';
    html += '<li class="case_time">' + timeConverter(data.val().wdate) + '</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt home_del" onclick="homeDel(this);">삭제</button>';
    html += '<button class="case_bt home_re"  onclick="homeUp(this);">수정</button>';
    html += '</li>'
    html += '</ul>';
    $("#case_index").append(html);
}

/*홈2리스트 */
function homebotMake(data) {
    var id = data.key;
    var html = '';
    html += '<ul class="case_ul clear home_ul" id="' + id + '">';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html += '<input type="text"  class="case_input case_in_link" placeholder="링크" value="' + data.val().link + '">';
    html += '</li>';
    html += '<li class="case_time">' + data.val().wdate + '</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt home_del" onclick="homeDel2(this);">삭제</button>';
    html += '<button class="case_bt home_re"  onclick="homeUp2(this);">수정</button>';
    html += '</li>'
    html += '</ul>';
    $("#case_bot_index").append(html);
};


/**제목 생성*/
function homeTop(data) {
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

function homeBot(data) {
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

$("#home_save").click(function () {
    ref = db.ref("root/home/list");
    // var ul = $(this).parent().parent();
    var title = $("#title").val();
    var link = $("#link").val();
    if (title == "" || link == "") {
        alert("내용을 입력하세요.");
        return false;
    } else {
        ref.push({
            title: title,
            link: link,
            wdate: new Date().getTime()
        }).key;
        alert("등록되었습니다.");
    }
});

/**아래 카테고리 */
$("#homebot_save").click(function () {
    ref = db.ref("root/home2/list");
    // var ul = $(this).parent().parent();
    var title = $("#hb_title").val();
    var link = $("#hb_link").val();
    if (title == "" || link == "") {
        alert("내용을 입력하세요.");
        return false;
    } else {
        ref.push({
            title: title,
            link: link,
            wdate: new Date().getTime()
        }).key;
        alert("등록되었습니다.");
    }
});


/** 제목 클릭저장**/
$("#top_save").click(function () {
    ref = db.ref("root/home/title");
    var toptitle = $("#top_title").val();
    if (toptitle == "") {
        alert("내용을 입력하세요");
        return false;
    } else {
        ref.update({
            toptitle: toptitle
        }).key;
        alert("등록되었습니다.");
    }
});


$("#bot_save").click(function () {
    ref = db.ref("root/home2/title");
    var bottitle = $("#bot_title").val();
    if (bottitle == "") {
        alert("내용을 입력하세요");
        return false;
    } else {
        ref.update({
            bottitle: bottitle
        }).key;
        alert("등록되었습니다.");
    }
});


/*삭제*/
function homeRev(data) {
    $("#" + data.key).remove();
}

function homeRev2(data) {
    $("#" + data.key).remove();
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
function hometopDel(obj) {
    if (confirm("정말로 삭제하시겠습니까")) {
        var id = $(obj).parent().parent().attr("id");
        console.log(id);
        if (id != "") {
            db.ref("root/home/" + id).remove();
        }
    }
};

function homebotDel(obj) {
    if (confirm("정말로 삭제하시겠습니까")) {
        var id = $(obj).parent().parent().attr("id");
        if (id != "") {
            db.ref("root/home2/" + id).remove();
        }
    }
};


/*홈1수정 */
function homeChg(data) {
    var id = data.key;
    var html = '';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html += '<input type="text"  class="case_input case_in_link" placeholder="링크" value="' + data.val().link + '">';
    html += '</li>';
    html += '<li class="case_time">' + data.val().wdate + '</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt home_del" onclick="homeDel(this);">삭제</button>';
    html += '<button class="case_bt home_re"  onclick="homeUp(this);">수정</button>';
    html += '</li>'
    $("#" + id).html(html);
    alert("수정되었습니다.");
};

function homeUp(obj) {
    var ul = $(obj).parent().parent();
    var id = ul.attr("id");
    var title = ul.find(".case_title").val();
    var link = ul.find(".case_in_link").val();
    console.log(id, title, link);
    if (title == '' || link == '') {
        alert("내용을 적어주세요.");
    } else {
        ref = db.ref("root/home/list/" + id);
        ref.update({
            title: title,
            link: link,
            wdate: new Date().getTime()
        });
    }
}

/*홈2수정*/
function homeChg2(data) {
    var id = data.key;
    var html = '';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html += '<input type="text"  class="case_input case_in_link" placeholder="링크" value="' + data.val().link + '">';
    html += '</li>';
    html += '<li class="case_time">' + data.val().wdate + '</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt home_del" onclick="homeDel2(this);">삭제</button>';
    html += '<button class="case_bt home_re"  onclick="homeUp2(this);">수정</button>';
    html += '</li>'
    $("#" + id).html(html);
    alert("수정되었습니다.");
}


function homeUp2(obj) {
    var ul = $(obj).parent().parent();
    var id = ul.attr("id");
    var title = ul.find(".case_title").val();
    var link = ul.find(".case_in_link").val();
    console.log(id, title, link);
    if (title == '' || link == '') {
        alert("내용을 적어주세요.");
    } else {
        ref = db.ref("root/home2/list/" + id);
        ref.update({
            title: title,
            link: link,
            wdate: new Date().getTime()
        });
    }
}

/**제목수정 */
function hometopUp(obj) {
    var ul = $(obj).parent().parent();
    var id = ul.attr("id");
    var toptitle = ul.find(".hometop").val();
    // console.log(id, title, link);
    if (toptitle == '') {
        alert("내용을 적어주세요.");
    } else {
        ref = db.ref("root/home/title" + id);
        ref.update({
            toptitle: toptitle
        });
    }
};

function homebotUp(obj) {
    var ul = $(obj).parent().parent();
    var id = ul.attr("id");
    var bottitle = ul.find(".hometop").val();
    // console.log(id, title, link);
    if (bottitle == '') {
        alert("내용을 적어주세요.");
    } else {
        ref = db.ref("root/home2/title" + id);
        ref.update({
            bottitle: bottitle
        });
    }
};

/***************************************************************************/
/**패션 및 외출 */

/**fashion top 제목 */
function initFashion_toptitle() {
    var ref = db.ref("root/fashion/top/title");
    ref.on("child_added", fashionTopAdd);
    ref.on("child_changed", fashionTopAdd);
}
initFashion_toptitle()

function fashionTopAdd(data) {
    $("#f_top_title").val(data.val());
    $("#fashion_top_title").html(data.val());
}

/**fashion top 리스트 */
function initFashion_toplist() {
    $("#fashion_index >fashion_ul>li").remove();
    var ref = db.ref("root/fashion/top/list");
    ref.on("child_added", fashionToplistAdd);
    ref.on("child_removed", fashionlistRev);
    ref.on("child_changed", fashionChg);
}
initFashion_toplist()

/**fashion bottom제목 */
function initFashion_bottitle() {

    var ref = db.ref("root/fashion/bottom/title");
    ref.on("child_added", fashionBotAdd);
    ref.on("child_changed", fashionBotAdd);
}
initFashion_bottitle()

function fashionBotAdd(data) {
    $("#f_bot_title").val(data.val());
    $("#fashion_bot_title").html(data.val());
}

/**fashion bottom  리스트 */
function initFashion_botlist() {
    $("#fashion_bot_index >fashion_ul>li").remove();
    var ref = db.ref("root/fashion/bottom/list");
    ref.on("child_added", fashionBotlistAdd);
    ref.on("child_removed", fashionlistRev);
    ref.on("child_changed", fashionChg2);
}
initFashion_botlist()


/*fashion top 리스트 생성*/
function fashionMake(data) {

    var id = data.key;
    var html = '';
    html += '<ul class="case_ul clear fashion_ul" id="' + id + '">';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html += '<input type="text"  class="case_input case_in_link" placeholder="링크" value="' + data.val().link + '">';
    html += '</li>';
    html += '<li class="case_time">' + data.val().wdate + '</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt fashion_del" onclick="fashionDel(this);">삭제</button>';
    html += '<button class="case_bt fashion_re"  onclick="fashionUp(this);">수정</button>';
    html += '</li>'
    html += '</ul>';
    $("#fashion_index").append(html);
};

/*fashion bottom 리스트 생성*/
function fashionbotMake(data) {
    var id = data.key;
    var html = '';
    html += '<ul class="case_ul clear fashion_ul" id="' + id + '">';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html += '<input type="text"  class="case_input case_in_link" placeholder="링크" value="' + data.val().link + '">';
    html += '</li>';
    html += '<li class="case_time">' + data.val().wdate + '</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt fashion_del" onclick="fashionDel2(this);">삭제</button>';
    html += '<button class="case_bt fashion_re"  onclick="fashionUp2(this);">수정</button>';
    html += '</li>'
    html += '</ul>';
    $("#fashion_bot_index").append(html);
};

function fashionToplistAdd(data) {
    fashionMake(data);

}

function fashionBotlistAdd(data) {
    // console.log(data);
    fashionbotMake(data);
}



/*저장 입력*/
/**fashioni top 리스트 저장 콜백  */
$("#fashion_save").click(function () {
    ref = db.ref("root/fashion/top/list");
    var title = $("#f_title").val();
    var link = $("#f_link").val();
    console.log(title.link);
    if (title == "" | link == "") {
        alert("내용을 입력하세요");
        return false;
    } else {
        ref.push({
            title: title,
            link: link,
            wdate: new Date().getTime()
        }).key;

        alert("등록되었습니다.");
    }
});

/**fashioni bottom 리스트 저장 콜백  */
$("#fashion_bot_save").click(function () {
    ref = db.ref("root/fashion/bottom/list");
    var title = $("#f_b_list_title").val();
    var link = $("#f_b_list_link").val();
    if (title == "" | link == "") {
        alert("내용을 입력하세요");
        return false;
    } else {
        ref.push({
            title: title,
            link: link,
            wdate: new Date().getTime()
        }).key;
        // console.log(title.link);
        alert("등록되었습니다.");
    }
});

/**제목 클릭저장 */
$("#f_top_save").click(function () {
    ref = db.ref("root/fashion/top/title");
    var toptitle = $("#f_top_title").val();
    if (toptitle == "") {
        alert("내용을 입력하세요");
        return false;
    } else {
        ref.update({
            toptitle: toptitle
        });
        alert("등록되었습니다.");
    }
});

$("#f_bot_save").click(function () {
    ref = db.ref("root/fashion/bottom/title");
    var toptitle = $("#f_bot_title").val();
    if (toptitle == "") {
        alert("내용을 입력하세요");
        return false;
    } else {
        ref.update({
            toptitle: toptitle
        });
        alert("등록되었습니다.");
    }
});


/*삭제*/
function fashionlistRev(data) {
    $("#" + data.key).remove();
}

/**fashion top 리스트 삭제 */
function fashionDel(obj) {
    if (confirm("정말로 삭제하시겠습니까?")) {
        //var id = obj.parentNode.parentNode.parentNode.id;
        var id = $(obj).parent().parent().attr("id");
        console.log(id);
        if (id != "") {
            db.ref("root/fashion/top/list/" + id).remove();
        }
    }
}

function fashionDel2(obj) {
    if (confirm("정말로 삭제하시겠습니까?")) {
        //var id = obj.parentNode.parentNode.parentNode.id;
        var id = $(obj).parent().parent().attr("id");
        console.log(id);
        if (id != "") {
            db.ref("root/fashion/bottom/list/" + id).remove();
        }
    }
}

/**fashion top list 수정 */
function fashionUp(obj) {
    var ul = $(obj).parent().parent();
    var id = ul.attr("id");
    var title = ul.find(".case_title").val();
    var link = ul.find(".case_in_link").val();
    console.log(id, title, link);
    if (title == '' || link == '') {
        alert("내용을 적어주세요.");
    } else {
        ref = db.ref("root/fashion/top/list/" + id);
        ref.update({
            title: title,
            link: link,
            wdate: new Date().getTime()
        });
    }
}


function fashionChg(data) {
    var id = data.key;
    var html = '';

    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html += '<input type="text"  class="case_input case_in_link" placeholder="링크" value="' + data.val().link + '">';
    html += '</li>';
    html += '<li class="case_time">' + data.val().wdate + '</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt fashion_del" onclick="fashionDel(this);">삭제</button>';
    html += '<button class="case_bt fashion_re"  onclick="fashionUp(this);">수정</button>';
    html += '</li>'
    $("#" + id).html(html);
    alert("수정되었습니다.");
}

/**fashion top list 수정 */
function fashionUp2(obj) {
    var ul = $(obj).parent().parent();
    var id = ul.attr("id");
    var title = ul.find(".case_title").val();
    var link = ul.find(".case_in_link").val();
    console.log(id, title, link);
    if (title == '' || link == '') {
        alert("내용을 적어주세요.");
    } else {
        ref = db.ref("root/fashion/bottom/list/" + id);
        ref.update({
            title: title,
            link: link,
            wdate: new Date().getTime()
        });
    }
}


function fashionChg2(data) {
    var id = data.key;
    var html = '';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html += '<input type="text"  class="case_input case_in_link" placeholder="링크" value="' + data.val().link + '">';
    html += '</li>';
    html += '<li class="case_time">' + data.val().wdate + '</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt fashion_del" onclick="fashionDel2(this);">삭제</button>';
    html += '<button class="case_bt fashion_re"  onclick="fashionUp2(this);">수정</button>';
    html += '</li>'
    $("#" + id).html(html);
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
function toyMake(data) {
    var id = data.key;
    var html = '';
    html += '<ul class="case_ul clear toy_ul" id="' + id + '">';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html += '<input type="text"  class="case_input case_in_link" placeholder="링크" value="' + data.val().link + '">';
    html += '</li>';
    html += '<li class="case_time">' + data.val().wdate + '</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt toy_del" onclick="toyDel(this);">삭제</button>';
    html += '<button class="case_bt toy_re"  onclick="toyUp(this);">수정</button>';
    html += '</li>'
    html += '</ul>';
    $("#toy_index").append(html);
}


function toyAdd(data) {
    var id = data.key;
    toyMake(data);
}

$("#toy_save").click(function () {
    ref = db.ref("root/toy/");
    var title = $("#to_title").val();
    var link = $("#to_link").val();
    if (title == "" | link == "") {
        alert("내용을 입력하세요");
        return false;
    } else {
        ref.push({
            title: title,
            link: link,
            wdate: new Date().getTime()
        }).key;
        alert("등록되었습니다.");

    }
});

/*삭제*/
function toyRev(data) {
    $("#" + data.key).remove();
}


function toyDel(obj) {
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
function toyUp(obj) {
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

function toyChg(data) {
    var id = data.key;
    var html = '';
    html += '<li class="case_ti"><input type="text" class="case_input case_title"   placeholder="타이틀" value="' + data.val().title + '"></li>';
    html += '<li class="case_li">';
    html += '<input type="text"  class="case_input case_in_link" placeholder="링크" value="' + data.val().link + '">';
    html += '</li>';
    html += '<li class="case_time">' + data.val().wdate + '</li>';
    html += '<li class="case_bt_li">';
    html += '<button class="case_bt toy_del" onclick="toyDel(this);">삭제</button>';
    html += '<button class="case_bt toy_re"  onclick="toyUp(this);">수정</button>';
    html += '</li>'
    $("#" + id).html(html);
    alert("수정되었습니다.");
}

/********************/
/* best상품 */
/********************/
function initBest() {
    $(".best_index").remove();
    ref = db.ref("root/best/");
    ref.on("child_added", bestMake);
    ref.on("child_removed", bestRev);
    ref.on("child_changed", bestChg);
    
}
initBest();


/**생성 */
var bestLen = 5;
function bestMake(data) {
    if(bestLen > 0) {
        var id = data.key;
        var title = data.val().title;
        var titlespan =data.val().titlespan;
        var link = data.val().link;
        var ori_img = data.val().ori_img;
        var ho_img = data.val().ho_img;
        var ori_price = data.val().ori_price;
        var dis_price = data.val().dis_price;
        var src1 = '../images/best/' + data.val().ori_img;
        var src2 = '../images/best/' + data.val().ho_img;
        var html = '';
        html += '<ul class="best_index" id="' + id + '">'
        html += '<li>'
        html += '<input type="text" id="index_title" class="ind_title" value="' + title + '" >'
/* 
        if (titlespan != "") {
            html += '<input type="text" id="index_title_span" class="ind_titlespan" value="' + titlespan + '" >'
        } */
        html += '<input type="text" id="index_title_span" class="ind_titlespan" value="' + titlespan + '">';
        html += '</li>'
        html += '<li>';
        html += '<input type="text" id="index_link" class="ind_link" value="' + link+ '" >'
        html += '</li>';
        html += '<li class="clear index_imgli">'
        html += '<div class="index_imgbox"><img src="' + src1 + '" class="img best_img1"></div>'
        html += '<input type="text" id="index_or_img" class="ind_orimg_input" value="' + ori_img+ '" placeholder="원래이미지"></li>'
        html += '<li class="clear index_imgli">'
        html += '<div class="index_imgbox">'
        html += '<img src="' + src2 + '"class="img best_img2">'
        html += '</div>'
        html += '<input type="text" id="index_or_img" class="ind_hoimg_input" value="' + ho_img + '" placeholder="호버 이미지">'
        html += '</li>'
        html += '<li class="index_prili">원래가격<input type="text" id="index_or_price" class="index_orprice" value="' + ori_price + '" placeholder="Original price"></li>'
        html += '<li class="index_prili">할인가격<input type="text" id="index_or_price" class="index_hoprice" value="' + dis_price + '" placeholder="Discount price"></li>'
        html += '<li class="index_bt">'
        html += '<button class="index_del" onclick="bestDel(this);">삭제</button>'
        html += '<button class="index_re" onclick="bestUp(this);">수정</button>'
        html += '</li>'
        html += '</ul>'
        $(".best_init").append(html);
        bestLen--;
    }
}


$("#best_save").click(function () {
    ref = db.ref("root/best/");
    var title = $("#best_title").val();
    var titlespan = $("#best_titlespan").val();
    if(titlespan == "" || titlespan==null || titlespan==undefined) titlespan = '';
    var link = $("#best_link").val();
    var ori_img = $("#best_photo1").val();
    var ho_img = $("#best_photo2").val();
    var ori_price = $("#best_ori_price").val();
    var dis_price = $("#best_dis_price").val();
    if (title == "" || link == "" || ori_img == "" || ho_img == "" || ori_price == "" || dis_price == "") {
        alert("내용을 입력하세요");
        return false;
    } else {
        ref.push({
            title: title,
            titlespan : titlespan,
            link: link,
            ori_img: ori_img,
            ho_img: ho_img,
            ori_price: ori_price,
            dis_price: dis_price
        }).key;
        alert("등록되었습니다.");
    }
});

/**삭제**/

function bestRev(data) {
    var id = data.key;
	$("#" + id).remove();
}


function bestDel(obj) {
    if (confirm("정말로 삭제하시겠습니까?")) {
        //var id = obj.parentNode.parentNode.parentNode.id;
        var id = $(obj).parent().parent().attr("id");
        if (id != "") {
            db.ref("root/best/" + id).remove();
        }
    }
}

/**수정**/

function bestChg(data) {
    // var id = data.key;
    // var title = data.val().title;
    // var link = data.val().link;
    // var ori_img = data.val().ori_img;
    // var ho_img = data.val().ho_img;
    // var ori_price = data.val().ori_price;
    // var dis_price = data.val().dis_price;
    // var src1 = '../images/best/' + data.val().ori_img;
    // var src2 = '../images/best/' + data.val().ho_img;
    // var html='';
    // html += '<ul class="best_index" id="' + id + '">'
    // html += '<li>'
    // html += '<input type="text" id="index_title" class="ind_title" value="' + title + '" >'
    // html += '<input type="text" id="index_link" class="ind_link" value="' + link+ '" >'
    // html += '</li>'
    // html += '<li class="clear index_imgli">'
    // html += '<div class="index_imgbox"><img src="' + src1 + '" class="img"></div>'
    // html += '<input type="text" id="index_or_img" class="ind_orimg_input" value="' + ori_img+ '" placeholder="원래이미지"></li>'
    // html += '<li class="clear index_imgli">'
    // html += '<div class="index_imgbox">'
    // html += '<img src="' + src2 + '"class="img">'
    // html += '</div>'
    // html += '<input type="text" id="index_or_img" class="ind_hoimg_input" value="' + ho_img + '" placeholder="호버 이미지">'
    // html += '</li>'
    // html += '<li class="index_prili">원래가격<input type="text" id="index_or_price" class="index_orprice" value="' + ori_price + '" placeholder="Original price"></li>'
    // html += '<li class="index_prili">할인가격<input type="text" id="index_or_price" class="index_hoprice" value="' + dis_price+ '" placeholder="Discount price"></li>'
    // html += '<li class="index_bt">'
    // html += '<button class="index_del" onclick="bestDel(this);">삭제</button>'
    // html += '<button class="index_re" onclick="bestUp(this);">수정</button>'
    // html += '</li>'
    // html += '</ul>'
    // $("#" + id).html(html);
    // alert("수정되었습니다.");

    var id = data.key;
    var ul = $("#" + id);
    var ori_img = data.val().ori_img;
    var ho_img = data.val().ho_img;
    var ori_price = data.val().ori_price;
    var dis_price = data.val().dis_price;
	$(".best_img1", ul).attr("src", "../images/best/" + ori_img);
    $(".best_img2", ul).attr("src", "../images/best/" + ho_img);
    $(".ind_orimg_input", ul).val(ori_img);
    $(".ind_hoimg_input", ul).val(ho_img);
    $().val()
    $(".index_orprice",ul).val(ori_price);
    $(".index_hoprice",ul).val(dis_price);

	alert("수정되었습니다.");
}

function bestUp(obj) {
    var ul = $(obj).parent().parent();
    var id = ul.attr("id");
    var title = $(".ind_title",ul).val();
    if($(".ind_titlespan",ul).val() == undefined) var titlespan = '';
    else var titlespan = $(".ind_titlespan",ul).val();
    var link = $(".ind_link",ul).val();
    var ori_img = $(".ind_orimg_input",ul).val();
    var ho_img = $(".ind_hoimg_input",ul).val();
    var ori_price = $(".index_orprice",ul).val();
    var dis_price = $(".index_hoprice",ul).val();

    // console.log(id, title, link);
    if (title == "" | link == "" | ori_img == "" | ho_img == "" | ori_price == "" |
        dis_price == "") {
        alert("내용을 적어주세요.");
    } else {
        ref = db.ref("root/best/" + id);
        ref.update({
            title: title,
            titlespan : titlespan,
            link: link,
            ori_img: ori_img,
            ho_img: ho_img,
            ori_price: ori_price,
            dis_price: dis_price
        });
    }
}




/********************/
/* MD추천 */
/********************/
function initReco() {
    $(".rec_index").remove();
    ref = db.ref("root/reco");
    ref.on("child_added", recoAdd);
    ref.on("child_removed", recoRev);
    ref.on("child_changed", recoChg);
}
initReco();


/**생성 **/
function recoAdd(data) {
    var id = data.key;
    var title = data.val().title;
    var link = data.val().link;
    var img = data.val().img;
    var src = '../images/rec/' + img;
    var html = '';
    html += '<ul class="rec_index" id="'+id+'">';
    html += '<li><input type="text" class="rec_ind_title" placeholder="상품명" value="' + title + '"></li>'
    html += '<li><input type="text" class="rec_ind_link" placeholder="링크" value="' + link + '"></li>'
    html += '<li><input type="text" class="rec_ind_img" placeholder="이미지" value="' + img + '"></li>'
    html += '<li><img src="' + src + '"></li>'
    html += '<li><button class="rec_del" onclick="recoDel(this);">삭제</button>'
    html += '<button class="rec_re" onclick="recoUp(this);">수정</button></li>'
    html += '</ul>'
    $(".rec_init").append(html);
}



$("#rec_save").on('click', function () {

    var title = $(".rec_title").val();
    var link = $(".rec_link").val();
    var img = $(".rec_img").val();

    if (title == '' || link == '' || img == '') {
        alert("내용을 적어주세요.");
    } else {
        ref = db.ref("root/reco");
        ref.push({
            title: title,
            link: link,
            img: img
        }).key;
        alert("등록되었습니다.");
    }
});

/**삭제 **/
function recoDel(obj) {
	if (confirm("정말로 삭제하시겠습니까?")) {
		//var id = obj.parentNode.parentNode.parentNode.id;
		var id = $(obj).parent().parent().attr("id");
		if (id != "") {
			db.ref("root/reco/" + id).remove();
		}
	}
}

function recoRev(data) {
	var id = data.key;
	$("#" + id).remove();
}

/**수정 **/
function recoUp(obj) {
	var ul = $(obj).parent().parent();
    var id = ul.attr("id");
    var title = $(".rec_ind_title", ul).val();
	var link = $(".rec_ind_link", ul).val();
	var img = $(".rec_ind_img", ul).val();
	if (title == '' || link == '' || img == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/reco/" + id);
		ref.update({
			img: img,
			title: title,
			link: link
		});
	}
}

function recoChg(data) {
	var id = data.key;
	var ul = $("#" + id);
	$("img", ul).attr("src", "../images/rec/" + data.val().img);
	alert("수정되었습니다.");
}
