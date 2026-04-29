import Image from 'next/image';
import React from 'react';
import RecipeStep from './RecipeStep';

export default function IngredientList() {
  const mockData = [
    {
      id: 1,
      name: 'Cá hồi tươi',
      desc: '250g, cắt khối',
    },
    {
      id: 2,
      name: 'Mỳ Ý Pappardelle',
      desc: '200g, khô'
    },
    {
      id: 3,
      name: 'Kem tươi (Heavy Cream)',
      desc: '150ml'
    },
    {
      id: 4,
      name: 'Sốt ớt Calabrian',
      desc: '1 muỗng canh'
    },
    {
      id: 5,
      name: 'Hành tím & Tỏi',
      desc: 'Băm nhỏ'
    },
  ];
  return (
    <>
      <aside className="col-span-4">
        <div className="min-w-[243px] ml-24">
          <div className="flex items-center gap-2">
            <Image src="/assets/icons/icon.svg" alt="icon" width={22} height={19} />
            <span className="text-[22px] font-semibold font-epilogue text-brand-orange">
              Nguyên liệu
            </span>
          </div>
          <ul className='flex flex-col gap-4'>
            {mockData.map((item) => (
              <li className='max-w-[243px] rounded-[12px] py-2.5 pl-4 bg-[#F3F4F5] flex items-center gap-2' key={item.id}>
                <div>
                  <span className='text-brand-orange font-jakarta text-base'>{item.name}</span>
                  <p className='text-brand-muted font-jakarta italic text-xs'>{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
