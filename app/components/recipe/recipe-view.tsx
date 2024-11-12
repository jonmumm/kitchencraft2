import React from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "~/lib/utils";

interface RecipeSection {
  title: string;
  ingredients: {
    amount?: number;
    unit?: string;
    item: string;
  }[];
  instructions: string[];
}

interface RecipeViewProps {
  recipe: {
    id: string;
    title: string;
    description: string;
    cookTime?: string;
    activeTime?: string;
    totalTime?: string;
    difficulty?: "easy" | "medium" | "hard";
    yields?: {
      amount: number;
      unit: string;
    };
    ingredients?: {
      amount?: number;
      unit?: string;
      item: string;
    }[];
    instructions?: string[];
    sections?: RecipeSection[];
    directMatch?: boolean;
  };
  className?: string;
}

export const RecipeView = React.forwardRef<HTMLDivElement, RecipeViewProps>(
  ({ recipe, className }, ref) => {
    // Helper to render ingredients list
    const renderIngredients = (ingredients: RecipeViewProps["recipe"]["ingredients"]) => {
      if (!ingredients?.length) return null;
      return (
        <ul className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex items-baseline justify-between gap-4 border-b border-gray-100 pb-2 last:border-0"
            >
              <span className="text-gray-900">{ingredient.item}</span>
              {(ingredient.amount || ingredient.unit) && (
                <span className="whitespace-nowrap text-sm font-medium text-gray-500">
                  {ingredient.amount} {ingredient.unit}
                </span>
              )}
            </li>
          ))}
        </ul>
      );
    };

    // Helper to render instructions list
    const renderInstructions = (instructions: string[]) => {
      if (!instructions?.length) return null;
      return (
        <ol className="space-y-6">
          {instructions.map((step, index) => (
            <li key={index} className="flex gap-4 text-gray-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-900">
                {index + 1}
              </span>
              <span className="text-gray-700 [&_strong]:font-medium [&_strong]:text-gray-900">
                {step}
              </span>
            </li>
          ))}
        </ol>
      );
    };

    return (
      <div ref={ref} className={cn("flex flex-col", className)}>
        {/* Header */}
        <div className="space-y-4 border-b pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-gray-900">
                {recipe.title}
              </h1>
              <p className="text-gray-600">{recipe.description}</p>
            </div>
            <div className="flex gap-2 sm:shrink-0">
              <Button variant="outline" size="sm">
                Save
              </Button>
              <Button variant="outline" size="sm">
                Share
              </Button>
            </div>
          </div>

          {/* Recipe Meta */}
          <div className="grid grid-cols-2 gap-3 text-sm sm:flex sm:flex-wrap">
            {recipe.totalTime && (
              <div className="rounded-lg bg-gray-50 px-3 py-2">
                <span className="block text-xs text-gray-500">Total Time</span>
                <span className="font-medium text-gray-900">{recipe.totalTime}</span>
              </div>
            )}
            {recipe.cookTime && (
              <div className="rounded-lg bg-gray-50 px-3 py-2">
                <span className="block text-xs text-gray-500">Cook Time</span>
                <span className="font-medium text-gray-900">{recipe.cookTime}</span>
              </div>
            )}
            {recipe.activeTime && (
              <div className="rounded-lg bg-gray-50 px-3 py-2">
                <span className="block text-xs text-gray-500">Active Time</span>
                <span className="font-medium text-gray-900">{recipe.activeTime}</span>
              </div>
            )}
            {recipe.yields && (
              <div className="rounded-lg bg-gray-50 px-3 py-2">
                <span className="block text-xs text-gray-500">Yields</span>
                <span className="font-medium text-gray-900">
                  {recipe.yields.amount} {recipe.yields.unit}
                </span>
              </div>
            )}
            {recipe.difficulty && (
              <div className="rounded-lg bg-gray-50 px-3 py-2">
                <span className="block text-xs text-gray-500">Difficulty</span>
                <span
                  className={cn("font-medium capitalize", {
                    "text-green-600": recipe.difficulty === "easy",
                    "text-yellow-600": recipe.difficulty === "medium",
                    "text-red-600": recipe.difficulty === "hard",
                  })}
                >
                  {recipe.difficulty}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 grid gap-8 lg:grid-cols-[320px,1fr]">
          {/* Ingredients */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span>Ingredients</span>
                {recipe.yields && (
                  <span className="text-sm font-normal text-gray-500">
                    for {recipe.yields.amount} {recipe.yields.unit}
                  </span>
                )}
              </h2>
              <ScrollArea className="h-[inherit] lg:h-[600px] lg:pr-6">
                {recipe.ingredients && (
                  <div className="space-y-4">
                    {renderIngredients(recipe.ingredients)}
                  </div>
                )}
                
                {recipe.sections && (
                  <div className="space-y-8">
                    {recipe.sections.map((section, index) => (
                      <div key={index} className="space-y-4">
                        <h3 className="font-medium text-gray-900">
                          For the {section.title}:
                        </h3>
                        {renderIngredients(section.ingredients)}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Instructions</h2>
              <ScrollArea className="h-[inherit] lg:h-[600px] lg:pr-6">
                {recipe.instructions && (
                  <div className="space-y-4">
                    {renderInstructions(recipe.instructions)}
                  </div>
                )}
                
                {recipe.sections && (
                  <div className="space-y-12">
                    {recipe.sections.map((section, index) => (
                      <div key={index} className="space-y-4">
                        <h3 className="font-medium text-gray-900">
                          {section.title}
                        </h3>
                        {renderInstructions(section.instructions)}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

RecipeView.displayName = "RecipeView";