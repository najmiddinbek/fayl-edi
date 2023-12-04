'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import Link from 'next/link'
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function MainPage() {
    useEffect(() => {
        AOS.init()
    }, [])
    return (
        <div className="min-h-[56vh] lg:min-h-[80vh]">
            <div className="">
                <div className='md:h-[70vh] flex items-center h-[20vh] justify-center'>
                    <center className='mt-16' data-aos-duration="1000" data-aos="zoom-in">
                        <Link href={"/addTopic"} className='button py-5 uppercase tracking-widest text-xl px-9 rounded-md text-white border-2 border-transparent bg-[#019879]'>Stadion band qilish</Link>
                        <h1 className='text-4xl md:text-3xl lg:text-7xl text-white font-bold text-center mt-12'>Chortoq Tuman mini-stadion Band qilish</h1>
                    </center>
                </div>
            </div>
        </div>
    )
}
