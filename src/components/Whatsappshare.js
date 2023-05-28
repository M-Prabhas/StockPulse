import React,{useContext} from 'react'
import {useState} from 'react';
import axios from 'axios';
import { StockContext } from '../contexts/StockContext';
import "../styles/Whatsappshare.css"

const Whatsappshare = () => {
     const [number,setnumber]=useState("");
     const [isSent, setIsSent] = useState(false);
     const { closingPrice } = useContext(StockContext);
     const msg=`the stock Price on 15 th of May is ${closingPrice}`;

     const sendmessage = async () => {
      
        try {
            const response = await axios.post('/whatsappshare', {
              number: number,
              message: msg
            });
            
            console.log('Data sent successfully:', response.data);
            setIsSent(true);
            // Perform any additional actions or handle the response as needed
          } catch (error) {
            console.error('Error sending data:', error);
            // Handle the error condition appropriately
          }
       
       
      };
     

  return (
    <div className="container">
   <div className="whatsapp">
   <h2>Whatsapp Share</h2>
    <input type="text" placeholder="Enter the Number" value={number}  onChange={(e) => setnumber(e.target.value)} ></input>
    <br></br>
     <div className="message">{msg}</div>
     <br></br>
    <button type="button" onClick={sendmessage}  disabled={isSent}>{isSent ? 'Sent' : 'Send'}</button>
   </div>
   </div>
  )
}

export default Whatsappshare