
const population = 500;
var bird = [];
var paused;
var obs = [];
var score = 0;
var maxScore = 0;
var deadBirds = [];
var slider;
var count = 0;
var birdJSON;
var birdImg;
var canvas;
var speed;


function preload()
{
  birdImg = loadImage('./assets/bird.png');
}

function setup()
{
  canvas = createCanvas(600,700);

  // creates slider to control game speed
  slider = createSlider(1,10,1);
  speed = createElement('h3','Speed: '+slider.value()+'x');

  // spawn entire population of birds
  for(let i=0;i<population;i++)
    bird[i] = new Bird();
}

function draw()
{
    background(240);

    // speed up the game
    for(let x = 0; x < slider.value();x++)
    {
      // restart when all birds are dead
      if(bird.length == 0)
        restart();

      // when unpaused
      if(!paused)
      {
        // creates new obstacle every 75 frames
        if(count % 75 == 0)
        {
          obs.push(new Obstacle());
        }
        count++;

        // for each bird
        for(let i=bird.length-1;i>=0;i--)
        {
          // update each bird
          bird[i].update();

          // take decision
          if(obs.length > 0)
            bird[i].predict(obs);
        }

        // for each obstacle
        for(let x=obs.length-1;x >= 0;x--)
        {
          // update obstacle location
          obs[x].update();


          for(let j=bird.length-1;j>=0;j--)
          {
            // checks collision between obstacles and the bird
            if(obs[x].collides(bird[j]) || bird[j].offscreen())
            {
              // add the birds who haved died to deadBirds
              deadBirds.push(bird.splice(j,1)[0]);
            }
            else {
              // increase score when bird passes through an obstacle
              if(obs[x].pass(bird[j]))
                  score++;
            }
          }

          // delete obstacle when it goes off the screen
          if(obs[x].offscreen())
          {
            obs.splice(x,1);
          }
        }
      }
    }

    // display all the obstacles
    for(let o of obs)
    {
      o.show();
    }

    // display all the birds
    for(let b of bird)
      b.show();

    showScore();

    // displays the speed at which the game is running below the slider
    speed.html('Speed: '+slider.value()+'x');
}


// restart the game by spawning next generation
function restart()
{
  // spawns the next generation of birds
  nextGeneration();
  resetGame();
  loop();
}

// resets all the game parameters
function resetGame()
{
    count = 0;
    obs = [];
    paused = false;
    maxScore = max(score,maxScore);
    score = 0;
}

// handles keypress events
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

  // saves the best bird in the game
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
    saveJSON(bestBird.brain,"bestBird.json");
  }
}


function showScore()
{
  fill(0);
  textSize(25);
  text("Score: "+score,50,50);
  text("Highscore: "+maxScore,50,100);
}
