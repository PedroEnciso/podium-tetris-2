# React Tetris

## Game Modes

The game always starts on original mode, and randomly changes everytime the player increases their level. If the randomly chosen mode is the same as the current mode, the game is changed to original mode. This gives the user a break and does not allow them to play a weird mode for two consecutive levels.

### Original

The original rules and expected behavior of Tetris.

### Inverted

Left and Right controls are swapped. All other behaviors are as expected in Oiginal Tetris. TODO: invert the behavior of gestures (mobile only).

### Surprise Block

The current block will change into a randomly generated block after the user presses a key or gestures. The game will not swap out the current block if the randomly generated block does not fit in the current space or if the current block is the same as the randomly generated block. TODO: test functionality with gestures.

### Random Speed

The block moves at a speed chosen randomly between 450ms, 350ms, 250ms and 150ms per tick. The speed updates every time the score changes.
