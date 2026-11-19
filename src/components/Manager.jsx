//@ts-nocheck
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { defineElement } from "@lordicon/element";

import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
let id;
defineElement()

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" })//ekhane 3 ta box er data thakbe form e 
  const [passwordArray, setpasswordArray] = useState([])//password er array hishebe thakbe

  const getPassword = async () => {
    let req = await fetch("https://password-manager-mongo-jk8c.onrender.com");

    let password = await req.json()
   

    setpasswordArray(password)

  }


  useEffect(() => {
    getPassword()

  }, [])//useeffect dia ami local storage theke password thakle parse korbo json e and sheta 



  const ref = useRef()
  const Passref = useRef()

  const eyeChange = () => {

    let eyeOn = ref.current.src.includes("/icons/eyeon.png")
    let eyeOff = ref.current.src.includes("/icons/eyecross.png")


    if (eyeOn) {
      ref.current.src = "/icons/eyecross.png"
      Passref.current.type = "password";

    } else if (eyeOff) {
      ref.current.src = "/icons/eyeon.png"
      ref.current.type = "text"
      Passref.current.type = "text";
    }
  }



  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  const savePassword = async() => {
   


    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      let id = uuidv4();
      setpasswordArray([...passwordArray, { ...form, id }])
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id }]))
      let res = await fetch("https://password-manager-mongo-jk8c.onrender.com",{method: "POST",headers: {"Content-Type": "application/json"}, body:JSON.stringify({...form,id:id})})
      setform({ site: "", username: "", password: "" })
      console.log(form);
      
    } else {
      alert("Error: Password not saved! Minimum 4 characters required.")
    }


  }
  const CopyText = (text) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!");
  }
  //   const handleEdit = (id) => {
  //    let newArray = passwordArray.filter((e)=>{
  //     return e.id === id
  //    })




  //   }
  const handleDelete = async(id) => {

    alert("Are you sure want to delete???")
    let newArray = passwordArray.filter((e) => {
      return e.id !== id

    }

    )
    setpasswordArray(newArray)
    // localStorage.setItem("passwords", JSON.stringify(newArray))
      let res = await fetch("https://password-manager-mongo-jk8c.onrender.com",{method: "DELETE",headers: {"Content-Type": "application/json"}, body:JSON.stringify({id:id})})

      
    toast.success("Delete successfull");

  }
  const handleEdit = (id) => {

   
    setform(passwordArray.filter(i => i.id === id)[0])
    setpasswordArray(passwordArray.filter((e) => {
      return e.id !== id
    }))

    // localStorage.setItem("passwords", JSON.stringify(newArray))
    toast.success("Sure to edit?");

  }

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <ToastContainer

        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="mainContainer m-10 max-w-5xl mx-auto ">
        <div className=' flex  md:justify-center  md:items-center justify-center items-center m-5 md:w-full px-3 md:px-0'>
          <input onChange={handleChange} name='site' value={form.site} type="text" className='bg-white   h-7 rounded-sm  pl-2.5 w-[72%] md:w-full' placeholder='Enter Website URL' />
        </div>

        {/* username and passoword div */}
        <div className='flex gap-x-6  md:justify-center md:items-center m-6 justify-center items-center  md:flex-row flex-col  md:w-full gap-y-6'>

          <input onChange={handleChange} name='username' value={form.username} type="text" placeholder='Enter Username' className='bg-white w-[70%] h-7 rounded-sm pl-2.5' />


          <div className='relative  w-[70%] md:w-[30%]'>

            <input onChange={handleChange} ref={Passref} name='password' value={form.password} type="password" placeholder='Enter Password' className='bg-white w-full  h-7 rounded-sm pl-2.5' />
            <span onClick={eyeChange} className=' absolute top-1/2 right-2 -translate-y-1/2 text-black cursor-pointer'><img ref={ref} className='drop-shadow-amber-950' width={20} src="/icons/eyecross.png" alt="" /></span>
          </div>
        </div>

        <div className="button   w-[30%] h-12  md:w-[10%] mx-auto flex justify-center m-6  ">
          <button onClick={savePassword} className='font-bold text-black  w-full  md:py-1.5 rounded-xl bg-purple-600 hover:bg-sky-400 transition-colors duration-200 flex items-center justify-center'>

            <lord-icon

              target="button"
              src="/icons/add.json"
              trigger="click"
              stroke="regular"

              colors="primary:#121331,secondary:#2ca58d,tertiary:#ebe6ef"
              style={{ width: "24px", height: "24px" }}
            ></lord-icon>
            <span className='text-sm'>Save</span>
          </button>
        </div>

      </div>

      {passwordArray.length === 0 && <div className='text-white flex  justify-center items-center'>No passwords to show </div>}
      {passwordArray.length != 0 &&
        <div className="passwords flex flex-col justify-center items-center">
          <div className=" bg-neutral-primary-soft shadow-xs rounded-base border border-white w-full md:w-[80%] m-3">
            <table className=" text-sm text-left rtl:text-right ">
              <thead className="text-sm text-white bg-neutral-secondary-soft border-b rounded-base border-white">
                <tr className='text-center bg-violet-900 text-white font-bold '>

                  <th scope="col" className="md:px-3 md:py-2 font-medium w-1/3 ">
                    <div className="flex justify-center items-center ">

                      <lord-icon
                        target="button"
                        src="/icons/webIcon.json"
                        trigger="loop"
                        stroke="regular"


                        colors="primary:#121331,secondary:#2ca58d,tertiary:#ebe6ef"
                        style={{ width: "24px", height: "24px" }}
                      ></lord-icon>



                      <span className="text-white font-bold ">Url</span>
                    </div>

                  </th>
                  <th scope="col" className="md:px-3 md:py-2 font-medium w-1/3 ">
                    <div className="flex justify-center items-center ">

                      <lord-icon
                        target="button"
                        src="/icons/userIcon.json"
                        trigger="loop"
                        stroke="regular"


                        colors="primary:#121331,secondary:#2ca58d,tertiary:#ebe6ef"
                        style={{ width: "24px", height: "24px" }}
                      ></lord-icon>

                      <span className="ttext-white font-bold ">Username</span>
                    </div>

                  </th>
                  <th scope="col" className="px-3 py-2 font-medium w-1/3 ">
                    <div className="flex justify-center items-center ">

                      <lord-icon
                        target="button"
                        src="/icons/passwordIcon.json"
                        trigger="loop"
                        stroke="regular"


                        colors="primary:#121331,secondary:#2ca58d,tertiary:#ebe6ef"
                        style={{ width: "24px", height: "24px" }}
                      ></lord-icon>

                      <span className="text-white font-bold ">Password</span>
                    </div>

                  </th>



                  {/* NOW i am working in this section */}
                  <th scope="col" className="md:px-3 md:py-2 font-medium w-1/3 pr-3">
                    <div className="flex justify-center items-center gap-2">

                      <lord-icon
                        className="shrink-0"
                        target="button"
                        src="/icons/action.json"
                        trigger="loop"
                        delay="1000"
                        stroke="regular"
                        colors="primary:#121331,secondary:#2ca58d,tertiary:#ebe6ef"
                        style={{ width: "24px", height: "24px" }}
                      ></lord-icon>

                      <span className="text-white font-bold ">Actions</span>
                    </div>

                  </th>


                </tr>
              </thead>

            </table>
          </div>
        </div>
      }

 <div className=' max-h-58 overflow-y-auto w-full [-ms-overflow-style:none] [scrollbar-width:none] pb-3'>
      {passwordArray.map((item, index) => {
        return (
         
          <div key={index} className=" flex-col flex  justify-center items-center">
            <div className=" bg-neutral-primary-soft shadow-xs rounded-base border border-white w-full md:w-[80%] m-3 ">
              <table className="w-full text-sm text-left  text-white table-fixed ">
                {/* <thead> এর পরিবর্তে <tbody> ব্যবহার করা হয়েছে */}
                <tbody className="text-sm text-white bg-neutral-secondary-soft border-b rounded-base border-white bg-green-900 ">
                  <tr className='text-left'>

                    {/* <th> এর পরিবর্তে <td> ব্যবহার করা হয়েছে এবং scope="col" বাদ দেওয়া হয়েছে */}
                    <td className="pt-2 md:pt-0 md:pl-6 md:px-3 md:py-2 font-medium md:w-[30%] align-middle">
                      <div className="flex items-center gap-3 w-full md:pt-2">

                        <div className="pl-2 min-w-0">
                          <a className="underline block truncate" href={item.site} target="_blank">
                            {item.site}
                          </a>
                        </div>

                        <div className="shrink-0">
                          <button onClick={() => { CopyText(item.site) }} className="cursor-pointer pt-0.5">
                            <lord-icon
                              target="button"
                              src="/icons/copy.json"
                              trigger="loop"
                              stroke="regular"
                              colors="primary:#121331,secondary:#2ca58d,tertiary:#ebe6ef"
                              style={{ width: "18px", height: "18px" }}
                            ></lord-icon>
                          </button>
                        </div>

                      </div>
                    </td>

                    <td className="pl-6 px-3 py-2 font-medium w-[30%] overflow-hidden">
                      <div className="flex items-center  gap-x-2">
                        <span className='whitespace-nowrap overflow-x-auto'>{item.username}</span>
                        <button onClick={() => { CopyText(item.username) }} className="cursor-pointer pt-1">
                          <lord-icon
                            target="button"
                            src="/icons/copy.json"
                            trigger="loop"
                            stroke="regular"
                            colors="primary:#121331,secondary:#2ca58d,tertiary:#ebe6ef"
                            style={{ width: "18px", height: "18px" }}
                          ></lord-icon>
                        </button>
                      </div>
                    </td>

                    <td className="pl-6 px-3 py-2 font-medium w-[25%] overflow-hidden">
                      <div className="flex items-center gap-x-2 min-w-0">
                        <span className='whitespace-nowrap overflow-x-auto'>{"*".repeat(item.password.length)}</span>
                        <button onClick={() => { CopyText(item.password) }} className="cursor-pointer pt-1">
                          <lord-icon
                            target="button"
                            src="/icons/copy.json"
                            trigger="loop"
                            stroke="regular"
                            colors="primary:#121331,secondary:#2ca58d,tertiary:#ebe6ef"
                            style={{ width: "18px", height: "18px" }}
                          ></lord-icon>
                        </button>
                      </div>
                    </td>

                    <td className=' cursor-pointer content-center w-[15%]'>
                      <div className='flex justify-center gap-2 md:gap-3 items-center flex-row  w-full '>
                        <div>
                          <button className='cursor-pointer' onClick={() => { handleEdit(item.id) }}>
                            <lord-icon
                              className="shrink-0"
                              target="button"
                              src="/icons/edit.json"
                              trigger="loop"
                              stroke="regular"
                              colors="primary:#121331,secondary:#2ca58d,tertiary:#ebe6ef"
                              style={{ width: "23px", height: "23px" }}
                            ></lord-icon>
                          </button>
                        </div>
                        <div>
                          <span onClick={() => { handleDelete(item.id) }}>
                            <lord-icon
                              target="button"
                              src="/icons/delete.json"
                              trigger="loop"
                              stroke="regular"
                              colors="primary:#121331,secondary:#2ca58d,tertiary:#ebe6ef"
                              style={{ width: "23px", height: "23px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </div>
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
         
        );
      })}
       </div>

    </>

  )
}

export default Manager