canvas = document.getElementById('msCanvas')
ctx = canvas.getContext('2d')

function AddButton(x, y, size, onClick) {
    ctx.fillStyle='#555555'
    ctx.fillRect(x, y, size, size)
    canvas.addEventListener('click', onClick, false)
}

function between(x, min, max) {
    return x >= min && x <= max; 
}

function CreateBoard(rows, cols) {
    var size = 30
    var margin = 5
    for (row = 0; row < rows; row++) {
        for (col = 0; col < cols; col++) {
            x = col * (size + margin)
            y = row * (size + margin)

            AddButton(x, y, size, (function(row, col, x, y) {
                return function(event) {
                    if (between(event.pageX, x, x + size) &&
                        between(event.pageY, y, y + size)) {
                        alert(row + 'x' + col)
                    }
                }
            }(row, col, x, y)))
        }
    }
}

function Main() {
    CreateBoard(5, 5)
}

Main()
