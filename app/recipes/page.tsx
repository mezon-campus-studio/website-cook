import RecipesPageView from "@/features/recipes/components/RecipesPageView";

interface RecipesPageProps {
  searchParams: {
    q?: string;
    ingredients?: string;
    page?: string;
  };
}

export default function RecipesPage({ searchParams }: RecipesPageProps) {
  const currentPage = Number(searchParams.page ?? "1");
  const safePage = Number.isNaN(currentPage) || currentPage <= 0 ? 1 : currentPage;

  return <RecipesPageView query={searchParams.q} ingredients={searchParams.ingredients} page={safePage} />;
}