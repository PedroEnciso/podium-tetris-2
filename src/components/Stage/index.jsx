import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
import style from "./Stage.module.css";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import StatusRow from "../StatusRow";
import GameOverController from "../GameOverController";

import Color from "color";
import { useGameMode } from "../../context/game-mode-context";

const Game = styled.div`
  width: 100vw;
  /* height: ${(props) => (props.$portrait ? "95" : "100")}vh; */
  /* height: 100vh; */
  height: 100svh;
  overflow: hidden;
  padding: 2rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerNext = styled.div``;

const Next = styled.div`
  /* width: ${(props) => props.$pixelSize * 3}px;
  height: ${(props) => props.$pixelSize * 3}px; */
  transition: background-color 0.5;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-bottom: ${(props) =>
    props.$portrait ? 0 : props.$pixelSize / 3}px;
  margin-right: ${(props) =>
    !props.$portrait ? 0 : props.$pixelSize / 3}px; */
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* height: 20px; */
  /* height: ${(props) =>
    props.$stage ? props.$pixelSize : props.$pixelSize / 1.6}px; */
`;

const Pixel = React.memo(styled.div`
  /* height: clamp(25px, calc(80% / 10), 45px);
  width: clamp(25px, calc(80% / 10), 45px); */
  background-color: ${(props) =>
    props.$fill === 1 ? props.$color : "inherited"};
  position: relative;
  z-index: ${(props) => props.$zIndex};

  ${(props) =>
    props.$paused &&
    `
		transition: all 1s;
	`};

  ${(props) =>
    props.$fill &&
    props.$theme3d &&
    `;
    box-shadow: calc(clamp(25px, calc(80% / 10), 45px) / 4.16) calc(clamp(25px, calc(80% / 10), 45px) / 4.16) calc(clamp(25px, calc(80% / 10), 45px) / 5.55) #222${
      props.$topBloco
        ? `, 0 calc(clamp(25px, calc(80% / 10) 0 ${Color(props.$color).lighten(
            0.2
          )}`
        : ""
    } 
	`};

  ${(props) =>
    !props.$theme3d &&
    `
		border-left: 1px solid ${
      props.$stage || props.$fill || props.$hint ? "#222" : "black"
    };
		border-top: 1px solid ${
      props.$stage || props.$fill || props.$hint ? "#222" : "black"
    };	
	`};

  ${(props) =>
    props.$hint &&
    `
		border: 1px solid ${Color(props.$playerColor).alpha(0.5)};
		background-color: rgba(255,255,255,0.1);
	`};
`);

const ContainerStatus = styled.div``;

const getRenderizacaoBloco = (bloco) => {
  let trimRowBloco = [];
  let sumColumn = {};
  bloco.forEach((row, y) => {
    let rowSum = 0;
    row.forEach((pixel) => (rowSum = rowSum + pixel));
    if (rowSum > 0) trimRowBloco.push(row);
    row.forEach((pixel, x) => {
      sumColumn[x] = (sumColumn[x] ? sumColumn[x] : 0) + pixel;
    });
  });
  let trimBloco = [];
  trimRowBloco.forEach((row, y) => {
    let newRow = [];
    row.forEach((pixel, x) => {
      if (sumColumn[x] > 0) newRow.push(pixel);
    });
    trimBloco.push(newRow);
  });
  return trimBloco;
};

const Stage = ({
  lose,
  restartClick,
  map,
  player,
  hint,
  status,
  paused,
  ...others
}) => {
  const [pixelSize, setPixelSize] = useState(30);
  const [portrait, setPortrait] = useState(false);
  const { width, height } = useWindowDimensions();
  const [theme3d, setTheme3d] = useState(false);
  const [nextRender, setNextRender] = useState();
  const stageRef = useRef(null);

  useEffect(() => {
    let pixelSizeHeight = height / 20;
    let pixelSizeWidth = width / 32;
    if (portrait) {
      pixelSizeHeight = height / 26;
      // adjusting this value to make the vview fully visible on mobile devices
      // a larger number makes each cell smaller
      // original value as 12
      pixelSizeWidth = width / 18;
    }
    setPixelSize(
      pixelSizeWidth < pixelSizeHeight ? pixelSizeWidth : pixelSizeHeight
    );
    setPortrait(height > width);
  }, [width, height, portrait]);

  useEffect(() => {
    if (!player.next) return;
    setNextRender(getRenderizacaoBloco(player.next.bloco));
  }, [player.next]);

  useEffect(() => {
    if (!lose) {
      stageRef.current.focus();
    }
  }, [lose]);

  useEffect(() => {
    stageRef.current.focus();
  }, [theme3d]);

  const { gameMode } = useGameMode();
  const gameModeLgRef = useRef();
  const gameModeSmRef = useRef();
  const tl = useRef();
  useGsapHook(tl, gameModeLgRef, gameModeSmRef, status.score, gameMode);

  return (
    <>
      <Game $portrait={portrait} className={style.game_container}>
        <div className={style.game_inside_container}>
          {nextRender && (
            <ContainerNext
              className={style.container_next}
              $portrait={portrait}
              $pixelSize={pixelSize}
            >
              <Next
                $portrait={portrait}
                $theme3d={theme3d}
                $pixelSize={pixelSize}
              >
                {nextRender.map((row, y) => (
                  <Row
                    className={style.next_row}
                    $pixelSize={pixelSize}
                    key={`row-${y}`}
                  >
                    {row.map((pixel, x) => {
                      let topBloco =
                        pixel && (!nextRender[y - 1] || !nextRender[y - 1][x]);
                      return (
                        <Pixel
                          className={style.next_pixel}
                          $paused={paused}
                          $theme3d={theme3d}
                          $topBloco={topBloco}
                          $zIndex={y}
                          $pixelSize={pixelSize}
                          key={`pixel-${x}`}
                          $fill={pixel}
                          $color={player.next.color}
                        />
                      );
                    })}
                  </Row>
                ))}
              </Next>
              <div
                className={`${style.mode_container} ${style.small_container}`}
              >
                {/* <p className={style.mode_title}>MODE</p> */}
                <p className={style.mode} ref={gameModeSmRef}>
                  {gameMode}
                </p>
              </div>
            </ContainerNext>
          )}
          <div className={style.stage_mode_container}>
            <div className={`${style.mode_container} ${style.large_container}`}>
              <p className={style.mode_title}>MODE</p>
              <p className={style.mode} ref={gameModeLgRef}>
                {gameMode}
              </p>
            </div>
            {map && (
              <div
                className={style.stage}
                ref={stageRef}
                {...others}
                id="stage"
              >
                {map.map((row, y) => (
                  <Row $stage="true" $pixelSize={pixelSize} key={`row-${y}`}>
                    {row.map((pixel, x) => {
                      let playerFill =
                        player.bloco.bloco[y - player.pos[0]] &&
                        player.bloco.bloco[y - player.pos[0]][
                          x - player.pos[1]
                        ];
                      let playerHint =
                        hint.bloco.bloco[y - hint.pos[0]] &&
                        hint.bloco.bloco[y - hint.pos[0]][x - hint.pos[1]];
                      let topBloco =
                        (playerFill || pixel.fill) &&
                        (!player.bloco.bloco[y - player.pos[0] - 1] ||
                          !player.bloco.bloco[y - player.pos[0] - 1][
                            x - player.pos[1]
                          ]) &&
                        (!map[y - 1] || !map[y - 1][x].fill);
                      let zIndex =
                        !playerFill && !pixel.fill && playerHint ? 99 : y;
                      return (
                        <Pixel
                          className={style.pixel}
                          $paused={paused}
                          $theme3d={theme3d}
                          $hint={!pixel.fill && !playerFill && playerHint}
                          $pixelSize={pixelSize}
                          $stage="true"
                          key={`pixel-${x}`}
                          $fill={pixel.fill || playerFill}
                          $color={playerFill ? player.bloco.color : pixel.color}
                          $playerColor={player.bloco.color}
                          $topBloco={topBloco}
                          $zIndex={zIndex}
                        ></Pixel>
                      );
                    })}
                  </Row>
                ))}
              </div>
            )}
          </div>
          {status && (
            <ContainerStatus
              className={style.status_container}
              $portrait={portrait}
              $pixelSize={pixelSize}
            >
              <StatusRow
                backgroundColor={theme3d ? "#444" : "black"}
                portrait={portrait}
                borderSize={pixelSize / 10}
                margin={pixelSize / 3}
                padding={pixelSize / 2}
                title="SCORE"
                value={status.score}
              />
              <StatusRow
                backgroundColor={theme3d ? "#444" : "black"}
                portrait={portrait}
                borderSize={pixelSize / 10}
                margin={pixelSize / 3}
                padding={pixelSize / 2}
                title="LEVEL"
                value={status.level}
              />
              <StatusRow
                backgroundColor={theme3d ? "#444" : "black"}
                portrait={portrait}
                borderSize={pixelSize / 10}
                margin={pixelSize / 3}
                padding={pixelSize / 2}
                title="LINES"
                value={status.lines}
              />
            </ContainerStatus>
          )}
        </div>
      </Game>
      {lose ? (
        <GameOverController restartClick={restartClick} status={status} />
      ) : null}
    </>
  );
};

export default Stage;

const useGsapHook = (tl, ref1, ref2, score, gameMode) => {
  useGSAP(
    () => {
      if (score === 0) return;
      tl.current = gsap
        .timeline()
        .to(ref1.current, {
          rotation: -15,
          scale: 1.75,
          duration: 0.1,
        })
        .to(ref1.current, { rotation: 15, duration: 0.2 })
        .to(ref1.current, { rotation: -15, duration: 0.2 })
        .to(ref1.current, { rotation: 15, duration: 0.2 })
        .to(ref1.current, { rotation: -15, duration: 0.2 })
        .to(ref1.current, { rotation: 15, duration: 0.2 })
        .to(ref1.current, { rotation: 0, scale: 1, duration: 0.1 });
      tl.current = gsap
        .timeline()
        .to(ref2.current, {
          rotation: -15,
          scale: 1.75,
          duration: 0.1,
        })
        .to(ref2.current, { rotation: 15, duration: 0.2 })
        .to(ref2.current, { rotation: -15, duration: 0.2 })
        .to(ref2.current, { rotation: 15, duration: 0.2 })
        .to(ref2.current, { rotation: -15, duration: 0.2 })
        .to(ref2.current, { rotation: 15, duration: 0.2 })
        .to(ref2.current, { rotation: 0, scale: 1, duration: 0.1 });
    },
    { dependencies: [gameMode] }
  );
};
