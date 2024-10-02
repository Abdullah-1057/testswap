import React, { useEffect, useState } from "react";
import "./App.css";
import { SwapContext } from "./swap_logic/swap"; // Import SwapContext
import { Actors } from "./swap_logic/actors"; // Import Actors
import { HttpAgent } from "@dfinity/agent";
import { ICSSwapStrategy } from "./swap_logic/swap/ics"; // Import the ICSSwapStrategy
import { ConnectButton, ConnectDialog, useConnect } from "@connect2ic/react";
import { Transfer } from "./swap_logic/transfer";

interface Token {
  id: string;
  name: string;
  symbol: string;
  price: bigint; // Changed type to bigint
  coingeckoId: string;
}

const tokens: Token[] = [
  {
    id: "1",
    name: "Internet Computer",
    symbol: "ICP",
    price: BigInt(450000000),
    coingeckoId: "internet-computer",
  },
  {
    id: "2",
    name: "Chain Key Bitcoin",
    symbol: "ckBTC",
    price: BigInt(2000000000000),
    coingeckoId: "bitcoin",
  },
  {
    id: "3",
    name: "Chain Key Ethereum",
    symbol: "ckETH",
    price: BigInt(160000000000),
    coingeckoId: "ethereum",
  },
];

function App() {
  const [selectedToken1, setSelectedToken1] = useState<Token | null>(tokens[0]);
  const [selectedToken2, setSelectedToken2] = useState<Token | null>(tokens[1]);
  const [amount1, setAmount1] = useState<string>("");
  const [amount2, setAmount2] = useState<string>("");
  const [tokenPrices, setTokenPrices] = useState<{ [key: string]: bigint }>({});

  const { isConnected, principal } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Sign Out
    },
  });

  // Initialize actors and strategy
  const agent = new HttpAgent({ host: "https://ic0.app" });
  const actors = new Actors(agent);

  // Use the singleton instance of ICSSwapStrategy
  const swapStrategy = ICSSwapStrategy.getInstance({ actors });
  const swapContext = new SwapContext({ strategy: swapStrategy, actors });

  useEffect(() => {
    console.log("My princpal", principal);
    const fetchPrices = async () => {
      try {
        const ids = tokens.map((token) => token.coingeckoId).join(",");
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
        );
        const data = await response.json();

        const prices: { [key: string]: bigint } = {};
        tokens.forEach((token) => {
          const price = BigInt(
            Math.round(
              (data[token.coingeckoId]?.usd || Number(token.price)) * 1e8
            )
          );
          prices[token.coingeckoId] = price;
        });
        setTokenPrices(prices);

        if (selectedToken1) {
          setSelectedToken1({
            ...selectedToken1,
            price: prices[selectedToken1.coingeckoId] || selectedToken1.price,
          });
        }
        if (selectedToken2) {
          setSelectedToken2({
            ...selectedToken2,
            price: prices[selectedToken2.coingeckoId] || selectedToken2.price,
          });
        }
      } catch (error) {
        console.error("Failed to fetch token prices:", error);
      }
    };

    fetchPrices();
  }, [selectedToken1?.id, selectedToken2?.id]);

  const handleToken1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const token = tokens.find((token) => token.id === e.target.value) || null;
    setSelectedToken1(token);
    updateAmount2(amount1, token, selectedToken2);
  };

  const handleToken2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const token = tokens.find((token) => token.id === e.target.value) || null;
    setSelectedToken2(token);
    updateAmount2(amount1, selectedToken1, token);
  };

  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount1(value);
    updateAmount2(value, selectedToken1, selectedToken2);
  };

  const updateAmount2 = (
    value: string,
    token1: Token | null,
    token2: Token | null
  ) => {
    if (!token1 || !token2 || !value) {
      setAmount2("");
      return;
    }
    const amount = BigInt(Math.floor(parseFloat(value) * 1e8)); // Convert to BigInt with scaling
    const token1Price = token1.price;
    const token2Price = token2.price;

    if (token1Price === BigInt(0) || token2Price === BigInt(0)) {
      setAmount2("");
      return;
    }

    const result = (amount * token1Price) / token2Price;
    setAmount2((Number(result) / 1e8).toFixed(4)); // Convert BigInt back to regular number for display
  };

  const handleSwapClick = async () => {
    if (!principal) {
      alert("Please connect to your Internet Identity first.");
      return;
    }

    if (selectedToken1 && selectedToken2 && amount1) {
      try {
        const result = await swapContext.executeSwap({
          amount: parseFloat(amount1),
          pool: "xmiu5-jqaaa-aaaag-qbz7q-cai", // Use token ID as the pool identifier
          zeroForOne: true, // Adjust based on actual swap requirements
          slipage: 0.5, // Example slippage value
        });
        console.log("Swap successful:", result);
        alert(`Swap executed successfully! Result: ${result}`);
      } catch (error) {
        console.error("Swap failed:", error);
        alert("Failed to execute swap.");
      }
    } else {
      alert("Please select both tokens and enter a valid amount.");
    }
  };

  return (
    <div className="App">
      <ConnectButton />
      <ConnectDialog dark={false} />
      <header className="App-header">
        <h1>Token Swap</h1>
        <div className="swap-container">
          <div className="swap-inputs">
            <select
              value={selectedToken1?.id || ""}
              onChange={handleToken1Change}
            >
              {tokens.map((token) => (
                <option key={token.id} value={token.id}>
                  {token.name} ({token.symbol})
                </option>
              ))}
            </select>
            <input
              type="number"
              value={amount1}
              onChange={handleAmount1Change}
              placeholder="Amount"
            />
          </div>
          <div className="swap-arrow">⇅</div>
          <div className="swap-inputs">
            <select
              value={selectedToken2?.id || ""}
              onChange={handleToken2Change}
            >
              {tokens.map((token) => (
                <option key={token.id} value={token.id}>
                  {token.name} ({token.symbol})
                </option>
              ))}
            </select>
            <input
              type="number"
              value={amount2}
              placeholder="Calculated Amount"
              readOnly
            />
          </div>
          <button onClick={handleSwapClick} className="swap-button">
            Swap
          </button>

          <Transfer/>
        </div>
      </header>
    </div>
  );
}

export default App;
