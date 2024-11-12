import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon']
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive'
  }
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm'
  }
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg'
  }
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link'
  }
}; 