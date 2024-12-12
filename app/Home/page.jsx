'use client'
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useLayoutEffect, useState } from 'react';

const page = () => {
  const [token,settoken]=useState();
  const [auth,setAuth]=useState(false)
  const [username,setUserName]=useState();
  const router=useRouter();

  const authenticatingUser=async ()=>{
    // console.log("Authenticating....")
    const t=await axios.get('http://localhost:3001/check-token',).then((response)=>{
    //   console.log("User Name recieved from Backend",response)
      if(response.data.status=="success"){
        setUserName(response.data.username)
        setAuth(true)}
      })
     }

     function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return "No cookie Found"
      }

     const Logout=async ()=>{
        try{
          await axios.get('http://localhost:3001/logout').then((response)=>{
            if(response.data.status=="success"){
              location.reload()
            }
          })
        }
        catch(err){
          console.log(err)
        }
      }


     useLayoutEffect(()=>{
        settoken(getCookie('token')) 
        // console.log(token)
        if(token){
       authenticatingUser()
        }
},[token])

  return (
    <> 
    {auth?
    <div className="flex flex-col h-screen w-screen items-center justify-center">
    <h1>Hello {username} you're Loged In successfully !</h1>
    <Image className="bg-transparent" src="/ok.png" width={200} height={200} alt="image"/>
    <button className='p-2 bg-white rounded-lg m-5 text-black' onClick={()=>Logout()}>Log out</button>
    </div>:<div className="h-screen w-screen flex flex-col items-center justify-center gap-5">
    <p>You're not authenticated</p>
    <Image src="/wrongdecision.png" width={300} height={200} alt="image-erro"/>
    <button onClick={()=>router.push('/')} className='p-2 bg-blue-600 text-white m-4 rounded-md'>Login Now</button>
    </div>}    
    </>
  )
}

export default page