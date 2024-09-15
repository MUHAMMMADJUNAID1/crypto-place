// import React, { useContext, useEffect, useState, useId } from "react";
// import "./Coin.css";
// import { useParams } from "react-router-dom";
// import { CoinContext } from "../../context/CoinContext";
// import LineChart from "../../components/LineChart/LineChart";

// const Coin = () => {
//   const { currency } = useContext(CoinContext);
//   const { id } = useParams();
//   const [coinData, setCoinData] = useState(null); // Initial loading state
//   const [historicalData, setHistoricalData] = useState([[]]);

//   const fetchCoinData = async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         "x-cg-demo-api-key": "CG-aQBAu6soN4kj1aBfi5tgWFjN ",
//       },
//     };
//     fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
//       .then((response) => response.json())
//       .then((response) => {
//         return setCoinData(response);
//       })
//       .catch((err) => console.error(err));
//   };

//   const fetchHistoricalData = async () => {
//     // Add a passive event listener

//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         "x-cg-demo-api-key": "CG-aQBAu6soN4kj1aBfi5tgWFjN",
//       },
//     };

//     fetch(
//       `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10`,
//       options
//     )
//       .then((response) => response.json())
//       .then((response) => setHistoricalData(response))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     fetchCoinData();
//     fetchHistoricalData();

//   }, [currency]);

//   if (coinData && historicalData) {
//     return (
//       <div className="coin">
//         <div className="coin-name">
//           <img src={coinData?.image.large} alt="" />
//           <p>
//             <b>
//               {coinData.name} ({coinData.symbol.toUpperCase()})
//             </b>
//           </p>
//         </div>
//         <div className="coin-chart">
//           <LineChart historicalData={historicalData} />
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="spinner">
//         <div className="spin"></div>
//       </div>
//     );
//   }
// };

// export default Coin;

import React, { useContext, useEffect, useState, useCallback } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { currency } = useContext(CoinContext);
  const { id } = useParams();

  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState([[]]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Coin Data
  const fetchCoinData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-aQBAu6soN4kj1aBfi5tgWFjN",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch coin data");
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      setError(error.message);
    }
  }, [id]);

  // Fetch Historical Data
  const fetchHistoricalData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-aQBAu6soN4kj1aBfi5tgWFjN",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch historical data");
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      setError(error.message);
    }
  }, [id, currency.name]);

  // Fetch Data on Component Mount and when Currency Changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchCoinData(), fetchHistoricalData()]);
      setLoading(false);
    };
    fetchData();
  }, [fetchCoinData, fetchHistoricalData]);

  if (loading) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData?.image.large} alt={`${coinData?.name} logo`} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>

      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>

        <ul>
          <li>Currrent Price</li>
          <li>
            {currency.symbol}
            {coinData.market_data.current_price[
              currency.name.toLowerCase()
            ].toLocaleString()}
          </li>
        </ul>

        <ul>
          <li>Market Cap </li>
          <li>
            {currency.symbol}
            {coinData.market_data.market_cap[
              currency.name.toLowerCase()
            ].toLocaleString()}
          </li>
        </ul>

        <ul>
          <li>24 Hour High </li>
          <li>
            {currency.symbol}
            {coinData.market_data.high_24h[
              currency.name.toLowerCase()
            ].toLocaleString()}
          </li>
        </ul>

        <ul>
          <li>24 Hour Low </li>
          <li>
            {currency.symbol}
            {coinData.market_data.low_24h[
              currency.name.toLowerCase()
            ].toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
