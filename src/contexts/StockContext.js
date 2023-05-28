import React, { createContext, useState } from 'react';

// Create the context
const StockContext = createContext();

// Create the provider component
const StockProvider = ({ children }) => {
  const [closingPrice, setClosingPrice] = useState('');

  return (
    <StockContext.Provider value={{ closingPrice, setClosingPrice }}>
      {children}
    </StockContext.Provider>
  );
};

export { StockContext, StockProvider };
