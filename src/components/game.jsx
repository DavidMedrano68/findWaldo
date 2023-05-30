import Search from "./search";
import Content from "./content";
import Modal from "react-modal";
import { useState, useContext, useEffect } from "react";
import { dispatchFunc, gameOptions } from "../context/gameContext";
import { auth, db } from "../../firebase.config";
import { addDoc, collection } from "firebase/firestore";

export default function Game() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  let playerName = getUser();
  const [timerOn, setTimerOn] = useState(false);
  let timer;
  const game = useContext(gameOptions);
  const dispatch = useContext(dispatchFunc);
  const [isPlaying, setIsPlaying] = useState(false);

  function resetTimer() {
    setSeconds(0);
    setMinutes(0);
    setTimerOn(true);
  }
  function makeUID() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
  function getUser() {
    if (auth.currentUser) {
      return auth.currentUser.displayName;
    } else {
      return `ANON${makeUID()}`;
    }
  }
  async function saveToDB(data) {
    // TODO 7: Push a new message to Cloud Firestore.
    try {
      await addDoc(collection(db, "Leaderboard"), {
        name: data.name,
        time: data.time,
      });
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
  }
  const [showModal, setShowModal] = useState(false);
  Modal.setAppElement("#root");
  useEffect(() => {
    timerOn
      ? (timer = setInterval(() => {
          setSeconds(seconds + 1);
          if (seconds === 59) {
            setMinutes(minutes + 1);
            setSeconds(0);
          }
        }, 1000))
      : null;
    return () => clearInterval(timer);
  });
  useEffect(() => {
    if (
      game.every((picture) => {
        return picture.found === true;
      })
    ) {
      setTimerOn(false);

      setShowModal(true);
      dispatch({
        type: "new",
      });
    }
  }, [game]);
  function toggleModal() {
    setShowModal(false);
  }

  return (
    <>
      <Modal
        isOpen={showModal}
        contentLabel="the modal is open now"
        onRequestClose={toggleModal}
        style={{
          content: {
            textAlign: "center",
            borderRadius: "20px",
            fontSize: "2.5rem",
          },
        }}
      >
        <div className="text-slate-900">{`Your Time is ${minutes} minutes and ${seconds} seconds`}</div>
        <div className="text-slate-900">{` Name: ${playerName}`}</div>
        <div> Please Close to Submit </div>
        <button
          onClick={() => {
            toggleModal();
            resetTimer();
            saveToDB({
              name: playerName,
              time: `${minutes}:${seconds}`,
            });
          }}
          className="closeBtn"
        >
          Close
        </button>
      </Modal>
      <div className="search">
        <Search
          isPlaying={isPlaying}
          handleClick={() => {
            setIsPlaying(true);
            setTimerOn(true);
          }}
          time={`${minutes < 10 ? `0${minutes}` : minutes} : ${
            seconds < 10 ? `0${seconds}` : seconds
          }`}
        />
      </div>
      <div className="content">
        <Content isPlaying={isPlaying} />
      </div>
    </>
  );
}

//make the modal reset the timer and also reset the minutes and seconds
