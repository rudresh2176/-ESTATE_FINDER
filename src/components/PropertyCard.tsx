import { Bed, Bath, Square, MapPin, Heart, Maximize2 } from 'lucide-react';
import { Property } from '../lib/supabase';

type Props = {
  property: Property;
  onClick: (property: Property) => void;
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  for_sale: { label: 'For Sale', color: 'bg-emerald-500' },
  for_rent: { label: 'For Rent', color: 'bg-sky-500' },
  sold: { label: 'Sold', color: 'bg-stone-500' },
  pending: { label: 'Pending', color: 'bg-amber-500' },
};

const TYPE_LABELS: Record<string, string> = {
  house: 'House',
  condo: 'Condo',
  townhouse: 'Townhouse',
  land: 'Land',
  commercial: 'Commercial',
};

function formatPrice(cents: number): string {
  const dollars = cents;
  if (dollars >= 1_000_000) return `$${(dollars / 1_000_000).toFixed(1)}M`;
  if (dollars >= 1_000) return `$${Math.round(dollars / 1_000)}K`;
  return `$${dollars.toLocaleString()}`;
}

export default function PropertyCard({ property, onClick }: Props) {
  const status = STATUS_LABELS[property.status] ?? STATUS_LABELS.for_sale;

  return (
    <article
      onClick={() => onClick(property)}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-stone-100"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-stone-200">
        <img
          src={property.image_url}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`${status.color} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
            {status.label}
          </span>
          <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {TYPE_LABELS[property.property_type]}
          </span>
        </div>
        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:text-red-500 transition-colors shadow-sm"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClick(property); }}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:text-amber-600 transition-colors shadow-sm"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white text-stone-900 font-bold text-lg px-3 py-1 rounded-lg shadow-md">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-stone-900 text-base leading-snug mb-1 line-clamp-1 group-hover:text-amber-700 transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-stone-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{property.city}, {property.state}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-stone-600 text-sm border-t border-stone-100 pt-3">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-stone-400" />
              <span>{property.bedrooms} <span className="text-stone-400">bd</span></span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-stone-400" />
            <span>{property.bathrooms} <span className="text-stone-400">ba</span></span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4 text-stone-400" />
            <span>{property.sqft.toLocaleString()} <span className="text-stone-400">sqft</span></span>
          </div>
        </div>

        {/* Agent */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-100">
          <img
            src={property.agent_avatar}
            alt={property.agent_name}
            className="w-6 h-6 rounded-full object-cover bg-stone-200"
          />
          <span className="text-xs text-stone-500">{property.agent_name}</span>
        </div>
      </div>
    </article>
  );
}
