import { SlidersHorizontal, X } from 'lucide-react';
import { Filters } from '../lib/supabase';

type Props = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  total: number;
};

const PRICE_OPTIONS = [
  { label: 'Any', value: null },
  { label: '$200K', value: 200000 },
  { label: '$500K', value: 500000 },
  { label: '$1M', value: 1000000 },
  { label: '$2M', value: 2000000 },
  { label: '$5M', value: 5000000 },
];

const BEDS_OPTIONS = [
  { label: 'Any', value: null },
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
];

export default function FilterBar({ filters, onFiltersChange, total }: Props) {
  const hasActiveFilters =
    filters.status !== 'all' ||
    filters.property_type !== 'all' ||
    filters.min_price !== null ||
    filters.max_price !== null ||
    filters.min_beds !== null ||
    filters.city !== '';

  const reset = () =>
    onFiltersChange({
      status: 'all',
      property_type: 'all',
      min_price: null,
      max_price: null,
      min_beds: null,
      city: '',
    });

  return (
    <div className="bg-white border-b border-stone-200 sticky top-16 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-stone-500 text-sm flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="font-medium text-stone-700">{total}</span>
            <span>results</span>
          </div>

          {/* Status */}
          <select
            value={filters.status}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
            className="text-sm border border-stone-200 rounded-lg px-3 py-1.5 text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="for_sale">For Sale</option>
            <option value="for_rent">For Rent</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>

          {/* Type */}
          <select
            value={filters.property_type}
            onChange={(e) => onFiltersChange({ ...filters, property_type: e.target.value })}
            className="text-sm border border-stone-200 rounded-lg px-3 py-1.5 text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>

          {/* Min price */}
          <select
            value={filters.min_price ?? ''}
            onChange={(e) => onFiltersChange({ ...filters, min_price: e.target.value ? Number(e.target.value) : null })}
            className="text-sm border border-stone-200 rounded-lg px-3 py-1.5 text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
          >
            <option value="">Min Price</option>
            {PRICE_OPTIONS.filter(p => p.value !== null).map((p) => (
              <option key={p.value} value={p.value!}>{p.label}</option>
            ))}
          </select>

          {/* Max price */}
          <select
            value={filters.max_price ?? ''}
            onChange={(e) => onFiltersChange({ ...filters, max_price: e.target.value ? Number(e.target.value) : null })}
            className="text-sm border border-stone-200 rounded-lg px-3 py-1.5 text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
          >
            <option value="">Max Price</option>
            {PRICE_OPTIONS.filter(p => p.value !== null).map((p) => (
              <option key={p.value} value={p.value!}>{p.label}</option>
            ))}
          </select>

          {/* Beds */}
          <select
            value={filters.min_beds ?? ''}
            onChange={(e) => onFiltersChange({ ...filters, min_beds: e.target.value ? Number(e.target.value) : null })}
            className="text-sm border border-stone-200 rounded-lg px-3 py-1.5 text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
          >
            <option value="">Beds</option>
            {BEDS_OPTIONS.filter(b => b.value !== null).map((b) => (
              <option key={b.value} value={b.value!}>{b.label}</option>
            ))}
          </select>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium transition-colors ml-auto"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
