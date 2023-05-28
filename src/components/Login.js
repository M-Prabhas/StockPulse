import React from 'react'
import {useNavigate} from "react-router-dom";
import { useCookies} from 'react-cookie';
import {useEffect} from 'react';
import "../styles/Login.css";
import jwt_decode from "jwt-decode";


const Login = () => {
    const Gotodashboard = useNavigate();
    const [cookies,setCookies]=useCookies();

     useEffect(()=>{
      /* global google */
      // google script will give the required id from the script tag 
      // the below function used to create login environment using google
      // it takses the two parameters 
      //  one is client_id and the call back function thet is what should it do further
      google.accounts.id.initialize({
        client_id:"357201262577-mdh2313nm9c218eh0at5tlqmg105h19o.apps.googleusercontent.com",
        callback:handlecallback
      });

      //  Now for the button type to display functionality
      google.accounts.id.renderButton(
          document.getElementById("signinbutton"),
         { theme:"dark",size:"Large"}
      )
     },[])


    const handlecallback=(response)=>{
       console.log(response.credential);
       const extractedUserData = jwt_decode(response.credential);
       const { email, name } =extractedUserData ;
       const UserObject = { email, name };
       setCookies("user",UserObject,{path: "/"})
        Gotodashboard(`/DashBoard`)
    }



  return (
    <div className="Loginsetup">
    <h1>StockPulse</h1>
    <div className="setup">
    <h2>sign-in</h2>
    <br></br>
    <br></br>
    <div id='signinbutton'></div>
    </div>
    </div>
  )
}

export default Login