import { useState } from 'react';
import { Home, Menu, X, Search } from 'lucide-react';

type View = 'listings' | 'detail';

type Props = {
  onNavigate: (view: View) => void;
  onSearch: (query: string) => void;
};

export default function Header({ onNavigate, onSearch }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button
            onClick={() => onNavigate('listings')}
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <div className="w-9 h-9 bg-amber-600 rounded-lg flex items-center justify-center group-hover:bg-amber-700 transition-colors">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-stone-900 tracking-tight">
              Estate<span className="text-amber-600">Finder</span>
            </span>
          </button>

          {/* Desktop search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search by city, state, or ZIP..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-50 text-stone-700 placeholder-stone-400"
              />
            </div>
          </form>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('listings')}
              className="text-sm font-medium text-stone-600 hover:text-amber-600 transition-colors"
            >
              Browse Listings
            </button>
            <button className="text-sm font-medium text-stone-600 hover:text-amber-600 transition-colors">
              Sell a Property
            </button>
            <button className="text-sm font-medium text-stone-600 hover:text-amber-600 transition-colors">
              Find an Agent
            </button>
            <button className="px-4 py-2 bg-amber-600 text-white text-sm font-semibold rounded-full hover:bg-amber-700 transition-colors">
              List Property
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search by city, state, or ZIP..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50 text-stone-700 placeholder-stone-400"
              />
            </div>
          </form>
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => { onNavigate('listings'); setMenuOpen(false); }}
              className="text-left text-sm font-medium text-stone-700 py-2 hover:text-amber-600"
            >
              Browse Listings
            </button>
            <button className="text-left text-sm font-medium text-stone-700 py-2 hover:text-amber-600">
              Sell a Property
            </button>
            <button className="text-left text-sm font-medium text-stone-700 py-2 hover:text-amber-600">
              Find an Agent
            </button>
            <button className="px-4 py-2 bg-amber-600 text-white text-sm font-semibold rounded-full hover:bg-amber-700 w-full mt-2">
              List Property
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
