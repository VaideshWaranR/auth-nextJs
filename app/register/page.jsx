'use client'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'
const page = () => {
  const [inpType,setInp]=useState("password")
  const [name,setName]=useState();
  const [mail,setMail]=useState()
  const [pass,setPass]=useState()
  const [registered,setRegistered]=useState(false)
  const router=useRouter()
  const toggle=()=>{
    const isChecked = document.querySelector("input[type='checkbox']").checked;
    setInp(isChecked ? "text" : "password");
  }
  const registerUser=async ()=>{
  try{
    const result=await axios.post('http://localhost:3001/register',{
      username:name,
      usermail:mail,
      password:pass,
    },{
            headers: {
              'Content-Type': 'application/json'
            }
    }).then((response)=>{
      console.log(response)
      if(response.data.status=="succcess"){
        setRegistered(true)
      }
    })
  }
  catch(err){
    console.log("Error registering User")
  }
  }
  return (
    <>
    {registered ? 
    <div className="h-screen w-screen gap-5 flex flex-col items-center justify-center">
      <p>Registration Successful ! Now You can Login to your account</p>
      <Image src="/key-person.gif" width={300} height={200} alt="img-error" />
      <button onClick={()=>router.back()} className="bg-blue-500 text-white rounded-lg text-lg px-5 py-2 ">Login</button>
    </div> : <div className="flex flex-col items-center gap-4  mt-[200px]">
        <Image src="/bowling.gif" width={300} height={200} alt="img-error"/>
        <input onChange={(e)=>setName(e.target.value)} className="p-2 rounded-lg  w-[max(20%,300px)] text-black" placeholder="Enter your Name" />
        <input onChange={(e)=>setMail(e.target.value)} className="p-2 rounded-lg  w-[max(20%,300px)] text-black" placeholder="Enter your Mail" type="email"></input>
        <input  onChange={(e)=>setPass(e.target.value)}className="p-2 rounded-lg  w-[max(20%,300px)] text-black" placeholder="Password" type={inpType}></input>
        <div className="flex gap-3">
        <input type="checkbox" className="" onClick={toggle}/> 
        <p onClick={toggle} className="cursor-pointer">Show Password</p> 
        </div>
        <button onClick={()=>registerUser()} className=" w-[150px] p-2 rounded-md  bg-blue-600">Register</button>
    </div>}
    </>
  )
}

export default page