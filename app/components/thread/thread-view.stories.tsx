import type { Meta, StoryObj } from '@storybook/react';
import { ThreadView } from './thread-view';

const meta = {
  title: 'Thread/ThreadView',
  component: ThreadView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThreadView>;

export default meta;
type Story = StoryObj<typeof ThreadView>;

const misunderstandingMessages = [
  {
    id: 'msg-1',
    content: "I'm looking for a pasta recipe that's light and fresh for summer!",
    author: {
      id: 'user-1',
      isAI: false,
    },
    timestamp: new Date('2024-03-10T10:00:00'),
  },
  {
    id: 'msg-2',
    content: "I can help you make a delicious hearty pasta dish! Here's a rich and creamy recipe that's perfect for cold weather, along with some other comforting pasta ideas:",
    author: {
      id: 'ai-1',
      isAI: true,
    },
    timestamp: new Date('2024-03-10T10:01:00'),
    attachments: {
      primaryRecipe: {
        id: 'recipe-1',
        title: 'Creamy Wild Mushroom Pasta',
        description: 'A rich and hearty pasta with wild mushrooms, heavy cream, and plenty of parmesan. Perfect for cold evenings.',
        cookTime: '35 mins',
        difficulty: 'medium' as const
      },
      alternativeRecipes: [
        {
          id: 'recipe-2',
          title: 'Classic Carbonara',
          description: 'A traditional Roman pasta with eggs, pecorino, guanciale, and lots of black pepper.',
          cookTime: '25 mins',
          difficulty: 'medium' as const
        },
        {
          id: 'recipe-3',
          title: 'Four Cheese Pasta',
          description: 'Ultra creamy sauce made with four different Italian cheeses and a touch of nutmeg.',
          cookTime: '30 mins',
          difficulty: 'easy' as const
        },
        {
          id: 'recipe-4',
          title: 'Beef Ragu',
          description: 'Slow-cooked beef in a rich tomato sauce, perfect over pappardelle.',
          cookTime: '3 hours',
          difficulty: 'medium' as const
        },
      ],
    },
  },
  {
    id: 'msg-3',
    content: "Actually, I was hoping for something lighter - it's really hot outside and I want something refreshing!",
    author: {
      id: 'user-1',
      isAI: false,
    },
    timestamp: new Date('2024-03-10T10:03:00'),
  },
  {
    id: 'msg-4',
    content: "I apologize for the misunderstanding! You're absolutely right - let me suggest some light and refreshing summer pasta dishes that are perfect for warm weather:",
    author: {
      id: 'ai-1',
      isAI: true,
    },
    timestamp: new Date('2024-03-10T10:04:00'),
    attachments: {
      primaryRecipe: {
        id: 'recipe-5',
        title: 'Lemon Herb Pasta Primavera',
        description: 'A bright and fresh pasta filled with seasonal vegetables, fresh herbs, and a light lemon sauce. Perfect for summer dining.',
        cookTime: '25 mins',
        difficulty: 'easy' as const
      },
      alternativeRecipes: [
        {
          id: 'recipe-6',
          title: 'Cherry Tomato & Basil Pasta',
          description: 'Fresh cherry tomatoes barely cooked with garlic, basil, and olive oil. Light and bursting with summer flavors.',
          cookTime: '20 mins',
          difficulty: 'easy' as const
        },
        {
          id: 'recipe-7',
          title: 'Chilled Pasta Salad',
          description: 'Colorful pasta salad with fresh mozzarella, vegetables, and a light vinaigrette. Can be made ahead.',
          cookTime: '25 mins',
          difficulty: 'easy' as const
        },
        {
          id: 'recipe-8',
          title: 'Shrimp Scampi',
          description: 'Light and garlicky shrimp with white wine and lemon. Quick and perfect for warm evenings.',
          cookTime: '20 mins',
          difficulty: 'easy' as const
        },
        {
          id: 'recipe-9',
          title: 'Mediterranean Pasta',
          description: 'Light sauce with olives, capers, fresh tomatoes, and herbs. Served warm or at room temperature.',
          cookTime: '25 mins',
          difficulty: 'easy' as const
        },
        {
          id: 'recipe-10',
          title: 'Zucchini & Lemon Pasta',
          description: 'Thin ribbons of zucchini with a light cream sauce and fresh lemon zest. Summer in a bowl.',
          cookTime: '20 mins',
          difficulty: 'easy' as const
        },
      ],
    },
  },
];

const sampleMessages = [
  {
    id: 'msg-1',
    content: "I'm looking for a pasta recipe that's quick and easy to make!",
    author: {
      id: 'user-1',
      isAI: false,
    },
    timestamp: new Date('2024-03-10T10:00:00'),
  },
  {
    id: 'msg-2',
    content: "I'd love to help you make a delicious pasta dish! Here's a foolproof Cacio e Pepe recipe that's perfect for beginners, along with some other pasta ideas you might enjoy:",
    author: {
      id: 'ai-1',
      isAI: true,
    },
    timestamp: new Date('2024-03-10T10:01:00'),
    attachments: {
      primaryRecipe: {
        id: 'recipe-1',
        title: 'Classic Cacio e Pepe',
        description: 'A traditional Roman pasta dish that creates a creamy sauce from just pecorino cheese, black pepper, and pasta water. The key is the emulsification technique.',
        cookTime: '15 mins',
        difficulty: 'easy' as const
      },
      alternativeRecipes: [
        {
          id: 'recipe-2',
          title: 'Garlic Butter Pasta',
          description: 'A quick pasta that builds flavor by slowly toasting garlic in butter until golden. Finish with parsley and parmesan.',
          cookTime: '20 mins',
          difficulty: 'easy' as const
        },
        {
          id: 'recipe-3',
          title: 'Classic Pesto Pasta',
          description: 'Fresh basil pesto made with garlic, pine nuts, and parmesan. The trick is to add a splash of pasta water to help the sauce coat every strand.',
          cookTime: '25 mins',
          difficulty: 'easy' as const
        },
        {
          id: 'recipe-4',
          title: 'Arrabbiata',
          description: 'A spicy tomato sauce where garlic and red chilies are gently fried in olive oil before adding crushed tomatoes and fresh basil.',
          cookTime: '30 mins',
          difficulty: 'medium' as const
        },
        {
          id: 'recipe-5',
          title: 'Lemon Ricotta Pasta',
          description: 'A creamy and light sauce made with fresh ricotta, lemon zest, and black pepper. Perfect for warm weather.',
          cookTime: '20 mins',
          difficulty: 'easy' as const
        },
        {
          id: 'recipe-6',
          title: 'Mushroom Cream Sauce',
          description: 'Mixed mushrooms sautéed until golden, then simmered with cream and herbs. Rich and satisfying.',
          cookTime: '35 mins',
          difficulty: 'medium' as const
        },
        {
          id: 'recipe-7',
          title: 'Vodka Sauce',
          description: 'Tomato-based sauce with a touch of cream and vodka that adds depth. A restaurant favorite you can make at home.',
          cookTime: '40 mins',
          difficulty: 'medium' as const
        },
        {
          id: 'recipe-8',
          title: 'Brown Butter Sage',
          description: 'Nutty brown butter infused with fresh sage leaves. Simple but sophisticated.',
          cookTime: '15 mins',
          difficulty: 'easy' as const
        }
      ],
    },
  },
  {
    id: 'msg-3',
    content: "The Cacio e Pepe looks perfect! Could you tell me more about the technique for making the sauce creamy?",
    author: {
      id: 'user-1',
      isAI: false,
    },
    timestamp: new Date('2024-03-10T10:03:00'),
  },
  {
    id: 'msg-4',
    content: "Great question! The key to a creamy Cacio e Pepe sauce is the emulsification technique. Here's a detailed breakdown of the process:",
    author: {
      id: 'ai-1',
      isAI: true,
    },
    timestamp: new Date('2024-03-10T10:04:00'),
  },
];

export const Default: Story = {
  args: {
    messages: sampleMessages,
  },
};

export const LoadingState: Story = {
  args: {
    messages: [
      sampleMessages[0],
      {
        id: 'msg-loading',
        content: '...',
        author: {
          id: 'ai-1',
          isAI: true,
        },
        timestamp: new Date(),
      },
    ],
  },
};

export const SingleMessage: Story = {
  args: {
    messages: [sampleMessages[0]],
  },
};

export const WithRecipeResponse: Story = {
  args: {
    messages: [sampleMessages[0], sampleMessages[1]],
  },
};

export const Misunderstanding: Story = {
  args: {
    messages: misunderstandingMessages,
  },
}; 