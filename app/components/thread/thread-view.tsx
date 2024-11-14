import React, { useMemo } from 'react';
import { Message } from './message';
import { RecipeCard } from '../recipe/recipe-card';
import { ScrollArea } from '../ui/scroll-area';
import { RecipeSwitcher } from './recipe-switcher';

interface ThreadViewProps {
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
  onRecipeClick?: (recipe: Recipe) => void;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  ingredients?: Array<{
    amount?: number;
    unit?: string;
    item: string;
  }>;
  instructions?: string[];
}

export const ThreadView: React.FC<ThreadViewProps> = ({
  messages,
  onRecipeClick,
}) => {
  // Collect all unique recipes from the thread
  const allRecipes = useMemo(() => {
    const recipes = new Map();
    
    messages.forEach(message => {
      if (message.attachments?.primaryRecipe) {
        recipes.set(message.attachments.primaryRecipe.id, message.attachments.primaryRecipe);
      }
      
      message.attachments?.alternativeRecipes?.forEach(recipe => {
        recipes.set(recipe.id, recipe);
      });
    });
    
    return Array.from(recipes.values());
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      {allRecipes.length > 0 && (
        <div className="border-b bg-white">
          <RecipeSwitcher recipes={allRecipes} />
        </div>
      )}
      
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {messages.map((message) => {
            // Extract recipes for type safety
            const primaryRecipe = message.attachments?.primaryRecipe;
            const alternativeRecipes = message.attachments?.alternativeRecipes;

            return (
              <div key={message.id} className="space-y-4">
                <Message
                  id={message.id}
                  content={message.content}
                  author={message.author}
                  timestamp={message.timestamp}
                />
                
                {primaryRecipe && (
                  <div className="pl-14 space-y-4">
                    {/* Primary Recipe */}
                    <div className="bg-white rounded-lg shadow-md">
                      <RecipeCard
                        recipe={primaryRecipe}
                        variant="primary"
                        onClick={() => onRecipeClick?.(primaryRecipe)}
                      />
                    </div>
                    
                    {/* Alternative Recipes Carousel */}
                    {alternativeRecipes && alternativeRecipes.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-500">
                          Alternative Ideas
                        </h4>
                        <div className="relative -mx-4">
                          <div className="flex overflow-x-auto px-4 space-x-3 snap-x snap-mandatory touch-pan-x no-scrollbar">
                            {alternativeRecipes.map((recipe) => (
                              <div
                                key={recipe.id}
                                className="flex-none w-[260px] first:pl-4 last:pr-4 snap-start"
                              >
                                <RecipeCard
                                  recipe={recipe}
                                  variant="compact"
                                  onClick={() => onRecipeClick?.(recipe)}
                                />
                              </div>
                            ))}
                          </div>
                          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}; 