
// minimum spacing between the top and bottom of an obstacle
const SPACING = 175;
const BIRDOFFSET = 40;

// all instances of the Obstacle class represent and obstacle in the Game
// obstacle has the following attributes:
    // top - height of the top portion of the obstacle
    // bottom - height of the bottom portion of the obstacle
    // width - width of the obstacle
    // speed - speed at which the obstacles move
    // passed - true if the bird has passed this obstacle else false

function Obstacle()
{
  var topRand = Math.abs(random(170,height) - SPACING);
  this.top = topRand;
  this.bottom = height - (this.top + SPACING);
  this.x = width;
  this.width  = 30;
  this.speed = 3;
  this.passed = false;

  // displays the obstacle
  this.show = function()
  {
    fill( 0,191,255);
    rect(this.x, 0,this.width,this.top);
    rect(this.x, height-this.bottom,this.width,this.bottom);
  }

  // updates the position of the obstacle based on it's speeds
  this.update = function()
  {
    this.x -= this.speed;
  }

  // returns true if the obstacle is off the offscreen else false
  this.offscreen = function()
  {
    if(this.x < -this.width)
      return true;

    return false;
  }

  // returns true if an obstacle has collided with a bird else false
  this.collides = function(bird)
  {
    if((bird.y+BIRDOFFSET) < this.top || (bird.y+BIRDOFFSET) > (height - this.bottom))
    {
      if((bird.x+BIRDOFFSET) > this.x && (bird.x+BIRDOFFSET) < (this.x + this.width))
        {
          this.passed = false;
          return true;
        }
    }

    return false;
  }

  // returns true if a bird has passed through an obstacle else false
  this.pass = function(bird)
  {
    if((bird.x+BIRDOFFSET) > (this.x + this.width) && !this.passed)
    {
      this.passed = true;
      return true;
    }

    return false;
  }
}
