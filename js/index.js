

var audio = new Audio('./assets/sound/jump_sound.wav');
var audioBack = new Audio('./assets/sound/jump_back.wav');

// Sort chess pieces
sortChess(".pawn_dark")
sortChess(".chess-piece_dark");
sortChess('.pawn_white');
sortChess(".chess-piece_white");

var isRightPos = false;
var boxSelect, parentSelect;
var chessPiece;

// moving piece
$('.box').draggable({
    scroll: false,
    containment: '.chessboard',
    revert: function (event, ui) {
        if(!isRightPos){
            audioBack.play();
            return !isRightPos;
        }
        return !isRightPos;
    },
    start: function (event, ui) {
        audio.pause();
        audio.currentTime = 0;
        audioBack.pause();
        audioBack.currentTime = 0;
    },
    drag: function (event, ui) {

        getId = ui.helper.parent().attr('id');
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        arr.push('0')
        aup = eval(arr.join(''))
        a = aside + aup;

        // select green 
        ChangeColorSelect(ui.helper.parent(), 'dark', aside, a, aup)
        ChangeColorSelect(ui.helper.parent(), 'white', aside, a, aup)

        //select red for enemy
        ChangeColorRed(ui.helper.parent());

        let curX = ui.helper.position().left;
        let curY = ui.helper.position().top;
        chessPiece = ui.helper[0];
        chessPiece.style.zIndex = 1;
        parentSelect = ui.helper.parent();

        $('.chessbox').each(function () {
            if (this.style.backgroundColor == 'rgb(0, 128, 0)') {
                let leftGreen = this.offsetLeft;
                let topGreen = this.offsetTop;

                if (curX >= leftGreen && curX <= (leftGreen + 120) && curY >= topGreen && curY <= (topGreen + 120) && Math.abs(topGreen - curY) <= 80 && Math.abs(curX - leftGreen) <= 80) {
                    this.style.border = '3px solid burlywood';
                    boxSelect = this;
                    isRightPos = true;
                }
            }

        })

        if (isRightPos && boxSelect.style.border !== '3px solid burlywood') isRightPos = false;

    },
    stop: function (event, ui) {
        
        if (isRightPos) {

            if (boxSelect.style.border == '3px solid burlywood') {
                boxSelect.innerHTML = '';
                boxSelect.innerText = ui.helper.parent().prop('innerText');
                boxSelect.appendChild(chessPiece);
                chessPiece.style.zIndex = 'auto';
                parentSelect.css('zIndex' , 'auto');
                parentSelect.html('');
                setPos(boxSelect);
                audio.play();
            } else {
                isRightPos = false;
            }
        }
        resetColor();
    }
});



// Sort chessPieces
function sortChess(nameObj) {
    let oldLeft = 8;
    for (let i = 0; i < 8; i++) {
        $(`${nameObj}:eq(${i})`).css('left', oldLeft);
        oldLeft = parseInt($(`${nameObj}:eq(${i})`).css('left')) + 80;
    }
}


// ChangeColorSelect
function ChangeColorSelect(chessMan, toggle, aside, a, aup) {

    let nameChess = chessMan.prop("innerText");
    // Pawns
    if (nameChess == `pawn_${toggle}`) {
        chessMan.css('background-color', '#eae2b7');

        if (toggle == 'white') {
            console.log($(`#b${a + 100}`).prop("innerText").length);
            if ($(`#b${a + 100}`).prop("innerText").length == 0) {
                $(`#b${a + 100}`).css('background-color', 'green');
                $(`#b${a + 100}`).css('border', '1px solid black');
            }

            if (aside < 8 && $(`#b${a + 100 + 1}`).prop("innerText").length !== 0) {
                $(`#b${a + 100 + 1}`).css('background-color', 'green');
                $(`#b${a + 100 + 1}`).css('border', '1px solid black');
            }

            if (aside > 1 && $(`#b${a + 100 - 1}`).prop("innerText").length !== 0) {
                $(`#b${a + 100 - 1}`).css('background-color', 'green');
                $(`#b${a + 100 - 1}`).css('border', '1px solid black');

            }
        } else if (toggle == 'dark') {
            if ($(`#b${a - 100}`).prop("innerText").length == 0) {
                $(`#b${a - 100}`).css('background-color', 'green');
                $(`#b${a - 100}`).css('border', '1px solid black');
            }
            if (aside < 8 && $(`#b${a - 100 + 1}`).prop("innerText").length !== 0) {
                $(`#b${a - 100 + 1}`).css('background-color', 'green');
                $(`#b${a - 100 + 1}`).css('border', '1px solid black');
            }
            if (aside > 1 && $(`#b${a - 100 - 1}`).prop("innerText").length !== 0) {
                $(`#b${a - 100 - 1}`).css('background-color', 'green');
                $(`#b${a - 100 - 1}`).css('border', '1px solid black');

            }
        }

    }

    // Rook
    if (nameChess == `rook_${toggle}`) {
        chessMan.css('background-color', '#eae2b7');

        for (let i = 1; i < 9; i++) {

            if ((a + i * 100) < 900 && $(`#b${a + i * 100}`).prop('innerText').length == 0) {
                $(`#b${a + i * 100}`).css('background-color', 'green');
                $(`#b${a + i * 100}`).css('border', '1px solid black');
            }
            else if ((a + i * 100) < 900 && $(`#b${a + i * 100}`).prop('innerText').length !== 0) {
                $(`#b${a + i * 100}`).css('background-color', 'green');
                $(`#b${a + i * 100}`).css('border', '1px solid black');
                break
            }
        }

        for (let i = 1; i < 9; i++) {

            if ((a - i * 100) > 100 && $(`#b${a - i * 100}`).prop('innerText').length == 0) {
                $(`#b${a - i * 100}`).css('background-color', 'green');
                $(`#b${a - i * 100}`).css('border', '1px solid black');
            }
            else if ((a - i * 100) > 100 && $(`#b${a - i * 100}`).prop('innerText').length !== 0) {
                $(`#b${a - i * 100}`).css('background-color', 'green');
                $(`#b${a - i * 100}`).css('border', '1px solid black');
                break
            }
        }

        for (let i = 1; i < 9; i++) {

            if ((a + i) < (aup + 9) && $(`#b${a + i}`).prop('innerText').length == 0) {
                $(`#b${a + i}`).css('background-color', 'green');
                $(`#b${a + i}`).css('border', '1px solid black');
            }
            else if ((a + i) < (aup + 9) && $(`#b${a + i}`).prop('innerText').length !== 0) {
                $(`#b${a + i}`).css('background-color', 'green');
                $(`#b${a + i}`).css('border', '1px solid black');
                break
            }
        }

        for (let i = 1; i < 9; i++) {

            if ((a - i) > (aup) && $(`#b${a - i}`).prop('innerText').length == 0) {
                $(`#b${a - i}`).css('background-color', 'green');
                $(`#b${a - i}`).css('border', '1px solid black');
            }
            else if ((a - i) > (aup) && $(`#b${a - i}`).prop('innerText').length !== 0) {
                $(`#b${a - i}`).css('background-color', 'green');
                $(`#b${a - i}`).css('border', '1px solid black');
                break
            }
        }
    }

    // Knight
    if (nameChess == `knight_${toggle}`) {


        if (aside < 7 && aup < 800) {
            $(`#b${a + 100 + 2}`).css('background-color', 'green')
            $(`#b${a + 100 + 2}`).css('border', '1px solid black')
        }
        if (aside < 7 && aup > 200) {
            $(`#b${a - 100 + 2}`).css('background-color', 'green')
            $(`#b${a - 100 + 2}`).css('border', '1px solid black')
        }
        if (aside < 8 && aup < 700) {
            $(`#b${a + 200 + 1}`).css('background-color', 'green')
            $(`#b${a + 200 + 1}`).css('border', '1px solid black')
        }
        if (aside > 1 && aup < 700) {
            $(`#b${a + 200 - 1}`).css('background-color', 'green')
            $(`#b${a + 200 - 1}`).css('border', '1px solid black')
        }
        if (aside > 2 && aup < 800) {
            $(`#b${a - 2 + 100}`).css('background-color', 'green')
            $(`#b${a - 2 + 100}`).css('border', '1px solid black')
        }
        if (aside > 2 && aup > 100) {
            $(`#b${a - 2 - 100}`).css('background-color', 'green')
            $(`#b${a - 2 - 100}`).css('border', '1px solid black')
        }
        if (aside < 8 && aup > 200) {
            $(`#b${a - 200 + 1}`).css('background-color', 'green')
            $(`#b${a - 200 + 1}`).css('border', '1px solid black')
        }
        if (aside > 1 && aup > 200) {
            $(`#b${a - 200 - 1}`).css('background-color', 'green')
            $(`#b${a - 200 - 1}`).css('border', '1px solid black')
        }

        chessMan.css('background-color', '#eae2b7');

    }

    // bishop
    if (nameChess == `bishop_${toggle}`) {

        chessMan.css('background-color', '#eae2b7');
        for (let i = 1; i < 9; i++) {
            if (i < (900 - aup) / 100 && i < 9 - aside && $(`#b${a + i * 100 + i}`).prop("innerText").length == 0) {
                $(`#b${a + i * 100 + i}`).css('background-color', 'green')
                $(`#b${a + i * 100 + i}`).css('border', '1px solid black')
            }
            else if (i < (900 - aup) / 100 && i < 9 - aside && $(`#b${a + i * 100 + i}`).prop("innerText").length !== 0) {
                $(`#b${a + i * 100 + i}`).css('background-color', 'green')
                $(`#b${a + i * 100 + i}`).css('border', '1px solid black')
                break
            }
        }


        for (let i = 1; i < 9; i++) {
            if (i < aup / 100 && i < 9 - aside && $(`#b${a - i * 100 + i}`).prop("innerText").length == 0) {
                $(`#b${a - i * 100 + i}`).css('background-color', 'green')
                $(`#b${a - i * 100 + i}`).css('border', '1px solid black')
            }
            else if (i < aup / 100 && i < 9 - aside && $(`#b${a - i * 100 + i}`).prop("innerText").length !== 0) {
                $(`#b${a - i * 100 + i}`).css('background-color', 'green')
                $(`#b${a - i * 100 + i}`).css('border', '1px solid black')
                break
            }
        }


        for (let i = 1; i < 9; i++) {
            if (i < (900 - aup) / 100 && i < aside && $(`#b${a + i * 100 - i}`).prop("innerText").length == 0) {
                $(`#b${a + i * 100 - i}`).css('background-color', 'green')
                $(`#b${a + i * 100 - i}`).css('border', '1px solid black')
            }
            else if (i < (900 - aup) / 100 && i < aside && $(`#b${a + i * 100 - i}`).prop("innerText").length !== 0) {
                $(`#b${a + i * 100 - i}`).css('background-color', 'green')
                $(`#b${a + i * 100 - i}`).css('border', '1px solid black')
                break
            }

        }


        for (let i = 1; i < 9; i++) {
            if (i < aup / 100 && i < aside && $(`#b${a - i * 100 - i}`).prop("innerText").length == 0) {
                $(`#b${a - i * 100 - i}`).css('background-color', 'green')
                $(`#b${a - i * 100 - i}`).css('border', '1px solid black')
            }
            else if (i < aup / 100 && i < aside && $(`#b${a - i * 100 - i}`).prop("innerText").length !== 0) {
                $(`#b${a - i * 100 - i}`).css('background-color', 'green')
                $(`#b${a - i * 100 - i}`).css('border', '1px solid black')
                break
            }
        }

    }

    // queen
    if (nameChess == `queen_${toggle}`) {

        chessMan.css('background-color', '#eae2b7');

        for (let i = 1; i < 9; i++) {

            if ((a + i * 100) < 900 && $(`#b${a + i * 100}`).prop('innerText').length == 0) {
                $(`#b${a + i * 100}`).css('background-color', 'green')
                $(`#b${a + i * 100}`).css('border', '1px solid black')
            }
            else if ((a + i * 100) < 900 && $(`#b${a + i * 100}`).prop('innerText').length !== 0) {
                $(`#b${a + i * 100}`).css('background-color', 'green')
                $(`#b${a + i * 100}`).css('border', '1px solid black')
                break
            }
        }

        for (let i = 1; i < 9; i++) {

            if ((a - i * 100) > 100 && $(`#b${a - i * 100}`).prop('innerText').length == 0) {
                $(`#b${a - i * 100}`).css('background-color', 'green')
                $(`#b${a - i * 100}`).css('border', '1px solid black')
            }
            else if ((a - i * 100) > 100 && $(`#b${a - i * 100}`).prop('innerText').length !== 0) {
                $(`#b${a - i * 100}`).css('background-color', 'green')
                $(`#b${a - i * 100}`).css('border', '1px solid black')
                break
            }
        }

        for (let i = 1; i < 9; i++) {

            if ((a + i) < (aup + 9) && $(`#b${a + i}`).prop('innerText').length == 0) {
                $(`#b${a + i}`).css('background-color', 'green')
                $(`#b${a + i}`).css('border', '1px solid black')
            }
            else if ((a + i) < (aup + 9) && $(`#b${a + i}`).prop('innerText').length !== 0) {
                $(`#b${a + i}`).css('background-color', 'green')
                $(`#b${a + i}`).css('border', '1px solid black')
                break
            }
        }

        for (let i = 1; i < 9; i++) {

            if ((a - i) > (aup) && $(`#b${a - i}`).prop('innerText').length == 0) {
                $(`#b${a - i}`).css('background-color', 'green')
                $(`#b${a - i}`).css('border', '1px solid black')
            }
            else if ((a - i) > (aup) && $(`#b${a - i}`).prop('innerText').length !== 0) {
                $(`#b${a - i}`).css('background-color', 'green')
                $(`#b${a - i}`).css('border', '1px solid black')
                break
            }
        }



        for (let i = 1; i < 9; i++) {
            if (i < (900 - aup) / 100 && i < 9 - aside && $(`#b${a + i * 100 + i}`).prop("innerText").length == 0) {
                $(`#b${a + i * 100 + i}`).css('background-color', 'green')
                $(`#b${a + i * 100 + i}`).css('border', '1px solid black')
            }
            else if (i < (900 - aup) / 100 && i < 9 - aside && $(`#b${a + i * 100 + i}`).prop("innerText").length !== 0) {
                $(`#b${a + i * 100 + i}`).css('background-color', 'green')
                $(`#b${a + i * 100 + i}`).css('border', '1px solid black')
                break
            }
        }


        for (let i = 1; i < 9; i++) {
            if (i < aup / 100 && i < 9 - aside && $(`#b${a - i * 100 + i}`).prop("innerText").length == 0) {
                $(`#b${a - i * 100 + i}`).css('background-color', 'green')
                $(`#b${a - i * 100 + i}`).css('border', '1px solid black')
            }
            else if (i < aup / 100 && i < 9 - aside && $(`#b${a - i * 100 + i}`).prop("innerText").length !== 0) {
                $(`#b${a - i * 100 + i}`).css('background-color', 'green')
                $(`#b${a - i * 100 + i}`).css('border', '1px solid black')
                break
            }
        }


        for (let i = 1; i < 9; i++) {
            if (i < (900 - aup) / 100 && i < aside && $(`#b${a + i * 100 - i}`).prop("innerText").length == 0) {
                $(`#b${a + i * 100 - i}`).css('background-color', 'green')
                $(`#b${a + i * 100 - i}`).css('border', '1px solid black')
            }
            else if (i < (900 - aup) / 100 && i < aside && $(`#b${a + i * 100 - i}`).prop("innerText").length !== 0) {
                $(`#b${a + i * 100 - i}`).css('background-color', 'green')
                $(`#b${a + i * 100 - i}`).css('border', '1px solid black')
                break
            }

        }


        for (let i = 1; i < 9; i++) {
            if (i < aup / 100 && i < aside && $(`#b${a - i * 100 - i}`).prop("innerText").length == 0) {
                $(`#b${a - i * 100 - i}`).css('background-color', 'green')
                $(`#b${a - i * 100 - i}`).css('border', '1px solid black')
            }
            else if (i < aup / 100 && i < aside && $(`#b${a - i * 100 - i}`).prop("innerText").length !== 0) {
                $(`#b${a - i * 100 - i}`).css('background-color', 'green')
                $(`#b${a - i * 100 - i}`).css('border', '1px solid black')
                break
            }
        }
    }

    // king
    if (nameChess == `king_${toggle}`) {

        chessMan.css('background-color', '#eae2b7');;
        if (aside < 8) {
            $(`#b${a + 1}`).css('background-color', 'green')
            $(`#b${a + 1}`).css('border', '1px solid black')

        }
        if (aside > 1) {

            $(`#b${a - 1}`).css('background-color', 'green')
            $(`#b${a - 1}`).css('border', '1px solid black')
        }
        if (aup < 800) {

            $(`#b${a + 100}`).css('background-color', 'green')
            $(`#b${a + 100}`).css('border', '1px solid black')
        }
        if (aup > 100) {

            $(`#b${a - 100}`).css('background-color', 'green')
            $(`#b${a - 100}`).css('border', '1px solid black')
        }

        if (aup > 100 && aside < 8) {

            $(`#b${a - 100 + 1}`).css('background-color', 'green')
            $(`#b${a - 100 + 1}`).css('border', '1px solid black')
        }
        if (aup > 100 && aside > 1) {

            $(`#b${a - 100 - 1}`).css('background-color', 'green')
            $(`#b${a - 100 - 1}`).css('border', '1px solid black')
        }
        if (aup < 800 && aside < 8) {

            $(`#b${a + 100 + 1}`).css('background-color', 'green')
            $(`#b${a + 100 + 1}`).css('border', '1px solid black')
        }
        if (aup < 800 && aside > 1) {

            $(`#b${a + 100 - 1}`).css('background-color', 'green')
            $(`#b${a + 100 - 1}`).css('border', '1px solid black')
        }


    }



}


function ChangeColorRed(chessMan) {

    if (chessMan[0].innerText.includes('dark')) {
        $('.chessbox').each(function () {
            if (this.style.backgroundColor == 'rgb(0, 128, 0)' && this.childElementCount > 0 && this.innerText.includes('dark')) {
                this.style.backgroundColor = '#d62828';
            }

        })
    }

    if (chessMan[0].innerText.includes('white')) {
        $('.chessbox').each(function () {
            if (this.style.backgroundColor == 'rgb(0, 128, 0)' && this.childElementCount > 0 && this.innerText.includes('white')) {
                this.style.backgroundColor = '#d62828';
            }

        })
    }


}


// resetColor
function resetColor() {
    let boxsDark = $('.dark');
    let boxsWhite = $('.white');

    boxsDark.css({
        'background-color': '#1982c4',
        'border': 'none',
    });

    boxsWhite.css({
        'background-color': 'rgb(145, 144, 144)',
        'border': 'none',
    });
}



function setPos(chessBoxx) {
    let chess = chessBoxx.querySelector('.box');
    let id = chessBoxx.id;

    let row = (id).slice(1, 2);
    let col = (id).slice(3);

    chess.style.left = (parseInt(col) - 1) * 80 + 10 + 'px';
    chess.style.top = parseInt(8 - row) * 80 + 10 + 'px';
}

