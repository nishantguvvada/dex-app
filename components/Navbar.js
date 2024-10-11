export const Navbar = () => {
    return (
            <nav className="antialiased bg-custom-linear w-full shadow-xl dark:bg-gray-900 fixed w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl text-[#e7e8d9] font-semibold whitespace-nowrap dark:text-white">dex.</span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e7e8d9] dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-opacity-0 md:dark:bg-opacity-0 dark:border-gray-700">
                <li>
                    <a href="#" className="block py-2 px-3 text-xl font-medium text-[#e7e8d9] hover:text-[#ff4691] rounded" aria-current="page">home.</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-xl font-medium text-[#e7e8d9] rounded hover:text-[#ff4691]">swap.</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-xl font-medium text-[#e7e8d9] rounded hover:text-[#ff4691]">escrow.</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-xl font-medium text-[#e7e8d9] rounded hover:text-[#ff4691]">community.</a>
                </li>
                </ul>
            </div>
            </div>
            </nav>
    )
}