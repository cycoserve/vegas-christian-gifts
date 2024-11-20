import React from "react";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div className="flex justify-center items-center bg-transparent">
      <Link href="/" className="relative w-[200px] h-[50px]">
        <Image
          src="/logo.svg"
          alt="Vegas Christian Gifts"
          fill
          priority
          className="object-contain"
        />
      </Link>
    </div>
  );
}

export default Logo;
