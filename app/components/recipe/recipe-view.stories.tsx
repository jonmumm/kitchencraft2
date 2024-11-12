import type { Meta, StoryObj } from '@storybook/react';
import { RecipeView } from './recipe-view';

const meta = {
  title: 'Recipe/RecipeView',
  component: RecipeView,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    padded: true,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipeView>;

export default meta;
type Story = StoryObj<typeof RecipeView>;

const sampleRecipe = {
  id: 'recipe-1',
  title: 'One-Pan Roasted Chicken and Eggs with Herbs',
  description: 'A simple and flavorful weeknight dinner that\'s ready in under 30 minutes. Chicken thighs and eggs are roasted together with herbs and spices for a satisfying and healthy meal.',
  totalTime: '30m',
  cookTime: '20m',
  activeTime: '10m',
  difficulty: 'easy' as const,
  yields: {
    amount: 2,
    unit: 'servings'
  },
  ingredients: [
    { amount: 1, unit: 'pound', item: 'boneless, skinless chicken thighs' },
    { amount: 2, unit: 'tablespoons', item: 'olive oil' },
    { amount: 1, unit: 'teaspoon', item: 'salt' },
    { amount: 0.5, unit: 'teaspoon', item: 'black pepper' },
    { amount: 0.5, unit: 'teaspoon', item: 'dried oregano' },
    { amount: 0.25, unit: 'teaspoon', item: 'garlic powder' },
    { amount: 4, unit: '', item: 'large eggs' },
    { amount: 0.25, unit: 'cup', item: 'chopped fresh parsley' },
    { amount: 0.25, unit: 'cup', item: 'chopped fresh chives' }
  ],
  instructions: [
    'Preheat oven to 400 degrees F (200 degrees C).',
    'In a large bowl, toss chicken thighs with olive oil, salt, pepper, oregano, and garlic powder.',
    'Spread chicken thighs in a single layer on a baking sheet.',
    'Crack eggs directly onto the baking sheet, spacing them evenly around the chicken.',
    'Roast in preheated oven for 20-25 minutes, or until chicken is cooked through and eggs are set.',
    'Garnish with chopped parsley and chives before serving.'
  ],
  directMatch: true
};

export const Default: Story = {
  args: {
    recipe: sampleRecipe
  }
};

export const LongRecipe: Story = {
  args: {
    recipe: {
      ...sampleRecipe,
      instructions: Array(15).fill(null).map((_, i) => 
        `Step ${i + 1}: ${sampleRecipe.instructions[i % sampleRecipe.instructions.length]}`
      ),
      ingredients: Array(15).fill(null).map((_, i) => 
        sampleRecipe.ingredients[i % sampleRecipe.ingredients.length]
      )
    }
  }
};

export const MultiSection: Story = {
  args: {
    recipe: {
      id: 'recipe-multi',
      title: 'Crispy Chicken Wings with Ranch Dip',
      description: 'Perfectly crispy chicken wings served with a homemade ranch dipping sauce. Great for game day or any party!',
      totalTime: '1h 15m',
      cookTime: '45m',
      activeTime: '30m',
      difficulty: 'medium' as const,
      yields: {
        amount: 4,
        unit: 'servings'
      },
      sections: [
        {
          title: 'Crispy Wings',
          ingredients: [
            { amount: 2, unit: 'lbs', item: 'chicken wings' },
            { amount: 1, unit: 'tablespoon', item: 'baking powder' },
            { amount: 1, unit: 'teaspoon', item: 'salt' },
            { amount: 1, unit: 'teaspoon', item: 'garlic powder' },
            { amount: 1, unit: 'teaspoon', item: 'paprika' },
            { amount: 0.5, unit: 'teaspoon', item: 'black pepper' }
          ],
          instructions: [
            'Pat chicken wings dry with paper towels.',
            'In a large bowl, mix baking powder, salt, garlic powder, paprika, and black pepper.',
            'Add wings to the bowl and toss to coat evenly.',
            'Arrange wings on a wire rack set over a baking sheet.',
            'Refrigerate uncovered for at least 1 hour or overnight for extra crispiness.',
            'Preheat oven to 425°F (220°C).',
            'Bake for 40-45 minutes, flipping halfway through, until crispy and golden brown.'
          ]
        },
        {
          title: 'Homemade Ranch Dip',
          ingredients: [
            { amount: 1, unit: 'cup', item: 'mayonnaise' },
            { amount: 0.5, unit: 'cup', item: 'sour cream' },
            { amount: 0.5, unit: 'cup', item: 'buttermilk' },
            { amount: 1, unit: 'tablespoon', item: 'fresh dill, chopped' },
            { amount: 1, unit: 'tablespoon', item: 'fresh parsley, chopped' },
            { amount: 1, unit: 'tablespoon', item: 'fresh chives, chopped' },
            { amount: 1, unit: 'teaspoon', item: 'garlic powder' },
            { amount: 1, unit: 'teaspoon', item: 'onion powder' },
            { amount: 0.5, unit: 'teaspoon', item: 'black pepper' },
            { amount: 0.25, unit: 'teaspoon', item: 'salt' }
          ],
          instructions: [
            'In a medium bowl, whisk together mayonnaise, sour cream, and buttermilk until smooth.',
            'Add all herbs and spices, stirring to combine well.',
            'Cover and refrigerate for at least 1 hour to allow flavors to meld.',
            'Taste and adjust seasoning if needed before serving.'
          ]
        }
      ]
    }
  }
}; 