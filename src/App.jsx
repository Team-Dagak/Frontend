
import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { globalStyle } from './component/common/styles/globalStyle/globalStyle';
import { Global } from '@emotion/react';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/Frontend">
      <Global styles={globalStyle} />
      <div className='app'>
        <Router />
      </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};


export default App;