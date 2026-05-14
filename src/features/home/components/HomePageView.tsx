import { IngredientPopular, IngredientSearch } from "@/features/ingredient-search";

export default function HomePageView() {
  return (
    <main className="min-h-screen flex flex-col bg-brand-bg">
      <div className="w-full max-w-[1280px] px-2 pt-16 mx-auto">
        <header className="text-center">
          <h1 className="text-7xl text-brand-orange font-bold font-epilogue">Hôm nay bạn muốn ăn gì?</h1>
          <div className="flex justify-center">
            <p className="max-w-[670px] mt-6 text-2xl text-brand-muted font-medium font-jakarta">
              Nhập nguyên liệu bạn đang có, chúng tôi sẽ gợi ý món ngon chuẩn vị nhất.
            </p>
          </div>
        </header>
        <IngredientSearch />
        <IngredientPopular />
      </div>
    </main>
  );
}
