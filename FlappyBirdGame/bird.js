
var birdImg;

function preload()
{
  birdImg = loadImage("https://raw.githubusercontent.com/prasadchelsea33/FlappyBirdClone/master/assets/bird.png");
}

function Bird()
{
  this.x = width/2;
  this.y = height/2;
  this.yvelocity = 0;
  this.gravity = 0.3;
  this.brain = new NeuralNetwork(4,4,1);

  this.show = function()
  {
    fill(0);
    image(birdImg,this.x,this.y,80,80);
  }

  this.predict = function(obs)
  {
      var closestObs = this.closestObstacle(obs);
      var inputs = [];
      inputs[0] = this.y / height;
      inputs[1] = closestObs.top / height;
      inputs[2] = closestObs.bottom / height;
      inputs[3] = closestObs.x / width;

      let output = this.brain.feedforward(inputs);

      if(output < 0.5)
      {
        this.lift();
      }
  }

  this.closestObstacle = function(obs)
  {
    let closestObs = obs[0];
    let closestDistance = Infinity;

    for(let x = 0; x < obs.length; x++)
    {
      let distance = obs[x].x - this.x;

      if(distance < closestDistance)
      {
        closestObstacle = obs[x];
        closestDistance = distance;
      }
    }

    return closestObs;
  }

  this.update = function()
  {
    this.yvelocity += this.gravity;
    this.yvelocity *= 0.99;
    this.y += this.yvelocity;

    if(this.y > height || this.y < -80)
    {
      this.reset();
    }

    if(this.yvelocity >= 10)
      this.yvelocity = 10;
    if(this.yvelocity <= -10)
      this.yvelocity = -10;

  }

  this.reset = function()
  {
    this.x = width/2;
    this.y = height/2;
    this.yvelocity = 0;
    obs = [];
  }

  this.lift = function()
  {
    this.yvelocity += -10;
  }
}
