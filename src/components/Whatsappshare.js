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
     const sendmessage = (e) => {
      e.preventDefault();
      let number = num.replace(/[^\w\s]/gi, "").replace(/ /g, "");

    // Appending the phone number to the URL
      let url = `https://web.whatsapp.com/send?phone=${number}`;

    // Appending the message to the URL by encoding it
      url += `&text=${encodeURI(msg)}&app_absent=0`;

    // Open our newly created URL in a new tab to send the message
      window.open(url)

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