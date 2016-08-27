var $ = require("jquery");

// 현재 전체 값
// start
function ballotar_start() {
    console.log('ballotar_start');
    $.getJSON("./static/all.json", function (data) {
        console.log('ballotar_start get');
        console.log(data);
    });
}

// all
function ballotar_all() {

}

// skip
function ballotar_skip() {
    alert('test');
}

ballotar_start();