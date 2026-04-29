import RecipeDetailPageView from "@/features/recipes/steps/components/RecipeDetailPageView";

interface RecipeDetailPageProps {
  params: {
    id: string;
  };
}

export default function StepPage({ params }: RecipeDetailPageProps) {
  return <RecipeDetailPageView recipeId={params.id} />;
}