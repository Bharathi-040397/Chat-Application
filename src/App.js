import React, { useState, useEffect,useRef } from 'react';
import './App.css';
import db from './firebase'
import firebase from 'firebase';
import { Avatar,IconButton,Card } from '@material-ui/core';
import Messages from './Messages'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SendIcon from '@material-ui/icons/Send';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [login, setLogin] = useState(false);
  const [userdetails, setUserDetails] = useState({
    name: "",
    pic: null,
  });

  

  useEffect(async() => {
   await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLogin(true);
        const newObj = { name: user.displayName, pic: user.photoURL }
        setUserDetails(newObj);

      }
      else {
        
      const newObj = { name: "", pic: "" }
      setLogin(false);
      setUserDetails(newObj);
      }
    })
  }, [])

  useEffect(async() => {
  await db
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data:doc.data(),
        }))
      )
    })
   
  }, [])

 

  const logOut =async () => {
   await firebase.auth().signOut().then(() => {
      const newObj = { name: "", pic: "" }
      setLogin(false);
      setUserDetails(newObj);
    }).catch((error) => {
      console.log(error);
     });
  }

  const logIn = async() => {
    var provider = await new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    await db.collection('messages').add({
       message: input,
       user: userdetails,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
     
  }
  return (
<>
    {!login ?
        <Card className="login">
          <Avatar className="mainicon" alt="" src="https://www.ellisonmarketing.co.uk/wp-content/uploads/2015/01/Blog-icon.png"/>
          <button onClick={logIn}>Sigin with Google</button>
        </Card>
      
        :
        <div className="app">
          <div className="header">
            <div className="header_body">
                <Avatar className="icon" style={{ cursor:'pointer'}} alt={userdetails.name} src={userdetails.pic} />
                
              <PowerSettingsNewIcon className="icon" style={{ fontSize: "2rem", cursor: 'pointer' }} onClick={logOut} >Logout</PowerSettingsNewIcon>
              
            </div>
          </div>

          <div className="app__body">
          <Messages  user={userdetails} messages={ messages}/>

           </div>
           
          <div className="form">
          <form className="app__formControl" >
            <input type="text" className="app__input" placeholder="Enter a message..." value={input} onChange={(e) => setInput(e.target.value)} />
              <IconButton className="app__iconButton" type="submit" disabled={!input} onClick={sendMessage} >
                <SendIcon/>
             </IconButton>
            </form>
            </div>
    </div>
        
        
      }
      </>
  );
}

export default App;
