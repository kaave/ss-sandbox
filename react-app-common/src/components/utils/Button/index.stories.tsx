import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

type Component = typeof Button;
const meta: Meta<Component> = {
  title: 'Button',
  component: Button,
};

export default meta;

type Story = StoryObj<Component>;

export const Primary: Story = {
  render: props => <Button {...props} />,
  args: {
    children: 'Hello, storybook!',
    onClick: () => console.log('clicked!'),
  },
};
