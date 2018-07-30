
var bird = [];
var paused;
var obs = [];
var score = 0;
var maxScore = 0;
var count = 0;
var birdJSON;
var birdImg;
var speed;

function preload()
{
  birdJSON = loadJSON('bestBird.json');
  birdImg = loadImage('./assets/bird.png');
}

function setup()
{
  createCanvas(600,700);

  loadBird(birdJSON);
}

function draw()
{
  background(240);
  // sky blue 0-191-255


  // speed up the game
  for(let x = 0; x < 1;x++)
  {
    // restart on death of bird
    if(bird.length == 0)
      restart();

    // when game is unpaused
    if(!paused)
    {
      // create obstacles per 75 frames
      if(count % 75 == 0)
      {
        obs.push(new Obstacle());
      }
      count++;

      // updates bird position,speed
      bird[0].update()
      // predicts the next move based on NeuralNetwork brain
      bird[0].predict(obs);

      // draw all the obstacles
      for(let x=obs.length-1;x >= 0;x--)
      {
        // update all obstacle position
        obs[x].update();

        // handles collision between bird and obstacles
        if(obs[x].collides(bird[0]) || bird[0].offscreen())
        {
          restart();
        }
        else {
          // increases score when bird passes through an obstacle
          if(obs[x].pass(bird[0]))
              score++;
        }
      }

      // delete obstacles when they go offscreen
      if(obs[x].offscreen())
      {
        obs.splice(x,1);
      }
    }
  }

  // display all obstacles
  for(let o of obs)
  {
    o.show();
  }

  // display the bird
  bird[0].show();
  // display scores
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

// handle key press events
function keyPressed()
{
  if(key == 'P')
  {
    paused = !paused;
  }

  if(key == 'E')
  {
    restart();
  }
}

// loads the bird brain from JSON file
function loadBird(birdJSON)
{
  let bestBird = NeuralNetwork.deserialize(birdJSON);
  bird[0] = new Bird(bestBird);
}

function showScore()
{
  fill(0);
  textSize(25);
  text("Score: "+score,50,50);
  text("Highscore: "+maxScore,50,100);
}
