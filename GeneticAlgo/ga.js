
  // creates new generation of birds
  function nextGeneration()
  {
    calculateFitness();

    for(let i=0;i<population;i++)
      bird[i] = pickBird();

    deadBirds = [];
  }

  // picks bird for reproduction on random
  function pickBird()
  {
    var randomBird;
    let index = 0;
    let r = random(1);

    while(r > 0)
    {
      r = r - deadBirds[index].fitness;
      index++;
    }
    index--;
    randomBird = deadBirds[index];

    var newBird = new Bird(randomBird.brain);
    newBird.mutate(0.1);
    return newBird;
  }

  // sets fitness of each bird
  function calculateFitness()
  {
    var sum = 0;

    for(let b of deadBirds)
    {
      sum += b.gascore;
    }

    for(let b of deadBirds)
    {
      b.fitness = b.gascore / sum;
    }
  }
