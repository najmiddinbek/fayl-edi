'use client'

import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { useRouter } from "next/navigation";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { toast } from "react-toastify";
import Image from "next/image";
import RemoveBtn from './RemoveBtn';

import CreditCard from "../public/CreditCard image.jpg"


const MyModal = ({ show, handleClose }) => {

    const [telefon, setTelefon] = useState("");

    useEffect(() => {
        AOS.init()
    }, [])



    const handleCopyClick = async (e) => {
        e.preventDefault();

        const copiedText = `${generatedNumber}`;
        try {
            await navigator.clipboard.writeText(copiedText);
            toast.success('Karta raqami qurilma xotirasiga saqlandi', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.error('Failed to copy text: ', error);
            toast.error('Copy failed. Please try again.');
        }
    };

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!telefon) {
            toast.error('Telefon raqamingizni kiriting!!!', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        try {
            const res = await fetch("/api/topics", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ telefon, }),
            });

            if (res.ok) {
                toast.success('So`rovingiz yuborildi,band qilinganligini ushbu qismda ko`rishingiz mumkin', {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                router.push("/band")

            } else {
                alert("Failed to create a topic")
            }
        } catch (error) {
            console.log(error);
            alert("Failed to create a topic")
        }
    };


    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-3">
                <input data-aos-duration="1000" data-aos="fade-up" onChange={(e) => setTelefon(e.target.value)} value={telefon} className="text-black border-2 border-[#1111] px-8 py-2" type="text" placeholder="Telefon raqamingizni kiriting..." />

                <div>
                    <Image src={CreditCard} alt='Image' />
                    <h6 className='mt-3'>Pastdagi karta raqamga <span className='text-red-600'>
                        150,000 so`m</span> to`lov qilishingiz kerak bo`ladi,hamda to`lov skrinshotini yuboring.</h6>
                    <div className='flex justify-between mt-3'>
                        <h1 className="text-2xl mt-2 mb-3 lg:text-4xl font-bold">{generatedNumber}</h1>
                        <FaCopy className='text-3xl lg:text-5xl cursor-pointer' onClick={handleCopyClick} />
                    </div>
                </div>

                <div data-aos-duration="1000" data-aos="fade-up" className="flex  w-full">
                    <button
                        type="submit"
                        className="green w-full py-3"
                    >
                        Buyurtma berish
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default MyModal;
