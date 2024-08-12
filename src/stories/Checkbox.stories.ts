import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Checkbox from './Checkbox'; // Checkbox 컴포넌트를 불러옵니다.

const meta = {
  title: 'Example/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onChange: fn() }, // onChange 이벤트를 추적하도록 설정
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 체크박스 스토리
export const Default: Story = {
  args: {
    label: 'Default Checkbox',
    checked: false,
  },
};

// 체크된 상태의 체크박스 스토리
export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
  },
};
