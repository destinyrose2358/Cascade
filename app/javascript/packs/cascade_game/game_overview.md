# Game Overview
This area of code is concerned with controlling the game state for Cascade.

## Classes

### Game

**Variables:**
 - root: root node for the game state
 - players: an object of players
 - actions: an array full of received actions
 - deck: an instance of the Deck class
 - hand: Array of action cards for player hand

**Methods:**

 - update(): updates the game state
 - receiveAction(action): adds an action object to this.actions, and, when all players send an "end turn" action, runs update.
 - startRound(): adds 5 cards to this.hand, and then waits for the players to make their moves.

### SpaceNode

**Variables:**
 - startX: left bound
 - startY: top bound
 - endX: right bound
 - endY: bottom bound
 - game: reference to game object
 - contents: an object with each players tile count

**Methods:**

 - score(player): adds a players tile to the space
 - transferTiles(player, amount): moves a players tiles to a neighboring space
 - merge(location): searches through spaces then combines them with this space

### ConnectionNode

**Variables:**

 - startX: left bound
 - startY: top bound
 - endX: right bound
 - endY: bottom bound
 - xDivisions: number of x subdivisions
 - yDivisions: number of y subdivisions
 - neighbors: a 2d array of neighbors

**Methods:**

 - findNeighbor(x, y): returns the space at the given location.
 - findNeighbors(startX, startY, endX, endY, node): finds the minimum amount of nodes describing that region.
 - setNeighbor(x, y): sets the neighbor at specified index to node, and then calls update.
 - 