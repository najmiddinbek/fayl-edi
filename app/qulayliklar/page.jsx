import Image from 'next/image'
import React from 'react'
import { SiTruenas } from "react-icons/si";
// import { FaRoad } from "react-icons/fa6";
import { CgViewComfortable } from "react-icons/cg";
import { GiMountainRoad } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import { TiPointOfInterestOutline } from "react-icons/ti";

export default function page() {
    const data = [
        {
            id: 1,
            icon: <SiTruenas />,
            description: 'Ushbu dastur yordamida eng asosiysi vaqt tejaladi.Hech kim uyidan chiqib stadionga borib navbat qancha ekanligini bilishi shart emas. Bosh menyuda "Band qilingan stadionlar" ni ustiga bosilsa kifoya.',
        },
        {
            id: 2,
            // icon: <FaRoad />,
            description: 'Bu dastur yordamida har bir mijoz o`zi hohlagan paytda masofadan yagona o`zi to`lovni amalga oshirib stadionni band qila oladi.',
        },
        {
            id: 3,
            icon: <CgViewComfortable />,
            description: 'Hamma uchun qulay ko`rinishda ishlangan dastur.Planshet,Kompyuter,Mobil telefonlarda ishlay oladigan dastur hamda sayt hizmati mavjud.',
        },
        {
            id: 4,
            icon: <GiMountainRoad />,
            description: 'Endi hech kim stadionga kelib stadion bo`shashini kutib turmaydi.O`z uyidan turib stadionni bo`sh vaqtiga qarab band qilib qo`ysa bo`ldi.',
        },
        {
            id: 5,
            icon: <MdAttachMoney />,
            description: 'To`lov tizimida naqd pul roli kamligi ham ahamiyatli.Naqd pul kam ishlatilishi bir qancha afzallliklari bor.Har bir mijoz qancha mablag` bergani isboti bilan ko`rinib turadi.',
        },
        {
            id: 6,
            icon: <TiPointOfInterestOutline />,
            description: 'Bu o`z navbatida stadionga bo`lgan qiziqishni yanada kuchaytiradi.Endi mijozlar stadionni emas,balki stadionga to`lov qilgan mijozlarni stadion o`zi kutib turadi.',
        },
    ]

    return (
        <div className='max-w-7xl mx-auto'>
            <h1 className='text-2xl md:text-3xl lg:text-7xl text-center text-white mb-4'>Loyihaning qulayliklari</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
                {data.map((date, id, index) => (
                    <div key={index} data-aos-duration="2000" data-aos="flip-left" className='card text-[#FFA537] p-6'>
                        <div className='text-3xl md:text-5xl lg:text-9xl'>{date.icon}</div>
                        <h3 className='text-white text-[15px] pt-5 md:text-xl md:pt-10'>{date.description}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}
