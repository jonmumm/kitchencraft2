import type { Meta, StoryObj } from '@storybook/react';
import { RecipeCard } from './recipe-card';

const meta = {
  title: 'Recipe/RecipeCard',
  component: RecipeCard,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    padded: true,
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'compact']
    }
  }
} satisfies Meta<typeof RecipeCard>;

export default meta;
type Story = StoryObj<typeof RecipeCard>;

const defaultRecipe = {
  id: 'recipe-1',
  title: 'One-Pan Roasted Chicken and Eggs with Herbs',
  description: 'A simple and flavorful weeknight dinner that\'s ready in under 30 minutes. Chicken thighs and eggs are roasted together with herbs and spices for a satisfying and healthy meal.',
  cookTime: '30 mins',
  difficulty: 'easy' as const,
  imageUrl: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&q=80&w=800&h=600'
};

export const Primary: Story = {
  args: {
    recipe: defaultRecipe,
    variant: 'primary'
  }
};

export const Compact: Story = {
  args: {
    recipe: defaultRecipe,
    variant: 'compact'
  }
};

export const NoImage: Story = {
  args: {
    recipe: {
      ...defaultRecipe,
      imageUrl: undefined
    },
    variant: 'primary'
  }
};

export const LongDescription: Story = {
  args: {
    recipe: {
      ...defaultRecipe,
      description: `${defaultRecipe.description} This is additional text to demonstrate how the card handles longer descriptions. It should truncate after a certain number of lines in compact mode, but can show more in primary mode.`
    }
  }
};

export const HardDifficulty: Story = {
  args: {
    recipe: {
      ...defaultRecipe,
      difficulty: 'hard' as const
    }
  }
};

export const MediumDifficulty: Story = {
  args: {
    recipe: {
      ...defaultRecipe,
      difficulty: 'medium' as const
    }
  }
};

export const NoMetadata: Story = {
  args: {
    recipe: {
      id: 'recipe-2',
      title: 'Simple Recipe',
      description: 'A recipe with minimal metadata.',
      imageUrl: defaultRecipe.imageUrl
    }
  }
};

// Grid layout example to show how cards look in a grid
export const GridLayout: Story = {
  decorators: [
    (Story) => (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array(6).fill(null).map((_, i) => (
          <Story key={i} />
        ))}
      </div>
    ),
  ],
  args: {
    recipe: defaultRecipe,
    variant: 'compact'
  }
}; 