"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { cn } from "~/lib/utils";
import { RecipeView } from "../recipe/recipe-view";
import { ThreadView } from "./thread-view";

interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime?: string;
  difficulty?: "easy" | "medium" | "hard";
  ingredients?: Array<{
    amount?: number;
    unit?: string;
    item: string;
  }>;
  instructions?: string[];
}

interface ThreadWithRecipeDrawerProps {
  messages: Array<{
    id: string;
    content: string;
    author: {
      id: string;
      isAI?: boolean;
    };
    timestamp: Date;
    attachments?: {
      primaryRecipe?: Recipe;
      alternativeRecipes?: Recipe[];
    };
  }>;
  onRecipeClick?: (recipeId: string) => void;
  defaultOpenRecipe?: Recipe;
}

const snapPoints = [0.5, 1];

export const ThreadWithRecipeDrawer = ({
  messages,
  onRecipeClick,
  defaultOpenRecipe,
}: ThreadWithRecipeDrawerProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(
    defaultOpenRecipe || null
  );
  const [snap, setSnap] = useState<string | number | null>(snapPoints[0]);

  const handleRecipeClick = (recipe: Recipe) => {
    console.log("Recipe clicked:", recipe);
    setSelectedRecipe(recipe);
    onRecipeClick?.(recipe.id);
  };

  return (
    <div className="h-[100dvh] bg-gray-50 relative">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 w-full h-full">
        <div className="border-r border-gray-200 min-w-0">
          <ThreadView messages={messages} onRecipeClick={handleRecipeClick} />
        </div>
        <div className="min-w-0 bg-white">
          {selectedRecipe ? (
            <div className="h-full overflow-auto p-6">
              <RecipeView recipe={selectedRecipe} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a recipe to view details
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout with Drawer */}
      <div className="lg:hidden h-full">
        <ThreadView messages={messages} onRecipeClick={handleRecipeClick} />
        
        <Drawer.Root
          shouldScaleBackground
          snapPoints={snapPoints}
          activeSnapPoint={snap}
          setActiveSnapPoint={setSnap}
          snapToSequentialPoint
          open={!!selectedRecipe}
          onOpenChange={(open) => !open && setSelectedRecipe(null)}
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[48]" />
            <Drawer.Content
              className={cn(
                "fixed flex flex-col bg-white lg:hidden",
                "border border-gray-200 border-b-none rounded-t-[10px]",
                "bottom-0 left-0 right-0 h-full",
                "max-h-[97%] mx-[-1px]",
                "z-[49]"
              )}
            >
              <div
                className={cn("flex flex-col max-w-2xl mx-auto w-full p-4 pt-5", {
                  "overflow-y-auto": snap === 1,
                  "overflow-hidden": snap !== 1,
                })}
              >
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-200 mb-8" />
                {selectedRecipe && (
                  <>
                    <Drawer.Title className="font-medium text-xl text-gray-900 mb-2">
                      {selectedRecipe.title}
                    </Drawer.Title>
                    <p className="text-sm text-gray-600 mb-6">
                      {selectedRecipe.description}
                    </p>
                    <div className="flex-1">
                      <RecipeView recipe={selectedRecipe} />
                    </div>
                  </>
                )}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
};
