"use client";

export default function Home() {

  return (
    <div className="bg-custom-radial md:mt-[75px] px-8 py-4 flex flex-col justify-center items-center gap-2 h-screen w-full">
      <div className="mt-20 w-96 flex flex-col justify-center items-center"><h1 style={{ textShadow: '0 0 1.75rem #FCEAAC' }} className="mb-2 text-3xl text-[#FCEAAC] md:text-5xl lg:text-6xl text-[#FCEAAC] saturate-[175%]"><span className="text-transparent bg-clip-text bg-[#FCEAAC] hover:bg-[#ff4691] hover:cursor-pointer">dex.</span></h1></div>
      <div className="mt-4 mx-4 h-96 flex flex-col items-center text-center"><h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-white saturate-[175%] md:text-2xl lg:text-4xl">dex. is a sample web3 application built on the solana blockchain that facilitates swapping a native SOL for USDC. Under the hood, dex. uses jup.ag API to fetch the current traded price of USDC and create a buy transaction with a slippage of 20 bps.</h2></div>
      <div className="mt-4">  
        <h2 className="mb-2 text-2xl font-semibold text-white">Get started!</h2>
        <ul style={{ textShadow: '0 0 1.75rem #FCEAAC' }} className="max-w-md space-y-1 text-[#FCEAAC] text-xl list-disc list-inside">
            <li>
                Connect a wallet
            </li>
            <li>
                Fetch the latest price
            </li>
            <li>
                Swap the token
            </li>
        </ul>
      </div>
      <div className="h-96 w-2/3 flex flex-col justify-center items-center text-2xl text-[#FCEAAC] saturate-[175%] relative overflow-x-hidden"><div className="flex gap-20 py-4 animate-[marquee_30s_linear_infinite] whitespace-nowrap">Connect a wallet - Fetch price and quote - Swap tokens - Connect a wallet - Fetch price and quote - Swap tokens</div></div>
    </div>
  );
}