
var bird;
var paused;
var obs = [];
var score = 0;
var maxScore = 0;

function setup()
{
  createCanvas(600,700);
  bird = new Bird();
}

function draw()
{
    background(240);
    // sky blue 0-191-255

    if(!paused)
    {
      if(frameCount % 100 == 0)
      {
        obs.push(new Obstacle());
      }

      bird.update();
      
      if(obs.length > 0)
        bird.predict(obs);

      for(let x=obs.length-1;x >= 0;x--)
      {
        obs[x].update();

        if(obs[x].collides(bird))
        {
          this.paused = true;
          restart();
          //setTimeout(restart,1500);
        }
        else {
          if(obs[x].pass(bird))
              score++;
        }

        if(obs[x].offscreen())
        {
          obs.splice(x,1);
        }
      }
    }

    for(let x=obs.length-1;x >= 0;x--)
    {
      obs[x].show();
    }

    bird.show();
    showScore();
}

function restart()
{
  bird.reset();
  resetGame();
  loop();
}

function resetGame()
{
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
}

function showScore()
{
  textSize(25);
  text("Score: "+score,50,50);

  text("Highscore: "+maxScore,50,100);
}
