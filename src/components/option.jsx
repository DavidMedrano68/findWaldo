import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useContext } from "react";
import { dispatchFunc, gameOptions } from "../context/gameContext";
export default function Option({ currOption, option, handleClick }) {
  const dispatch = useContext(dispatchFunc);
  const pictures = useContext(gameOptions);
  async function sendQuery(currentPicture, currentOption) {
    const options = [];
    const q = query(
      collection(db, "messages"),
      where("name", "==", pictures[0].name)
    );
    const q2 = query(
      collection(db, "messages"),
      where("name", "==", pictures[1].name)
    );
    const q3 = query(
      collection(db, "messages"),
      where("name", "==", pictures[2].name)
    );
    const querySnap = await getDocs(q);
    const querySnap2 = await getDocs(q2);
    const querySnap3 = await getDocs(q3);

    querySnap.forEach((res) => options.push(res.data()));
    querySnap2.forEach((res) => options.push(res.data()));
    querySnap3.forEach((res) => options.push(res.data()));

    if (
      options.some((option) => option.name == currOption) &&
      currentPicture == currentOption
    ) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <li
      className=" text-white cursor-pointer hover:border-b-[1px]"
      onClick={async (e) => {
        e.stopPropagation();
        handleClick(null);
        const res = await sendQuery(currOption, option);
        res
          ? dispatch({
              type: "found",
              name: currOption,
            })
          : null;
      }}
    >
      {`submit ${option}`}
    </li>
  );
}
