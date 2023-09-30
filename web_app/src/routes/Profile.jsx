import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";


function Profile() {
  document.body.id = 'H';
  const navigate = useNavigate();

  useEffect(() => {
    console.log("user", history.state.usr)
    if(history.state.usr === undefined) {
        console.log("got here");
        navigate(`/`);
    }
  }, [history.state.usr]);

  return <h1>Welcome back, Mate 
    {(history.state.usr.currentTier != undefined) && <div>Youre in tier {history.state.usr.currentTier.tierName}</div>}
  </h1>
}
export default Profile
