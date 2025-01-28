import React from 'react';

const SeasonalChart = ({ width = 300, height = 100 }) => {
  // Sample data for different years
  const yearlyData = {
    2025: [
      { month: 'Jan', value: 0 },
      { month: 'Feb', value: 3.2 },
      { month: 'Mar', value: -0.8 },
      { month: 'Apr', value: 4.1 },
      { month: 'May', value: 2.0 },
      { month: 'Jun', value: -1.5 },
      { month: 'Jul', value: 4.8 },
      { month: 'Aug', value: 3.5 },
      { month: 'Sep', value: -2.9 },
      { month: 'Oct', value: 3.2 },
      { month: 'Nov', value: 5.8 },
      { month: 'Dec', value: 4.5 }
    ],
    2024: [
      { month: 'Jan', value: -1.2 },
      { month: 'Feb', value: 2.8 },
      { month: 'Mar', value: -1.5 },
      { month: 'Apr', value: 3.5 },
      { month: 'May', value: 1.2 },
      { month: 'Jun', value: -2.5 },
      { month: 'Jul', value: 3.9 },
      { month: 'Aug', value: 2.8 },
      { month: 'Sep', value: -4.0 },
      { month: 'Oct', value: 2.5 },
      { month: 'Nov', value: 4.8 },
      { month: 'Dec', value: 3.8 }
    ],
    2023: [
      { month: 'Jan', value: -0.5 },
      { month: 'Feb', value: 2.0 },
      { month: 'Mar', value: -2.0 },
      { month: 'Apr', value: 3.0 },
      { month: 'May', value: 0.8 },
      { month: 'Jun', value: -3.0 },
      { month: 'Jul', value: 3.5 },
      { month: 'Aug', value: 2.5 },
      { month: 'Sep', value: -4.5 },
      { month: 'Oct', value: 2.0 },
      { month: 'Nov', value: 4.5 },
      { month: 'Dec', value: 3.5 }
    ]
  };

  const yearColors = {
    2025: '#6366f1', // Indigo
    2024: '#2563eb', // Blue
    2023: '#7c3aed'  // Purple
  };

  // Find min and max values across all years
  const allValues = Object.values(yearlyData).flat().map(d => d.value);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  
  // Scale points to fit the chart
  const scaleY = (value) => {
    return height - ((value - minValue) / (maxValue - minValue)) * height;
  };
  
  const scaleX = (index) => {
    return (index / 11) * width;
  };

  // Generate path data for each year
  const generatePathData = (data) => {
    return data.map((point, index) => {
      const x = scaleX(index);
      const y = scaleY(point.value);
      return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
  };

  return (
    <div>
      <div className="flex gap-4 mb-2 justify-end">
        {Object.keys(yearlyData).map(year => (
          <div key={year} className="flex items-center gap-1">
            <div className="w-3 h-0.5" style={{ backgroundColor: yearColors[year] }}></div>
            <span className="text-xs text-gray-500">{year}</span>
          </div>
        ))}
      </div>
      <svg width={width} height={height} className="overflow-visible">
        {/* Zero line */}
        <line
          x1="0"
          y1={scaleY(0)}
          x2={width}
          y2={scaleY(0)}
          stroke="#e5e7eb"
          strokeWidth="1"
          strokeDasharray="4,4"
        />
        
        {/* Year lines */}
        {Object.entries(yearlyData).map(([year, data]) => (
          <g key={year}>
            <path
              d={generatePathData(data)}
              fill="none"
              stroke={yearColors[year]}
              strokeWidth="1.5"
              className="transition-all duration-300"
            />
            
            {/* Data points */}
            {data.map((point, index) => (
              <g key={index}>
                <circle
                  cx={scaleX(index)}
                  cy={scaleY(point.value)}
                  r="2"
                  fill={yearColors[year]}
                />
                <circle
                  cx={scaleX(index)}
                  cy={scaleY(point.value)}
                  r="6"
                  className="fill-current text-gray-500 opacity-0 hover:opacity-10 transition-opacity cursor-pointer"
                />
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default SeasonalChart;