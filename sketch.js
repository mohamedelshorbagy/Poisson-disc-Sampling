/*
  # Mohamed Elshorbagy
  # 16/6/2017
  # Poisson-disc Sampling

 */

var r = 2;
var k = 30;
var w = r / Math.sqrt(2);
var grid = [];
var active = [];
var cols , rows;


function setup() {
createCanvas(400,400);
colorMode(HSB);

// STEP 0
 cols = floor(width / w);
 rows = floor(height / w);


for(var i = 0 ; i < rows * cols;i++) {
  grid[i] = undefined;

}




// Step 1 

var x = random(width);
var y = random(height);
var pos = createVector(x , y);
var i = floor(x / w); 
var j = floor(y / w);


grid[i + j * cols] = pos;
active.push(pos);


}







/*  Draw Function */
function draw() {
  background(0);

  for (total = 0 ; total < 40 ; total++) {

  if(active.length > 0) {
    var randomIndex = floor(random(active.length));
    var posActive = active[randomIndex];
    var foundActive = false;
    for(var n = 0 ; n < k ; n++) {
      var offset = p5.Vector.random2D();
      var bet = random(r , 2 * r);
      offset.setMag(bet);
      offset.add(posActive);



      
  var col = floor(offset.x / w);
  var row = floor(offset.y / w);
  var check = true;

  for(var i = -1 ; i <= 1 ;i++) {
    for (var j = -1 ; j <= 1 ;j++) {
        var formula = (i + col) + (j + row) * cols
        var neighbour = grid[formula];
        if (neighbour) {
        var d = p5.Vector.dist(offset , neighbour);
        if(d < r) {
          check = false;
          
        }
      }
    }
  }


  if (check) {
    foundActive = true;
    grid[col + row * cols] = offset;
    active.push(offset);
    break;
  }


// End Of K Loop
    }

    if(!foundActive) {

      active.splice(r , 1);

    }


// End of Active.length If

  }



  }







  for(var i = 0 ; i < grid.length ; i++) {
    if (grid[i]) {
    
        stroke(i / 100 % 360 , 100 , 100);
        strokeWeight(1);
        point(grid[i].x , grid[i].y);

    }


  }


  // for(var i = 0; i < active.length;i++) {
  //   stroke(255 , 125 , 255);
  //   strokeWeight(2);
  //   point(active[i].x , active[i].y);

  // }



}