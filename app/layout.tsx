import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import AuthLayout from "./authLayout";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "AFOS",
  description: "AFOS APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased`}>
        <AuthLayout>
          <div className='bg-black text-white relative min-h-screen flex flex-col'>
            <main className='flex-grow'>{children}</main>
            <Nav />
          </div>
        </AuthLayout>
        <Toaster
          position='top-center'
          toastOptions={{
            style: {
              zIndex: 9999,
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
