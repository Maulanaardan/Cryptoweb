import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../fragment/Navbar';
import { AllCoin } from '../context/getcoin';
import { Link } from 'react-router-dom';
import TemplateLayout from '../layouth/TemplateLayout';

const HomePage = () => {

    const {coin, currency} = useContext(AllCoin);
    const [filteredCoin, setFilteredCoin] = useState([]);
    const [input, setInput] = useState('');
    {
        console.log(coin)
    }

    const newInput = (event) => {
        const inputValue = event.target.value;
        setInput(inputValue);
    };
    

    const searchInput = (event) => {
        event.preventDefault();
        const coins = coin.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase());
        });
        setFilteredCoin(coins); // Pertimbangkan untuk menyimpan hasil ini di state terpisah jika Anda perlu mempertahankan data asli
    };

    useEffect(() => {
        if(input === "") {
            setFilteredCoin(coin);
        }else {
            const coins = coin.filter((item) => {
                return item.name.toLowerCase().includes(input.toLowerCase());
            });
            setFilteredCoin(coins);
        }
    }, [coin]);
    

    return(
        <TemplateLayout>
            <h1 className='font-NewAmsterdam text-4xl text-center text-gray-100 mt-4'>monitor your crypto prices</h1>
            <p className='text-center text-lg text-gray-100 font-AnekDevangari'>Welcome to the world's large cryptocurrency marketplace. Come on, check your crypto price here</p>
            <div className='flex justify-center p-2 gap-5 mt-4'>
                <form onSubmit={searchInput}>
                    <input list="coinlist" type="text" placeholder='Search your crypto' className='font-NewAmsterdam w-96 p-1 border-2 border-zinc-700 rounded-md' value={input} onChange={newInput}/>
                    <button type='submit' className='ml-2 border-2 border-white-700 rounded-md px-3 py-1 bg-gradient-to-r from-purple-700 to-blue-500 font-NewAmsterdam text-white'>Search</button>
                    <datalist id='coinlist'>
                        {coin.map((item, index) => (
                            <option key={index} value={item.name}/>
                        ))}
                    </datalist>
                </form>
            </div>
            <div className='w-3/4 m-auto mt-5'>
                <div className='py-2 border-2 border-purple-950 rounded-md grid grid-cols-5 text-white font-NewAmsterdam bg-gradient-to-r from-bg-indigo-800 to-bg-indigo-500 via-purple-700 text-center'>
                    <div >#</div>
                    <div >symbol</div>
                    <div >Name</div>
                    <div>Price</div>
                    <div>Percentage</div>
                </div>
                {
                    filteredCoin.map((item) => {
                        return(
                            <Link to={`/coin/${item.id}`}>
                                <div key={item.id} className='py-2 border-2 border-purple-950 rounded-md grid grid-cols-5 text-white font-NewAmsterdam bg-gradient-to-r from-bg-indigo-800 to-bg-indigo-500 via-purple-700 text-center'>
                                    <div >{item.market_cap_rank}</div>
                                    <div >{item.symbol}</div>
                                    <div className=' flex align-center gap-4'>
                                        <img src={item.image} className='w-10'/> 
                                        <p>{item.name}</p>
                                    </div>
                                    <div>{currency.symbol} {item.current_price}</div>
                                    <div>{Math.floor(item.ath_change_percentage)}%</div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </TemplateLayout>
    )
}

export default HomePage;