import React, { useState, useEffect, useRef } from "react";
import { useDrag } from "react-use-gesture";
import BarLoader from "react-spinners/BarLoader";

import Stage from "../Stage";
import { useInterval } from "../../hooks/useInterval";
import Center from "../Center";

import { PrintPlayerInMap } from "../../utils/Utils";

import { useGameMode } from "../../context/game-mode-context";
import { usePopUpContext } from "../../context/pop-up-context";
import { useServer } from "../../hooks/useServer";
import { useUserContext } from "../../context/user-context";

const STAGE_HEIGHT = 18;
const STAGE_WIDTH = 10;

const initialMap = [...new Array(STAGE_HEIGHT)].map(() =>
  [...new Array(STAGE_WIDTH)].map(() => ({ fill: 0, color: [] }))
);

const colors = [
  "#e54b4b",
  "#9a031e",
  "#fcdc4d",
  "#005397",
  "#0bbcd6",
  "#20ad65",
  "#f8ebee",
];

const I = {
  bloco: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

const O = {
  bloco: [
    [1, 1],
    [1, 1],
  ],
};

const T = {
  bloco: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
};

const J = {
  bloco: [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
};

const L = {
  bloco: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
};

const S = {
  bloco: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
};

const Z = {
  bloco: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

const getRandomBloco = () => {
  const blocos = [I, O, T, J, L, S, Z];
  const randomNumber = Math.floor(Math.random() * blocos.length);
  const bloco = blocos[randomNumber];
  bloco.color = colors[randomNumber];
  return bloco;
};
const getRandomPlayer = (player) => {
  let bloco, next;
  if (player)
    if (player.next) {
      bloco = JSON.parse(JSON.stringify(player.next));
      next = getRandomBloco();
    }
  if (!bloco) bloco = getRandomBloco();
  if (!next) next = getRandomBloco();
  const pos = [0, Math.floor(STAGE_WIDTH / 2 - 2 / 2)];
  return { pos, bloco, next };
};

const Game = () => {
  const [map, setMap] = useState(initialMap);
  const [player, setPlayer] = useState();
  const [down, setDown] = useState(false);
  const [pause, setPause] = useState(false);
  const [tick, setTick] = useState(Date.now());
  const [hintPlayer, setHintPlayer] = useState();
  const [spaceReleased, setSpaceReleased] = useState(true);
  const [lines, setlines] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(450);
  const [keyPresses, setKeyPresses] = useState(0);

  const { gameMode, setRandomMode, resetGameMode } = useGameMode();
  const { logNewKey, cheatIsActive, resetKeyLogger } = useKeyStrokeLogger();
  const { handlePopUpRows, handlePopUpScore } = usePopUpContext();
  const { postRequest: updateScore } = useServer("update");
  const { getNewGameId, gameId, errorGameId } = useUserContext();

  // increment key press
  function incrementKeyPress() {
    setKeyPresses((prev) => prev + 1);
  }
  // set key presses to 0
  function resetKeyPresses() {
    setKeyPresses(0);
  }

  useEffect(() => {
    const levelBaseScore = 1000;
    const nextLevel = level + 1;
    const nextLevelScore =
      (levelBaseScore * nextLevel * nextLevel * nextLevel) / 5;
    if (score >= nextLevelScore) setLevel(level + 1);
    // update the speed on score change if gameMode === random speed
    if (gameMode === "random speed") {
      setSpeed(getRandomSpeed());
    }
  }, [level, score]);

  // handle changing the game mode on every level change
  useEffect(() => {
    if (level !== 1) {
      setRandomMode();
    }
  }, [level]);

  // ref to keep track of the previous score
  const prevScoreRef = useRef(0);
  useEffect(() => {
    // pass the previous and current score to pop up handler
    handlePopUpScore(prevScoreRef.current, score);
    // update prev score
    prevScoreRef.current = score;
  }, [score]);

  // ref to handle previous level state
  const prevLinesRef = useRef(0);
  useEffect(() => {
    // update the popup with the change of lines
    const linesChange = lines - prevLinesRef.current;
    if (linesChange > 1) {
      handlePopUpRows(linesChange);
    }
    // re-assign previous lines
    prevLinesRef.current = lines;
  }, [lines]);

  const restartGame = () => {
    setMap(initialMap);
    setlines(0);
    setScore(0);
    setLevel(1);
    setDown(false);
    resetGameMode();
    setGameOver(false);
    resetKeyLogger();
    getNewGameId();
  };

  const loseGame = () => {
    setGameOver(true);
  };

  const drop = () => {
    if (!player) {
      setPlayer(getRandomPlayer());
      return;
    }
    setPlayer((player) => {
      const newPos = getNewPlayerPos("down");
      if (player.pos === newPos) {
        setMap((map) => {
          const mapWithPlayer = PrintPlayerInMap(player, map);
          const mapCleared = checkMap(mapWithPlayer);
          return mapCleared;
        });
        const newPlayer = getRandomPlayer(player);
        if (!validatePosition(newPlayer.pos, newPlayer.bloco)) loseGame();
        return newPlayer;
      }
      return { ...player, pos: newPos };
    });
  };

  const rotatePlayer = () => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    let mtrx = clonedPlayer.bloco.bloco.map((_, index) =>
      clonedPlayer.bloco.bloco.map((column) => column[index])
    );
    mtrx = mtrx.map((row) => row.reverse());
    if (validatePosition(player.pos, { bloco: mtrx }))
      setPlayer({ ...player, bloco: { ...player.bloco, bloco: mtrx } });
  };

  const keyUp = ({ keyCode }) => {
    if (pause || gameOver) return;
    const THRESHOLD = 80;
    // Activate the interval again when user releases down arrow.
    if (keyCode === 40) {
      setDown(false);
      if (Date.now() - tick <= THRESHOLD) drop();
    }
    if (keyCode === 32) setSpaceReleased(true);
  };

  const forwardDown = () => {
    if (pause || gameOver) return;
    setPlayer((player) => {
      const playerCopy = JSON.parse(JSON.stringify(player));
      playerCopy.pos = [...hintPlayer.pos];
      setMap((map) => {
        const mapWithPlayer = PrintPlayerInMap(playerCopy, map);
        const mapCleared = checkMap(mapWithPlayer);
        return mapCleared;
      });
      const newPlayer = getRandomPlayer(player);
      if (!validatePosition(newPlayer.pos, newPlayer.bloco)) loseGame();
      return newPlayer;
    });
  };

  const keyDown = ({ keyCode }) => {
    if (pause || gameOver) return;
    // handle surpriseBlock game mode
    if (gameMode === "surprise block") {
      // change the block every 9th key press
      const isSidewaysMove = keyCode === 37 || keyCode === 39;
      if (keyPresses > 9 && isSidewaysMove) {
        const newBloco = getRandomBloco();
        // check if the new block is valid in the current player's position and different than current block before switching
        if (
          validatePosition(player.pos, newBloco) &&
          player.bloco.color !== newBloco.color
        ) {
          // calculate the hint for the new bloco
          setPlayer({ ...player, bloco: newBloco });
          resetKeyPresses();
          return;
        }
      }
    }
    switch (keyCode) {
      case 37:
        setPlayer((player) => ({ ...player, pos: getNewPlayerPos("left") }));
        incrementKeyPress();
        logNewKey("left");
        break;
      case 38:
        rotatePlayer();
        logNewKey("up");
        break;
      case 39:
        setPlayer((player) => ({ ...player, pos: getNewPlayerPos("right") }));
        incrementKeyPress();
        logNewKey("right");
        break;
      case 40:
        setTick(Date.now());
        setDown(true);
        logNewKey("down");
        break;
      case 32:
        if (spaceReleased) {
          setSpaceReleased(false);
          forwardDown();
        }
        logNewKey("space");
        break;
      case 65:
        logNewKey("a");
        break;
      case 66:
        logNewKey("b");
        break;
      default:
        logNewKey("other");
        break;
    }
  };
  // key controls for inverted mode
  const keyDownInverted = ({ keyCode }) => {
    if (pause || gameOver) return;
    switch (keyCode) {
      case 37:
        setPlayer((player) => ({ ...player, pos: getNewPlayerPos("right") }));
        break;
      case 38:
        rotatePlayer();
        break;
      case 39:
        setPlayer((player) => ({ ...player, pos: getNewPlayerPos("left") }));
        break;
      case 40:
        setTick(Date.now());
        setDown(true);
        break;
      case 32:
        if (spaceReleased) {
          setSpaceReleased(false);
          forwardDown();
        }
        break;
      default:
        break;
    }
  };

  const checkMap = React.useCallback(
    (map) => {
      let rowsClear = [];
      map.forEach((row, y) => {
        let clear = true;
        row.forEach((pixel, x) => {
          if (pixel.fill === 0) clear = false;
        });
        if (clear) rowsClear.push(y);
      });
      if (rowsClear.length > 0) {
        let newMap = map.slice();
        rowsClear.forEach((y) => {
          for (let mapY = newMap.length - 1; mapY >= 0; mapY--)
            if (mapY <= y)
              if (mapY > 0) newMap[mapY] = newMap[mapY - 1];
              else
                newMap[mapY] = [...new Array(STAGE_WIDTH)].map(() => ({
                  fill: 0,
                  color: [],
                }));
        });
        setlines((quant) => quant + rowsClear.length);
        /// calc score
        const bonusLevel = 100 * (level * level);
        const bonusRows = 40 * (rowsClear.length * rowsClear.length - 1);
        setScore(
          (score) => score + 300 * rowsClear.length + bonusRows + bonusLevel
        );
        // send request to update score on server
        if (!errorGameId) {
          // only send if there was no error creating a game id
          updateScore({ lines: rowsClear.length, level, gameId });
        }
        return newMap;
      }
      return map;
    },
    [level]
  );

  const validatePosition = React.useCallback(
    (pos, bloco) => {
      for (let y = 0; y < bloco.bloco.length; y++)
        for (let x = 0; x < bloco.bloco[y].length; x++)
          if (bloco.bloco[y][x] === 1) {
            let mapY = pos[0] + y;
            let mapX = pos[1] + x;
            if (
              mapY > STAGE_HEIGHT ||
              mapX < 0 ||
              mapX > STAGE_WIDTH ||
              !map[mapY] ||
              !map[mapY][mapX] ||
              map[mapY][mapX].fill === 1
            )
              return false;
          }
      return true;
    },
    [map]
  );

  const calculateHintPlayer = React.useCallback(
    (player) => {
      const hintBloco = JSON.parse(JSON.stringify(player.bloco));
      let hintPosition = [...player.pos];
      while (
        validatePosition([hintPosition[0] + 1, hintPosition[1]], hintBloco)
      )
        hintPosition = [hintPosition[0] + 1, hintPosition[1]];
      return { pos: hintPosition, bloco: hintBloco };
    },
    [validatePosition]
  );

  const getNewPlayerPos = React.useCallback(
    (movement) => {
      let newPos;
      if (!player) return;
      if (movement === "down") newPos = [player.pos[0] + 1, player.pos[1]];
      if (movement === "left") newPos = [player.pos[0], player.pos[1] - 1];
      if (movement === "right") newPos = [player.pos[0], player.pos[1] + 1];
      if (!validatePosition(newPos, player.bloco)) return player.pos;
      return newPos;
    },
    [player, validatePosition]
  );

  function getRandomSpeed() {
    const SPEEDS = [450, 350, 250, 150];
    return SPEEDS[Math.floor(Math.random() * 4)];
  }

  let interval;
  if (gameMode === "random speed") {
    interval = pause || gameOver ? null : down ? 50 : speed;
  } else {
    interval = pause || gameOver ? null : down ? 50 : 450 - (level - 1) * 20;
  }

  useInterval(() => {
    drop();
  }, interval);

  useEffect(() => {
    if (!player) return;
    setHintPlayer(calculateHintPlayer(player));
  }, [player, calculateHintPlayer]);

  const bind = useDrag(
    ({ down, movement: [mx, my], velocity, cancel }) => {
      const THRESHOLD = 20;
      const FORCE_THRESHOLD = 1;
      if (down) {
        if (Math.abs(mx - dragX) > THRESHOLD) {
          if (mx - dragX > 0) {
            incrementKeyPress();
            if (keyPresses > 9 && gameMode === "surprise block") {
              const newBloco = getRandomBloco();
              // check if the new block is valid in the current player's position and different than current block before switching
              if (
                validatePosition(player.pos, newBloco) &&
                player.bloco.color !== newBloco.color
              ) {
                // calculate the hint for the new bloco
                setPlayer({ ...player, bloco: newBloco });
                resetKeyPresses();
                return;
              }
            }
            setPlayer((player) => ({
              ...player,
              pos: getNewPlayerPos(gameMode === "inverted" ? "left" : "right"),
              // pos: getNewPlayerPos("right"),
            }));
          } else {
            incrementKeyPress();
            setPlayer((player) => ({
              ...player,
              pos: getNewPlayerPos(gameMode === "inverted" ? "right" : "left"),
              // pos: getNewPlayerPos("left"),
            }));
          }
          setDragX(mx);
        }
        if (Math.abs(my - dragY) > THRESHOLD) {
          // fix attempt:
          // it seems like dragY is not able to update on some occasions. set it before calling forwardDown and drop
          if (velocity > FORCE_THRESHOLD) {
            if (spaceReleased) {
              console.log("my", my);
              console.log("dragy", dragY);
              console.log("velocity", velocity);
              console.log("releasing block");
              console.log(player.bloco.color);
              setDragY(my);
              setSpaceReleased(false);
              forwardDown();
            }
          } else if (my - dragY > 0) {
            console.log("drop");
            setDragY(my);
            drop();
          } else {
            setDragY(my);
          }
        }
      } else {
        setDragX(0);
        setDragY(0);
        setSpaceReleased(true);
      }
    },
    { filterTaps: true, lockDirection: true }
  );

  const displayScore = cheatIsActive ? 69 : score;
  const displayLines = cheatIsActive ? 69 : lines;
  const displayLevel = cheatIsActive ? 69 : level;

  if (!player || !map || !hintPlayer)
    return (
      <Center>
        <BarLoader color={"#C41212"} />
      </Center>
    );
  return (
    <Stage
      lose={gameOver}
      restartClick={() => restartGame()}
      map={map}
      player={player}
      hint={hintPlayer}
      paused={pause}
      status={{ lines: displayLines, score: displayScore, level: displayLevel }}
      onBlur={() => setPause(true)}
      onFocus={() => setPause(false)}
      tabIndex="0"
      onKeyUp={keyUp}
      onKeyDown={gameMode === "inverted" ? keyDownInverted : keyDown}
      onClick={() => rotatePlayer()}
      {...bind()}
    />
  );
};

export default Game;

// my custom hooks
const useKeyStrokeLogger = () => {
  const [keys, setKeys] = useState([]);
  const [cheatIsActive, setCheatIsActive] = useState(false);
  const { handlePopUpScore } = usePopUpContext();
  const TARGET = [
    "up",
    "up",
    "down",
    "down",
    "left",
    "right",
    "left",
    "right",
    "b",
    "a",
  ];

  function logNewKey(newKey) {
    let copyArray = [...keys];
    // check if the log array has length 8
    if (keys.length === TARGET.length) {
      // if it does, remove the first element of the array
      copyArray.shift();
    }
    // add the new key to the end of the array
    copyArray = [...copyArray, newKey];

    // check if the array matches the target array
    if (copyArray.length === TARGET.length) {
      const correctKeyStrokes = TARGET.filter(
        (item, index) => item === copyArray[index]
      );

      if (correctKeyStrokes.length === TARGET.length) {
        // if it does, set state to true
        setCheatIsActive(true);
        // activate the pop up
        handlePopUpScore(0, -1);
      }
    }
    setKeys(copyArray);
  }

  function resetKeyLogger() {
    setCheatIsActive(false);
  }

  return { logNewKey, cheatIsActive, resetKeyLogger };
};
