import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Checkbox, { CheckOnly } from './Checkbox'; // 새로운 컴포넌트 추가

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

// 라벨이 있는 기본 체크박스 스토리
export const DefaultWithLabel: Story = {
  args: {
    label: 'Default Checkbox',
    checked: false,
  },
};

// 라벨이 없는 기본 체크박스 스토리
export const DefaultWithoutLabel: Story = {
  args: {
    checked: false,
  },
};

// 라벨이 있는 체크된 상태의 체크박스 스토리
export const CheckedWithLabel: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
  },
};

// 라벨이 없는 체크된 상태의 체크박스 스토리
export const CheckedWithoutLabel: Story = {
  args: {
    checked: true,
  },
};