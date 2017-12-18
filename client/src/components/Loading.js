import React from 'react';
import FontAwesome from 'react-fontawesome';

import '../css/Loading.css';


const Loading = () => {
  return (
    <div className="m-loading">
      <div className="m-loading--center">
        <FontAwesome name='spinner'
                     pulse
                     size='3x'
                     style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} />
      </div>
    </div>
  );
};

export default Loading;