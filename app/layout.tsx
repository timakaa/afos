import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import AccessLayout from "./accessLayout";

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
        <div className='bg-black text-white relative min-h-screen flex flex-col'>
          <AccessLayout>
            <main className='flex-grow mb-28'>{children}</main>
            <Nav />
          </AccessLayout>
        </div>
      </body>
    </html>
  );
}
