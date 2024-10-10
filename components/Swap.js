"use client";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

export const Swap = () => {

    const [sellingTokenImage, setSellingTokenImage] = useState(null);
    const [sellingTokenName, setSellingTokenName] = useState(null);
    const [buyingTokenImage, setBuyingTokenImage] = useState(null);
    const [buyingTokenName, setBuyingTokenName] = useState(null);
    const [sellingTokenAmount, setSellingTokenAmount] = useState();
    const [buyingTokenPrice, setBuyingTokenPrice] = useState();
    const refIp1 = useRef(null);
    const refIp2 = useRef(null);

    useEffect(()=>{
        const fetchToken = async () => {
            try{
                const sellingResponse = await axios.get("https://tokens.jup.ag/token/So11111111111111111111111111111111111111112");
                setSellingTokenImage(sellingResponse.data.logoURI);
                setSellingTokenName(sellingResponse.data.symbol);
                const buyingResponse = await axios.get("https://tokens.jup.ag/token/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
                setBuyingTokenImage(buyingResponse.data.logoURI);
                setBuyingTokenName(buyingResponse.data.symbol);
            } catch(err) {
                console.log("Error", err);
            }
        }
        fetchToken();
    });

    const fetchPrice = async () => {
        try {
            if (!sellingTokenAmount) {
                setBuyingTokenPrice(0)
                return;
            }
            const response = await axios.get("https://price.jup.ag/v6/price", { params : {
                ids:"SOL"
            }});
            console.log("Price", response.data.data.SOL.price * sellingTokenAmount);
            setBuyingTokenPrice(response.data.data.SOL.price * sellingTokenAmount);
        } catch(err) {
            console.log("Error", err);
        }
    }

    const refresh = () => {
        try {
            refIp1.current && (refIp1.current.value = "");
            refIp2.current && (refIp2.current.value = "");
            setBuyingTokenPrice();
            setSellingTokenAmount();
        } catch(err) {
            console.log("Error : ", err);
        }
    }

    return (
        <div className="bg-custom-radial md:mt-[75px] px-8 py-8 flex flex-col justify-center items-center gap-8 h-full">
            <h1 className="mb-4 text-3xl font-extrabold text-yellow-400 md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-[#e7e8d9] from-yellow-100">dex</span>.</h1>
            <a href="#" class="flex flex-col items-center bg-white border border-gray-200 bg-custom-linear rounded-lg w-96 shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div class="flex flex-col justify-between p-4 leading-normal w-full gap-4">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#e7e8d9] dark:text-white">You&apos;re selling : {sellingTokenName}</h5>
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="p-2 w-18 h-18 bg-custom-radial grid justify-items-center content-center rounded-lg">
                            <img className="w-12 h-12 rounded-full shadow-lg" src={`${sellingTokenImage}`} alt="SOL" />
                        </div>
                        <input ref={refIp1} type="number" onChange={(e)=>{
                            setSellingTokenAmount(e.target.value);
                        }} className="bg-transparent border border-[#e7e8d9] text-[#e7e8d9] w-3/4 text-2xl font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 placeholder-[#e7e8d9]" placeholder="0.00"></input>
                    </div>
                </div>
            </a>
            <a href="#" class="flex flex-col items-center bg-white border border-gray-200 bg-custom-linear rounded-lg w-96 shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div class="flex flex-col justify-between p-4 leading-normal w-full gap-4">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#e7e8d9] dark:text-white">You&apos;re buying : {buyingTokenName}</h5>
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="p-2 w-18 h-18 bg-custom-radial grid justify-items-center content-center rounded-lg">
                            <img className="w-12 h-12 rounded-full shadow-lg" src={`${buyingTokenImage}`} alt="SOL" />
                        </div>
                        <input ref={refIp2} value={buyingTokenPrice} className="bg-transparent border border-[#e7e8d9] w-3/4 text-[#e7e8d9] text-2xl font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 placeholder-[#e7e8d9]" placeholder="0.00"></input>
                    </div>
                </div>
            </a>
            <div className="flex flex-row gap-4 w-96">
                <button onClick={fetchPrice} type="button" className="w-48 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Fetch Price</button>
                <button onClick={refresh} type="button" className="w-48 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Refresh</button>
            </div>
            <button onClick={refresh} type="button" className="w-96 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Swap SOL</button>
        </div>
    )
}