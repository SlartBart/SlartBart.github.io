// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilterNoBackground(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilter(increaseGreenByBlue);
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction)
{
  for(var x = 0; x<image.length; x++)
  {
    for(var y = 0; y<image[x].length; y++)
    {
      rgbString = image[x][y];//selects current pixel
      rgbNumbers = rgbStringToArray(rgbString);//convert to array
      filterFunction(rgbNumbers);//apply change to variable
      rgbString = rgbArrayToString(rgbNumbers);//back to string
      image[x][y] = rgbString;//apply change to the base
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction)
{
  for(var x = 0; x<image.length; x++)
  {
    for(var y = 0; y<image[x].length; y++)
    {
      rgbString=image[x][y];
      if(rgbString!=image[0][0])
      {
      
      rgbNumbers=rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString=rgbArrayToString(rgbNumbers);
      image[x][y]=rgbString;
      }
    }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(num)
{
  var MAX=255;//remove magic number 255
  var MIN=0;//remove magic number 0
  return Math.max(MIN, Math.min(MAX,num));
}
// TODO 3: Create reddify function
function reddify(array)
{
  array[RED]=200;//makes red value equal 200
}

// TODO 6: Create more filter functions
function decreaseBlue(array)
{
  array[BLUE]= keepInBounds(array[BLUE]-50);//decreases blue value by 50 units, to the minimum of 0
}
function increaseGreenByBlue(array)
{
  array[GREEN] = keepInBounds(array[BLUE] + array[GREEN]);//increases the green value by the blue value, to the maximum of 255
}

// CHALLENGE code goes below here
