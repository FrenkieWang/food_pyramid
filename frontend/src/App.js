import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Initialize the State of Layer
  const initialLayers = {
    red: { num: 2, height: 40 },
    orange: { num: 2, height: 40 },
    yellow: { num: 2, height: 40 },
    blue: { num: 2, height: 40 },
    brown: { num: 2, height: 40 },
    green: { num: 2, height: 40 }
  };
  const [layers, setLayers] = useState(initialLayers);

  const today = new Date().toISOString().split('T')[0];

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `[${day}-${month}-${year}]`;
  };

  // Handle increase/decrease button click events
  const handleChange = (color, diff) => {
    setLayers((prevLayers) => {
      const newLayer = { ...prevLayers };
      const newNum = Math.max(0, Math.min(9, newLayer[color].num + diff)); // num range [0 - 9]
      newLayer[color] = { num: newNum, height: 40 + (newNum -2) * 10 }; // Change height of that Layer
      return newLayer;
    });
  };

  // Container height is the sum of layer height, add two spacer.
  const containerHeight = Object.values(layers).reduce((sum, layer) => sum + layer.height, 20); 
  const containerWidth = containerHeight / 260 * 468; 

  return (
    <div className="App">
      <div className="title text">Figure</div>
      <div className="Pyramid">
        <div className="container" style={{ width:`${containerWidth}px`, height: `${containerHeight}px` }}>
          {Object.keys(layers).map((color, index) => (
            <React.Fragment key={color}>
              <div className="color-bar" style={{ height: `${layers[color].height}px`, backgroundColor: color }}>
                <button className="btn ctrl" onClick={() => handleChange(color, 1)}>+</button>
                <button className="btn num">{layers[color].num}</button>
                <button className="btn ctrl" onClick={() => handleChange(color, -1)}>-</button>
              </div>
              {/* Add Spacer only between 1-2 and 2-3 Layer*/}
              {index === 0 || index === 1 ? <div className="spacer"></div> : null}
            </React.Fragment>
          ))}
        </div>
        {/* Use two white triangle to cover the container */}
        <div className="cover-container" style={{ 
          borderLeft: `${containerWidth / 2}px solid white`,
          borderRight: `${containerWidth / 2}px solid white`,
          borderBottom: `${containerHeight}px solid transparent` // 保持border-bottom不变
        }}></div>
      </div>
      <div className = "user text">My Food Pyramid</div>
      <div className = "date text">{formatDate(today)}</div>
    </div>
  );
};

export default App;
