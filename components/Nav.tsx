"use client";

import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShopping } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiCoins } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi";

const Nav = () => {
  const pathname = usePathname();

  let activeIndex;
  if (pathname === "/") {
    activeIndex = 0;
  } else if (pathname.startsWith("/shop")) {
    activeIndex = 1;
  } else if (pathname.startsWith("/tasks")) {
    activeIndex = 2;
  } else if (pathname.startsWith("/refs")) {
    activeIndex = 3;
  } else if (pathname.startsWith("/profile")) {
    activeIndex = 4;
  } else {
    activeIndex = 0;
  }

  const navItems = [
    { href: "/", icon: <AiOutlineHome /> },
    { href: "/shop", icon: <AiOutlineShopping /> },
    { href: "/tasks", icon: <PiCoins /> },
    { href: "/refs", icon: <HiOutlineUserGroup /> },
    { href: "/profile", icon: <CgProfile /> },
  ];

  return (
    <nav className='fixed bottom-0 z-50 w-full justify-around py-6 flex bg-black'>
      <div
        className='absolute grid w-12 h-12 bg-white rounded-full duration-100 ease-in-out'
        style={{
          bottom: "12px",
          left: `calc((100% / 5) * ${activeIndex} + (100% / 10) - 24px)`,
        }}
      ></div>
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`text-2xl z-10 duration-100 ${
            (
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            )
              ? "text-black"
              : "text-white"
          }`}
        >
          {item.icon}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
