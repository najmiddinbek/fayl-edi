"use client";

import React, { useState, useEffect } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import RemoveBtn from "./RemoveBtn";
import 'aos/dist/aos.css';
import AOS from 'aos';
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

import 'bootstrap/dist/css/bootstrap.min.css';

import MyModal from "./Modal";
import Image from "next/image";


const Filter = () => {
    const [loading, setLoading] = useState(true); // Introduce loading state
    const [topics, setTopiclar] = useState([]);
    const [filteredMavzula, setFilteredMavzula] = useState([]);
    const [buttonStatus, setButtonStatus] = useState(null);


    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [filterValue, setFilterValue] = useState({
        date: "",
    });
    const [hide, setHide] = useState(false);

    useEffect(() => {
        AOS.init()
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/topics", {
                    cache: "no-store",
                });
                if (!res.ok) {
                    throw new Error("Mavzular yuklanmadi");
                }

                const data = await res.json();
                const topics = data?.topics;

                setTopiclar(topics);
                setFilteredMavzula(topics);
            } catch (error) {
                console.log("Mavzular yuklanishda xatolik: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [usersAddedByDate, setUsersAddedByDate] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const usersGroupedByDate = filteredMavzula.reduce((acc, t) => {
                const dateKey = new Date(t.createdAt).toLocaleDateString();
                acc[dateKey] = acc[dateKey] || [];
                acc[dateKey].push(t);
                return acc;
            }, {});

            setUsersAddedByDate(usersGroupedByDate);
        };

        fetchData();
    }, [filteredMavzula]);




    const [filterStatus, setFilterStatus] = useState(null);

    const changeStatus = async (id) => {
        const confirmed = confirm("Stadion hozir bo`sh holatdami");

        if (confirmed) {
            const res = await fetch(`/api/topics?id=${id}`, {
                method: "PUT",
            });

            if (res.ok) {
            }
        }
    };




    return (
        <>
            <div className="min-h-screen">
                <div className="container">
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <span className="loader"></span>
                        </div>
                    ) : (
                        Object.keys(usersAddedByDate)
                            .reverse()
                            .map((date) => (
                                <div key={date}>
                                    {usersAddedByDate[date]
                                        .filter((t) =>
                                            filterStatus === null ? true : t.isChecked === filterStatus
                                        )
                                        .map((t, index) => (
                                            <div key={t.id} data-aos-duration="1000" data-aos="fade-up" className="blur2 mb-2 w-full flex justify-between border md:py-4 md:px-5 p-2 rounded-md text-white">
                                                <div>
                                                    <h1 className="text-2xl text-red-500">{t.date}</h1>
                                                    <p className="text-2xl">Vaqti: {t.time}</p>
                                                    <p>{t.telefon}</p>
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <button
                                                        className={`py-2 px-2 ${t.isChecked ? "text-white green rounded-md cursor-pointer" : "text-white bg-red-700 rounded-md cursor-pointer"}`}
                                                        onClick={() => setButtonStatus(!t.isChecked)}
                                                    >
                                                        {t.isChecked ? "Stadion bo`sh " : "Stadion band"}
                                                    </button>
                                                    {t.isChecked ? (
                                                        <Link href={`/editTopic/${t._id}?isChecked=${t._id}`}>
                                                            <button>Buyurtma</button>
                                                        </Link>

                                                    ) : null}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ))
                    )}
                </div>
            </div>
        </>
    );

};

export default Filter;
