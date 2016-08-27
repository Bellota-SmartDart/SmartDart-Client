import React from "react";
import $ from 'jquery';
import cookie from 'react-cookie';

class MainViewr extends React.Component {
    render() {
        console.log('MainViewr render');
        this.props.BallotarController.get_loop_status();
        var controller = this.props.BallotarController;
        setTimeout(function () {
            console.log('stop_get_status');
            controller.stop_get_status();
        }, 5000);
        return (
            <div className="mainViewer">
                반가워요~
            </div>
        );
    }
}

export default MainViewr;