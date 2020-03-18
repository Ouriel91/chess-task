function runGame() {
    let currentPosition;
    initCells();
    setKnightInitialPosition();
    initListeners();
}

function initCells() {
    for(let column=8;column>0; column--){
        for(let row=1;row<=8;row++){
            const newCell = document.createElement('div');
            newCell.setAttribute('id', `${row}_${column}`);
            newCell.setAttribute('class', (row + column) % 2 === 0 ? 'cell' : 'cell grey');
            $('#game').append(newCell);
        }
        $('#game').append('<br>')
    }
}

function setKnightInitialPosition() {
    const randomRow = Math.ceil(Math.random()*8);
    const randomColumn = Math.ceil(Math.random()*8);
     currentPosition = `${randomRow}_${randomColumn}`; 
    $('#' + currentPosition).addClass('knight');
}


function initListeners() {
    
    let allowedCells;
    
    //move/unmove the knight in the end of drop (release the mouse)
    //Check the allowed cells by getpositions functions (returns allowed cells), 
    //mark them and if the cell is allowed - move the knight
    $('.cell').mousedown(function () {

        var id = $(this).prop('id');

        if (id != currentPosition) {
            allowedCells = null;
            return;
        }

        allowedCells = getpositions($(this).prop('id'));
        
        if (allowedCells != null) {

            $('.cell').css('cursor', 'no-drop');

            allowedCells.then((items) => {
                if (items.length) {
                    items.forEach(element => {
                        $('#' + element).css('cursor', 'pointer');
                    });
                }
            });
        }
    });

    //check in the dragging mouse if the cell is allowed and mark it in his sign
    $('.cell').mouseup(function (event) {

        if (allowedCells != null) {
            const id = $(this).prop('id');
            allowedCells.then((items) => {
                if (items.length) {
                    items.forEach(element => {
                        if (id == element) {
                            $('#' + currentPosition).removeClass('knight');
                            currentPosition = id; 
                            $(this).addClass('knight');
                        }
                    });
                }
            });

            $('.cell').css('cursor', 'pointer');
            event.stopPropagation();
        }
    });

    //some validations if the user move out from the board
    $('body').mouseup(function (event) {
        allowedCells = null;
        $('.cell').css('cursor', 'pointer');
        event.stopPropagation();
    })

    $(window).mouseup(function (event) {
        allowedCells = null;
        $('.cell').css('cursor', 'pointer');
        event.stopPropagation();
    });
}

//async function that takes the id of cell (while the knight moves) and sent request (get api) to server 
//ths server fetch the allowed cells and return them
async function getpositions(id) {
    let url = 'http://localhost:3000/positions?currentPosition=' + id;
    const response = await fetch(url).then(response => response.json())
    return response.pos;
}


// run the game
runGame();


