"use client";

import Spinner from "@/components/ui/Spinner/Spinner";
import { maxPossibleEnergyTable } from "@/lib/boosts";
import { isMobileDevice } from "@/lib/isMobileDevice";
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
  const { setUser, user, setIsAuth, setEnergy, setIsEnergyRecovering } =
    userStore();
  const [prevEnergy, setPrevEnergy] = useState<number | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    if (
      prevEnergy &&
      prevEnergy < user.energy &&
      user.energy <
        maxPossibleEnergyTable[
          user.energyLimitIndex as keyof typeof maxPossibleEnergyTable
        ]
    ) {
      setIsEnergyRecovering(true);
    } else {
      setIsEnergyRecovering(false);
    }
    setPrevEnergy(user.energy);
  }, [user.energy, setEnergy]);

  useEffect(() => {
    if (WebApp) {
      const handleMainbuttonClicked = () => {
        router.push("/");
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
  }, [pathname, router]);

  useEffect(() => {
    const authenticateUser = async () => {
      const WebApp = (await import("@twa-dev/sdk")).default;
      WebApp?.ready();
      const initData = WebApp?.initData;
      const initDataUnsafe = WebApp?.initDataUnsafe;

      console.log(initDataUnsafe);
      console.log(
        `Приложение открыто с параметром start: ${initDataUnsafe.start_param}`,
      );

      if (initData) {
        const initDataParams = new URLSearchParams(initData);
        const initDataParamsUser = JSON.parse(
          initDataParams.get("user") || "{}",
        );

        if (!initDataParamsUser.username) return;

        try {
          setIsLoading(true);
          const response = await fetch(
            `/api/auth${
              initDataUnsafe.start_param
                ? `?start=${initDataUnsafe.start_param}`
                : ""
            }`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ initData }),
            },
          );

          if (response.ok) {
            setIsAuth(true);
            const data = await response.json();
            console.log(data);
            setUser({ ...data.user, energy: data.user.energy });
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

  useEffect(() => {
    const interval = setInterval(() => {
      const maxEnergy =
        maxPossibleEnergyTable[
          user.energyLimitIndex as keyof typeof maxPossibleEnergyTable
        ];

      if (user.energy < maxEnergy) {
        setEnergy(Math.min(user.energy + 1, maxEnergy));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user.energy, user.energyLimitIndex, setEnergy]);

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
    user?.telegramId !== 1258260028 &&
    !isLoading
  ) {
    return (
      <div className='bg-black text-white min-h-screen grid place-items-center '>
        <div className='font-bold text-3xl'>You are not allowed</div>
      </div>
    );
  }

  if (!isMobileDevice()) {
    return (
      <div className='bg-black text-white h-screen grid place-items-center'>
        <div className='font-bold text-3xl'>Play on your phone</div>
      </div>
    );
  }

  return <>{children}</>;
}
