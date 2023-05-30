import { useState, useRef } from "react";
import { obj } from "../obj";
import Square from "./square";
export default function Content({ isPlaying }) {
  const [selected, setSelected] = useState(null);
  const picture = useRef(null);
  const [pos, setPos] = useState(null);
  function makeSquare(e, elem) {
    const parent = elem.current.getBoundingClientRect();
    const y = Math.round(e.clientY - parent.top);
    const x = Math.round(e.clientX - parent.left);
    setPos({ y: y, x: x });
  }
  return (
    <>
      <div
        ref={picture}
        onClick={
          isPlaying
            ? (e) => {
                makeSquare(e, picture);
              }
            : null
        }
        className=" overflow-none grid grid-cols-12 grid-rows-6 relative cursor-crosshair h-full w-full"
      >
        {isPlaying
          ? obj.map((person) => {
              return (
                <img
                  onClick={() => {
                    setSelected(person.name);
                  }}
                  key={person.id}
                  src={person.url}
                  id={person.name}
                ></img>
              );
            })
          : null}
        {pos && isPlaying ? (
          <Square currOption={selected} pos={pos} handleClick={setPos} />
        ) : null}
      </div>
    </>
  );
}
