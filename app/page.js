'use client'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const page = () => { 
  const [userMail,setUserEmail]=useState();
  const [userPass,setUserPass]=useState();

  const router =useRouter()
  axios.defaults.withCredentials=true;

  const handleGoogleAuth=()=>{
    window.location.href="http://localhost:3001/auth/google"
  }

  const sendData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3001/login',
          {
            usermail: userMail,
            password: userPass
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        // console.log(response);
        router.push('/Home')
      } catch (error) {
        console.log(error.response.data);
      }
  };
 
 

 function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null
  }

  useEffect(()=>{
    if(getCookie('token')){
      router.push('/Home')
    }
  })
  
  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
    <div className="flex flex-col  gap-5 items-center border-2 w-[350px] h-auto p-5 rounded-lg">
      <Image src="/login.png" width={300} height={200} alt="image-error" />
      <input type="email" onChange={(e)=>setUserEmail(e.target.value)} placeholder="Enter your email" className=" rounded-sm p-2 text-black w-[95%]"></input>
      <input onChange={(e)=>setUserPass(e.target.value)} placeholder="Enter your Password" className=" rounded-sm p-2 text-black w-[95%]"></input>
      <div className="flex justify-between w-full items-center px-2">
            <button onClick={()=>sendData()} className="bg-blue-600 p-2 text-white text-lg rounded-lg w-[48%]">Login</button>
            <button onClick={()=>router.push('/register')} className="bg-blue-600 rounded-lg text-lg text-white w-[48%] p-2">Register</button>
      </div>
      <button onClick={()=>handleGoogleAuth()} className="w-[90%] p-3  border-2 border-white rounded-md flex items-center gap-4 justify-center hover:text-blue-400 text-lg hover:border-blue-400"> <Image src="/google-symbol.png" alt="" width={25} height={25}/>Sign in with Google</button>     
    </div> 
    </div>
  )
}

export default page
