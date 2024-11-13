import React from "react";
import Link from "next/link";

interface ButtonExploreProps {
  title: string;
  url: string;
}

const ButtonExplore:React.FC<ButtonExploreProps> = ({ title, url }) => {
  return (
    <Link href={url}>
      <button className="bg-white-600 hover:bg-blue-700 hover:text-white shadow-sm hover:shadow-lg text-zinc-600 font-bold p-1 border border-blue-500 rounded-full transition duration-300 min-w-32">
        {title}
      </button>
    </Link>
  );
};

export default ButtonExplore;
