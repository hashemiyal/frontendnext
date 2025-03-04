"use client"
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CartContextProvider from "../../contexts/CartContext";
import {SessionProvider} from 'next-auth/react';
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> 
       <SessionProvider basePath="/api/auth">
       <CartContextProvider>
         <Header /> 
      {children}
      <Footer /> 
      </CartContextProvider>
      </SessionProvider>
      </body>
    </html>
  );
}
