import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";


function Profile() {
  document.body.id = 'H';
  const navigate = useNavigate();

  useEffect(() => {
    if(history.state.usr === undefined) {
        console.log("got here");
        navigate(`/`);
    }
  }, [history.state.usr]);

  return <h1>Welcome back, Mate</h1>
}
export default Profile
