var canvas = document.getElementById('msCanvas')
var ctx = canvas.getContext('2d')

var board = []
var revealedMap = []
var boardCols = 10
var boardRows = 10

var buttonSize = 30
var buttonMargin = 5

function AddButton(x, y, size, row, col, onClick) {
    if (board[row][col] == 1) {
        ctx.fillStyle = '#000000'
    }

    ctx.fillRect(x, y, size, size)
    canvas.addEventListener('click', onClick, false)
}

function Between(x, min, max) {
    return x >= min && x <= max; 
}

function RandInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
}

function ShowBoard() {
    for (var i = 0; i < boardRows; i++) {
            console.log(board[i])
    }
}

function PlaceMines(n) {
    for (var i = 0; i < n; i++) {
        var x = RandInt(0, boardCols - 1)
        var y = RandInt(0, boardRows - 1)

        if (board[x][y] == 1) {
            i--
            continue
        } else {
            board[x][y] = 1
        }
    }
}

function InitBoard() {
    for (var rowNum = 0; rowNum < boardRows; rowNum++) {
        for (var rowNums = 0; rowNum < boardRows; rowNum++) {
            board = board.concat([Array.apply(null, Array(5)).map(Number.prototype.valueOf, 0)])
            revealedMap = revealedMap.concat([Array.apply(null, Array(5)).map(Number.prototype.valueOf, 0)])
        }
    }
}

function Reveal(row, col) {
    var mineCount = 0

    if (board[row][col] == 1) {
        return 1
    }

    if (revealedMap[row][col] == 1) {
        return 0
    }

    revealedMap[row][col] = 1

    var x = col * (buttonSize + buttonMargin)
    var y = row * (buttonSize + buttonMargin)

    ctx.fillStyle = '#FF00FF'
    ctx.fillRect(x, y, buttonSize, buttonSize)

   
    if (row > 0) {
        mineCount += Reveal(row - 1, col)
    }
    
    if (row < boardRows - 1) {
        mineCount += Reveal(row + 1, col)
    }

    if (col > 0) {
        mineCount += Reveal(row, col - 1)
    }
    
    if (col < boardCols - 1) {
        mineCount += Reveal(row, col + 1)
    }

    if (row > 0 && col > 0) {
        if (board[row - 1][col - 1] == 1) {
            mineCount++
        }
    }

    if (row > 0 && col < boardCols - 1) {
        if (board[row - 1][col + 1] == 1) {
            mineCount++
        }
    }

    if (row < boardRows - 1 && col > 0) {
        if (board[row + 1][col - 1]) {
            mineCount++
        }
    }

    if (row < boardRows - 1 && col < boardCols -1) {
        if (board[row + 1][col + 1]) {
            mineCount++
        }
    }

    if (mineCount > 0) {
        ctx.fillStyle = '#000000'
        ctx.font = '10px Georgia'
        ctx.fillText(mineCount, x + buttonSize / 2, y + buttonSize / 2)
    }

    return 0
}

function DrawBoard() {
    for (row = 0; row < boardRows; row++) {
        for (col = 0; col < boardCols; col++) {
            x = col * (buttonSize + buttonMargin)
            y = row * (buttonSize + buttonMargin)

            AddButton(x, y, buttonSize, row, col, (function(row, col, x, y) {
                return function(event) {
                    if (Between(event.pageX, x, x + buttonSize) &&
                        Between(event.pageY, y, y + buttonSize)) {
                        if (board[row][col] == 1) {
                            alert('Boom!')
                        } else {
                            Reveal(row, col)
                        }
                    }
                }
            }(row, col, x, y)))
        }
    }
}

function Main() {
    InitBoard()
    PlaceMines(boardRows * boardCols / 3)
    DrawBoard()
}

Main()
