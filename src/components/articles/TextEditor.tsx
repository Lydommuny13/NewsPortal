import { useLanguageStore } from '../../stores/useLanguageStore';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';

interface TextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function TextEditor({ label, value, onChange }: TextEditorProps) {
  const { language } = useLanguageStore();

  const handleCommand = (command: string) => {
    const textarea = document.activeElement as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let newText = value;
    let newCursorPos = end;

    switch (command) {
      case 'bold':
        newText = value.substring(0, start) + `**${selectedText}**` + value.substring(end);
        newCursorPos = end + 4;
        break;
      case 'italic':
        newText = value.substring(0, start) + `*${selectedText}*` + value.substring(end);
        newCursorPos = end + 2;
        break;
      case 'ul':
        newText = value.substring(0, start) + `- ${selectedText}` + value.substring(end);
        newCursorPos = end + 2;
        break;
      case 'ol':
        newText = value.substring(0, start) + `1. ${selectedText}` + value.substring(end);
        newCursorPos = end + 3;
        break;
    }

    onChange(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="border rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 dark:border-gray-700">
        <div className="flex items-center gap-1 p-2 border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <button
            type="button"
            onClick={() => handleCommand('bold')}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
            title={language === 'km' ? 'អក្សរដិត' : 'Bold'}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleCommand('italic')}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
            title={language === 'km' ? 'អក្សរទ្រេត' : 'Italic'}
          >
            <Italic className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1" />
          <button
            type="button"
            onClick={() => handleCommand('ul')}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
            title={language === 'km' ? 'បញ្ជីគ្មានលេខ' : 'Bullet List'}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleCommand('ol')}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
            title={language === 'km' ? 'បញ្ជីមានលេខ' : 'Numbered List'}
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-64 px-3 py-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          placeholder={
            language === 'km'
              ? 'សរសេរមាតិការបស់អ្នកនៅទីនេះ...'
              : 'Write your content here...'
          }
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {language === 'km' 
          ? 'ប្រើ Markdown សម្រាប់ការរចនា' 
          : 'Supports Markdown formatting'}
      </p>
    </div>
  );
}