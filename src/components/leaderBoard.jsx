import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useState } from "react";
export default function Leaderboard() {
  const [isClicked, setIsClicked] = useState(false);
  const [array, setArray] = useState([]);

  async function getLeaderBoard() {
    let boardArray = [];
    const leaderBoardDB = query(collection(db, "Leaderboard"));
    const leaderBoardQuery = await getDocs(leaderBoardDB);
    leaderBoardQuery.forEach((lb) => boardArray.push(lb.data()));
    return boardArray;
  }
  function extract(array) {
    const LEADERBOARDARR = [];
    const mapped = array.map((board) => {
      return {
        ...board,
        timeCompare: board.time.split(":").join(""),
        time: board.time.split(":"),
      };
    });
    mapped
      .sort((a, b) => a.timeCompare - b.timeCompare)
      .forEach((arr) =>
        LEADERBOARDARR.push({
          ...arr,
          time: `Completed in ${arr.time[0]} ${
            arr.time[0] == 1 ? "minute" : "minutes"
          } and ${arr.time[1]} ${arr.time[1] == 1 ? "second" : "seconds"}`,
        })
      );
    return LEADERBOARDARR;
  }
  return (
    <div className="text-center h-screen w-screen grid justify-center items-center grid-rows-3">
      <h1 className="text-3xl">Leaderboards</h1>
      <button
        className="text-black playBtn"
        onClick={async () => {
          const res = await getLeaderBoard();
          const LB = extract(res);
          setArray(LB);
          setIsClicked(true);
        }}
      >
        {"Fetch Leaderboard"}
      </button>
      {isClicked ? (
        <ol className=" grid justify-center items-center h-full w-[700px] shadow-md bg-slate-500 rounded-lg overflow-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-lg">Name</div>
            <div className="text-lg">Time</div>
          </div>
          {array.map((lb, index) => {
            return (
              <li className="text-black grid grid-cols-2 text-xl " key={index}>
                <div>{lb.name}</div>
                <div>{lb.time}</div>
              </li>
            );
          })}
        </ol>
      ) : null}
    </div>
  );
}
