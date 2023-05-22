// constants to pay attention to the page
const rows = document.getElementById("rows");
const columns = document.getElementById("columns");
const submitbutton = document.getElementById("submit");
const colorchoice = document.getElementById("colorchoice");
const gridofboxes = document.getElementById("gridofboxes");

//event listener that listens to the submit button, and calls the makegrid
submitbutton.addEventListener("click", makeGrid);


//function to make the grid of boxes
function makeGrid() {
  // clear the old grid
  gridofboxes.innerHTML = '';
  // figure out number of rows
  const numRows = rows.value;
  // figure out number of columns
  const numColumns = columns.value;
  console.log(numRows, numColumns); // output to make sure working so far
  
  // figure out what color to make them all
  const newColor = colorchoice.value;
  // loop to make the grid

  for (let i=0; i<numRows; i++) {
    // make one row to hold a row of boxes
    let newRow = document.createElement('div');
    newRow.classList.add('row');
    newRow.setAttribute('id', `row${i}`);
    gridofboxes.appendChild(newRow);
  
    for (let j=0; j < numColumns; j++) {
      // create one box with correct color
      let newBox = document.createElement('div');
      newBox.classList.add('box');
      newBox.setAttribute('id', `box${i}${j}`);
      newRow.appendChild(newBox); 
      newBox.style.backgroundColor = newColor;
      newBox.addEventListener("click", changeColor);
      newBox.addEventListener("mouseover", changeColor);
    }
  }
}

// function to change the color of  a box when I click on it
function changeColor(event) {
  // read the current color in the colorpicker
  const newColor = colorchoice.value;
  if (event.type === "click" || (event.type === "mouseover" && event.buttons === 1 )) {
    //change the target color
    event.target.style.backgroundColor = newColor;
  }
}