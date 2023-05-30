import { createContext, useReducer } from "react";
import { obj } from "../obj";
export const gameOptions = createContext(null);
export const dispatchFunc = createContext(null);

const newObj = obj.map((option) => {
  return { ...option, found: false };
});
const init = [newObj[0], newObj[1], newObj[2]];
function pictureReducer(state, action) {
  switch (action.type) {
    case "found": {
      return state.map((picture) => {
        if (picture.name === action.name) {
          return { ...picture, found: true };
        } else {
          return picture;
        }
      });
    }
    case "new": {
      const newindexes = random3(0, 24);
      return [
        newObj[newindexes[0]],
        newObj[newindexes[1]],
        newObj[newindexes[2]],
      ];
    }
  }
}
function random3(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let indexes = [];

  function getNumber() {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  while (indexes.length < 3) {
    const indexNum = getNumber();
    if (!indexes.includes(indexNum)) {
      indexes.push(indexNum);
    }
  }
  return indexes;
}
/*TODO get a reducer to be able to change the game options */
export function GameProvider({ children }) {
  const [options, dispatch] = useReducer(pictureReducer, init);
  return (
    <gameOptions.Provider value={options}>
      <dispatchFunc.Provider value={dispatch}>{children}</dispatchFunc.Provider>
    </gameOptions.Provider>
  );
}
// put the provider in mainjx and import the context to the images so they will be able to be displayed
