import { useContext } from "react";

import { gameOptions } from "../context/gameContext";
import Timer from "./timer";

export default function Search({ time, isPlaying, handleClick }) {
  const gameOp = useContext(gameOptions);
  return (
    <>
      {isPlaying ? (
        <div className="justify-center items-center grid grid-cols-4 h-full w-full">
          <div className="text-center">
            <p className="text-white">Search for</p>
            <div className="text-white text-2xl">{time}</div>
          </div>

          <img
            src={gameOp[0].url}
            className={gameOp[0].found ? `opacity-40 w-20 h-20` : "w-20 h-20"}
          ></img>
          <img
            src={gameOp[1].url}
            className={gameOp[1].found ? `opacity-40 w-20 h-20` : "w-20 h-20"}
          ></img>
          <img
            src={gameOp[2].url}
            className={gameOp[2].found ? `opacity-40 w-20 h-20` : "w-20 h-20"}
          ></img>
        </div>
      ) : (
        <div className="h-full w-full justify-center items-center grid grid-cols-4 ">
          <button
            className="playBtn col-start-4 text-slate-950"
            onClick={handleClick}
          >
            Start?
          </button>
        </div>
      )}
    </>
  );
}
