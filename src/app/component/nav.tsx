import Link from "next/link";
import React from "react";
import Toggle from "./toggle";
 
export default function Nav(){
  return(
    <nav className="px-8 md:px-12 py-4 md:py-6 bg-[#2b3945] dark:bg-white w-[100%] items-center shadow fixed">
      <div className="flex justify-between">
        <Link href={"/"} className="text-xl md:text-3xl font-bold">
          <h1 >Where in the world?</h1>
        </Link>
        <Toggle />
      </div>
    </nav>
  )
}
