import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Laps from "./Laps";

// start, stop, lap, reset

export default function Stopwatch() {
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);
  const [time, setTime] = useState(0);
  const [StartIsActive, setStartIsActive] = useState(false);

  const handleStart = () => {
    setIsActive(true);
    setStartIsActive(true);
  };

  const handleStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setLaps([]);
    setStartIsActive(false);
  };

  const handleLap = () => {
    setLaps((l) => [...l, time]);
  };

  const handleDelete = (e) => {
    laps.splice(e.target.getAttribute("indexToDelete"), 1);
  };

  useEffect(() => {
    let interval = null;

    if (isActive === true) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  return (
    <Wrapper>
      <H1>Stopwatch</H1>
      <Timer>
        {Math.floor(time / 60) + ":" + ("0" + (time % 60)).slice(-2)}
      </Timer>
      <ButtonWrapper>
        <ControlButton
          onClick={handleStart}
          style={{ display: StartIsActive ? "none" : "block" }}
        >
          Start
        </ControlButton>
        <ControlButton
          onClick={handleStop}
          style={{ display: StartIsActive ? "block" : "none" }}
        >
          {isActive ? "Stop" : "Start"}
        </ControlButton>
        <ControlButton
          onClick={handleReset}
          style={{ display: StartIsActive ? "block" : "none" }}
        >
          Reset
        </ControlButton>
      </ButtonWrapper>
      <LapButton
        onClick={handleLap}
        style={{ display: StartIsActive ? "block" : "none" }}
      >
        Lap
      </LapButton>
      <Grid>
        {laps.map((lap, index) => (
          <LapWrapper>
            <Laps key={lap} index={index + 1} laptime={lap} />
            <DeleteButton indexToDelete={index} onClick={handleDelete}>
              X
            </DeleteButton>
          </LapWrapper>
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 500;
`;

const H1 = styled.h1`
  font-size: 40px;
  color: black;
`;

const Timer = styled.div`
  width: 315px;
  height: 315px;
  background: whitesmoke;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

const ButtonWrapper = styled.div`
  padding: 20px;
`;

const ControlButton = styled.button`
  width: 315px;
  height: 50px;
  border-radius: 30px;
  font-weight: 600;
  background: whitesmoke;
  border: none;
  margin: 5px;

  :hover {
    background: grey;
  }
`;

const LapButton = styled(ControlButton)`
  width: 315px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 5px;
  width: 315px;
  height: 50px;
  box-sizing: border-box;
  padding-top: 30px;
`;

const DeleteButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  border: none;

  :hover {
    background: red;
  }
`;

const LapWrapper = styled.div`
  display: flex;
`;
