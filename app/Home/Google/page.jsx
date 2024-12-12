'use client'
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLayoutEffect } from 'react';

const page= () => {
  const router=useRouter()
  const [queryParams, setQueryParams] = useState({});
  const clearCookies=()=>{
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    });
    location.reload()
    router.push('/')
  }
    // document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/";
  useLayoutEffect(() => {
    const userInfo=getCookieValue("user")
    if(userInfo)
    try{
      const user=JSON.parse(userInfo)
    console.log(user.name)
   if(user){
    console.log(user)
    const name=user.name;
    const email=user.email;
    const picture=user.picture;
    setQueryParams({
      name,
      email,
      picture: decodeURIComponent(picture), // Decode the picture URL
    });
   }  

   else{
    // Access the query string from the URL
    const queryString = window.location.search;

    // Use URLSearchParams to parse the query string
    const urlParams = new URLSearchParams(queryString);

    // Extract individual parameters
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const picture = urlParams.get('picture');

    // Set the query parameters to state
    setQueryParams({
      name,
      email,
      picture: decodeURIComponent(picture), // Decode the picture URL
    });
  }
}
catch(err){
  console.log("Failed in parsing")
}
  }, []);

  if (!queryParams.name || !queryParams.email || !queryParams.picture) {
    return(
    <div className="h-screen w-screen flex flex-col items-center justify-center">
    <p>Looks like your logged Out !</p>
    <Image src="/oops.png" width={180} height={200} alt="" />
    <button onClick={()=>router.push('/')} className="px-5 py-2 bg-blue-500 text-lg rounded-lg ">Log In</button>
    </div>
    )
  }

  function getCookieValue(cookieName) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

  return (
    <div className="text-lg h-screen w-screen flex flex-col justify-center items-center">
      <h1>Succesful Google Login!</h1>
      <div className="flex gap-2 items-center m-10">
        <Image className="rounded-full object-cover" src={queryParams.picture} width={100} height={100} alt="Profile Picture" />
        <div className="flex flex-col gap-2 items-start">
        <p>{queryParams.name}</p>
        <p>{queryParams.email}</p>
       </div>
       </div>
       <button onClick={()=>{ clearCookies() }} className="px-6 rounded-lg hover:bg-gray-700 py-2 bg-gray-500/30 text-white">Log out</button>
       </div>
  );
};

export default page;
