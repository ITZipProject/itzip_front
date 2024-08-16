import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Radio from './Radio';

const meta = {
  title: 'Example/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' }, // Action to log changes
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// 라벨이 있는 기본 라디오 버튼 스토리
export const DefaultWithLabel: Story = {
  args: {
    label: 'Default Radio',
    name: 'radioGroup1',
    value: 'default',
    checked: false,
  },
};

// 라벨이 없는 기본 라디오 버튼 스토리
export const DefaultWithoutLabel: Story = {
  args: {
    label: '',  // 빈 문자열 전달
    name: 'radioGroup2',
    value: 'default',
    checked: false,
  },
};

// 라벨이 있는 선택된 상태의 라디오 버튼 스토리
export const SelectedWithLabel: Story = {
  args: {
    label: 'Selected Radio',
    name: 'radioGroup1',
    value: 'selected',
    checked: true,
  },
};

// 라벨이 없는 선택된 상태의 라디오 버튼 스토리
export const SelectedWithoutLabel: Story = {
  args: {
    label: '',  // 빈 문자열 전달
    name: 'radioGroup2',
    value: 'selected',
    checked: true,
  },
};
