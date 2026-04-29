'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function IngredientSearch() {
    const mockData = [
        {
            id: 1,
            name: "Cá hồi",
            isError: true,
        },
        {
            id: 2,
            name: "Bơ",
            isError: false,
        },
        {
            id: 3,
            name: "Chanh vàng",
            isError: true,
        }
    ]

    return (
        <section className='w-full py-12 px-4 flex flex-col items-center justify-center'>
            <search className='w-full max-w-[648px] min-h-[302px] flex flex-col items-center justify-center'>
                <form className='w-full h-[96px] flex justify-center' >
                    <input className='w-full h-full outline-none bg-white rounded-full shadow-[0px_12px_40px_0px_rgba(65,41,35,0.04)] 
                    placeholder:text-[#CAA59C] text-2xl font-jakarta pl-20 ' placeholder='Thêm nguyên liệu (ví dụ: Cá hồi, Bơ...)'
                    />
                </form>
                <ul className='w-full flex flex-wrap justify-center items-center list-none gap-4 py-6'>
                    {mockData.map((item) => (
                        <li key={item.id} className={`px-6 py-2 text-center bg-[#FFDAD2]/40 border border-[#FF7A2C]/10 rounded-full ${item.isError ? 'flex items-center gap-2' : ''}`}>
                            <span>{item.name}</span>
                            {item.isError && <Image className="mt-1" src='/assets/icons/error.svg' alt="Error" width={11} height={11} />}
                        </li>
                    ))}
                </ul>
                {/* Fixed route here to match the suggestions screen */}
                <Link href='/recipes' className='w-full min-h-[96px] flex items-center justify-center'>
                    <div className='flex items-center gap-4 justify-center px-14 py-6 bg-orange-gradient rounded-full text-white text-2xl font-jakarta font-bold cursor-pointer active:scale-95 transition-transform '>
                        <Image className='mt-1' src="assets/icons/search.svg" alt="Search" width={22} height={22} />
                        Tìm kiếm công thức
                    </div>
                </Link>
            </search>
        </section>
    )
}