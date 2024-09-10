import { useParams } from 'react-router-dom'
import TemplateLayout from '../layouth/TemplateLayout'
import { useContext, useEffect, useState } from 'react'
import LineChart from '../component/linechart';
import { AllCoin } from '../context/getcoin';
import { Link } from 'react-router-dom';

const CoinPage = () => {
    const {id} = useParams();
    const [coinDetail, setCoinDetail] = useState({});
    const [historicalData, setHistoricalData] = useState([])
    const {currency} = useContext(AllCoin)

    const fetchCoinDetail = () => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
        .then(response => response.json())
        .then(response => setCoinDetail(response))
        .catch(err => console.error(err));
    }

    const fetchHistoricalData = () => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
        .then(response => response.json())
        .then(response => setHistoricalData(response))
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchCoinDetail();
        fetchHistoricalData();
    }, [id, currency])

    {
        console.log(coinDetail)
    }

    return(
        <TemplateLayout>
            {coinDetail.image && coinDetail.name ? (
            <>
            <div className='w-full flex justify-center mt-5'>
                <div className='p-8 w-1/2 min-h-screen flex flex-col items-center gap-4 mt-3 bg-black rounded-3xl'>
                    
                    {/* header coin info */}
                    <div className='flex justify-between w-full items-center'>
                        <div className='px-2 py-2 bg-red-500 rounded-3xl bg-gradient-to-r from-purple-700 to-blue-500 font-NewAmsterdam text-center text-white'>
                            <p> Cap Rank : {coinDetail.market_cap_rank}</p>
                        </div>
                        <div className='flex flex-col items-center gap-3'>
                            <img src={coinDetail.image.large} alt={coinDetail.name} className='w-12'/>
                            <h1 className='font-NewAmsterdam text-xl text-white'>{id}</h1>
                        </div>
                        <div className='p-3 font-NewAmsterdam text-xl text-white'>
                            <h3> {currency.symbol} {coinDetail.market_data.current_price[currency.name]}</h3>
                        </div>
                    </div>

                    {/* grafik */}
                    <LineChart historicalData={historicalData}></LineChart>

                    {/* days percentage */}
                    <div className='my-3 p-5 rounded-xl bg-violet-600 flex justify-around w-full text-white font-NewAmsterdam border-4 border-y-slate-700'>
                        <div className='text-center px-3 py-3 rounded-tl-lg border-4 border-violet-950 bg-violet-900'>
                            <h3>7 Days</h3>
                            <h3>{Math.floor(coinDetail.market_data.price_change_percentage_7d)} %</h3>
                        </div>
                        <div className='text-center px-3 py-3 rounded-lg border-4 border-violet-950 bg-violet-900'>
                            <h3>14 Days</h3>
                            <h3>{Math.floor(coinDetail.market_data.price_change_percentage_14d)} %</h3>
                        </div>
                        <div className='text-center px-3 py-3 rounded-lg border-4 border-violet-950 bg-violet-900'>
                            <h3>30 Days</h3>
                            <h3>{Math.floor(coinDetail.market_data.price_change_percentage_30d)} %</h3>   
                        </div>
                        <div className='text-center px-3 py-3 rounded-tr-lg border-4 border-violet-950 bg-violet-900'>
                            <h3>60 Days</h3>
                            <h3>{Math.floor(coinDetail.market_data.price_change_percentage_60d)} %</h3>
                        </div>
                    </div>

                    {/* detail info coin */}
                    <div className='list-detail w-full flex flex-col mt-6'>
                        <ul >
                            <li>Name : </li>
                            <li>{coinDetail.id} ({coinDetail.symbol})</li>
                        </ul>
                        <ul>
                            <li>Market Cap Rank :</li>
                            <li>{coinDetail.market_cap_rank}</li>
                        </ul>
                        <ul>
                            <li>Current Price :</li>
                            <li>{currency.symbol} {coinDetail.market_data.current_price[currency.name]}</li>
                        </ul>
                        <ul>
                            <li>Market Change in 24 :</li>
                            <li>{currency.symbol} {coinDetail.market_data.market_cap_change_24h_in_currency[currency.name]}</li>
                        </ul>
                        <ul>
                            <li>Market Change percentage in 24 :</li>
                            <li>{coinDetail.market_data.market_cap_change_percentage_24h_in_currency[currency.name]}%</li>
                        </ul>
                    </div>
                    <Link to={'/'}>
                        <button className='my-3 px-6 py-3 bg-purple-300 border-0 rounded-lg font-AnekDevangari font-bold border-4 border-indigo-500/50 rounded-full'>
                            Back To List
                        </button>
                    </Link>
                </div>
            </div>
            </>
            ) : (
            <div className='spinner'>
                <div className="spin">
                </div>
            </div>
            )}
        </TemplateLayout>

    )
}

export default CoinPage