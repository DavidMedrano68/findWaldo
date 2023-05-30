import { useContext } from "react";
import Option from "./option";
import { gameOptions } from "../context/gameContext";

export default function Square({ pos, handleClick, currOption }) {
  const choice = useContext(gameOptions);
  return (
    <div
      style={{
        top: `${pos.y}px`,
        left: `${pos.x}px`,
      }}
      className={`absolute rounded-lg p-2 bg-red-800`}
    >
      <ul>
        <Option
          currOption={currOption}
          handleClick={handleClick}
          option={choice[0].name}
        />
        <Option
          currOption={currOption}
          handleClick={handleClick}
          option={choice[1].name}
        />
        <Option
          currOption={currOption}
          handleClick={handleClick}
          option={choice[2].name}
        />
      </ul>
    </div>
  );
}
