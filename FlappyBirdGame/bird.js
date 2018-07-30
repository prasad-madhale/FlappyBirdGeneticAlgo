
var birdImge

// each instance of class Bird represents a birds
// bird has the following attributes:
  // x - x position
  // y - y position
  // yvelocity - bird's velocity in y direction
  // gravity - gravitational force
  // gascore - bird's score
  // fitness - bird's fitness
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
    birdImge = birdImg;

    // if a brain is provided as argument a copy of that is used
    if(brain)
    {
      this.brain = brain.copy();
    }
    // new brain is created if not provided
    else {
      this.brain = new NeuralNetwork(5,8,2);
    }
  }

  // displays the bird on the canvas
  show()
  {
    stroke(0);
    fill(0);
    image(birdImge,this.x,this.y,80,80);
  }

  // uses neural NeuralNetwork to predict birds moves (which are a lift or not)
  predict(obs)
  {
      var closest = this.closestObstacle(obs);

      var inputs = [];

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

  // update birds position, velocity in the world
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

  // returns true if bird is off the screen else false
  offscreen()
  {
    // when bird hits the bottom
    if(this.y >= height-45)
    {
      return true;
    }

    return false;
  }

  // resets bird's position and velocity in the canvas world
  reset()
  {
    this.x = width/2;
    this.y = height/2;
    this.yvelocity = 0;
    obs = [];
  }

  // performs the jump
  lift()
  {
    this.yvelocity += -10;
  }

  // performs the mutate step in the genetic algorithm
  mutate(rate)
  {
    // mutate changes the weights of various layers of the neural network to obtain a
    // mutated brain(neural network)
    this.brain.mutate(rate);
  }
}
