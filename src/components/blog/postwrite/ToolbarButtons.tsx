import React from 'react';

interface ToolbarButtonsProps {
  onAction: (action: string, value?: string) => void;
}

const ToolbarButtons: React.FC<ToolbarButtonsProps> = ({ onAction }) => {
  const buttons = [
    { label: '굵게', action: 'bold', value: '**텍스트**' },
    { label: '기울임', action: 'italic', value: '*텍스트*' },
    { label: '링크', action: 'link', value: '[링크 텍스트](https://example.com)' },
    { label: '이미지', action: 'image', value: '![이미지 설명 텍스트](이미지_url)' },
    { label: '인용', action: 'quote', value: '> 인용문' },
    { label: '코드', action: 'code', value: '```\n코드\n```' },
    { label: '구분선', action: 'hr', value: '\n---\n' },
  ];

  const headings = [
    { label: 'H1', action: 'heading', value: '# ' },
    { label: 'H2', action: 'heading', value: '## ' },
    { label: 'H3', action: 'heading', value: '### ' },
  ];

  const lists = [
    { label: '순서 없는 목록', action: 'list', value: '- ' },
    { label: '순서 있는 목록', action: 'list', value: '1. ' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((button) => (
        <button
          key={button.action}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          onClick={() => onAction(button.action, button.value)}
        >
          {button.label}
        </button>
      ))}
      <select
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        onChange={(e) => onAction('heading', e.target.value)}
      >
        <option value="">제목</option>
        {headings.map((heading) => (
          <option key={heading.label} value={heading.value}>
            {heading.label}
          </option>
        ))}
      </select>
      <select
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        onChange={(e) => onAction('list', e.target.value)}
      >
        <option value="">목록</option>
        {lists.map((list) => (
          <option key={list.label} value={list.value}>
            {list.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ToolbarButtons;
