
import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';


import Router from './routes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <div className='app'>
        <Router />
      </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};


export default App;