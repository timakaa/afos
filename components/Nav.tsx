"use client";

import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShopping } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();

  let activeIndex;
  if (pathname === "/") {
    activeIndex = 0;
  } else if (pathname.startsWith("/shop")) {
    activeIndex = 1;
  } else if (pathname === "/profile") {
    activeIndex = 2;
  } else {
    activeIndex = 0;
  }

  return (
    <nav className='fixed bottom-0 z-50 w-full justify-around py-6 flex bg-black'>
      <div
        className='absolute grid w-16 h-16 bg-white rounded-full duration-100 ease-in-out'
        style={{
          bottom: "10px",
          left: `calc((100% / 3) * ${activeIndex} + (100% / 6) - 32px)`,
        }}
      ></div>
      <Link
        href='/'
        className={`text-4xl z-10 duration-100 ${
          pathname === "/" ? "text-black" : "text-white"
        }`}
      >
        <AiOutlineHome />
      </Link>

      <Link
        href='/shop'
        className={`text-4xl z-10 duration-100 ${
          pathname.startsWith("/shop") ? "text-black" : "text-white"
        }`}
      >
        <AiOutlineShopping />
      </Link>

      <Link
        href='/profile'
        className={`text-4xl z-10 duration-100 ${
          pathname === "/profile" ? "text-black" : "text-white"
        }`}
      >
        <CgProfile />
      </Link>
    </nav>
  );
};

export default Nav;
