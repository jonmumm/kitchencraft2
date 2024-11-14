import classNames from "classnames";
import React from "react";
import { Button } from "../ui/button";

interface RecipeCardProps {
  recipe: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    cookTime?: string;
    difficulty?: "easy" | "medium" | "hard";
  };
  variant?: "primary" | "compact";
  className?: string;
  onClick?: () => void;
}

export const RecipeCard = React.forwardRef<HTMLDivElement, RecipeCardProps>(
  ({ recipe, variant = "primary", className, onClick }, ref) => {
    const isPrimary = variant === "primary";

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClick?.();
    };

    return (
      <div
        ref={ref}
        className={classNames(
          "bg-white rounded-lg overflow-hidden",
          isPrimary ? "border border-gray-200" : "shadow-sm",
          className
        )}
      >
        {recipe.imageUrl && (
          <div
            className={classNames(
              "relative",
              isPrimary ? "aspect-[16/9]" : "aspect-[3/2]"
            )}
          >
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className={classNames("p-4", isPrimary ? "space-y-4" : "space-y-2")}
        >
          <div>
            <h3
              className={classNames(
                "font-semibold text-gray-900",
                isPrimary ? "text-xl" : "text-base"
              )}
            >
              {recipe.title}
            </h3>
            <p
              className={classNames(
                "text-gray-600 mt-1",
                isPrimary ? "text-base" : "text-sm line-clamp-2"
              )}
            >
              {recipe.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {recipe.cookTime && <span>{recipe.cookTime}</span>}
              {recipe.difficulty && (
                <span
                  className={classNames("capitalize", {
                    "text-green-600": recipe.difficulty === "easy",
                    "text-yellow-600": recipe.difficulty === "medium",
                    "text-red-600": recipe.difficulty === "hard",
                  })}
                >
                  {recipe.difficulty}
                </span>
              )}
            </div>

            <Button 
              variant="ghost" 
              size={isPrimary ? "lg" : "sm"}
              onClick={handleClick}
            >
              View Recipe
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

RecipeCard.displayName = "RecipeCard";
