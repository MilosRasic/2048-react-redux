import React from 'react';

const Score = ({ score, bestScore }) => {
  return (
    <div className='score-base'>
      <div className='score'>
        <div className='score-title'>Score</div>
        <div className='score-num'>{ score }</div>
      </div>
      <div className='score'>
        <div className='score-title'>Best</div>
        <div className='score-num'>{ bestScore }</div>
      </div>
    </div>
  );
}

export default Score;
