import { useLanguageStore } from '../../stores/useLanguageStore';
import { useCategories } from '../../hooks/useCategories';
import { Select } from '../ui/Select';

interface CategorySelectProps {
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function CategorySelect({ value, onChange, required }: CategorySelectProps) {
  const { language } = useLanguageStore();
  const { data: categories } = useCategories();

  const options = [
    { value: '', label: language === 'km' ? '-- ជ្រើសរើសប្រភេទ --' : '-- Select Category --' },
    ...(categories?.map(cat => ({
      value: cat.id,
      label: language === 'km' ? cat.name_km : cat.name
    })) || [])
  ];

  return (
    <Select
      label={language === 'km' ? 'ប្រភេទ' : 'Category'}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      options={options}
      required={required}
    />
  );
}