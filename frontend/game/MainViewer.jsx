import React from "react";
import $ from 'jquery';
import cookie from 'react-cookie';

class MainViewr extends React.Component {
    componentDidMount() {
        var audio = new Audio('./sound/GameStart_Launching.mp3');
        // audio.addEventListener('ended', () => {
        //     this.currentTime = 0;
        //     this.play();
        // }, false);
        audio.loop = true;
        audio.play();
        
        this.props.BallotarController.get_loop_status();
        var controller = this.props.BallotarController;

        $('#input_start').click(() => {
            this.on_layout_viwer(2);
            controller.get_start();
            setTimeout(() => {
                this.on_layout_viwer(4);
                //$('layer_fixed4_svg1').children().css('fill', 'red');
            }, 2000);
        });
        $('#input_restart').click(() => {
            window.location.reload();
        });


        controller.changedEventHandler = (ctr, data, view) => {
            //console.log(ctr);
            $('#testId').text(ctr);
            // console.log('Event : ' + ctr);
            // if (data != null)
            //     console.log(data.current);
            // console.log(view);
            $('#player1total').text(view.p1total);
            $('#player2total').text(view.p2total);
            $('#layer_fixed4_player').text('player' + view.player);
            $('#round').text('round' + view.round);
            $('#set').text('set' + view.set);

            var set_msg = (msg) => {
                $('#msg').text('msg : ' + msg);
            };
            var sum = (array) => {
                var result = 0.0;
                for (var i = 0; i < array.length; i++)
                    result += array[i];
                return result;
            }

            this.on_layout2(view.round, 3);
            $('#layer_fixed3_p1total').text(view.p1total);
            $('#layer_fixed3_p2total').text(view.p2total);
            $('#Player1_ScoreSum').text(view.p1total);
            $('#Player2_ScoreSum').text(view.p2total);

            $('#layer_fixed4_point').text(view.point);

            if (ctr == 'start') {
                this.on_layout4_progress(0);
                set_msg('게임을 시작합니다.');
            } else if (ctr == 'skip') {
                //set_msg
            } else if (ctr == 'changePlayer') {
                // 
                //clap.play();
                set_msg('플레이어를 변경 중');
                this.on_layout3('플레이어를 변경합니다.');
                this.on_layout_viwer(4);
                this.on_layout4_progress(3);
                setTimeout(() => {
                    this.play_clap();
                    $('#layer_fixed4_point').text('0');
                    $('#layer_fixed4_player').text('player1');
                    this.on_layout_viwer(3);
                    this.on_layout4_progress(0);
                    setTimeout(() => {
                        set_msg('플레이어를 변경 완료');
                        this.on_layout_viwer(4);
                    }, 1500);
                }, 1000);
            } else if (ctr == 'changeRound') {
                //clap.play();
                set_msg('라운드를 변경 중');
                this.on_layout_viwer(4);
                this.on_layout4_progress(3);
                setTimeout(() => {
                    this.play_clap();
                    $('#layer_fixed4_point').text('0');
                    $('#layer_fixed4_player').text('player2');
                    this.on_layout_viwer(2);
                    this.on_layout3('라운드를 변경합니다.');
                    this.on_layout4_progress(0);
                    setTimeout(() => {
                        set_msg('라운드를 변경 완료');
                        this.on_layout_viwer(4);
                    }, 1500);
                }, 1000);
            } else if (ctr == 'changeSet') {
                set_msg('세트를 변경 중');
                this.on_layout_viwer(4);
                this.on_layout4_progress(view.set - 1);
                setTimeout(() => {
                    //this.on_layout4_progress(0);
                    set_msg('세트를 변경 완료');
                }, 500);
            } else if (ctr == 'gameOver') {
                this.on_layout_viwer(4);
                setTimeout(() => {
                    this.on_layout4_progress(0);
                    this.on_layout_viwer(5);
                    var p1r1 = sum(data.player1.round1);
                    var p1r2 = sum(data.player1.round2);
                    var p1r3 = sum(data.player1.round3);
                    var p2r1 = sum(data.player2.round1);
                    var p2r2 = sum(data.player2.round2);
                    var p2r3 = sum(data.player2.round3);
                    $('#Player1_ScoreRound1Sum').text(p1r1);
                    $('#Player1_ScoreRound2Sum').text(p1r2);
                    $('#Player1_ScoreRound3Sum').text(p1r3);
                    $('#Player1_ScoreSum').text((p1r1 + p1r2 + p1r3));
                    $('#Player1_ScoreSum2').text((p1r1 + p1r2 + p1r3));
                    $('#Player2_ScoreRound1Sum').text(p2r1);
                    $('#Player2_ScoreRound2Sum').text(p2r2);
                    $('#Player2_ScoreRound3Sum').text(p2r3);
                    $('#Player2_ScoreSum').text((p2r1 + p2r2 + p2r3));
                    $('#Player2_ScoreSum2').text((p2r1 + p2r2 + p2r3));
                    set_msg('게임 종료');
                }, 1000);
            }
        };
    }

    play_jeer() {
        var jeer = new Audio('./sound/btn_110x114_jeer.wav');
        jeer.play();
        setTimeout(() => {
            jeer.pause();
        }, 2000);
    }

    play_clap() {
        var clap = new Audio('./sound/btn_110x114_clap.wav');
        clap.play();
        setTimeout(() => {
            clap.pause();
        }, 2000);
    }

    on_layout4_progress(progress) {
        if (progress <= 0) {
            $('#layer_fixed4_img1').attr('src', './img/btn_115x109_star1_B.svg');
            $('#layer_fixed4_img2').attr('src', './img/btn_115x109_star2_B.svg');
            $('#layer_fixed4_img3').attr('src', './img/btn_115x109_star3_B.svg');
        } else if (progress == 1) {
            $('#layer_fixed4_img1').attr('src', './img/btn_115x109_star1_W.svg');
            $('#layer_fixed4_img2').attr('src', './img/btn_115x109_star2_B.svg');
            $('#layer_fixed4_img3').attr('src', './img/btn_115x109_star3_B.svg');
        } else if (progress == 2) {
            $('#layer_fixed4_img1').attr('src', './img/btn_115x109_star1_W.svg');
            $('#layer_fixed4_img2').attr('src', './img/btn_115x109_star2_W.svg');
            $('#layer_fixed4_img3').attr('src', './img/btn_115x109_star3_B.svg');
        } else if (progress >= 3) {
            $('#layer_fixed4_img1').attr('src', './img/btn_115x109_star1_W.svg');
            $('#layer_fixed4_img2').attr('src', './img/btn_115x109_star2_W.svg');
            $('#layer_fixed4_img3').attr('src', './img/btn_115x109_star3_W.svg');
        }
    }

    on_layout2(cntRound, totalRound) {
        $('#layer_fixed2_header').text('ROUND ' + cntRound + '/' + totalRound);
        $('#layer_fixed3_header').text('ROUND ' + cntRound + '/' + totalRound);
        $('#layer_fixed4_RoundCount').text('ROUND ' + cntRound + '/' + totalRound);
        $('#layer_fixed2_content').text('ROUND ' + cntRound);
    }

    on_layout3(msg) {
        $('#layer_fixed3_point').text(msg);
    }

    on_layout_viwer(select) {
        if (select == 1) {
            $('#layer_fixed1').css('visibility', 'visible');
            $('#layer_fixed2').css('visibility', 'collapse');
            $('#layer_fixed3').css('visibility', 'collapse');
            $('#layer_fixed4').css('visibility', 'collapse');
            $('#layer_fixed5').css('visibility', 'collapse');
        } else if (select == 2) {
            $('#layer_fixed1').css('visibility', 'collapse');
            $('#layer_fixed2').css('visibility', 'visible');
            $('#layer_fixed3').css('visibility', 'collapse');
            $('#layer_fixed4').css('visibility', 'collapse');
            $('#layer_fixed5').css('visibility', 'collapse');
        } else if (select == 3) {
            $('#layer_fixed1').css('visibility', 'collapse');
            $('#layer_fixed2').css('visibility', 'collapse');
            $('#layer_fixed3').css('visibility', 'visible');
            $('#layer_fixed4').css('visibility', 'collapse');
            $('#layer_fixed5').css('visibility', 'collapse');
        } else if (select == 4) {
            $('#layer_fixed1').css('visibility', 'collapse');
            $('#layer_fixed2').css('visibility', 'collapse');
            $('#layer_fixed3').css('visibility', 'collapse');
            $('#layer_fixed4').css('visibility', 'visible');
            $('#layer_fixed5').css('visibility', 'collapse');
        } else if (select == 5) {
            $('#layer_fixed1').css('visibility', 'collapse');
            $('#layer_fixed2').css('visibility', 'collapse');
            $('#layer_fixed3').css('visibility', 'collapse');
            $('#layer_fixed4').css('visibility', 'collapse');
            $('#layer_fixed5').css('visibility', 'visible');
        }
    }

    render() {
        //console.log('MainViewr render');
        // test 값을 알아보기 위함
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