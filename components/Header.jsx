"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import "../src/app/login/style.css"
import { CgMenuOreos } from "react-icons/cg";
import { CartContext } from "../contexts/CartContext";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { HiOutlineLogin } from "react-icons/hi";
import { GiArchiveRegister } from "react-icons/gi";
import { IoIosCart } from "react-icons/io";
import { FaShopify } from "react-icons/fa";
import { SiHomeadvisor } from "react-icons/si";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { ImHappy } from "react-icons/im";
const Header = () => {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  let {cart}=useContext(CartContext);
  const {data:session}=useSession();
  return (
    <header className="header">
      <div className="header-wrapper">
        <Link href={"/"} className="logo">
          <img src="/images/logo.png" alt="logo" className="logo"/>
        </Link>
        <nav className={`nav ${mobileNavActive ? "active" : ""}`}>
          <Link href={"/"} className="nav-link">صفحه اصلی <SiHomeadvisor style={{display:"inline",fontSize:"30px"}} /></Link>
          <Link href={"/products"} className="nav-link">فروشگاه <FaShopify style={{display:"inline",fontSize:"30px"}} /></Link>
         {session?.user ?<Link href={"/cart"} className="nav-link">({cart.length})سبد خرید <IoIosCart style={{display:"inline",fontSize:"30px"}} /></Link> :<Link href={"/login"} className="nav-link">({ session?.user ?cart.length :0})سبد خرید <IoIosCart style={{display:"inline",fontSize:"30px"}} /> </Link>}
         { !session?.user && <Link href={"/login"} className="nav-link"> ورود به سیستم <HiOutlineLogin style={{display:"inline",fontSize:"30px"}} /></Link>}
         { !session?.user && <Link href={"/register"} className="nav-link">ثبت کاربر <GiArchiveRegister style={{display:"inline",fontSize:"30px"}} /></Link>}
         {session?.user && <Link href={"#"} onClick={() => { signOut() }} className="nav-link">از سیستم خارج شدن<CiLogout style={{display:"inline",fontSize:"30px"}} /></Link>}
       { session?.user?.isAdmin &&  <Link href={"http://localhost:3001/dashboard"} className="nav-link">دشبورد <RiDashboardHorizontalFill style={{display:"inline",fontSize:"30px"}} /></Link>}
        {session?.user && <div className="nav-link"> <ImHappy style={{fontSize:"30px",display:"inline"}} /> سلام :<strong>{session?.user.username}</strong> </div>}
        </nav>
        <button className="nav-button" onClick={() => setMobileNavActive((prev) => !prev)}>
        <CgMenuOreos style={{fontSize:"50px"}}/>
        </button>
      </div>
    </header>
  );
};

export default Header;