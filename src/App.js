//TODO: STEP 1 - Import the useState hook.
import React, {useState, useEffect} from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App(props) {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [quarter, setQuarter] = useState(1)
  const [time, setTime] = useState(0)
  const [paused, setPaused] = useState(true)

  function scoreHandler(name, inc) {
    if (name === props.home) {
      setHomeScore(homeScore + inc)
    }
    if (name === props.away) {
      setAwayScore(awayScore + inc)
    }
  }

  useEffect(()=>{ // do stuff after render
    let interval = setInterval(()=>{ // set timer to count seconds
        if (!paused) {
            if (time < 15 * 60) setTime(time+1) // if less than 15 minutes, keep counting
            else { // pause timer at end of quarter
                setPaused(true)
                clearInterval(interval)
            }
        }
    }, 1000)
    return ()=>{clearInterval(interval)} // remove old timer on new render ()
  },[time,paused]) // trigger if time changes (so rendering other changes does not pause timer)

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">{props.home}</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{Math.floor(time/60)<10?'0'+Math.floor(time/60):Math.floor(time/60)}:{time%60<10?'0'+time%60:time%60}</div>
          <div className="away">
            <h2 className="away__name">{props.away}</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow quarter={quarter} />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button className="homeButtons__touchdown" onClick={()=>{scoreHandler(props.home, 7)}}>Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick={()=>{scoreHandler(props.home, 3)}}>Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick={()=>{scoreHandler(props.away, 7)}}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={()=>{scoreHandler(props.away, 3)}}>Away Field Goal</button>
        </div>
        <div>
          <button className="nextQuarterButton" onClick={()=>{setQuarter(quarter<4?quarter+1:1); setTime(0)}}>Next Quarter</button>
          <button className="timerButton" onClick={()=>{setPaused(!paused)}}>{paused?'Start Timer':'Pause Timer'}</button>
        </div>
      </section>
    </div>
  );
}

export default App;
