
  // creates new generation of birds
  function nextGeneration()
  {
    // calculates fitness of each bird before creating new generation
    calculateFitness();

    // picks which birds to carry forward to the new generation out of the
    // dead birds
    for(let i=0;i<population;i++)
      bird[i] = pickBird();

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
