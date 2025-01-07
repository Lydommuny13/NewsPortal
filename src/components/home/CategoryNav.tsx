import { motion } from 'framer-motion';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { useCategories } from '../../hooks/useCategories';

interface CategoryNavProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryNav({ selectedCategory, onSelectCategory }: CategoryNavProps) {
  const { language } = useLanguageStore();
  const { data: categories } = useCategories();

  if (!categories?.length) return null;

  return (
    <nav className="flex items-center gap-2 overflow-x-auto pb-4 -mx-2">
      <CategoryButton
        isSelected={!selectedCategory}
        onClick={() => onSelectCategory(null)}
      >
        {language === 'km' ? 'ទាំងអស់' : 'All'}
      </CategoryButton>

      {categories.map((category) => (
        <CategoryButton
          key={category.id}
          isSelected={category.id === selectedCategory}
          onClick={() => onSelectCategory(category.id)}
        >
          {language === 'km' ? category.name_km : category.name}
        </CategoryButton>
      ))}
    </nav>
  );
}

interface CategoryButtonProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

function CategoryButton({ children, isSelected, onClick }: CategoryButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
        isSelected
          ? 'bg-blue-600 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </motion.button>
  );
}