import { useState } from 'react';
import { Search, MapPin, TrendingUp, Shield } from 'lucide-react';

type Props = {
  onSearch: (query: string) => void;
};

const POPULAR = ['New York', 'Los Angeles', 'Miami', 'Seattle', 'Chicago', 'Scottsdale'];

export default function Hero({ onSearch }: Props) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Luxury real estate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/80 via-stone-900/60 to-stone-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
          <TrendingUp className="w-3.5 h-3.5" />
          Over 10,000 active listings nationwide
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
          Find Your{' '}
          <span className="text-amber-400">Dream Home</span>
        </h1>

        <p className="text-stone-300 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Discover exceptional properties from coast to coast. Browse thousands of listings, connect with top agents, and find the perfect place to call home.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter city, state, or ZIP code..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-stone-400 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white/15 transition-all"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-100 shadow-lg shadow-amber-900/30"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </form>

        {/* Popular cities */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-stone-400 text-sm">Popular:</span>
          {POPULAR.map((city) => (
            <button
              key={city}
              onClick={() => { setQuery(city); onSearch(city); }}
              className="text-sm text-stone-300 hover:text-amber-400 bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-1 rounded-full transition-all backdrop-blur-sm"
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 divide-x divide-white/10">
          {[
            { label: 'Active Listings', value: '12,450+' },
            { label: 'Cities Covered', value: '340+' },
            { label: 'Trusted Agents', value: '2,800+' },
          ].map(({ label, value }) => (
            <div key={label} className="text-center px-4">
              <div className="text-xl sm:text-2xl font-bold text-white">{value}</div>
              <div className="text-xs sm:text-sm text-stone-400 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust badge */}
      <div className="absolute top-24 right-6 hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2">
        <Shield className="w-4 h-4 text-amber-400" />
        <span className="text-xs text-stone-300 font-medium">Verified Listings</span>
      </div>
    </section>
  );
}
