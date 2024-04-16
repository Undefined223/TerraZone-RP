import React from 'react';
import Starfield from 'react-starfield';

const Background = () => {
    return (
        <div>
            <Starfield
                starCount={1000}
                speedFactor={0.08}
                backgroundColor="#070023"
                // backgroundColor="black"

            />
        </div>
    );
};

export default Background;
