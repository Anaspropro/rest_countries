"use client"

import { useEffect } from "react"

export default function Error({error}: {error : Error}){
  useEffect(() =>{
    console.log(error);    
  },[error])

  return(
    <div className="flex justify-center items-center h-screen">
      <div className="text-red-500 text-2xl">
        Error fetching country&apos;s data
      </div>
    </div>
  )
}