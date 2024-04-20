// Background.js

import React from 'react';
import Starfield from 'react-starfield';

const Background = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <Starfield
                starCount={4000}
                speedFactor={0.08}
                backgroundColor="#0C0037"
            />
        </div>
    );
};

export default Background;
