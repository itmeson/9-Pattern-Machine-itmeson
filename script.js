// constants to pay attention to the page
const rows = document.getElementById("rows");
const columns = document.getElementById("columns");
const submitbutton = document.getElementById("submit");
const colorchoice = document.getElementById("colorchoice");
const gridofboxes = document.getElementById("gridofboxes");
const downloadButton = document.getElementById('download');
downloadButton.addEventListener('click', downloadImage);


//event listener that listens to the submit button, and calls the makegrid
submitbutton.addEventListener("click", makeGrid);

const addRowButton = document.getElementById("add-row");
const removeRowButton = document.getElementById("remove-row");
const addColumnButton = document.getElementById("add-column");
const removeColumnButton = document.getElementById("remove-column");

addRowButton.addEventListener("click", addRow);
removeRowButton.addEventListener("click", removeRow);
addColumnButton.addEventListener("click", addColumn);
removeColumnButton.addEventListener("click", removeColumn);


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
      newBox.addEventListener("mousedown", changeColorPicker);
    }
  }
}

// function to change the color of  a box when I click on it
function changeColor(event) {
  //console.log("changing color", event.target.id);
  // read the current color in the colorpicker
  const newColor = colorchoice.value;
  if (event.type === "click" && event.shiftKey) {
    selectAllByColor(event);
  }
  else if (event.type === "click" || (event.type === "mouseover" && event.buttons === 1 )) {
    //change the target color
    event.target.style.backgroundColor = newColor;
  }
}

function selectAllByColor(event) {
  console.log("selecting by color");
  const numRows = rows.value;
  const numColumns = columns.value;
  console.log("rows and columns are: ", numRows, numColumns)
  const oldColor = event.target.style.backgroundColor;

  for (let i=0; i<numRows; i++) {
    for (let j=0; j<numColumns; j++) {
      let currentBox = document.getElementById(`box${i}${j}`);
      console.log(i, j, event.target.id, currentBox.id);

      if (oldColor == currentBox.style.backgroundColor) {
        currentBox.style.backgroundColor = colorchoice.value;
      }
    }
  }
}

function downloadImage() {
  let gridElement = document.getElementById('gridofboxes'); // get the element that contains your grid

  html2canvas(gridElement).then(function(canvas) {
    // Create an image element
    let imgElement = document.createElement('a');
    
    // Set its href attribute to the image data
    imgElement.href = canvas.toDataURL('image/png');
    
    // Set the download attribute to specify a filename
    imgElement.download = 'grid.png';

    // Trigger a click event to start the download
    imgElement.click();
  });
}

function addRow() {
  const numRows = parseInt(rows.value);
  rows.value = numRows + 1;
  const newColor = colorchoice.value;

  // Create a new row
  let newRow = document.createElement('div');
  newRow.classList.add('row');
  newRow.setAttribute('id', `row${numRows}`);

  // Add boxes to the new row
  for (let j=0; j < columns.value; j++) {
      let newBox = document.createElement('div');
      newBox.classList.add('box');
      newBox.setAttribute('id', `box${numRows}${j}`);
      newRow.appendChild(newBox); 
      newBox.style.backgroundColor = newColor;
      newBox.addEventListener("click", changeColor);
      newBox.addEventListener("mouseover", changeColor);
      newBox.addEventListener("mousedown", changeColorPicker);

  }

  // Append the new row to the grid
  gridofboxes.appendChild(newRow);
}

function removeRow() {
  const numRows = parseInt(rows.value) - 1;
  rows.value = numRows > 0 ? numRows : 1;
  
  if (numRows >= 0) {
      // Remove the last row
      gridofboxes.removeChild(gridofboxes.lastChild);
  }
}

function addColumn() {
  const numColumns = parseInt(columns.value);
  columns.value = numColumns + 1;
  const newColor = colorchoice.value;

  // Loop through each row and add a new box
  for (let i=0; i < rows.value; i++) {
      let currentRow = document.getElementById(`row${i}`);
      
      let newBox = document.createElement('div');
      newBox.classList.add('box');
      newBox.setAttribute('id', `box${i}${numColumns}`);
      currentRow.appendChild(newBox);
      newBox.style.backgroundColor = newColor;
      newBox.addEventListener("click", changeColor);
      newBox.addEventListener("mouseover", changeColor);
      newBox.addEventListener("mousedown", changeColorPicker);

  }
}

function removeColumn() {
  const numColumns = parseInt(columns.value) - 1;
  columns.value = numColumns > 0 ? numColumns : 1;

  if (numColumns >= 0) {
      // Loop through each row and remove the last box
      for (let i=0; i < rows.value; i++) {
          let currentRow = document.getElementById(`row${i}`);
          currentRow.removeChild(currentRow.lastChild);
      }
  }
}

function changeColorPicker(event) {
  // Check if the control key was pressed during the mousedown event
  if (event.ctrlKey) {
      // Set the color picker to the color of the clicked box
      colorchoice.value = rgbToHex(event.target.style.backgroundColor);
    }
}

function rgbToHex(rgb) {
  // Choose correct sequence
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r, g, b)" into [r, g, b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

  if (r.length == 1)
      r = "0" + r;
  if (g.length == 1)
      g = "0" + g;
  if (b.length == 1)
      b = "0" + b;

  return "#" + r + g + b;
}
