import type { Meta, StoryObj } from '@storybook/react';
import { Message } from './message';

const meta = {
  title: 'Thread/Message',
  component: Message,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof Message>;

const defaultArgs = {
  id: 'msg-1',
  content: 'This is a sample message in the thread.',
  author: {
    id: 'user-1',
    isAI: false
  },
  timestamp: new Date(),
  isHighlighted: false,
};

export const Default: Story = {
  args: defaultArgs
};

export const Highlighted: Story = {
  args: {
    ...defaultArgs,
    isHighlighted: true,
  }
};

export const UserMessage: Story = {
  args: {
    ...defaultArgs,
    author: {
      id: 'user-2',
      isAI: false
    }
  }
};

export const AIMessage: Story = {
  args: {
    ...defaultArgs,
    author: {
      id: 'ai-1',
      isAI: true
    },
    content: 'Here are some recipe suggestions for you!'
  }
};

export const LongMessage: Story = {
  args: {
    ...defaultArgs,
    content: `This is a much longer message that demonstrates how the component handles multiple paragraphs and longer content.

When writing recipes, it's important to be clear and detailed. For example, when making pasta:

1. Bring a large pot of water to a rolling boil
2. Add plenty of salt - the water should taste like the sea
3. Cook the pasta until al dente, stirring occasionally
4. Reserve some pasta water before draining

The sauce should be ready before the pasta is done cooking.`
  }
}; 