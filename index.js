const fs = require("fs");

//Variables to save the lines of the read file and the matrix for the exercise
let lines;
let matrix;

//Read the file
try {
  const data = fs.readFileSync("./4x4.txt", "utf8");
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
