import React, { useState, useEffect } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const TradingChart = () => {
  const [chartData, setChartData] = useState([]); // Mock data for backtesting
  const [signals, setSignals] = useState({ buy: [], sell: [] });
  const [tradeHistory, setTradeHistory] = useState([]);

  // Calculate EMA
  const calculateEMA = (length, prices) => {
    let emaValues = [];
    let multiplier = 2 / (length + 1);
    let prevEMA = prices.slice(0, length).reduce((a, b) => a + b, 0) / length;

    for (let i = 0; i < prices.length; i++) {
      if (i < length - 1) {
        emaValues.push(null);
      } else {
        prevEMA = (prices[i] - prevEMA) * multiplier + prevEMA;
        emaValues.push(prevEMA);
      }
    }
    return emaValues;
  };

  // Calculate RSI
  const calculateRSI = (prices, length) => {
    let rsiValues = [];
    for (let i = 1; i < prices.length; i++) {
      if (i < length) {
        rsiValues.push(null);
      } else {
        let gains = 0, losses = 0;
        for (let j = i - length + 1; j <= i; j++) {
          const change = prices[j] - prices[j - 1];
          if (change > 0) gains += change;
          else losses -= change;
        }
        const avgGain = gains / length;
        const avgLoss = losses / length;
        const rs = avgGain / avgLoss;
        rsiValues.push(100 - 100 / (1 + rs));
      }
    }
    return rsiValues;
  };

  // Calculate Indicators
  const calculateIndicators = (data) => {
    const emaShortLength = 9;
    const emaLongLength = 50;
    const rsiLength = 14;
    const rsiOverbought = 70;
    const rsiOversold = 30;

    let emaShort = [];
    let emaLong = [];
    let rsi = [];
    let buySignals = [];
    let sellSignals = [];

    const prices = data.map((d) => d.close);
    emaShort = calculateEMA(emaShortLength, prices);
    emaLong = calculateEMA(emaLongLength, prices);
    rsi = calculateRSI(prices, rsiLength);

    for (let i = 1; i < data.length; i++) {
      const candle = data[i];
      const prevCandle = data[i - 1];
      if (emaShort[i] && emaLong[i] && rsi[i]) {
        // Buy Signal
        if (
          emaShort[i] > emaLong[i] &&
          emaShort[i - 1] < emaLong[i - 1] &&
          rsi[i] < rsiOversold &&
          candle.color === "green"
        ) {
          buySignals.push({ index: i, price: candle.close, time: new Date() });
        }

        // Sell Signal
        if (
          emaShort[i] < emaLong[i] &&
          emaShort[i - 1] > emaLong[i - 1] &&
          rsi[i] > rsiOverbought &&
          candle.color === "red"
        ) {
          sellSignals.push({ index: i, price: candle.close, time: new Date() });
        }
      }
    }

    setSignals({ buy: buySignals, sell: sellSignals });
  };

  const addTradeHistory = (signal, type) => {
    const tp = type === "buy" ? signal.price * 1.02 : signal.price * 0.98; // Example TP: ±2%
    const sl = type === "buy" ? signal.price * 0.98 : signal.price * 1.02; // Example SL: ±2%

    const newTrade = {
      type: type,
      price: signal.price,
      time: signal.time,
      tp: tp.toFixed(2),
      sl: sl.toFixed(2),
      status: "waiting", // Initial trade status
    };

    setTradeHistory((prevHistory) => [...prevHistory, newTrade]);
  };

  // Simulate Mock Data
  useEffect(() => {
    const fetchData = async () => {
      const mockData = Array.from({ length: 100 }, (_, i) => ({
        time: i,
        close: Math.random() * 100 + 100,
        color: Math.random() > 0.5 ? "green" : "red", // Random green/red for candle color
      }));

      setChartData(mockData);
      calculateIndicators(mockData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    signals.buy.forEach((signal) => addTradeHistory(signal, "buy"));
    signals.sell.forEach((signal) => addTradeHistory(signal, "sell"));
  }, [signals]);

  return (
    <div className="container mx-auto p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        📈 EMA Crossover & RSI Indicator Chart
      </h1>

      <div className="flex justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full h-96 max-w-5xl">
          <TradingViewWidget
            symbol="XAUUSD"
            theme={Themes.DARK}
            interval="5"
            autosize
            studies={["MASimple@tv-basicstudies", "RSI@tv-basicstudies"]}
          />
        </div>
      </div>

      <div className="mt-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-4">💡 Trading Signals</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-xl">
          <ul className="space-y-2">
            {signals.buy.map((signal, index) => (
              <li key={index} className="text-green-400 text-lg font-medium">
                ✅ Buy Signal at <span className="font-bold">{signal.price.toFixed(2)}</span> (Index: {signal.index}) at {signal.time.toLocaleString()}
              </li>
            ))}
            {signals.sell.map((signal, index) => (
              <li key={index} className="text-red-400 text-lg font-medium">
                ❌ Sell Signal at <span className="font-bold">{signal.price.toFixed(2)}</span> (Index: {signal.index}) at {signal.time.toLocaleString()}
              </li>
            ))}
          </ul>
          {signals.buy.length === 0 && signals.sell.length === 0 && (
            <p className="text-gray-400 text-center mt-2">No trading signals at the moment.</p>
          )}
        </div>
      </div>

      <div className="mt-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-4">📜 Trade History</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-xl">
          <ul className="space-y-2">
            {tradeHistory.map((trade, index) => (
              <li key={index} className="text-white text-lg font-medium">
                {trade.type === "buy" ? "✅ Buy" : "❌ Sell"} at {trade.price} with TP: {trade.tp} and SL: {trade.sl} - Status: {trade.status} at {new Date(trade.time).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;
