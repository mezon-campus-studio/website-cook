import Image from 'next/image'
import React from 'react'
import StepCard from './StepCard'

export default function RecipeStep() {
    const mockData = [
        {
            id: 1,
            step: '01',
            image: '/assets/images/step1.png',
            title: 'Sơ chế nguyên liệu',
            desc: 'Ướp cá hồi cắt khối với muối, tiêu đen và một chút bột ớt paprika. \nĐun nóng dầu ô liu trong chảo rộng trên lửa vừa cho đến khi nóng già.',
        },
        {
            id: 2,
            step: '02',
            image: '/assets/images/step2.png',
            title: 'Áp chảo và xào',
            desc: 'Áp chảo cá hồi trong khoảng 2 phút cho đến khi vàng đều nhưng bên trong vẫn còn mềm. Lấy cá ra và để riêng. Trong cùng một chảo, xào hành tím và tỏi cho đến khi thơm.',
        },
        {
            id: 3,
            step: '03',
            image: '/assets/images/step3.png',
            title: 'Chế biến nước xốt',
            desc: 'Khuấy đều sốt ớt, sau đó đổ kem tươi vào. Đun nhỏ lửa cho đến khi nước sốt đặc lại và bám đều vào thìa.Thêm một chút nước luộc mỳ.'
        },
        {
            id: 4,
            step: '04',
            image: '/assets/images/final.png',
            title: 'Hoàn thiện món ăn',
            desc: 'Trộn mỳ pappardelle đã chín với nước sốt cùng cá hồi. Trang trí bằng mùi tây tươi, vỏ chanh bào và một ít phô mai parmesan.'
        },
    ]
    return (
        <section className='col-span-8'>
            <div className='max-w-[809px] w-full mr-auto'>
                <div className='w-full h-[51px] flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <Image className='mt-1' src='/assets/icons/book.svg' alt='icon' width={22} height={16} />
                        <span className='text-[22px] font-semibold font-jakarta text-brand-orange'>Các bước thực hiện</span>
                    </div>
                    <span className='text-base font-jakarta text-brand-muted'>4 GIAI ĐOẠN CHI TIẾT</span>
                </div>
                <hr className='mt-2.5' />
                <div className='w-full flex flex-col gap-6 mt-6'>
                    {mockData.map((item) => (
                        <StepCard key={item.id} 
                        step={item.step} image={item.image} title={item.title} desc={item.desc} />
                    ))}
                </div>
            </div>
        </section>
    )
}