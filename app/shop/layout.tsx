"use client";

import ShopHeader from "@/components/ShopHeader";
import { comparePathnames } from "@/lib/comparePathnamesDeep";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const navigate = useRouter();

  useEffect(() => {
    if (comparePathnames(pathname, "/shop")) {
      navigate.push("/shop/pics");
    }
  }, [pathname, navigate]);
  return (
    <div>
      <ShopHeader />
      {children}
    </div>
  );
}
