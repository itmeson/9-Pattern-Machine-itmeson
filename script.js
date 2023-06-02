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
      //newBox.addEventListener("dblclick", selectAllByColor);
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
