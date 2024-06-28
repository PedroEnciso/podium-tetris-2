import React from "react";
import styled from "styled-components";
import style from "./StatusRow.module.css";

const Container = styled.div`
  transition: background-color 0.5s;
  font-family: "VT323", monospace;
`;

const Title = styled.div`
  width: 100%;
  font-size: 1.25rem;
  text-align: center;
`;

const Value = styled.div`
  width: 100%;
  font-size: 2rem;
  text-align: center;
  color: white;
`;

const StatusRow = ({
  title,
  value,
  padding,
  margin,
  borderSize,
  portrait,
  backgroundColor,
}) => {
  let color;
  switch (title) {
    case "SCORE":
      color = style.score;
      break;
    case "LEVEL":
      color = style.level;
      break;
    case "LINES":
      color = style.lines;
      break;
  }

  return (
    <Container
      $portrait={portrait}
      $padding={padding}
      $margin={margin}
      $borderSize={borderSize}
      $backgroundColor={backgroundColor}
    >
      <Title className={color}>{title}</Title>
      <Value>{value}</Value>
    </Container>
  );
};

export default StatusRow;
