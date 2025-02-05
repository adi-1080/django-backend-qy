import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { fetchInnerChartApiData } from '../../redux/slice/innerChartApiSlice';
import { useDispatch, useSelector } from 'react-redux';

const CandleStickStockChart = (props) => {
  const dispatch = useDispatch();
  const candleStickData = useSelector(state => state.innerChartApiData.data) || [];
  const ticker = useSelector(state => state.innerChartApiData.ticker);
  const chartContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchInnerChartApiData());
  }, [ticker]);

  // Calculate visible range based on selectedPeriod
  const calculateVisibleRange = (period) => {
    const now = Date.parse(candleStickData[candleStickData.length - 1].Date.split(' ')[0]) / 1000; // Current time in seconds
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
        const currentYear = new Date().getFullYear();
        startTime = Date.parse(`${currentYear}-01-01`) / 1000;
        break;
      case '1Y': // Last 1 year
        startTime = now - 365 * 24 * 60 * 60;
        break;
      case '5Y': // Last 5 years
        startTime = now - 5 * 365 * 24 * 60 * 60;
        break;
      default: // Show all data
        startTime = Date.parse("1996-01-01") / 1000;
        break;
    }

    return { from: startTime, to: now };
  };

  useEffect(() => {
    if (!chartContainerRef.current || !candleStickData.length) return;

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

    const formattedData = candleStickData.map(item => ({
      time: item.Date.split(' ')[0],
      open: item.Open,
      high: item.High,
      low: item.Low,
      close: item.Close,
      volume: item.Volume,
    }));

    candlestickSeries.setData(formattedData);

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
    
    const volumeData = formattedData.map(item => ({
      time: item.time,
      value: item.volume,
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
        const data = formattedData.find(d => d.time === param.time);
        if (data) {
          props.setDisplayedPrice(()=>{
            const newPrice = data.close.toFixed(2);
            const priceChange = (newPrice - data.open).toFixed(2);
            const priceChangePercentage = ((priceChange / data.open) * 100).toFixed(2);
            props.setDisplayedPriceChange(priceChange);
            props.setDisplayedPriceChangePercentage(priceChangePercentage);
            return(newPrice);
          });
          const volume = volumeData.find(d => d.time === param.time);
          if (volume) {
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
  }, [candleStickData, props.selectedPeriod, props.isWatchlistPanelOpen, props.isChartExpanded]);

  return (
    <div className="relative w-full h-full">
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

export default CandleStickStockChart;
