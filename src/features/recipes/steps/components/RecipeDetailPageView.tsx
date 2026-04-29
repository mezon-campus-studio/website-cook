import Image from "next/image";
import IngredientList from "./IngredientList";
import RecipeStep from "./RecipeStep";

interface RecipeDetailPageViewProps {
  recipeId: string;
}

export default function RecipeDetailPageView({ recipeId }: RecipeDetailPageViewProps) {
  return (
    <main className="min-h-screen flex flex-col bg-brand-bg">
      <div className="w-full mx-auto">
        <section className="relative h-80 w-full overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/assets/images/banner.png" alt="banner" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 flex flex-col gap-3 ml-20">
            <span className="w-fit rounded-[8px] font-jakarta text-base text-white border border-white/30 px-2 py-1 bg-white/20">
              LUA CHON CUA BAN
            </span>
            <h1 className="text-[40px] font-jakarta font-bold text-white">Mỳ Ý Cá Hồi Cay Sốt Kem</h1>
            <p className="text-sm font-jakarta text-white/80">Recipe ID: {recipeId}</p>
          </div>
        </section>
        <div className="px-4 mt-10 grid grid-cols-12 gap-10">
          <IngredientList />
          <RecipeStep />
        </div>
      </div>
    </main>
  );
}
