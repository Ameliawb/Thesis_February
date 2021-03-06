//██████╗ ███████╗
//██╔══██╗██╔════╝
//██████╔╝███████╗
//██╔═══╝ ╚════██║
//██║     ███████║
//╚═╝     ╚══════╝              
        
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

function Vehicle(x, y, ms, mf) {
    this.position = new PVector(x, y);
    this.acceleration = new PVector(0, 0);
    this.velocity = new PVector(0, 0);
    this.r = 4;
    this.maxspeed = ms || 4;
    this.maxforce = mf || 0.1;
}

Vehicle.prototype.run = function() {
    this.update();
    this.borders();
    this.display();
}

// Implementing Reynolds' flow field following algorithm
// http://www.red3d.com/cwr/steer/FlowFollow.html
Vehicle.prototype.follow = function(flow) {
    // What is the vector at that spot in the flow field?
    var desired = flow.lookup(this.position);
    // Scale it up by maxspeed
    desired.mult(this.maxspeed);
    // Steering is desired minus velocity
    var steer = PVector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    this.applyForce(steer);
}

Vehicle.prototype.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
}

// Method to update location
Vehicle.prototype.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
}

// Wraparound
Vehicle.prototype.borders = function() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
}

Vehicle.prototype.display = function() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI / 2;
    var r = random(255);
    fill(127, 90, r, 3);
    stroke(100, r, r - 10, r);
    strokeWeight(3);
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    m = random(20)
    vertex(this.r, -this.r + 8);
    vertex(-2, -this.r * 7);
    vertex(-this.r, this.r * 12);
    vertex(-this.r, this.r * m + 7);
    vertex(this.r, this.r * 8);
    endShape(CLOSE);
    popMatrix();
}