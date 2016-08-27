// import React from "react";
// import ReactDOM from 'react-dom';
import $ from 'jquery';
import cookie from 'react-cookie';

class BallotarController {
    constructor(props) {

    }

    // start
    ballotar_start() {
        console.log('ballotar_start');
        $.getJSON("./static/all.json", function (data) {
            console.log('ballotar_start get');
            console.log(data);
        });
    }

    // all
    ballotar_all() {

    }

    // skip
    ballotar_skip() {
        alert('test');
    }
}

export default BallotarController;