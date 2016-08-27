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
        var controller = this;
        $.getJSON("./static/all.json", (data) => {
            console.log('ballotar_start get');
            controller.dartDart = data;
            console.log(controller);
        });
    }

    // all
    get_loop_status() {
        var controller = this;
        this.interval = setInterval(() => {
            console.log('timer_test');
            $.getJSON("./static/all.json", (data) => {
                console.log('ballotar_start get');
                // controller.dartDart = data;
                // console.log(data);
                controller.is_changed_status(controller, data);
            });
        }, 1000);
    }

    is_changed_status(controller, data) {
        if (controller.changedEventHandler != null) {
            var oldData = null;
            if (controller.dartData == null) {
                oldData = data;
            }
            
            if (oldData.current.player != data.current.player) {
                controller.changedEventHandler('player',data);
            } else if (oldData.current.round != data.current.round) {
                controller.changedEventHandler('round',data);
            } else if (oldData.current.set != data.current.set) {
                controller.changedEventHandler('set',data);
            } else {
                controller.changedEventHandler('continue',data);
            }
        }
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