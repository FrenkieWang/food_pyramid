import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Initialize the State of Layer
  const initialLayers = {
    red: { num: 1, height: 30, colorState: 'normal' },
    orange: { num: 1, height: 30, colorState: 'normal' },
    yellow: { num: 2, height: 40, colorState: 'normal' },
    dodgerblue: { num: 3, height: 50, colorState: 'normal' },
    darkgoldenrod : { num: 4, height: 60, colorState: 'normal' },
    limegreen: { num: 6, height: 80, colorState: 'normal' }
  };
  const [layers, setLayers] = useState(initialLayers);

  const today = new Date().toISOString().split('T')[0];

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `[${day}-${month}-${year}]`;
  };

  // Define the valid range for each layer
  const validRanges = {
    red: [0, 0],
    orange: [0, 1],
    yellow: [2, 2],
    dodgerblue: [3, 3],
    darkgoldenrod: [3, 5],
    limegreen: [5, 7]
  };

  // Handle increase/decrease button click events
  const handleChange = (color, diff, index) => {
    setLayers((prevLayers) => {
      const newLayer = { ...prevLayers };
      const newNum = Math.max(0, Math.min(9, newLayer[color].num + diff)); // num range [0 - 9]

      const initialNum = initialLayers[color].num;
      const initialHeight = initialLayers[color].height;

      const [min, max] = validRanges[color];
      let newColorState = 'normal';

      if (newNum < min) {
        newColorState = index % 2 === 0 ? 'dimgray' :'gray'; // Below valid range
      } else if (newNum > max) {
        newColorState = index % 2 === 0 ? 'crimson' :'red'; // Above valid range
      } // Making color hierarchical

      // Only num 0 in Layer 1 is normal
      if(color === 'red' && newNum === 0) newColorState = 'lightpink'

      newLayer[color] = { num: newNum, height: initialHeight + (newNum - initialNum) * 10, colorState: newColorState }; // Change height of that Layer
      return newLayer;
    });
  };

  // Container height is the sum of layer height, add two spacer.
  const containerHeight = Object.values(layers).reduce((sum, layer) => sum + layer.height, 20); 
  const containerWidth = containerHeight / 260 * 468; 

  return (
    <div className="App">
      <div className="title text">
        Figure 1
      </div>
      <div className="Pyramid">
        <div className="container" style={{ width:`${containerWidth}px`, height: `${containerHeight}px` }}>
          {Object.keys(layers).map((color, index) => (
            <React.Fragment key={color}>
              <div className={`color-bar color-bar-${index + 1}`} style={{ 
                height: `${layers[color].height}px`, 
                backgroundColor: layers[color].colorState === 'normal' ? color : layers[color].colorState
              }}>
                <button className="btn ctrl" onClick={() => handleChange(color, 1, index + 1)}>+</button>
                <button className="btn num">{layers[color].num}</button>
                <button className="btn ctrl" onClick={() => handleChange(color, -1, index + 1)}>-</button>
              </div>
              {/* Add Spacer only between 1-2 and 2-3 Layer*/}
              {index === 0 || index === 1 ? <div className="spacer"></div> : null}
            </React.Fragment>
          ))}
        </div>
        {/* Use two white triangle to cover the container */}
        <div className="cover-container" style={{ 
          borderLeft: `${containerWidth / 2 + 1}px solid white`,  /* +1 Make it cover the border */
          borderRight: `${containerWidth / 2 + 1}px solid white`,
          borderBottom: `${containerHeight + 1}px solid transparent` 
        }}></div>
      </div>
      <div className = "user text">My Food Pyramid</div>
      <div className = "date text">{formatDate(today)}</div>
    </div>
  );
};

export default App;
