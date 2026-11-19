import React from 'react'

const Footer = () => {
return (
    <footer className="bg-slate-900 text-white flex flex-col justify-center items-center py-4 border-t border-purple-900/50 w-full mt-auto absolute bottom-0">
      {/* Logo Section */}
      <div className="logo font-bold text-xl flex items-center gap-1">
        <span className="text-green-500">&lt;</span>
        <span className="text-white">Pass</span>
        <span className="text-purple-500">Corner</span>
        <span className="text-green-500 font-bold">&gt;</span>
      </div>

      {/* Credit / Tagline Section */}
      <div className="flex justify-center items-center text-sm text-gray-400 mt-1">
        Created with <span className="text-red-500 text-base mx-1">❤️</span> by <span className="text-purple-400 font-medium ml-1">Apurbo</span>
      </div>
    </footer>
  );
}

export default Footer