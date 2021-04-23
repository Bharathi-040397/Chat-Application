import React,{forwardRef,useRef,useEffect} from 'react';
import { Avatar } from '@material-ui/core';
import FlipMove from 'react-flip-move';


const Messages = forwardRef(({ user, messages }, ref) => {
    console.log(messages);
    
    const messagesEndRef = useRef(null);

     const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

    
    return (
        <>
            <FlipMove>
        {
            messages.map((message) => (
        <div ref={ref} key={message.id} className={`msg${user.name===message.data.user.name ? ' dark' : ''}`}>
            <div className="message_img">
                <Avatar className="img" src={ message.data.user.pic} alt={ user.name}/>
            </div>
            <div className={`msgtext${user.name === message.data.user.name ? ' dark' : ''}`}>
                <p>{ message.data.message}</p>
       </div>
        </div>
        
          ))
                }
                </FlipMove>
            <div ref={messagesEndRef} />

         
          
            </>
    )
})

export default Messages
