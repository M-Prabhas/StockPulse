import React,{useContext} from 'react'
import {useState} from 'react';
import axios from 'axios';
import { StockContext } from '../contexts/StockContext';
import "../styles/Whatsappshare.css"


const Whatsappshare = () => {
     const [num,setnumber]=useState("");
     const { closingPrice } = useContext(StockContext);
     let msg=`the stock Price on 15 th of May is ${closingPrice}`;
     const [mynum,setmynum]=useState("");
     const sendmessage = async () => {
      try {
        await axios.post('/whatsappshare', {
          msg,
          num,
          mynum
        });
        console.log('Message sent successfully!');
      } catch (error) {
        console.error('Error sending message:', error);
      }

      };
     

  return (
    <div className="container">
   <div className="whatsapp">
   <h2>Whatsapp Share</h2>
    <input type="text" placeholder="Enter the from Number" value={num}  onChange={(e) => setnumber(e.target.value)} ></input>
    <br></br>
    <input type="text" placeholder="Enter the to Number" value={mynum}  onChange={(e) => setmynum(e.target.value)} ></input>
    <br></br>
     <div className="message">{msg}</div>
     <br></br>
    <button type="button" onClick={sendmessage}>Send</button>
   
   </div>
   </div>
  )
}

export default Whatsappshare