import React from "react";
import styled from "styled-components";

const Container = styled.div`
  transition: background-color 0.5s;
  padding: 15px;
  font-family: "VT323", monospace;
`;

const Title = styled.div`
  width: 100%;
  font-size: 1.25rem;
  text-align: center;
  color: white;
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
}) => (
  <Container
    $portrait={portrait}
    $padding={padding}
    $margin={margin}
    $borderSize={borderSize}
    $backgroundColor={backgroundColor}
  >
    <Title $portrait={portrait}>{title}</Title>
    <Value>{value}</Value>
  </Container>
);

export default StatusRow;
