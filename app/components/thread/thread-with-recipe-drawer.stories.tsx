import type { Meta, StoryObj } from '@storybook/react';
import { ThreadWithRecipeDrawer } from './thread-with-recipe-drawer';

const meta = {
  title: 'Thread/ThreadWithRecipeDrawer',
  component: ThreadWithRecipeDrawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThreadWithRecipeDrawer>;

export default meta;
type Story = StoryObj<typeof ThreadWithRecipeDrawer>;

const sampleRecipe = {
  id: 'recipe-1',
  title: 'Classic Cacio e Pepe',
  description: 'A traditional Roman pasta dish that creates a creamy sauce from just pecorino cheese, black pepper, and pasta water.',
  cookTime: '15 mins',
  difficulty: 'easy' as const,
  ingredients: [
    { amount: 1, unit: 'lb', item: 'spaghetti' },
    { amount: 2, unit: 'cups', item: 'pecorino romano, finely grated' },
    { amount: 2, unit: 'tbsp', item: 'black pepper, freshly ground' },
    { amount: 1, unit: 'tsp', item: 'salt' }
  ],
  instructions: [
    'Bring a large pot of water to boil',
    'Cook pasta until al dente',
    'Reserve 1 cup pasta water',
    'Mix cheese and pepper',
    'Combine with pasta and pasta water'
  ]
};

const sampleMessages = [
  {
    id: 'msg-1',
    content: "I'm looking for a quick pasta recipe!",
    author: { id: 'user-1', isAI: false },
    timestamp: new Date('2024-03-10T10:00:00'),
  },
  {
    id: 'msg-2',
    content: "Here's a classic Cacio e Pepe recipe that's perfect for a quick meal:",
    author: { id: 'ai-1', isAI: true },
    timestamp: new Date('2024-03-10T10:01:00'),
    attachments: {
      primaryRecipe: sampleRecipe,
    },
  },
];

export const MobileDefault: Story = {
  args: {
    messages: sampleMessages,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const DesktopDefault: Story = {
  args: {
    messages: sampleMessages,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

const alternativeRecipes = [
  {
    ...sampleRecipe,
    id: 'recipe-2',
    title: 'Garlic Butter Pasta',
    description: 'A quick pasta that builds flavor by slowly toasting garlic in butter until golden.',
    cookTime: '20 mins',
    difficulty: 'easy' as const,
    ingredients: [
      { amount: 1, unit: 'lb', item: 'fettuccine' },
      { amount: 8, unit: 'tbsp', item: 'butter' },
      { amount: 6, unit: 'cloves', item: 'garlic, thinly sliced' },
      { amount: 0.25, unit: 'cup', item: 'fresh parsley, chopped' },
      { amount: 0.5, unit: 'cup', item: 'parmesan cheese, grated' }
    ],
    instructions: [
      'Cook pasta according to package directions',
      'Meanwhile, melt butter in a large skillet over medium heat',
      'Add sliced garlic and cook until golden brown, about 3-4 minutes',
      'Add cooked pasta to the skillet and toss to coat',
      'Stir in parsley and parmesan cheese',
      'Season with salt and pepper to taste'
    ]
  },
  {
    ...sampleRecipe,
    id: 'recipe-3',
    title: 'Classic Pesto Pasta',
    description: 'Fresh basil pesto made with garlic, pine nuts, and parmesan.',
    cookTime: '25 mins',
    difficulty: 'medium' as const,
    ingredients: [
      { amount: 1, unit: 'lb', item: 'pasta of choice' },
      { amount: 2, unit: 'cups', item: 'fresh basil leaves' },
      { amount: 0.5, unit: 'cup', item: 'pine nuts' },
      { amount: 2, unit: 'cloves', item: 'garlic' },
      { amount: 0.5, unit: 'cup', item: 'olive oil' },
      { amount: 0.5, unit: 'cup', item: 'parmesan cheese, grated' }
    ],
    instructions: [
      'Toast pine nuts in a dry skillet until fragrant',
      'Blend basil, pine nuts, garlic, and olive oil until smooth',
      'Stir in parmesan cheese',
      'Cook pasta according to package directions',
      'Toss pasta with pesto sauce',
      'Add pasta water as needed to achieve desired consistency'
    ]
  },
];

const messagesWithAlternatives = [
  ...sampleMessages,
  {
    id: 'msg-3',
    content: "Here are some alternative recipes you might enjoy:",
    author: { id: 'ai-1', isAI: true },
    timestamp: new Date('2024-03-10T10:02:00'),
    attachments: {
      alternativeRecipes
    },
  },
];

export const MobileWithAlternatives: Story = {
  args: {
    messages: messagesWithAlternatives,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const DesktopWithAlternatives: Story = {
  args: {
    messages: messagesWithAlternatives,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const MobileOpenByDefault: Story = {
  args: {
    messages: sampleMessages,
    defaultOpenRecipe: sampleRecipe,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const DesktopOpenByDefault: Story = {
  args: {
    messages: sampleMessages,
    defaultOpenRecipe: sampleRecipe,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}; 