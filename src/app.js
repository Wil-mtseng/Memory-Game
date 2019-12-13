/*Wilfred Ratala
Memory game src
13 December 2019 
*/

//Dynamically creates cards
var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];

// Store values
var memory_values = [];

// Stores memoery tile ids
var memory_tile_ids = [];

// Keeps tracks of flipped tiles
var tiles_flipped = 0;

// Shuffles cards
Array.prototype.memory_tile_shuffle = function() {
        var i = this.length,
            j, temp;
        while (--i > 0) {
            // Randomly shuffles the cards
            j = Math.floor(Math.random() * (i + 1));
            temp = this[j];
            this[j] = this[i];
            this[i] = temp;
        }
    }
    // Creates new board
function newBoard() {
    // File
    tiles_flipped = 0;
    var output = '';

    // Execute shuffle function
    memory_array.memory_tile_shuffle();

    // Goes through every flipped element and stores it in memory array 
    for (var i = 0; i < memory_array.length; i++) {
        // combines divs with output            
        output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
    }

    // Outputs updated game
    document.getElementById('memory_board').innerHTML = output;
}
// flips tiles
function memoryFlipTile(tile, val) {
    if (tile.innerHTML == "" && memory_values.length < 2) {
        // Flipped tile color
        tile.style.background = 'green';
        tile.innerHTML = val;

        if (memory_values.length == 0) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if (memory_values.length == 1) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);

            if (memory_values[0] == memory_values[1]) {
                tiles_flipped += 2;
                // Clear both arrays
                memory_values = [];
                memory_tile_ids = [];

                // Check to see if the whole board is cleared
                if (tiles_flipped == memory_array.length) {
                    alert("Well done! You completed the game!");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }
            } else {
                function flip2Back() {
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = 'url(img/q.jpg) no-repeat';
                    tile_1.style.backgroundSize = 'cover';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(img/q.jpg) no-repeat';
                    tile_2.style.backgroundSize = 'cover';
                    tile_2.innerHTML = "";
                    // Clear both arrays
                    memory_values = [];
                    memory_tile_ids = [];
                }
                setTimeout(flip2Back, 500);
            }
        }
    }
}