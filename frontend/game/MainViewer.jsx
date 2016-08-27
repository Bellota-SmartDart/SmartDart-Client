import React from "react";
import $ from 'jquery';
import cookie from 'react-cookie';

class MainViewr extends React.Component {
    componentDidMount() {
        this.props.BallotarController.get_loop_status();
        var controller = this.props.BallotarController;

        // setTimeout(() => {
        //     console.log('stop_get_status');
        //     controller.stop_get_status();
        // }, 5000);
        controller.changedEventHandler = (ctr, data, view) => {
            //console.log(ctr);
            $('#testId').text(ctr);
            console.log('Event : ' + ctr);
            if (data != null)
                console.log(data.current);
            console.log(view);
            $('#player1total').text(view.p1total);
            $('#player2total').text(view.p2total);
            $('#player').text('player' + view.player);
            $('#round').text('round' + view.round);
            $('#set').text('set' + view.set);

            var set_msg = (msg) => {
                $('#msg').text('msg : ' + msg);
            };

            if (ctr == 'start') {
                set_msg('게임을 시작합니다.');
            } else if (ctr == 'skip') {
                //set_msg
            } else if (ctr == 'changePlayer') {
                set_msg('플레이어를 변경 중');
                setTimeout(() => {
                    set_msg('플레이어를 변경 완료');
                }, 3000);
            } else if (ctr == 'changeRound') {
                set_msg('라운드를 변경 중');
                setTimeout(() => {
                    set_msg('라운드를 변경 완료');
                }, 3000);
            } else if (ctr == 'changeSet') {
                set_msg('세트를 변경 중');
                setTimeout(() => {
                    set_msg('세트를 변경 완료');
                }, 3000);
            } else if (ctr == 'gameOver') {
                set_msg('게임 종료');
            }

        };
        controller.get_start();
    }

    render() {
        console.log('MainViewr render');
        //document.getElementById("testId").innerHTML = "whatever";
        return (
            <div className="mainViewer">
                Test UI
                <div id="testId"></div>
                <div id="player"></div>
                <div id="round"></div>
                <div id="set"></div>
                <div id="player1total"></div>
                <div id="player2total"></div>
                <div id="msg"></div>
            </div>
        );
    }
}

export default MainViewr;