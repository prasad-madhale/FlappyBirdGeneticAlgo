# Flappy Bird playing agent using Genetic Algorithm
Demonstrates a Flappy Bird game playing bot trained using Genetic Algorithm and a FeedForward Neural Network developed from scratch using p5.js.

#### Genetic Algorithm Overview
1. Initially a large population of Birds (around 500) is spawned in the game. They start taking random decisions which can be either to jump or not jump.
2. When all the birds die, the respective fitness scores of each bird is calculated. And the birds with highest fitness scores are selected for creation of next generation.
 ###### **Fitness Calculation:**
Each bird has an individual score(GAscore) which is total number of frames it survived.

 Each bird's individual fitness is calculated by:

 *Individual Bird Fitness = Individual Bird Score(GAscore) / Sum of all the birds individual score*




3. The next generation of birds is created using mutation and cross-over. The decision making module of the bird is called it's brain which is a FeedForward Neural Network.
 ###### **Mutation:**
Mutation is achieved by slightly changing the weights of the different layers of the Neural Network to obtain a mutated version of the Network (brain). Rate of mutation is set to 0.1
 ###### **Cross-over:**
There can be multiply strategies of performing cross-over but here I have used the simplest strategy which is to duplicate the same bird's brain.

4. Place the new off-springs in the new population and continue to run algorithm on this new generation.

5. Loop - Go to Step 2.

#### Neural Network Overview:
The NN used here consists of 5 input nodes, 8 hidden nodes and 2 output nodes.

The Neural Network takes following inputs:

1. Bird's y position
2. Height of top portion of the nearest obstacle in front of the bird
3. Height of the bottom portion of the nearest obstacle in front of the bird
4. Width of the nearest obstacle in front of the bird
5. Bird's velocity in y direction

*All inputs are mapped between 0 and 1*

Learn more about the NN: [Neural Network notes](https://github.com/prasadchelsea33/NeuralNetworkJS/blob/master/README.md)
