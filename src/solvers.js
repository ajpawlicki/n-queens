/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
 
  var board = new Board({n: n});  

  var rowIndex = 0;
  var colIndex = 0;
  var sum = 0;

  while (sum < n) {
   
    board.togglePiece(rowIndex, colIndex);

    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
      board.togglePiece(rowIndex, colIndex);
    } else {
      sum += 1;
    }

    if (n - colIndex === 1) {
      colIndex = 0;
      rowIndex += 1;
    } else {
      colIndex += 1;
    }

  }
  
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  var solutionCount = 0; 
  
  var board = new Board({n: n});  
  
  var findOneSolution = function(row, n, board) {
    if (row === n) {
      solutionCount++;
      return;
    }
  // var solutionCount = 0; //fixme

  // var findSolution = function (n, startRow, startColumn) {
  //   var board = new Board({n: n});
  //   var rowIndex = startRow;
  //   var colIndex = startColumn;
  //   var piecesPlaced = 0;

  //   while (piecesPlaced < n) {
  //     if (board._isInBounds(rowIndex, colIndex)) {
  //       board.togglePiece(rowIndex, colIndex);
  //     }

  //     if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
  //       board.togglePiece(rowIndex, colIndex);
  //     } else {
  //       piecesPlaced += 1;
  //     }

  //     if (n - colIndex === 1) {
  //       colIndex = 0;
  //       rowIndex += 1;
  //     } else {
  //       colIndex += 1;
  //     }
  //   }

  //   if (piecesPlaced === n) {
  //     solutionCount++;
  //   }
  // };

  // var startRow = 0;
  // var startColumn = 0;
  
  // while (startRow < n && startColumn < n) {
  //   findSolution(n, startRow, startColumn);
  //   if (startColumn === n - 1) {
  //     startColumn = 0;
  //     startRow++;
  //   } else {
  //     startColumn++;
  //   }
  // }
  
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!(board.hasAnyColConflicts())) {
        var result = findOneSolution(row + 1, n, board);
        if (result) {
          return result;
        }
      }
      board.togglePiece(row, col);
    }
  };
  
  findOneSolution(0, n, board);
  
  return solutionCount;
  
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  var board = new Board({n: n});  
  var solution = [];
  
  var sum = 0;

  var findSolution = function(row, n, board) {
    
    if (sum === n) {
      return true;
    }
    
    for (var col = 0; col < n; col++) {
      
     
      board.togglePiece(row, col);
      sum++;
      if (!(board.hasAnyQueensConflicts())) {
        var result = findSolution(row + 1, n, board);   
        
        if (result) {
          return result;
        } else {
          board.togglePiece(row, col);
          sum--; 
          if (col !== 0 && row !== 0) {
            return false;
          } 
        }

      } else {
        board.togglePiece(row, col);
        sum--;
        if (col === n - 1) {
          return false;
        }  
      }
     
    }
  };
  
  findSolution(0, n, board);

  return board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  
  var board = new Board({n: n});  

  if (n === 2 || n === 3) {
    return 0;
  }

  var counter = 0;
  var sum = 0;

  var findSolution = function(row, n, board) {

    
    if (sum === n) {
      counter++;
      return false;
    }
    
    for (var col = 0; col < n; col++) {
      
     
      board.togglePiece(row, col);
      sum++;
      if (!(board.hasAnyQueensConflicts())) {
        var result = findSolution(row + 1, n, board);   
      
        if (result) {
          return result;
        } else {
          board.togglePiece(row, col);
          sum--; 
          
        }

      } else {
        board.togglePiece(row, col);
        sum--;
        if (col === n - 1) {
          return false;
        }  
      }
    }
  };
  
  findSolution(0, n, board);

  return counter;
  
};
