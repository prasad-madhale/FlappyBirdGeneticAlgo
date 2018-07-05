
var birdImg;

function preload()
{
  birdImg = loadImage("https://raw.githubusercontent.com/prasadchelsea33/FlappyBirdClone/master/assets/bird.png");
}

class Bird
{
  constructor(brain)
  {
    this.x = width/2;
    this.y = height/2;
    this.yvelocity = 0;
    this.gravity = 0.3;
    this.gascore = 0;
    this.fitness = 0;

    if(brain)
    {
      this.brain = brain.copy();
    }
    else {
      this.brain = new NeuralNetwork(4,4,2);
    }
  }

  show()
  {
    fill(0);
    image(birdImg,this.x,this.y,80,80);
  }

  // uses neural NeuralNetwork to predict birds moves (which are a lift or not)
  predict(obs)
  {
      var closestObs = this.closestObstacle(obs);
      var inputs = [];
      inputs[0] = this.y / height;
      inputs[1] = closestObs.top / height;
      inputs[2] = closestObs.bottom / height;
      inputs[3] = closestObs.x / width;

      let output = this.brain.predict(inputs);

      if(output[0] > 0.5)
      {
        this.lift();
      }
  }

  // figures out the closed pipe in front of the bird
  closestObstacle(obs)
  {
    let closestObs = obs[0];
    let closestDistance = Infinity;

    for(let x = 0; x < obs.length; x++)
    {
      let distance = obs[x].x - this.x;

      if(distance < closestDistance)
      {
        closestObs = obs[x];
        closestDistance = distance;
      }
    }

    return closestObs;
  }

  update()
  {
    this.gascore++;
    this.yvelocity += this.gravity;
    this.yvelocity *= 0.99;
    this.y += this.yvelocity;

    // when bird hits the bottom keep them there
    if(this.y >= height-45)
    {
      this.y=height-45;
      this.yvelocity = 0;
    }

    // when bird hits the top keep them there
    if(this.y <= -25)
    {
        this.y = -25;
        this.yvelocity = 0;
    }

    // regulate the velocity
    if(this.yvelocity >= 10)
      this.yvelocity = 10;
    if(this.yvelocity <= -10)
      this.yvelocity = -10;

  }

  reset()
  {
    this.x = width/2;
    this.y = height/2;
    this.yvelocity = 0;
    obs = [];
  }

  lift()
  {
    this.yvelocity += -10;
  }

  mutate(rate)
  {
    this.brain.mutate(rate);
  }
}
