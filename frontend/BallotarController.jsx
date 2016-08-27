// import React from "react";
// import ReactDOM from 'react-dom';
import $ from 'jquery';
import cookie from 'react-cookie';

class BallotarController {
    constructor(props) {

    }

    // start
    get_start() {
        console.log('ballotar_start');
    }

    timer_test() {        
        console.log('timer_test');        
        $.getJSON("./static/all.json", function (data) {
            console.log('ballotar_start get');            
            window.dartDart = data;
            console.log(window);
        });
    }

    // all
    get_loop_status() {
        this.interval = setInterval(this.timer_test, 1000);
    }

    stop_get_status() {
        clearInterval(this.interval)
    }

    // skip
    get_skip() {
        alert('test');
    }
}

export default BallotarController;