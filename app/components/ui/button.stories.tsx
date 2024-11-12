import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    isLoading: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    isLoading: true
  }
}; 