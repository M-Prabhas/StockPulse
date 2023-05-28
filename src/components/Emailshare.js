import React from 'react';
import {useState,useContext} from 'react';
import { StockContext } from '../contexts/StockContext';
import "../styles/Email.css";
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Emailshare = () => {
    const [name,setname]=useState("");
    const [toemail,settoemail]=useState("");
   const [cookies,setCookies] = useCookies();
   const { closingPrice } = useContext(StockContext);
   const [isSent, setIsSent] = useState(false);
   const msg=`the stock Price on 15 th of May is ${closingPrice}`;
 
 
   const sendmessage = async () => {
       console.log(msg);
    try {
        const response = await axios.post('/Emailshare', {
          toemail: toemail,
          message: msg,
          myemail:cookies.user.email,
          name:name,
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
    <div className="containerform">
    <h1>Email Share</h1>
    <form>
    <input type="text" name="to_name" placeholder="Enter the Name" value={name} onChange={(e)=>setname(e.target.value)}  />
    <input type="email" name="to_email" placeholder="Enter the Email Id" value={toemail} onChange={(e)=>settoemail(e.target.value)}/>
    <br></br>
    <div className="from_name" name="sender">{cookies.user.email}</div>
    <br></br>
    <div className="message" name="message">{msg}</div>
    <br></br>
    <button type="button" onClick={sendmessage}  disabled={isSent}>{isSent ? 'Sent' : 'Send'}</button>
  </form>
  </div>
  )
}

export default Emailshare