import React, { useEffect, useState } from 'react';
import './CircularProgressBar.css';

const CircularProgressBar = ({ percentage, color }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - percentage) / 100) * circumference;

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const circleStyle = {
    '--circumference': circumference,
    '--progress': progress,
    '--color': color,
  };

  return (
<div className="circular-progressbar" style={{ width: '150px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <svg
    viewBox="0 0 100 100"
    style={{
      width: '100%',
      height: '100%',
    }}
  >
    <circle
      className="circle bg"
      r={radius}
      cx="50"
      cy="50"
      strokeDasharray={circumference}
      
      style={{ ...circleStyle, fill: 'transparent' }}
    />
    <circle
      className={`circle ${isAnimating ? 'animating' : ''}`}
      r={radius}
      cx="50"
      cy="50"
      strokeDasharray={circumference}
      strokeDashoffset={progress}
      style={circleStyle}
    />
  </svg>
  <div className="percentage">{percentage}%</div>
  <br/>
  <br/>
</div>

  );
};

export default CircularProgressBar;
