import type { Meta, StoryObj } from '@storybook/react';
import { RecipeSwitcher } from './recipe-switcher';

const meta = {
  title: 'Thread/RecipeSwitcher',
  component: RecipeSwitcher,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipeSwitcher>;

export default meta;
type Story = StoryObj<typeof RecipeSwitcher>;

const sampleRecipes = [
  {
    id: 'recipe-1',
    title: 'Classic Cacio e Pepe',
    description: 'A traditional Roman pasta dish that creates a creamy sauce from just pecorino cheese, black pepper, and pasta water.',
    cookTime: '15 mins',
    difficulty: 'easy' as const
  },
  {
    id: 'recipe-2',
    title: 'Garlic Butter Pasta',
    description: 'A quick pasta that builds flavor by slowly toasting garlic in butter until golden.',
    cookTime: '20 mins',
    difficulty: 'easy' as const
  },
  {
    id: 'recipe-3',
    title: 'Classic Pesto Pasta',
    description: 'Fresh basil pesto made with garlic, pine nuts, and parmesan.',
    cookTime: '25 mins',
    difficulty: 'easy' as const
  },
  {
    id: 'recipe-4',
    title: 'Arrabbiata',
    description: 'A spicy tomato sauce where garlic and red chilies are gently fried in olive oil.',
    cookTime: '30 mins',
    difficulty: 'medium' as const
  },
  {
    id: 'recipe-5',
    title: 'Mushroom Cream Sauce',
    description: 'Mixed mushrooms sautéed until golden, then simmered with cream and herbs.',
    cookTime: '35 mins',
    difficulty: 'medium' as const
  }
];

export const Default: Story = {
  args: {
    recipes: sampleRecipes,
  },
};

export const Empty: Story = {
  args: {
    recipes: [],
  },
};

export const SingleRecipe: Story = {
  args: {
    recipes: [sampleRecipes[0]],
  },
};

export const ManyRecipes: Story = {
  args: {
    recipes: Array(10).fill(null).map((_, i) => ({
      ...sampleRecipes[i % sampleRecipes.length],
      id: `recipe-${i + 1}`,
    })),
  },
}; 