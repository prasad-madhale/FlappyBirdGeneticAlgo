
const population = 250;
var bird = [];
var paused;
var obs = [];
var score = 0;
var maxScore = 0;
var deadBirds = [];
var slider;

function setup()
{
  createCanvas(600,700);

  slider = createSlider(1,100,1);

  for(let i=0;i<population;i++)
    bird[i] = new Bird();
}

function draw()
{
    background(240);
    // sky blue 0-191-255

    if(bird.length == 0)
      restart();

    for(let x = 0; x < slider.value();x++)
    {
      if(!paused)
      {
        if(frameCount % 100 == 0)
        {
          obs.push(new Obstacle());
        }

        for(let i=bird.length-1;i>=0;i--)
        {
          bird[i].update();
          if(obs.length > 0)
            bird[i].predict(obs);
        }

        for(let x=obs.length-1;x >= 0;x--)
        {
          obs[x].update();


          for(let j=bird.length-1;j>=0;j--)
          {
            if(obs[x].collides(bird[j]))
            {
              deadBirds.push(bird.splice(j,1)[0]);

              // The game was passed and restarted when the bird hit a pipe but
              // now for GA we need to keep the game moving for rest of the population
              //this.paused = true;
              //restart();
              //setTimeout(restart,1500);
            }
            else {
              if(obs[x].pass(bird[j]))
                  score++;
            }
          }
          if(obs[x].offscreen())
          {
            obs.splice(x,1);
          }
        }
      }
    }

    for(let o of obs)
    {
      o.show();
    }

    for(let b of bird)
      b.show();

    showScore();
}

function restart()
{
  nextGeneration();
  resetGame();
  loop();
}

function resetGame()
{
    obs = [];
    deadBirds = [];
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
}

function showScore()
{
  textSize(25);
  text("Score: "+score,50,50);

  text("Highscore: "+maxScore,50,100);
}
