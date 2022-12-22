// TERRAIN GENERATION
// AUTHOR: PETER LILEY
// FEB 2022

var zoomSlider; // adjusts the level of detail
let prevSliderVal;
let rectSize = 1; // resolution of map
let noiseDensity; // granularity of noise
let n = 0;
var terraniOffset = 10; // noise offset for other terrains
var terrainDensity = 130; // other terrains less granular
let grid = [];
let names;
let numTowns = 20;
let fontSize = 18;




function preload(){
  table = loadTable('assets/names.csv', 'csv');
  names = new nameGenerator(table);
}

function setup() {
  createCanvas(1920, 1080);
  zoomSlider = createSlider(10, 200, 180, 0);
  waterLevelSlider = createSlider(0, 1, 0.6, 0);
  generateGrid();
  paintTerrain();
  generateTowns();
}

function draw() {
  if(zoomSlider.value() != prevSliderVal || waterLevelSlider.value() != prevWaterVal) {
    generateGrid();
    paintTerrain();
    generateTowns();
  }
  prevSliderVal = zoomSlider.value();
  prevWaterVal = waterLevelSlider.value();

  //print(names.getName());
  //print(waterLevelSlider.value());
}

function paintTerrain() {
  for (let x = 0; x < width / rectSize; x++) {
    for (let y = 0; y < height / rectSize; y++) {
      c = getTerrainInfo(x, y);
      fill(c);
      rect(x * rectSize, y * rectSize, rectSize, rectSize);
      //drawElevationLines(x, y); // (optional) demonstrates elevation clearly
    }
  }
}

function mousePressed(){
  print(calculateSlope(mouseX, mouseY));
}

/**
 * return the terrain type (a colour) depending on several factors:
 * - height determines water, beach, land and mountains
 * - land steepness determines whether beaches appear (steeper = fewer beaches)
 * - land steepness determines whether cliffs appear (steeper = cliffs)
 * 
 * - grid height values are from 0-1
 * - steepness values are around 3-14
 * 
 * - a secondary noise function determines whether land is grass, desert or forest
 * @param {*} x grid X-value
 * @param {*} y grid Y-value
 * @returns 
 */

function getTerrainInfo(x, y){
  gridSpace = grid[x][y];
  let v = waterLevelSlider.value();

   // dark ocean
  if(gridSpace < v - 0.1) {
    return color(29, 80, 193);
  }
  // lighter ocean
  if(gridSpace < v){
    return color(29, 80, map(gridSpace, v - 0.15, v, 200, 255));
  }
  // sandy beach (no beach if too steep)
  if(gridSpace < v+0.02 && calculateSlope(x, y) < 4) {
      return color(210, 170, 109)
  }
  // land (grass, forest or desert) (cliffs if too steep)
  if(gridSpace < v+0.15 && calculateSlope(x, y) < 6) {
    xd = (x+terraniOffset)/terrainDensity;
    yd = (y+terraniOffset)/terrainDensity;
    // forest
    if(noise(xd, yd) < 0.35){
      return color(0, 90, 41);
    }
    // grass
    if(noise(xd, yd) < 0.65){
      return color('green');
    }
    // desert
    if(noise(xd, yd) < 1){
      return color(210, 130, 89)
    }
  }
  // mountains
  if(gridSpace < v+0.22) return color(150);
  // snow
  if(gridSpace < v+0.5) return color(255);
  else return color(0);
}

// draws elevation lines at 10% elevation itervals
function drawElevationLines(x, y, c){
  for(let i = 0; i < 1; i = i+0.1){
    if(grid[x][y] > i - 0.005 && grid[x][y] < i + 0.005){
      fill(0);
      rect(x, y, 1, 1);
    }
  }
}

// makes a height grid based on perlin noise
function generateGrid(){
  noStroke();
  let newGrid = [];

  for (let x = 0; x < width/rectSize; x++) {
    newGrid[x] = [];
    for (let y = 0; y < height/rectSize; y++){ 
      noiseDensity = zoomSlider.value();
      n = noise(x/noiseDensity, y/noiseDensity);
      newGrid [x][y] = n;
    }
  }
  grid = newGrid;
}

function generateTowns(){
  towns = [];
  // find a place ON LAND for the town to be
  for(var i = 0; i < numTowns; i++){
    var townX = int(random(0, width));
    var townY = int(random(0, height));
    while(grid[townX][townY] < waterLevelSlider.value() 
          || grid[townX][townY] > waterLevelSlider.value()+0.15
          || calculateSlope(townX, townY) > 15){
            townX = int(random(0, width));
            townY = int(random(0, height));
    }
    append(towns, new Town(names.getName(), createVector(townX, townY), randomGaussian(0, 10), randomGaussian(0, 5)));
  }
  fill(255, 0, 0);
  towns.forEach(town => {
    //print(town.location.x + " " + town.location.y);
    rectMode(CENTER);
    fill(0);
    rect(town.location.x, town.location.y, map(town.size, 0, 10, 4, 6));
    textSize(12);
    text(town.name, town.location.x + width/60, town.location.y+fontSize/4);
  });

}

// calculate slope using Horn's method
// https://www.onestopgis.com/GIS-Theory-and-Techniques/Terrain-Mapping-and-Analysis/Terrain-Analysis-Slope-and-Aspect/2-Approx-Methods-for-Calculating-Slope-Aspect.html
function calculateSlope(x, y){

  // return 0 if attempting to access slope of a point
  // on the edge of the map
  if(x == 0 || y == 0 || x >= (width/rectSize)-1 || y >= (height/rectSize)-1){
    return 0;
  }

  let e1 = grid[x-1][y+1];
  let e2 = grid[x][y+1];
  let e3 = grid[x+1][y+1];
  let e4 = grid[x-1][y];
  let e5 = grid[x+1][y];
  let e6 = grid[x-1][y-1];
  let e7 = grid[x][y-1];
  let e8 = grid[x+1][y-1];

  // Horn's kernel calculation
  s1 = pow(((e1+(2*e4)+e6)-(e3+(2*e5)+e8)),2);
  s2 = pow(((e6+(2*e7)+e8)-(e1+(2*e2)+e3)),2);
  slope = sqrt(s1+s2)/8;

  return slope*1000; // *1000 for ease of use
}


