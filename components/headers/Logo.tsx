import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function Logo() {

  return (
    <div className="flex -mt-2 justify-center items-center bg-transparent">
      <Link href="/" >
        {/* <Image
          src=""
          alt="Logo"
          width={150}
          height={20}
          className=" object-cover"
        /> */}
        <div className="font-bold text-2xl text-white">

              Vegas Christian Gifts
        </div>
    
      </Link>
    </div>
  );
}

export default Logo;
