"use client";

import Spinner from "@/components/ui/Spinner/Spinner";
import { userStore } from "@/store/user.store";
import WebApp from "@twa-dev/sdk";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser, user, setIsAuth } = userStore();

  const navigate = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    const authenticateUser = async () => {
      const WebApp = (await import("@twa-dev/sdk")).default;
      WebApp?.ready();
      const initData = WebApp?.initData;

      if (initData) {
        try {
          setIsLoading(true);
          const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ initData }),
          });

          if (response.ok) {
            setIsAuth(true);
            const data = await response.json();
            console.log(data);
            setUser({
              telegramId: data.user.id,
              username: data.user.username,
              first_name: data.user.first_name,
              last_name: data.user.last_name,
              is_premium: data.user.is_premium,
              language_code: data.user.language_code,
            });
            router.refresh();
          } else {
            console.log("Authentication failed");
            setIsAuth(false);
          }
        } catch (error) {
          console.log("Error during authenticating: " + error);
          setIsAuth(false);
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      }
    };

    authenticateUser();
  }, []);

  if (isLoading)
    return (
      <div className='grid h-screen bg-black w-full place-items-center'>
        <Spinner />
      </div>
    );

  if (!user?.username && !isLoading) {
    return (
      <div className='bg-black text-white min-h-screen grid place-items-center '>
        <div className='font-bold text-3xl'>Who are you?</div>
      </div>
    );
  }

  if (
    user.telegramId &&
    user?.telegramId !== 1205582492 &&
    user?.telegramId !== 903295331 &&
    user?.telegramId !== 1106241998 &&
    user?.telegramId !== 1615002637 &&
    !isLoading
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
