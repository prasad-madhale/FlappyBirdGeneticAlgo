
var bird;
var paused;
var obs = [];
var score = 0;
var maxScore = 0;
var slider;
var count = 0;
var birdJSON;

function preload()
{
  birdJSON = loadJSON("bestBird2.json");
}

function setup()
{
  createCanvas(600,700);
  slider = createSlider(1,10,1);

  console.log(birdJSON);

  // let birdBrain = NeuralNetwork.deserialize(birdJSON);
  bird = new Bird();
}

function draw()
{
  background(240);
  // sky blue 0-191-255

  for(let x = 0; x < slider.value();x++)
  {
    if(bird.length == 0)
      restart();

    if(!paused)
    {
      if(count % 75 == 0)
      {
        obs.push(new Obstacle());
      }
      count++;

      bird.update()
      bird.predict(obs);

      for(let x=obs.length-1;x >= 0;x--)
      {
        obs[x].update();

        if(obs[x].collides(bird) || bird.offscreen())
        {
          restart();
        }
        else {
          if(obs[x].pass(bird))
              score++;
        }
      }

      if(obs[x].offscreen())
      {
        obs.splice(x,1);
      }
    }
  }

  for(let o of obs)
  {
    o.show();
  }

  bird.show();
  showScore();
}

function restart()
{
  resetGame();
  loop();
}

function resetGame()
{
    count = 0;
    obs = [];
    paused = false;
    maxScore = max(score,maxScore);
    score = 0;
}

function keyPressed()
{
  if(key == ' ')
  {
    bird.lift();
  }

  if(key == 'P')
  {
    paused = !paused;
  }

  if(key == 'E')
  {
    restart();
  }

  if(key == 'S')
  {
    let bestBird;
    let max = -Infinity;

    for(let b of bird)
    {
      let birdScore = b.gascore;

      if(birdScore > max)
      {
        bestBird = b;
        max = birdScore;
      }
    }

    console.log("Saved the best bird yet!");
    saveJSON(bestBird.brain,"bestBird.json");
  }
}

function loadBird(bestBirdJSON)
{
  let bestBird = NeuralNetwork.deserialize(bestBirdJSON);
  bird[0] = new Bird(bestBird);
}

function showScore()
{
  fill(0);
  textSize(25);
  text("Score: "+score,50,50);
  text("Highscore: "+maxScore,50,100);
}
