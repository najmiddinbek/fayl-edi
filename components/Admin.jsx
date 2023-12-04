"use client";

import React, { useState, useEffect } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import RemoveBtn from "./RemoveBtn";
import { toast } from "react-toastify";

const Filter = () => {
    const [topics, setTopiclar] = useState([]);
    const [filteredMavzula, setFilteredMavzula] = useState([]);
    const [filterValue, setFilterValue] = useState({
        date: "",
    });
    const [hide, setHide] = useState(false);
    const handleHide = () => {
        setHide(!hide);
    };


    useEffect(() => {
        toast.success('Siz parol bilan admin panelga kirdingiz!!!', {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }, []);

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

    const handleFilter = () => {
        const filteredArray = topics.filter(
            (t) =>
                t.date.toLowerCase().includes(filterValue.date.toLowerCase())
        );

        setFilteredMavzula(filteredArray);
    };



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
        <div className=" min-h-screen">
            <h1 className="text-white fotn-bold text-3xl text-center mb-3">Siz bu yerda Adminsiz</h1>
            <div className="container">
                {Object.keys(usersAddedByDate)
                    .reverse()
                    .map((date) => (
                        <>
                            <div className="" key={date}>
                                {usersAddedByDate[date]
                                    .filter((t) =>
                                        filterStatus === null ? true : t.isChecked === filterStatus
                                    )
                                    .map((t, index) => (
                                        <div>
                                            <div className="blur2 mb-2 w-full flex justify-between border py-4 px-5 rounded-md text-white" key={t.id}>
                                                <div>
                                                    <h1 className="text-xl md:text-2xl text-red-500">{t.date}</h1>
                                                    <p className="text-xl md:text-2xl">Vaqti: {t.time}</p>
                                                    <p className="text-xl md:text-2xl">Telefon raqami: {t.telefon}</p>
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <RemoveBtn id={t._id} />
                                                    <button onClick={() => changeStatus(t._id)} className={`py-2 px-2 ${t.isChecked
                                                        ? "text-white green rounded-md cursor-pointer"
                                                        : "  text-white bg-red-700 rounded-md cursor-pointer"
                                                        }`}>
                                                        {t.isChecked ? "Stadion bo`sh " : "Stadion band"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </>
                    ))
                }
            </div>
        </div>
    );
};

export default Filter;
