"use client";

import Link from "next/link";
import { Recipe } from "../types/Recipe";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function RecipeCard({
  title,
  image,
  matchPercent,
  missingIngredients,
  description,
}: Recipe) {
  const isMatch = matchPercent === 100;
  return (
    <article className="max-w-[384px] w-full rounded-[32px] shadow-[0_12px_40px_0_rgba(65,41,35,0.06)] flex flex-col h-full">
      <figure className="relative max-w-[384px] w-full m-0">
        <Image
          src={image}
          alt={title}
          width={384}
          height={288}
          className="rounded-t-[32px] object-cover"
        />
        {isMatch ? (
          <figcaption className="absolute top-4 left-4 w-[130px] py-2 flex items-center justify-center gap-2 bg-[#366700] rounded-full">
            <Image src="/assets/icons/tick.svg" alt="" width={12} height={12} />
            <span className="text-xs font-bold font-jakarta text-[#D7FFB2]">
              KHỚP {matchPercent}%
            </span>
          </figcaption>
        ) : (
          <figcaption className="absolute top-4 left-4 w-[107px] py-2 flex items-center justify-center gap-2 bg-[#FDD34D] rounded-full">
            <span className="text-xs font-bold font-jakarta text-[#5C4900]">
              KHỚP {matchPercent}%
            </span>
          </figcaption>
        )}
      </figure>
      <div className="flex flex-col flex-1 px-8 py-6 justify-between">
        <h3 className="text-2xl text-brand-brown font-epilogue font-bold mb-2">
          {title}
        </h3>
        {missingIngredients ? (
          <div className="max-w-[320px] w-full flex flex-col gap-3 rounded-2xl bg-[#FFEDE9] p-5">
            <div className="flex items-center gap-2">
              <Image
                className="mt-0.5"
                src="/assets/icons/shopping.svg"
                alt="shopping"
                width={12}
                height={12}
              />
              <span className="text-xs font-bold font-jakarta text-brand-orange">
                Cần bổ sung:
              </span>
            </div>
            <ul className="max-w-[280px] flex flex-wrap gap-2 m-0 p-0 list-none">
              {missingIngredients.map((item, index) => (
                <li
                  key={index}
                  className="bg-[#FFD3C9] py-2 h-full rounded-full px-4 font-medium font-jakarta text-xs text-brand-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="w-full text-sm text-brand-muted font-jakarta leading-relaxed mb-12">
            {description}
          </p>
        )}

        <div className="w-full pt-6">
          {isMatch ? (
            <Link href={`/recipes/id`} className="w-full flex justify-center">
              <Button variant="gradient" className="w-[320px] h-[56px] px-0 py-0 text-base">
                Bắt đầu nấu
              </Button>
            </Link>
          ) : (
            <Link
              href={`/`}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#FFDAD2] font-bold text-[16px] text-jakarta text-brand-orange cursor-pointer active:scale-95 transition-transform "
            >
              Thêm nguyên liệu
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
