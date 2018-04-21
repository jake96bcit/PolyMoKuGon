var stage;
var game_state = new Array();
var turn = 0;
var current_player = 1;
var game_log = [];

$(function(){
    init();
});

function init() {
    stage = new createjs.Stage("gameCanvas");
    draw_game_table(stage); // Draw the table
    init_game_array();
}

function check_game_over() {
    var win = new createjs.Shape();
    win.name = "win";
    win.graphics.setStrokeStyle(3);
    win.graphics.beginStroke('#e74c3c');
    for (var i = 0; i <= 14; i++) {
        for (var j = 0; j <= 18; j++) {
            if ([game_state[i][j - 4], game_state[i][j - 3], game_state[i][j - 2], game_state[i][j - 1], game_state[i][j]].check_same()
                || [game_state[i][j + 1], game_state[i][j + 2], game_state[i][j + 3], game_state[i][j + 4], game_state[i][j]].check_same()
                || [game_state[j][i + 1], game_state[j][i + 2], game_state[j][i - 2], game_state[j][i - 1], game_state[j][i]].check_same()
                || [game_state[j][i + 1], game_state[j][i + 2], game_state[j][i + 3], game_state[j][i - 1], game_state[j][i]].check_same()
                || [game_state[j][i + 1], game_state[j][i + 2], game_state[j][i + 3], game_state[j][i + 4], game_state[j][i]].check_same()) {
                if (j % 2 == 0) {
                    win.graphics.moveTo(40 + 54 * (i - 3) - 30, 35 + (j - 4) / 2 * 96).lineTo(40 + 54 * (i - 3) + 30, 35 + (j - 4) / 2 * 96);
                } else {
                    win.graphics.moveTo(67 + 54 * (i - 3) - 30, 83 + (j - 5) / 2 * 96).lineTo(67 + 54 * (i - 3) + 30, 83 + (j - 5) / 2 * 96);
                }
            }
            var ya = j % 2 == 0 ? [i - 2, i - 2, i - 1, i - 1, i, i + 1, i + 1, i + 2] : [i - 2, i - 1, i - 1, i, i + 1, i + 1, i + 2, i + 2];
            if ([game_state[j - 4][ya[0]], game_state[j - 3][ya[1]], game_state[j - 2][ya[2]], game_state[j - 1][ya[3]], game_state[j][i]].check_same()
                || [game_state[j + 1][ya[4]], game_state[j - 3][ya[1]], game_state[j - 2][ya[2]], game_state[j - 1][ya[3]], game_state[j][i]].check_same()
                || [game_state[j + 1][ya[4]], game_state[j + 2][ya[5]], game_state[j - 2][ya[2]], game_state[j - 1][ya[3]], game_state[j][i]].check_same()
                || [game_state[j + 1][ya[4]], game_state[j + 2][ya[5]], game_state[j + 3][ya[6]], game_state[j - 1][ya[3]], game_state[j][i]].check_same()
                || [game_state[j + 1][ya[4]], game_state[j + 2][ya[5]], game_state[j + 3][ya[6]], game_state[j + 4][ya[7]], game_state[j][i]].check_same()) {
                if (j % 2 == 0) {
                    win.graphics.moveTo(40 + 54 * (i - 3) - 17, 35 + (j - 4) / 2 * 96 - 30).lineTo(40 + 54 * (i - 3) + 17, 35 + (j - 4) / 2 * 96 + 30);
                } else {
                    win.graphics.moveTo(67 + 54 * (i - 3) - 17, 83 + (j - 5) / 2 * 96 - 30).lineTo(67 + 54 * (i - 3) + 17, 83 + (j - 5) / 2 * 96 + 30);
                }
            }
            ya = j % 2 == 0 ? [i + 2, i + 1, i + 1, i, i - 1, i - 1, i - 2, i - 2] : [i + 2, i + 2, i + 1, i + 1, i, i - 1, i - 1, i - 2];
            if ([game_state[j - 4][ya[0]], game_state[j - 3][ya[1]], game_state[j - 2][ya[2]], game_state[j - 1][ya[3]], game_state[j][i]].check_same()
                || [game_state[j + 1][ya[4]], game_state[j - 3][ya[1]], game_state[j - 2][ya[2]], game_state[j - 1][ya[3]], game_state[j][i]].check_same()
                || [game_state[j + 1][ya[4]], game_state[j + 2][ya[5]], game_state[j - 2][ya[2]], game_state[j - 1][ya[3]], game_state[j][i]].check_same()
                || [game_state[j + 1][ya[4]], game_state[j + 2][ya[5]], game_state[j + 3][ya[6]], game_state[j - 1][ya[3]], game_state[j][i]].check_same()
                || [game_state[j + 1][ya[4]], game_state[j + 2][ya[5]], game_state[j + 3][ya[6]], game_state[j + 4][ya[7]], game_state[j][i]].check_same()) {
                if (j % 2 == 0) {
                    win.graphics.moveTo(40 + 54 * (i - 3) + 17, 35 + (j - 4) / 2 * 96 - 30).lineTo(40 + 54 * (i - 3) - 17, 35 + (j - 4) / 2 * 96 + 30);
                } else {
                    win.graphics.moveTo(67 + 54 * (i - 3) + 17, 83 + (j - 5) / 2 * 96 - 30).lineTo(67 + 54 * (i - 3) - 17, 83 + (j - 5) / 2 * 96 + 30);
                }
            }
        }
    }
    stage.addChild(win);
    stage.update();
}
(function() {
    Array.prototype.check_same = function (){
        for(var i  = 1; i < this.length; i++) {
            if (this[0] === 0 || this[i] !== this[0]) {
                return false;
            }
        }
        return true;
    }
})();


function next_move() {
    if (turn === 0) return;
    if (turn === game_log.length) stage.removeChild(stage.getChildByName("win_line"));
    turn--;
    remove_move(game_log[turn][0], game_log[turn][1]);
    current_player = current_player === 1 ? 2 : 1;
}

function place_move(player, x, y) {
    game_state[x + 4][y + 4] = player;
    draw_game_state();
}

function remove_move() {
    game_state[x + 4][y + 4] = 0;
    draw_game_state();
}

function draw_game_state() {
    stage.removeChild(stage.getChildByName("game_state_container"));
    var container = new createjs.Container();
    container.name = "game_state_container";
    for ( var i = 0; i <= 18; i++) {
        for (var j = 0; j <= 22; j++) {
            if (game_state[i][j] !== 0) {
                var color = game_state[i][j] === 1 ? "#000000" : "#ffffff";
                if (i % 2 === 0) {
                    container.addChild(polygon_maker(40 + 54 * (j-3), 35 + (i-4)/2 * 96, 15, color));
                } else {
                    container.addChild(polygon_maker(67 + 54 * (j-3), 83 + (i-5)/2 * 96, 15, color));
                }
            }
        }
    }
    stage.addChild(container);
    stage.update();
}

function init_game_array() {
    for (var i = 0; i <= 23; i++) {
        game_state[i] = new Array();
        for (var j = 0; j <= 23; j++) {
            game_state[i][j] = 0;
        }
    }
}

function draw_game_table(stage) {
    // Drawing 160 polygon cells
    var polygon;
    for (var i = 0; i <= 6; i++) {
        for (var j = 1; j <= 19; j++) {
            polygon = polygon_maker(40 + 54 * j, 35 + i * 96, 30, "#a98307");
            polygon.addEventListener("click", move_click(i * 2, j - 1));
            stage.addChild(polygon);
        }
        if (i !== 6) {
            for ( var k = 1; k <= 19; k++) {
                polygon = polygon_maker(67 + 54 * k, 83 + i * 96, 30, "#a98307");
                polygon.addEventListener("click", move_click(i * 2 + 1, k - 1));
                stage.addChild(polygon);
            }
        }
    }
    stage.update();
}

function move_click(j, i) {
    return function(event) {
        if (game_log.indexOf(j+" "+i) !== -1){
            return
        } else {
            game_log.push(j+" "+i);
        }
        place_move(current_player, j, i);
        current_player = current_player === 1 ? 2 : 1;
        check_game_over();
    }
}


function polygon_maker(x, y, size, color) {
    // Drawing a polygon
    var polygon = new createjs.Shape();
    polygon.graphics.beginFill(color).drawPolyStar(x, y, size, 6, 0, 30);
    return polygon;
}