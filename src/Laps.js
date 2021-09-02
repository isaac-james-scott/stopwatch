import React, { useState } from "react";
import styled from "styled-components";

export default function Laps(props) {
  const { laptime, index } = props;

  return (
    <Wrapper>
      <LapText>
        Lap: {index} Time: {laptime} seconds
      </LapText>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: whitesmoke;
  border-radius: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  width: 300px;
`;

const LapText = styled.p`
  padding-left: 20px;
`;
