"use client";

import { userStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { setIsAuth } = userStore();

  useEffect(() => {
    const authenticateUser = async () => {
      const WebApp = (await import("@twa-dev/sdk")).default;
      WebApp?.ready();
      const initData = WebApp?.initData;

      if (initData) {
        try {
          const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ initData }),
          });

          if (response.ok) {
            setIsAuth(true);
            router.refresh();
          } else {
            console.log("Authentication failed");
            setIsAuth(false);
          }
        } catch (error) {
          console.log("Error during authenticating: " + error);
          setIsAuth(false);
        }
      }
    };

    authenticateUser();
  }, []);

  return <>{children}</>;
}
