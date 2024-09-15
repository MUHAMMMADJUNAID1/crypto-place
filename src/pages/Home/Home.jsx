import {
  React,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";

import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);

  const [displayCoin, setDisplayCoin] = useState([]);

  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = useCallback(
    async (e) => {
      e.preventDefault();
      const filteredCoin = await allCoin.filter((coin) =>
        coin.name.toLowerCase().includes(input.toLowerCase())
      );
      setDisplayCoin(filteredCoin);
    },
    [input]
  );

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const id = useId();
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto MarketPlace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            name=""
            key={id}
            value={input}
            onChange={inputHandler}
            placeholder="seach crypto ....."
            required
            list="coinlist"
          />

          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap"> Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} key={index} className="table-layout">
            <p id={index}>{item.market_cap_rank}</p>
            <div id={index}>
              <img src={item.image} alt="" />
              <p id={index}>{item.name + " - " + item.symbol}</p>
            </div>
            <p id={index}>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              id={index}
              className={
                item.market_cap_change_percentage_24h > 0 ? "green" : "red"
              }
            >
              {Math.floor(item.market_cap_change_percentage_24h * 100) / 100}
            </p>
            <p id={index} className="market-cap">
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
