'use client'
import Link from "next/link";
import Logo from "../public/Futbolchi rasmi.png";
import Image from "next/image";
import { useEffect } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function Navbar() {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <>
      <div className="pt-10 flex justify-center">
        <Link className="bg-transparent hover:bg-[#019879] px-12 md:px-20 py-3 text-white green-border font-semibold hover:text-white border  hover:border-transparent rounded text-xl md:text-[22px]" href={"/login"}>Admin</Link>
      </div>
    </>
  );
}

