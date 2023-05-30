import { auth, db } from "../firebase.config";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Game from "./components/game";
import { Link } from "react-router-dom";

function App() {
  const [isSignedin, setisSignedin] = useState(false);
  async function login() {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    setisSignedin(true);
  }
  function signOutUser() {
    signOut(auth);
    setisSignedin(false);
  }
  useEffect(() => {
    if (auth.currentUser) {
      setisSignedin(true);
    } else {
      setisSignedin(false);
    }
  }, [auth]);
  return (
    <>
      <header>
        <div className="grid grid-flow-col h-full w-full">
          <h1 className="absolute justify-self-center self-center ">
            Find Waldo
          </h1>
          <Link
            className="btn ml-4 text-white justify-self-start self-center"
            to={"/Leaderboards"}
          >
            Leaderboard
          </Link>
          <button
            onClick={isSignedin ? signOutUser : login}
            className=" text-white btn justify-self-end self-center mr-3"
          >
            {isSignedin ? "Log Out" : "Log in"}
          </button>
        </div>
      </header>
      <main>
        <Game />
      </main>
    </>
  );
}
export default App;
