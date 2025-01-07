import { useLanguageStore } from '../../../stores/useLanguageStore';
import { SearchBar } from '../../search/SearchBar';

export function SearchSection() {
  const { language } = useLanguageStore();

  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log('Search query:', query);
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">
        {language === 'km' ? 'ស្វែងរកអត្ថបទ' : 'Search Articles'}
      </h2>
      <SearchBar onSearch={handleSearch} />
    </section>
  );
}