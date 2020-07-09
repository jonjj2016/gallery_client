import React from 'react';
import { Wrapper } from './styled';

const Loader = () => {
  return (
    <Wrapper>
      <div className='lds-ripple'>
        <div></div>
        <div></div>
      </div>
    </Wrapper>
  );
};

export default Loader;
