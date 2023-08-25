import React from 'react';
import Logo from './assets/Logo.png';

const App = () => {
  return (
    <>
      <h1>Hello World from {env.AUTHOR}</h1>
      <img src={Logo} />
    </>
  );
};

export default App;
