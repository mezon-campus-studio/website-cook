'use client';

import { useEffect, useMemo, useState } from 'react';
import { apiFetchJson, type RecipeFromApi } from '@/lib/api-client';
import { readRecipeFromStorage } from '@/utils/recipeStorage';
import { PLACEHOLDER_IMG } from '@/constants';
import RecipeDetailPageView from '@/components/features/recipes/components/RecipeStepPageView';
import type { IngredientListItem } from '@/components/features/recipes/components/RecipeIngredientList';
import type { RecipeStepDisplay } from '@/components/features/recipes/components/RecipeCookingStep';

const STEP_IMAGES = [
  '/assets/icons/chef.svg',
  '/assets/icons/book.svg',
  '/assets/icons/search.svg',
  '/assets/icons/tick.svg',
] as const;

// ─── Data mappers ─────────────────────────────────────────────────────────────

/** Maps API ingredient data to the display format. */
function mapIngredients(api: RecipeFromApi): IngredientListItem[] {
  const rawIngredients = (api as any).extendedIngredients ?? (api as any).ingredients ?? [];

  return rawIngredients.map((i: any, idx: number) => {
    const amount = i.amount ?? i.quantity ?? '';
    const unit = i.unit ?? '';
    const qty = [amount, unit].filter(Boolean).join(' ').trim();

    return {
      id: i.id ?? idx,
      name: i.name ?? 'Nguyên liệu không tên',
      desc: qty || '—',
    };
  });
}

/** Maps API step data to the display format. */
function mapSteps(api: RecipeFromApi): RecipeStepDisplay[] {
  const rawSteps: any[] =
    (api as any).analyzedInstructions?.[0]?.steps?.length > 0
      ? (api as any).analyzedInstructions[0].steps
      : (api as any).steps ?? [];

  return [...rawSteps]
    .sort((a, b) => (a.number ?? a.step_order ?? 0) - (b.number ?? b.step_order ?? 0))
    .map((s, idx) => {
      const content: string = s.step ?? s.content ?? '';
      const order: number = s.number ?? s.step_order ?? idx + 1;

      const lines = content
        .split('\n')
        .map((l: string) => l.trim())
        .filter(Boolean);

      const title = lines[0] && lines[0].length <= 100 ? lines[0] : `Bước ${order}`;
      const desc = lines.length > 1 ? lines.slice(1).join('\n') : content;

      const rawImage = s.image ?? s.image_url ?? '';
      const image =
        typeof rawImage === 'string' && rawImage.trim().length > 0
          ? rawImage
          : STEP_IMAGES[idx % STEP_IMAGES.length];

      return {
        id: order,
        step: String(order).padStart(2, '0'),
        image,
        title,
        desc,
      };
    });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RecipeDetailClient({ recipeId }: { recipeId: string }) {
  const [recipe, setRecipe] = useState<RecipeFromApi | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Show cached data immediately for instant perceived performance
    const cached = readRecipeFromStorage(recipeId);
    if (cached) {
      setRecipe(cached);
      setIsLoading(false);
    }

    // Always fetch fresh data in the background
    apiFetchJson<RecipeFromApi>(`/recipes/${recipeId}`)
      .then((data) => {
        if (!cancelled) {
          setRecipe(data);
          setIsLoading(false);
          setErrorMsg(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Lỗi khi gọi API chi tiết món ăn:', err);
          // Only show error if we don't already have cached data
          if (!cached) {
            setErrorMsg(err instanceof Error ? err.message : 'Không tải được công thức.');
            setIsLoading(false);
          }
        }
      });

    return () => {
      cancelled = true;
    };
  }, [recipeId]);

  const ingredients = useMemo(
    () => (recipe ? mapIngredients(recipe) : []),
    [recipe],
  );

  const steps = useMemo(() => (recipe ? mapSteps(recipe) : []), [recipe]);

  const heroImage = useMemo(() => {
    const imgRaw = recipe?.image ?? (recipe as any)?.image_url;
    return imgRaw && (imgRaw.startsWith('http') || imgRaw.startsWith('/'))
      ? imgRaw
      : PLACEHOLDER_IMG;
  }, [recipe]);

  // Loading state — only shown when there's no cached data yet
  if (isLoading && !recipe) {
    return (
      <main className="min-h-screen flex flex-col bg-brand-bg items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#FFDAD2] border-t-[#FF7A2C] animate-spin" />
          <p className="text-brand-muted font-jakarta text-center">
            Đang tải công thức...
          </p>
        </div>
      </main>
    );
  }

  // Error state — only shown when there's no recipe data at all
  if (errorMsg && !recipe) {
    return (
      <main className="min-h-screen flex flex-col bg-brand-bg items-center justify-center px-4">
        <div className="w-20 h-20 rounded-full bg-[#FFEDE9] flex items-center justify-center mb-6">
          <span className="text-4xl select-none">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold font-epilogue text-[#9B3F00] text-center mb-2">
          Không tải được công thức
        </h1>
        <p className="text-brand-muted font-jakarta text-center max-w-md">
          {errorMsg}
        </p>
      </main>
    );
  }

  return (
    <RecipeDetailPageView
      recipe={recipe}
      ingredients={ingredients}
      steps={steps}
      heroImage={heroImage}
    />
  );
}
