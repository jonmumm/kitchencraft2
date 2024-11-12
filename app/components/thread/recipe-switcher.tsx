"use client";

import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime?: string;
  difficulty?: "easy" | "medium" | "hard";
}

interface RecipeSwitcherProps {
  recipes: Recipe[];
  onSelectRecipe?: (recipeId: string) => void;
  className?: string;
}

export const RecipeSwitcher = React.forwardRef<
  HTMLDivElement,
  RecipeSwitcherProps
>(({ recipes, onSelectRecipe, className }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between bg-background"
          >
            <span className="flex items-center gap-2">
              <span className="font-medium">
                {recipes.length} {recipes.length === 1 ? "Recipe" : "Recipes"}
              </span>
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 opacity-50 transition-transform duration-200",
                isOpen && "transform rotate-180"
              )}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto"
          align="start"
        >
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
            Recipes in this thread
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {recipes.map((recipe) => (
            <DropdownMenuItem
              key={recipe.id}
              className="py-2"
              onSelect={() => onSelectRecipe?.(recipe.id)}
            >
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{recipe.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {recipe.cookTime}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {recipe.description}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium", {
                      "bg-green-100 text-green-700": recipe.difficulty === "easy",
                      "bg-yellow-100 text-yellow-700":
                        recipe.difficulty === "medium",
                      "bg-red-100 text-red-700": recipe.difficulty === "hard",
                    })}
                  >
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

RecipeSwitcher.displayName = "RecipeSwitcher";
