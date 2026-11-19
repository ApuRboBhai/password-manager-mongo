//@ts-nocheck
import React from 'react'
import { defineElement } from "@lordicon/element";

const Navbar = () => {

  

  return (
    <div>
      <div className=" bg-violet-950 flex w-full mx-auto h-13 justify-around items-center">
      <div className="name  font-bold text-2xl text-green-300 cursor-pointer">
      &lt;
        PassCorner
         &gt;
        </div>
        {/* <div className="list ">
          <ul className='flex gap-x-10 text-white font-bold '>
          <a  className='hover:bg-black p-3 rounded-2xl hover:text-gray-200' href=''>Home</a>
          <a  className='hover:bg-black p-3 rounded-2xl hover:text-gray-200' href=''>About</a>
          <a  className='hover:bg-black p-3 rounded-2xl hover:text-gray-200' href=''>Contact</a>
          </ul>
        </div> */}
        <button className="Github flex justify-center items-center border bg-green-300 p-2 rounded-full cursor-pointer">
           <lord-icon
                      target="button"
                      src="/icons/github.json"
                      trigger="click"
                      stroke="regular"
                      state="hover-rotation"

                      colors="primary:#121331,secondary:#2ca58d,tertiary:#ebe6ef"
                      style={{ width: "24px", height: "24px" }}
                    ></lord-icon>
                    <span>GitHub</span>

        </button>
        </div>
    </div>
  )
}

export default Navbar