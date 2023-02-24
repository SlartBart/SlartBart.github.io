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
  applyFilter(smudge);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction)
{
  var pix;
  var pixVal;
  for(var x = 0; x<image.length; x++)
  {
    for(var y = 0; y<image[x].length; y++)
    {
      rgbString = image[x][y];//selects current pixel
      pix = image[x][y+1];//selects next pixel
      if(y<image[x].length-1)//to prevent glitch, only converts when an actual value is present, no need to decode, no change happens to it
      {
        pixVal = rgbStringToArray(pix);//converts the base pix to an array
      }
      rgbNumbers = rgbStringToArray(rgbString);//convert to array
      filterFunction(rgbNumbers, pixVal || null, y);//apply change to variable
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
function reddify(array, a, b)
{
  array[RED]=200;//makes red value equal 200
}

// TODO 6: Create more filter functions
function decreaseBlue(array, a, b)
{
  array[BLUE] = keepInBounds(array[BLUE]-50);//decreases blue value by 50 units, to the minimum of 0
}
function increaseGreenByBlue(array,a ,b)
{
  array[GREEN] = keepInBounds(array[BLUE] + array[GREEN]);//increases the green value by the blue value, to the maximum of 255
}

// CHALLENGE code goes below here
function smudge(pix, nextPix, end)
{
  if(end<image[0].length-1){//ensures unly runs where there is data to use
      var result = [];//stores data 
      for(var p = 0; p<nextPix.length; p++)//runs over the RED, GREEN, and BLUE values
      {
        result.push(Math.ceil((pix[p]-nextPix[p])/4));//quickly stores change in result
        pix[p]=keepInBounds(pix[p]+result[p]);//applys change to pix, which is the active pixel
      }
    }
}