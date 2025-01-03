"use client";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic"
const WalletMultiButtonDynamic = dynamic(
    async () => (await import ("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr : false}
);
const WalletMultiDiconnectButtonDynamic = dynamic(
    async () => (await import ("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
    { ssr : false}
);
import "@solana/wallet-adapter-react-ui/styles.css";
import { 
    useConnection, 
    useWallet
} from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, VersionedTransaction } from "@solana/web3.js";

export const Swap = () => {

    const [sellingTokenImage, setSellingTokenImage] = useState(null);
    const [sellingTokenName, setSellingTokenName] = useState(null);
    const [buyingTokenImage, setBuyingTokenImage] = useState(null);
    const [buyingTokenName, setBuyingTokenName] = useState(null);
    const [sellingTokenAmount, setSellingTokenAmount] = useState();
    const [buyingTokenPrice, setBuyingTokenPrice] = useState();
    const refIp1 = useRef(null);
    const refIp2 = useRef(null);
    const { connection } = useConnection();
    const wallet = useWallet();

    useEffect(()=>{
        const fetchToken = async () => {
            try{
                const sellingResponse = await axios.get("https://tokens.jup.ag/token/So11111111111111111111111111111111111111112");
                setSellingTokenImage(sellingResponse.data.logoURI);
                setSellingTokenName(sellingResponse.data.symbol);
                const buyingResponse = await axios.get("https://tokens.jup.ag/token/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
                setBuyingTokenImage(buyingResponse.data.logoURI);
                setBuyingTokenName(buyingResponse.data.symbol);
                console.log("Connection", connection);
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
            const response = await axios.get("https://api.jup.ag/price/v2", { params : {
                ids:"So11111111111111111111111111111111111111112"
            }});
            console.log("Price", response);
            setBuyingTokenPrice(response.data.data.So11111111111111111111111111111111111111112.price * sellingTokenAmount);
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

    const swapTokens = async () => {

        try{
            const quoteResponse = await axios.get("https://quote-api.jup.ag/v6/quote", { params : {
                inputMint: "So11111111111111111111111111111111111111112",
                outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                amount: sellingTokenAmount * LAMPORTS_PER_SOL,
                slippageBps: "20"
            }});
            console.log("Quote Response", quoteResponse.data);
            console.log("Wallet Key", wallet.publicKey.toString());

            const swapTransaction = await axios.post("https://quote-api.jup.ag/v6/swap", 
                {
                    quoteResponse: quoteResponse.data,
                    userPublicKey: wallet.publicKey.toString(),
                    wrapAndUnwrapSol: true,
                },
                {
                headers: {
                  'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Swap Tx:", swapTransaction.data.swapTransaction);
            
            const swapTransactionBuf = Buffer.from(swapTransaction.data.swapTransaction, 'base64');
            var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
            console.log("Tx: ", transaction);

            // set fee payer
            transaction.feePayer = wallet.publicKey;
            // get latest blockhash
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            // sign transaction
            const signedTx = await wallet.signTransaction(transaction);
            console.log("Signed Transaction", signedTx);
            // send transaction
            const txId = await connection.sendRawTransaction(signedTx.serialize());
            console.log("Transaction ID", txId);
            // confirmTransaction returns a signature
            const signature = await connection.confirmTransaction(txId, "confirmed");
            console.log("Signature", signature);

        } catch(err) {
            console.log("Error : ", err);
        }
    } 

    return (
        <div className="bg-custom-radial md:mt-[75px] px-8 py-8 flex flex-col justify-center items-center gap-8 h-full w-full">
            <h1 style={{ textShadow: '0 0 1.75rem #FCEAAC' }} className="mb-2 text-3xl text-[#FCEAAC] md:text-5xl lg:text-6xl text-[#FCEAAC] saturate-[175%]"><span className="text-transparent bg-clip-text bg-[#FCEAAC] hover:bg-[#ff4691] hover:cursor-pointer">dex.</span></h1>
            <div className="flex flex-col justify-center items-center md:flex-row gap-4 md-gap-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                <WalletMultiButtonDynamic/>
                <WalletMultiDiconnectButtonDynamic/>
            </div>
            <a href="#" className="flex flex-col items-center bg-white border border-gray-200 bg-custom-linear rounded-lg w-64 shadow md:flex-row md:w-96 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="flex flex-col justify-between p-4 leading-normal w-full gap-4">
                    <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-[#e7e8d9] dark:text-white">You&apos;re selling : {sellingTokenName}</h5>
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="p-2 w-18 h-18 md:w-16 md:h-16 bg-custom-radial grid justify-items-center content-center rounded-lg">
                            <img className="w-8 h-8 md:w-12 md:h-12 rounded-full shadow-lg" src={`${sellingTokenImage}`} alt="SOL" />
                        </div>
                        <input ref={refIp1} type="number" onChange={(e)=>{
                            setSellingTokenAmount(e.target.value);
                        }} className="bg-transparent border border-[#e7e8d9] text-[#e7e8d9] w-3/4 text-lg md:text-2xl font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 placeholder-[#e7e8d9]" placeholder="0.00"></input>
                    </div>
                </div>
            </a>
            <a href="#" className="flex flex-col items-center bg-white border border-gray-200 bg-custom-linear rounded-lg w-64 shadow md:flex-row md:w-96 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="flex flex-col justify-between p-4 leading-normal w-full gap-4">
                    <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-[#e7e8d9] dark:text-white">You&apos;re buying : {buyingTokenName}</h5>
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="p-2 w-18 h-18 md:w-16 md:h-16 bg-custom-radial grid justify-items-center content-center rounded-lg">
                            <img className="w-8 h-8 md:w-12 md:h-12 rounded-full shadow-lg" src={`${buyingTokenImage}`} alt="SOL" />
                        </div>
                        <input ref={refIp2} value={buyingTokenPrice} readOnly className="bg-transparent border border-[#e7e8d9] w-3/4 text-[#e7e8d9] text-lg md:text-2xl font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 placeholder-[#e7e8d9]" placeholder="0.00"></input>
                    </div>
                </div>
            </a>
            <div className="flex flex-row justify-between items-center gap-4 w-64 md:w-96">
                <button onClick={fetchPrice} type="button" className="w-24 md:w-48 py-2.5 px-5 me-2 mb-2 text-xs md:text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Fetch</button>
                <button onClick={refresh} type="button" className="w-24 md:w-48 py-2.5 px-5 me-2 mb-2 text-xs md:text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Refresh</button>
            </div>
            <button onClick={swapTokens} type="button" className="w-48 md:w-96 py-2.5 px-5 me-2 mb-2 text-xs md:text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Swap SOL</button>
        </div>
    )
}