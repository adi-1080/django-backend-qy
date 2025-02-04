import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { candleStickData } from '../../dummy_data/CandleStickData';

const CandleStickStockChart = (props) => {
  const chartContainerRef = useRef(null);
  const [hoveredPrice, setHoveredPrice] = useState(null);
  const [hoveredVolume, setHoveredVolume] = useState(null);

  // Calculate visible range based on selectedPeriod
  const calculateVisibleRange = (period) => {
    const now = Date.parse("2019-05-24") / 1000; // Current time in seconds
    let startTime;

    switch (period) {
      case '1D': // Last 1 day
        startTime = now - 24 * 60 * 60;
        break
      case '5D': // Last 5 days
        startTime = now - 5 * 24 * 60 * 60;
        break;
      case '1M': // Last 1 month (approx 30 days)
        startTime = now - 30 * 24 * 60 * 60;
        break;
      case '3M': // Last 3 months
        startTime = now - 90 * 24 * 60 * 60;
        break;
      case '6M': // Last 6 months
        startTime = now - 180 * 24 * 60 * 60;
        break;
      case 'YTD': // Year to date
        startTime = Date.parse("2019-01-01") / 1000;
        break;
      case '1Y': // Last 1 year
        startTime = now - 365 * 24 * 60 * 60;
        break;
      case '5Y': // Last 5 years
        startTime = now - 5 * 365 * 24 * 60 * 60;
        break;
      default: // Show all data
        startTime = Date.parse("2018-10-19") / 1000;
        break;
    }

    return { from: startTime, to: now };
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        attributionLogo: false,
        background: { type: 'solid', color: '#ffffff' },
        textColor: '#333333',
        fontSize: 12,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          width: 1,
          color: '#758696',
          style: 3,
        },
        horzLine: {
          width: 1,
          color: '#758696',
          style: 3,
        },
      },
      autoSize: true,
    }

    const chart = createChart(chartContainerRef.current, chartOptions);

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#089981',
      downColor: '#f23645',
      borderVisible: false,
      wickUpColor: '#089981',
      wickDownColor: '#f23645',
      scaleMargins: {
        top: 0.1, // Make the candlestick series occupy most of the chart
        bottom: 0.4, // Leave space for the volume series
      },
    });

    candlestickSeries.setData(candleStickData);

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#089981',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // set as an overlay by setting a blank priceScaleId
    // set the positioning of the volume series
    scaleMargins: {
        top: 0.7, // highest point of the series will be 70% away from the top
        bottom: 0,
    },
    });
    
    const volumeData = candleStickData.map(item => ({
      time: item.time,
      value: (item.high-item.low) * 100000000,
      color: item.close > item.open ? '#92d2cc' : '#f7a9a7'
    }));

    volumeSeries.setData(volumeData);

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
          top: 0.7, // highest point of the series will be 70% away from the top
          bottom: 0, // lowest point will be at the very bottom.
      },
    });

    chart.timeScale().setVisibleRange(calculateVisibleRange(props.selectedPeriod));

    // Add price and volume tooltips
    chart.subscribeCrosshairMove(param => {
      if (param.time) {
        const data = candleStickData.find(d => d.time === param.time);
        if (data) {
          setHoveredPrice(`₹${data.close.toFixed(2)}`);
          
          const volume = volumeData.find(d => d.time === param.time);
          if (volume) {
            setHoveredVolume(`${(volume.value / 1000000).toFixed(2)}M`);
            props.setDisplayedVolume(`${(volume.value / 1000000).toFixed(2)}`)
          }
        }
      } else {
        setHoveredPrice(null);
        setHoveredVolume(null);
      }
    });

    // Make chart responsive
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart.remove();
      window.removeEventListener('resize', handleResize);
    };
  }, [props.selectedPeriod, props.isWatchlistPanelOpen, props.isChartExpanded]);

  return (
    <div className="relative w-full h-full">
      <div ref={chartContainerRef} className="w-full h-full" />
      {hoveredPrice && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-gray-200">
          <div className="text-sm font-medium">{hoveredPrice}</div>
          {hoveredVolume && (
            <div className="text-xs text-gray-500">Vol: {hoveredVolume}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CandleStickStockChart;
