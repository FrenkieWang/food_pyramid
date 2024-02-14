import React from 'react';
import './App.css'; 

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="color-bar red">
          <button className="btn ctrl">+</button>
          <button className="btn num">2</button>
          <button className="btn ctrl">-</button>
        </div>
        <div className="spacer"></div>
        <div className="color-bar orange">
          <button className="btn ctrl">+</button>
          <button className="btn num">2</button>
          <button className="btn ctrl">-</button>
        </div>
        <div className="spacer"></div>
        <div className="color-bar yellow">
          <button className="btn ctrl">+</button>
          <button className="btn num">2</button>
          <button className="btn ctrl">-</button>
        </div>
        <div className="color-bar blue">
          <button className="btn ctrl">+</button>
          <button className="btn num">2</button>
          <button className="btn ctrl">-</button>
        </div>
        <div className="color-bar brown">
          <button className="btn ctrl">+</button>
          <button className="btn num">2</button>
          <button className="btn ctrl">-</button>
        </div>
        <div className="color-bar green">
          <button className="btn ctrl">+</button>
          <button className="btn num">2</button>
          <button className="btn ctrl">-</button>
        </div>
      </div>
      {/* Use two white triangle to cover the container */}
      <div className="cover-container"></div>
    </div>
  );
};

export default App;
