import $ from 'jquery';

class BallotarController {
    constructor(props) {
        $.getJSON("./static/config.json", (data) => {
            this.address = data.address;
        });
    }

    build_viewData(point, player, round, set, p1total, p2total) {
        return {
            'point': point,
            'player': player,
            'round': round,
            'set': set,
            'p1total': p1total,
            'p2total': p2total
        };
    }

    // start
    get_start() {
        //console.log('ballotar_start');
        $.getJSON(this.address + "/start", (data) => {
                
            });
        if (this.changedEventHandler != null)
            this.changedEventHandler('start', null, this.build_viewData(0, 1, 1, 1, 0, 0));
    }

    // all
    get_loop_status() {
        this.interval = setInterval(() => {
            //./static/all.json
            $.getJSON(this.address + "/all", (data) => {
                this.is_changed_status(this, data);
            });
        }, 1000);
    }

    is_changed_status(controller, data) {
        var equal_cnt = (cnt, next) => {
            if (cnt.current.player == next.current.player &&
                cnt.current.round == next.current.round &&
                cnt.current.set == next.current.set &&
                cnt.current.gameStatus == next.current.gameStatus ) {
                return true;
            } else {
                return false;
            }
        };
        var sum = (array) => {
            var result = 0.0;
            for (var i = 0; i < array.length; i++)
                result += array[i];
            return result;
        }
        var get_p1total = (data) => {
            var sum1 = sum(data.player1.round1);
            var sum2 = sum(data.player1.round2);
            var sum3 = sum(data.player1.round3);
            return sum1 + sum2 + sum3;
        };
        var get_p2total = (data) => {
            var sum1 = sum(data.player2.round1);
            var sum2 = sum(data.player2.round2);
            var sum3 = sum(data.player2.round3);
            return sum1 + sum2 + sum3;
        };
        var get_cnt_point = (cnt, data) => {
            var player = cnt.current.player;
            var round = cnt.current.round;
            var set = cnt.current.set - 1;
            console.log('set : ', set);
            return data.current.point = data['player' + player]['round' + round][set];
        };

        if (controller.changedEventHandler != null) {
            if (this.cntData == null) {
                this.cntData = data;
            }
            if (this.nextData == null) {
                this.nextData = data;
            }

            if (equal_cnt(this.nextData, this.cntData)) {
                if (!equal_cnt(this.nextData, data)) {
                    // 첫 시작
                    this.nextData = data;
                    controller.changedEventHandler('changeSet', data,
                        this.build_viewData(data.player1.round1[0], 1, 1, 1,
                            data.player1.round1[0], 0));
                }
            } else if (!equal_cnt(this.nextData, data)) {
                // next로 넘어감
                this.cntData = this.nextData;
                this.nextData = data;

                // 종료
                if (data.current.gameStatus == 0) {
                    console.log('data.current.gameStatus == 0');
                    controller.changedEventHandler('gameOver', data,
                        this.build_viewData(0,
                            1,
                            1,
                            1,
                            get_p1total(data),
                            get_p2total(data)));
                    return;
                }

                // skip으로 인해 넘어간 경우

                // round 증가, player2 -> player1 변경
                if (this.cntData.current.player == 2 && this.nextData.current.player == 1) {
                    controller.changedEventHandler('changeRound', data,
                        this.build_viewData(
                            get_cnt_point(this.cntData, this.nextData),
                            1,
                            this.nextData.current.round,
                            1,
                            get_p1total(data),
                            get_p2total(data)));
                    return;
                }

                // change player, player1 -> player2 경우
                if (this.cntData.current.player == 1 && this.nextData.current.player == 2) {
                    controller.changedEventHandler('changePlayer', data,
                        this.build_viewData(
                            get_cnt_point(this.cntData, this.nextData),
                            2,
                            this.nextData.current.round,
                            1,
                            get_p1total(data),
                            get_p2total(data)));
                    return;
                }

                // set이 넘어간 경우
                if (this.cntData.current.set != this.nextData.current.set) {
                    controller.changedEventHandler('changeSet', data,
                        this.build_viewData(
                            get_cnt_point(this.cntData, this.nextData),
                            this.nextData.current.player,
                            this.nextData.current.round,
                            this.nextData.current.set,
                            get_p1total(data),
                            get_p2total(data)));
                    return;
                }
            }
        }
    }

    stop_get_status() {
        clearInterval(this.interval)
        console.log('stop_get_status');
    }

    // skip
    get_skip() {
        alert('test');
    }
}

export default BallotarController;