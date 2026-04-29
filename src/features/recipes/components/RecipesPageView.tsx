import RecipeList from "./RecipeList";

interface RecipesPageViewProps {
  query?: string;
  ingredients?: string;
  page?: number;
}

export default function RecipesPageView({ query, ingredients }: RecipesPageViewProps) {
  const hasFilters = Boolean(query || ingredients);

  return (
    <main className="min-h-screen flex flex-col bg-brand-bg">
      <div className="w-full max-w-[1280px] mx-auto pt-12 px-4">
        <header className="max-w-[1232px] w-full">
          <h1 className="text-7xl font-epilogue font-extrabold mb-5">
            Gợi ý <span className="text-brand-orange italic">hôm nay.</span>
          </h1>
          <p className="max-w-[637px] w-full text-[20px] text-brand-muted font-jakarta">
            Chúng tôi đã tìm thấy những công thức tuyệt vời dựa trên nguyên liệu bạn hiện có. Tận hưởng hương vị
            tươi mới ngay tại nhà.
          </p>
          {hasFilters ? (
            <p className="mt-4 text-sm text-brand-muted font-jakarta">
              Bộ lọc hiện tại: {query ? `tu khoa "${query}"` : ""} {ingredients ? `nguyen lieu "${ingredients}"` : ""}
            </p>
          ) : null}
        </header>
        <RecipeList />
      </div>
    </main>
  );
}
