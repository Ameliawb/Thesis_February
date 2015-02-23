// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flow Field Following
// Via Reynolds: http://www.red3d.com/cwr/steer/FlowFollow.html

// tweak by Amelia Winger-Bearskin for Shiffman's Creative Javascript class 2014 week 1 homework
var debug = true;

// Flowfield object
var flowfield;
// An ArrayList of vehicles
var vehicles = [];

function setup() {



    createCanvas(width, height);
    // Make a new flow field with "resolution" of 16
    flowfield = new FlowField(50);
    // Make a whole bunch of vehicles with random maxspeed and maxforce values
    for (var i = 0; i < 110; i++) {
        vehicles.push(new Vehicle(random(width), random(height), random(2, 5), random(0.1, 0.5)));
    }
}

function draw() {
    //background(255);
    // Display the flowfield in "debug" mode
    if (debug) flowfield.display();
    // Tell all the vehicles to follow the flow field
    for (var i = 0; i < vehicles.length; i++) {
        vehicles[i].follow(flowfield);
        vehicles[i].run();
    }

}