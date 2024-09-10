import { createContext, useEffect, useState } from "react";

const AllCoin = createContext();

const AllCoinProvider = ({ children }) => {
    const [coin, setCoin] = useState([]);
    const [currency, setCurrency] = useState(
        {
            name: "usd",
            symbol: "$"
        }
    )

    const getCoin = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-FqNhETRjd9NuhkSp2upEtxHU' }
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
            const data = await response.json();
            setCoin(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getCoin();
    }, [currency]);

    return (
        <AllCoin.Provider value={{ coin, setCurrency, currency, setCoin }}>
            {children}
        </AllCoin.Provider>
    );
};

export { AllCoin };
export default AllCoinProvider;
