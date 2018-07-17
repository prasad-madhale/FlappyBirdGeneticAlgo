
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
      this.brain = new NeuralNetwork(5,8,2);
    }
  }

  show()
  {
    stroke(0);
    fill(0);
    image(birdImg,this.x,this.y,80,80);
  }

  // uses neural NeuralNetwork to predict birds moves (which are a lift or not)
  predict(obs)
  {
      var closest = this.closestObstacle(obs);

      var inputs = [];
      // inputs[0] = map(closestObs.x,this.x,width,0,1);
      // inputs[1] = map(closestObs.top,0,height,0,1);
      // inputs[2] = map(closestObs.bottom,0,height,0,1);
      // inputs[3] = map(this.y+40,0,height,0,1);
      // inputs[4] = map(this.yvelocity,-10,10,0,1);

      inputs[0] = this.y / height;
      inputs[1] = closest.top / height;
      inputs[2] = closest.bottom / height;
      inputs[3] = closest.x / width;
      inputs[4] = this.yvelocity / 10;

      let output = this.brain.predict(inputs);

      if(output[0] > output[1])
      {
        this.lift();
      }
  }

  // figures out the closed pipe in front of the bird
  closestObstacle(obs)
  {
    let closestObs = null;
    let closestDistance = Infinity;

    for(let x = 0; x < obs.length; x++)
    {
      let distance = (obs[x].x + obs[x].width) - this.x;

      if(distance < closestDistance && distance > 0)
      {
        closestObs = obs[x];
        closestDistance = distance;
      }
    }

    return closestObs;
  }

  update()
  {
    this.yvelocity += this.gravity;
    this.yvelocity *= 0.99;
    this.y += this.yvelocity;

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

    this.gascore++;
  }

  offscreen()
  {
    // when bird hits the bottom
    if(this.y >= height-45)
    {
      return true;
    }

    return false;
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
