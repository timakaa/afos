"use client";

import { userStore } from "@/store/user.store";
import WebApp from "@twa-dev/sdk";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUser, user } = userStore();

  const navigate = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUser(WebApp.initDataUnsafe.user);
    }
  }, [setUser]);

  useEffect(() => {
    if (WebApp) {
      const handleMainbuttonClicked = () => {
        navigate.push("/");
        WebApp.BackButton.hide();
      };

      if (pathname !== "/") {
        WebApp.BackButton.show();
      } else {
        WebApp.BackButton.hide();
      }

      WebApp.onEvent("backButtonClicked", handleMainbuttonClicked);

      return () => {
        WebApp.offEvent("backButtonClicked", handleMainbuttonClicked);
        WebApp.BackButton.hide();
      };
    }
  }, [pathname, navigate]);

  if (!user?.username) {
    return (
      <div className='bg-black text-white min-h-screen grid place-items-center '>
        <div className='font-bold text-3xl'>Who are you?</div>
      </div>
    );
  }

  if (
    user?.id !== 1205582492 &&
    user?.id !== 903295331 &&
    user?.id !== 1106241998 &&
    user?.id !== 1615002637
  ) {
    return (
      <div className='bg-black text-white min-h-screen grid place-items-center '>
        <div className='font-bold text-3xl'>You are not allowed</div>
      </div>
    );
  }

  // if (!isMobileDevice()) {
  //   return (
  //     <div className='bg-black text-white h-screen grid place-items-center'>
  //       <div className='font-bold text-3xl'>Play on your phone</div>
  //     </div>
  //   );
  // }

  return <>{children}</>;
}
