import { useContext } from "react"
import { AllCoin } from "../context/getcoin"
import { Link } from "react-router-dom"

const Navbar = () => {
    const {setCurrency} =useContext(AllCoin)

    const handleCurrency = (event) => {
        switch(event.target.value) {
            case "USD" : {
                setCurrency({
                    name: "usd",
                    symbol: "$"
                });
                break;
            }
            case "IDR" : {
                setCurrency({
                    name: "idr",
                    symbol: "Rp"
                });
                break;
            }
        }
    }

    return (
        <div className="bg-transparant flex items-center justify-between p-6 border-navbar">
            <Link to={'/'}>
                <img src="\assets\logo.png" alt="logo" className="w-32" />
            </Link>
            <div className="flex align-center gap-4">
            <ul className="flex gap-3 text-white text-lg font-AnekDevangari font-semibold">
                <li className="cursor-pointer">Home</li>
                <li className="cursor-pointer">About</li>
                <li className="cursor-pointer">Contact</li>
            </ul>
            <select onChange={handleCurrency} className="border-2 border-zinc-600 rounded-md px-1 cursor-pointer font-NewAmsterdam">
                <option value="USD" >USD</option>
                <option value="IDR" >IDR</option>
            </select>
             </div>
        </div>
    )
}

export default Navbar