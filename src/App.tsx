import { useEffect, useState, useMemo, useCallback } from 'react';
import { supabase, Property, Filters } from './lib/supabase';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import PropertyCard from './components/PropertyCard';
import PropertyDetail from './components/PropertyDetail';
import FeaturedSection from './components/FeaturedSection';
import Footer from './components/Footer';
import { Loader2 } from 'lucide-react';

type View = 'home' | 'listings' | 'detail';

const DEFAULT_FILTERS: Filters = {
  status: 'all',
  property_type: 'all',
  min_price: null,
  max_price: null,
  min_beds: null,
  city: '',
};

export default function App() {
  const [view, setView] = useState<View>('home');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProperties(data as Property[]);
      }
      setLoading(false);
    }
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (filters.status !== 'all' && p.status !== filters.status) return false;
      if (filters.property_type !== 'all' && p.property_type !== filters.property_type) return false;
      if (filters.min_price !== null && p.price < filters.min_price) return false;
      if (filters.max_price !== null && p.price > filters.max_price) return false;
      if (filters.min_beds !== null && p.bedrooms < filters.min_beds) return false;
      if (filters.city && !p.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match =
          p.city.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.zip.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [properties, filters, searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setFilters(DEFAULT_FILTERS);
    setView('listings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCitySearch = useCallback((city: string) => {
    setSearchQuery('');
    setFilters({ ...DEFAULT_FILTERS, city });
    setView('listings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePropertyClick = useCallback((property: Property) => {
    setSelectedProperty(property);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    setView('listings');
    setSelectedProperty(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigate = useCallback((dest: 'listings' | 'detail') => {
    if (dest === 'listings') {
      setView('listings');
      setSelectedProperty(null);
    }
  }, []);

  if (view === 'detail' && selectedProperty) {
    return (
      <div className="font-sans">
        <Header onNavigate={handleNavigate} onSearch={handleSearch} />
        <div className="pt-16">
          <PropertyDetail property={selectedProperty} onBack={handleBack} />
        </div>
        <Footer />
      </div>
    );
  }

  if (view === 'listings') {
    return (
      <div className="font-sans bg-stone-50 min-h-screen">
        <Header onNavigate={handleNavigate} onSearch={handleSearch} />
        <div className="pt-16">
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            total={filteredProperties.length}
          />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {searchQuery && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-stone-900">
                  Results for &ldquo;<span className="text-amber-600">{searchQuery}</span>&rdquo;
                </h2>
                <p className="text-stone-500 text-sm mt-1">{filteredProperties.length} properties found</p>
              </div>
            )}
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">No properties found</h3>
                <p className="text-stone-500 text-sm">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={handlePropertyClick}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  // Home view
  return (
    <div className="font-sans">
      <Header onNavigate={handleNavigate} onSearch={handleSearch} />
      <div className="pt-16">
        <Hero onSearch={handleSearch} />

        {/* Featured listings */}
        <section className="bg-stone-50 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
                  Featured Listings
                </h2>
                <p className="text-stone-500 mt-2">Hand-picked exceptional properties from across the country.</p>
              </div>
              <button
                onClick={() => setView('listings')}
                className="hidden sm:block text-sm font-semibold text-amber-600 hover:text-amber-700 border border-amber-200 hover:border-amber-400 px-4 py-2 rounded-full transition-all"
              >
                View all listings
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.slice(0, 6).map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={handlePropertyClick}
                  />
                ))}
              </div>
            )}

            <div className="text-center mt-10">
              <button
                onClick={() => setView('listings')}
                className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-md shadow-amber-200"
              >
                Browse All {properties.length} Properties
              </button>
            </div>
          </div>
        </section>

        <FeaturedSection onCitySearch={handleCitySearch} />
        <Footer />
      </div>
    </div>
  );
}
