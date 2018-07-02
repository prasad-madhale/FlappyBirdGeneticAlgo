
function Obstacle()
{
  var topRand = Math.abs(random(170,height) - 120);
  this.top = topRand;
  this.bottom = height - (this.top + 120);
  this.x = width;
  this.width  = 30;
  this.speed = 3;
  this.passed = false;

  this.show = function()
  {
    fill( 0,191,255);
    rect(this.x, 0,this.width,this.top);
    rect(this.x, height-this.bottom,this.width,this.bottom);
  }

  this.update = function()
  {
    this.x -= this.speed;
  }

  this.offscreen = function()
  {
    if(this.x < -this.width)
      return true;

    return false;
  }

  this.collides = function(bird)
  {
    if((bird.y+40) < this.top || (bird.y+40) > (height - this.bottom))
    {
      if((bird.x+40) > this.x && (bird.x+40) < (this.x + this.width))
        {
          this.passed = false;
          return true;
        }
    }

    return false;
  }

  this.pass = function(bird)
  {
    if((bird.x+40) > (this.x + this.width) && !this.passed)
    {
      this.passed = true;
      return true;
    }

    return false;
  }
}
