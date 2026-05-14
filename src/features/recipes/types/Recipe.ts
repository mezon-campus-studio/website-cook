export interface Recipe {
    id?: number;
    title: string;
    image: string;
    matchPercent: number;
    description?: string;
    missingIngredients?: string[];
}