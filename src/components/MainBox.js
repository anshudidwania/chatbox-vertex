import axios from 'axios';
import React, {useState} from 'react';

function MainBox(){
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            message: "Hello! Hoe=w can i help you today?",
            sender: "ChatGPT"
        }
    ]);

    const handleChange = (event)=>{
        setInput(event.target.value)
    }

    const handleSend = async (event)=>{
        event.preventDefault()
        const newMessage = {
            message: input,
            sender: "user"
        }

        const newMessages = [...messages,newMessage];

        setMessages(newMessages);

        setInput('');

        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMessages){
        // const API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        // let apiMessages = chatMessages.map((messageObject)=>{
        //     let role="";
        //     if(messageObject.sender === "ChatGPT"){
        //         role = "assistant"
        //     }else{
        //         role = "user"
        //     }
        //     return (
        //         {role: role, content: messageObject.message}
        //     )
        // });

        // const systemMessage = {
        //     role: "system",
        //     content: "Explain all concept like i am 10 year old"
        // }

        // const apiRequestBody = {
        //     "model": "gpt-3.5-turbo",
        //     "messages": [
        //         systemMessage,
        //         ...apiMessages
        //     ]
        // }



        // await fetch("https://8f83-160-83-96-177.ngrok-free.app/callAI?question=what is AI",{
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json"
        //     }//,
            // body: JSON.stringify(apiRequestBody)
        axios.get("https://8f83-160-83-96-177.ngrok-free.app/callAI?question=what is AI"
        ).then((res)=>{
            console.log(res.data);
            setMessages(
                [
                    ...chatMessages,
                    {
                        message: res.data,
                        sender: "ChatGPT"
                    }
                ]
            )
        })
    }

    return (
        <div className="container">
			<div className="response-area">
                {messages.map((message, index) => {
                    return(
                        <div className={message.sender==="ChatGPT" ? 'gpt-message message' : 'user-message message'}>{message.message}</div>
                    );
                })}
            </div>
			<div className="prompt-area">
				<input type="text" placeholder="Send a message..." value={input} onChange={handleChange}/>
				<button className="submit" type="submit" onClick={handleSend}>Send</button>
			</div>
		</div>
    );
}

export default MainBox;
