import React,{ useContext} from 'react';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import DashBoard from './components/DashBoard';
import Login from './components/Login';
import Whatsappshare from './components/Whatsappshare';
import Emailshare from './components/Emailshare';
import { StockProvider } from './contexts/StockContext';


function App() {
  return (
    <div className="App">
    <StockProvider>
       <Router>
  <Routes>
       <Route path="/" element={<Login/>}/>
       <Route path="/DashBoard" element={<DashBoard/>} />
       <Route path="/DashBoard/WhatsappShare" element={<Whatsappshare/>}/>
       <Route path="/DashBoard/EmailShare" element={<Emailshare/>}/>
       </Routes>
       </Router> 
       </StockProvider>
    </div>
  );
}

export default App;
