import { useState } from 'react';
import {
  ArrowLeft, Bed, Bath, Square, MapPin, Calendar, Car, Maximize2,
  Heart, Share2, Phone, Mail, CheckCircle, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Property } from '../lib/supabase';

type Props = {
  property: Property;
  onBack: () => void;
};

function formatPrice(dollars: number): string {
  if (dollars >= 1_000_000) return `$${(dollars / 1_000_000).toFixed(2)}M`;
  return `$${dollars.toLocaleString()}`;
}

const STATUS_COLORS: Record<string, string> = {
  for_sale: 'bg-emerald-100 text-emerald-700',
  for_rent: 'bg-sky-100 text-sky-700',
  sold: 'bg-stone-100 text-stone-700',
  pending: 'bg-amber-100 text-amber-700',
};

const STATUS_LABELS: Record<string, string> = {
  for_sale: 'For Sale',
  for_rent: 'For Rent',
  sold: 'Sold',
  pending: 'Pending',
};

export default function PropertyDetail({ property, onBack }: Props) {
  const images = [property.image_url, ...property.image_urls].filter(Boolean);
  const [activeIdx, setActiveIdx] = useState(0);
  const [contactSent, setContactSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`I'm interested in ${property.title}. Please contact me with more information.`);

  const prev = () => setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Back bar */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-sm border-b border-stone-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to listings
          </button>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all">
              <Heart className="w-4 h-4" /> Save
            </button>
            <button className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-all">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="relative rounded-2xl overflow-hidden bg-stone-200 aspect-[16/9] shadow-md">
              <img
                src={images[activeIdx]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-700 hover:bg-white transition-colors shadow-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-700 hover:bg-white transition-colors shadow-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIdx(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === activeIdx ? 'bg-white w-5' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
              <span className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {activeIdx + 1} / {images.length}
              </span>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === activeIdx ? 'border-amber-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Title & status */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  {property.title}
                </h1>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[property.status]}`}>
                  {STATUS_LABELS[property.status]}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-500 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{property.address}, {property.city}, {property.state} {property.zip}</span>
              </div>
              <div className="text-3xl font-bold text-amber-600">
                {formatPrice(property.price)}
              </div>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Bed, label: 'Bedrooms', value: property.bedrooms > 0 ? property.bedrooms : 'Studio' },
                { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
                { icon: Square, label: 'Square Feet', value: property.sqft.toLocaleString() },
                { icon: Car, label: 'Garage', value: property.garage_spaces > 0 ? `${property.garage_spaces} car` : 'None' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white rounded-xl p-4 border border-stone-100 text-center shadow-sm">
                  <Icon className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-stone-900">{value}</div>
                  <div className="text-xs text-stone-500">{label}</div>
                </div>
              ))}
            </div>

            {/* Additional details */}
            <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
              <h2 className="font-bold text-stone-900 text-lg mb-4">Property Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                {[
                  { label: 'Property Type', value: property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1) },
                  { label: 'Year Built', value: property.year_built },
                  { label: 'Lot Size', value: property.lot_size > 0 ? `${property.lot_size} acres` : 'N/A' },
                  { label: 'MLS Status', value: STATUS_LABELS[property.status] },
                  { label: 'City', value: property.city },
                  { label: 'ZIP Code', value: property.zip },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">{label}</div>
                    <div className="font-semibold text-stone-800">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
              <h2 className="font-bold text-stone-900 text-lg mb-3">About This Property</h2>
              <p className="text-stone-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
                <h2 className="font-bold text-stone-900 text-lg mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-stone-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column - Agent card + contact */}
          <div className="space-y-5">
            {/* Agent */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-md">
              <h3 className="font-bold text-stone-900 mb-4">Listed by</h3>
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={property.agent_avatar}
                  alt={property.agent_name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-amber-200"
                />
                <div>
                  <div className="font-bold text-stone-900">{property.agent_name}</div>
                  <div className="text-sm text-stone-500">Licensed Real Estate Agent</div>
                </div>
              </div>
              <div className="space-y-2">
                <a
                  href={`tel:${property.agent_phone}`}
                  className="flex items-center gap-3 w-full px-4 py-2.5 border border-stone-200 rounded-xl text-stone-700 text-sm font-medium hover:border-amber-400 hover:bg-amber-50 transition-all"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
                  {property.agent_phone}
                </a>
                <a
                  href={`mailto:${property.agent_email}`}
                  className="flex items-center gap-3 w-full px-4 py-2.5 border border-stone-200 rounded-xl text-stone-700 text-sm font-medium hover:border-amber-400 hover:bg-amber-50 transition-all truncate"
                >
                  <Mail className="w-4 h-4 text-amber-500" />
                  {property.agent_email}
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-md">
              <h3 className="font-bold text-stone-900 mb-4">Request a Tour</h3>
              {contactSent ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="font-semibold text-stone-900">Message Sent!</p>
                  <p className="text-sm text-stone-500 mt-1">The agent will reach out to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-stone-400"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-stone-400"
                  />
                  <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-stone-400 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors shadow-sm"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Quick stats */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <div className="flex items-center gap-2 mb-3">
                <Maximize2 className="w-4 h-4 text-amber-600" />
                <span className="font-semibold text-stone-800 text-sm">At a Glance</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Price per sqft</span>
                  <span className="font-semibold text-stone-800">${Math.round(property.price / property.sqft).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Year built</span>
                  <span className="font-semibold text-stone-800">{property.year_built}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Lot size</span>
                  <span className="font-semibold text-stone-800">{property.lot_size > 0 ? `${property.lot_size} acres` : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Garage spaces</span>
                  <span className="font-semibold text-stone-800">{property.garage_spaces}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
