import { useState } from 'react';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { useCategories, useCreateCategory, useDeleteCategory } from '../../hooks/useCategories';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Plus, Trash2 } from 'lucide-react';

export function CategoriesPage() {
  const { language } = useLanguageStore();
  const [newCategory, setNewCategory] = useState({ name: '', name_km: '' });
  const { data: categories, isLoading } = useCategories();
  const { mutate: createCategory, isLoading: isCreating } = useCreateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.name && newCategory.name_km) {
      createCategory(newCategory, {
        onSuccess: () => setNewCategory({ name: '', name_km: '' })
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">
          {language === 'km' ? 'គ្រប់គ្រងប្រភេទ' : 'Manage Categories'}
        </h1>
      </div>

      {/* Add New Category Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          {language === 'km' ? 'បន្ថែមប្រភេទថ្មី' : 'Add New Category'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={language === 'km' ? 'ឈ្មោះ (ភាសាអង់គ្លេស)' : 'Name (English)'}
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              required
            />
            <Input
              label={language === 'km' ? 'ឈ្មោះ (ភាសាខ្មែរ)' : 'Name (Khmer)'}
              value={newCategory.name_km}
              onChange={(e) => setNewCategory({ ...newCategory, name_km: e.target.value })}
              required
            />
          </div>
          
          <Button type="submit" isLoading={isCreating}>
            <Plus className="w-4 h-4 mr-2" />
            {language === 'km' ? 'បន្ថែមប្រភេទ' : 'Add Category'}
          </Button>
        </form>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">
            {language === 'km' ? 'បញ្ជីប្រភេទ' : 'Categories List'}
          </h2>
        </div>

        <div className="divide-y">
          {categories?.map((category) => (
            <div 
              key={category.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div>
                <h3 className="font-medium">
                  {language === 'km' ? category.name_km : category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === 'km' ? category.name : category.name_km}
                </p>
              </div>
              
              <Button
                variant="secondary"
                onClick={() => deleteCategory(category.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          {categories?.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              {language === 'km' 
                ? 'មិនទាន់មានប្រភេទនៅឡើយទេ' 
                : 'No categories yet'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}