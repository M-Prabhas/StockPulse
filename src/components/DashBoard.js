import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { StockContext } from '../contexts/StockContext';

const DashBoard = () => {
  const goto = useNavigate();
  const [date, setDate] = useState('');
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState({});
  const [show, setShow] = useState(false);
  const [cookies,setCookies, removeCookie] = useCookies(['user']);
  const { setClosingPrice } = useContext(StockContext);



  const getData = async () => {
    try {
      const formattedDate = formatDate(date); // Format the date
      const http= `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=demo`
      const response = await axios.get(http, {});

      const timeSeriesData = response.data['Time Series (Daily)'];
      console.log(timeSeriesData);
      const stockDataForDate = timeSeriesData[formattedDate];

      if (stockDataForDate) {
        setStockData(stockDataForDate);
        setShow(true);
        setCookies("data",stockDataForDate,{path: "/"});
      } else {
        console.log('Stock data not available for the selected date.');
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  useEffect(() => {
    console.log(show); // Log the updated value of `show` after state update
  }, [show]);

  const logout = () => {
    removeCookie('user');
    goto('/');
  };

  const handlewhatsappshare=()=>{
    setClosingPrice(stockData['4. close']);
    goto('/DashBoard/WhatsappShare');
  }

  const handleemailshare=()=>{
    setClosingPrice(stockData['4. close']);
    goto('/DashBoard/EmailShare');
  }



  return (
    <div className='Dashboard'>
      <div className="heading">
        <h1>StockPulse</h1>
        <h2>DashBoard</h2>
        <input
          type="text"
          value={symbol} 
          placeholder='Enter the company code'
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        ></input>
        <button type="button" onClick={getData}>
          Submit
        </button>
      <br></br>
<br></br>
        {show && (
        <div className="data">
        <i class="fi fi-rr-rectangle-xmark" onClick={() => setShow(false)}></i>
           <h2>{symbol}</h2>
          <p>Date: {date}</p>
          <p>Open: {stockData['1. open']}</p>
          <p>High: {stockData['2. high']}</p>
          <p>Low: {stockData['3. low']}</p>
          <p>Close: {stockData['4. close']}</p>
          <p>Volume: {stockData['6. volume']}</p>
          <br></br>
          <i class="fi fi-brands-whatsapp" onClick={handlewhatsappshare}></i>
          <i class="fi fi-br-envelope" onClick={handleemailshare}></i>
        </div>
      )}
      </div>
      <div className="datasection">
        <button type="button" className="logoutsection" onClick={logout}>
          Logout
        </button>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="child1"></input>
        
      </div>
    </div>
  );
};

export default DashBoard;
