import { useState } from 'react';
import { useLanguageStore } from '../stores/useLanguageStore';
import { usePublishedArticles } from '../hooks/usePublishedArticles';
import { useArticlesByCategory } from '../hooks/useArticlesByCategory';
import { useSearchArticles } from '../hooks/useSearchArticles';
import { HeroSection } from '../components/home/HeroSection';
import { SearchResults } from '../components/search/SearchResults';
import { CategoryNav } from '../components/home/CategoryNav';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { BreakingNewsSection } from '../components/home/sections/BreakingNewsSection';
import { TrendingSection } from '../components/home/sections/TrendingSection';
import { CategoryNewsSection } from '../components/home/sections/CategoryNewsSection';

export function HomePage() {
  const { language } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: allArticles, isLoading: isLoadingAll } = usePublishedArticles();
  const { data: categoryArticles, isLoading: isLoadingCategory } = useArticlesByCategory(selectedCategory);
  const { data: searchResults, isLoading: isSearching } = useSearchArticles(searchQuery);

  const isLoading = isLoadingAll || isLoadingCategory || isSearching;
  const articles = selectedCategory ? categoryArticles : allArticles;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-12">
      <HeroSection 
        onSearch={setSearchQuery}
        isSearching={isSearching} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <CategoryNav 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        {searchQuery ? (
          <SearchResults 
            results={searchResults || []}
            query={searchQuery}
            isLoading={isSearching}
          />
        ) : (
          <>
            {!selectedCategory && articles && (
              <BreakingNewsSection articles={articles} />
            )}
            
            {!selectedCategory && articles && (
              <TrendingSection articles={articles} />
            )}
            
            <CategoryNewsSection 
              articles={selectedCategory ? articles : articles?.slice(2) || []}
              selectedCategory={selectedCategory}
            />
          </>
        )}
      </div>
    </div>
  );
}