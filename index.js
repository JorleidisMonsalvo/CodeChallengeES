const { log } = require("console");
const fs = require("fs");

//Variables to save the lines of the read file and the matrix for the exercise
let lines;
let matrix;

//Read the file
try {
  const data = fs.readFileSync("./map.txt", "utf8");
  lines = data.split("\n");
} catch (err) {
  console.error(err);
}

//Initialize the variable matrix based on the information from the read file
for (i = 0; i < lines.length; i++) {
  let line = lines[i].split(" ");
  if (i == 0) {
    matrix = Array(line[0]);
  } else {
    matrix[i - 1] = line;
  }
}

//constant use to move to the north, south, east and west of a coordinate
const DIRECTIONS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  
  /**
   * Find the longest descending path (and then steepest) path in the given matrix
   * @param {Array} M array where the search is performed
   * @returns {Array} array with 2 positions where the first one is the length of the array 
   * and the second is the path found
   */
  const longestDecreasingPath = (M) => {
      let rows = M.length;
      let cols = M[0].length;

      /**
       * Find the longest descending path from a given coordinate
       * @param {Number} x coordinate
       * @param {Number} y coordinate
       * @returns {Array} array with 2 positions where the first one is the length of the array,
       * the second is the path found and the last one is the steepest of the path
       */
      const innerLongestPath = (x,y) => {
          let prev = 0;
          let prevPath = [];

          //Check all valid neighbors of the current position
          for(direction of DIRECTIONS){
              let i = x + direction[0];
              let j = y + direction[1];

              //Check if the new coordinates are inside the boundaries of the array and
              // the value in that position is smaller than the previous
              if(i>-1 && i<rows && j>-1 && j<cols && M[i][j]<M[x][y]){
                  let val = innerLongestPath(i,j);
                  let current = val[0];
                  let currentPath = val[1];
                  //If the path of the new value is greater than the previous the variables prev and prevPath
                  //are update with the new length of the path and new longest path, respectively
                  if(current>prev){
                      prev = current;
                      prevPath = currentPath;
                  }
              }
          }
          return [prev+1, [M[x][y]].concat(prevPath)]
      }

      //Variable to store the final answer
      let res = [0,[]];
      //Iterate over each position of the array calculating the longest path from each position
      //updating the res variable each time that a longest path is found
      for(let i=0; i< rows; i++){
          for(let j=0; j<cols; j++){
              let temp = innerLongestPath(i,j);
              //length of the actual path
              let prevLength = res[0];
              //length of the new path
              let currentLength = temp[0];

              //Select the longest path and in case the two path have the same length select the steepest one
              if(prevLength< currentLength){
                  res = temp
              } else if(prevLength == currentLength){
                  let prevPath = res[1];
                  let currentPath = temp[1];
                  res = (prevPath[prevLength-1] - prevPath[0])> (currentPath[currentLength-1]-prevPath[0]) ? res : temp
              }
              
          }
      }
      //Add the steepest of the path to the res variable
      res = res.concat(res[1][res[0]-1]-res[1][0]);
      console.log("Length of calculated path: " + res[0]);
      console.log("Drop of calculated path: " + res[2])
      console.log("Calculate path: " + res[1].reverse());

      return res;
  }
  
  longestDecreasingPath(matrix)
