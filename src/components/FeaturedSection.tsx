import { TrendingUp, Award, Building2 } from 'lucide-react';

const CITIES = [
  { name: 'New York', state: 'NY', listings: 842, img: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Los Angeles', state: 'CA', listings: 1240, img: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Miami', state: 'FL', listings: 531, img: 'https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Seattle', state: 'WA', listings: 378, img: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Chicago', state: 'IL', listings: 693, img: 'https://images.pexels.com/photos/3137079/pexels-photo-3137079.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Charleston', state: 'SC', listings: 214, img: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

type Props = {
  onCitySearch: (city: string) => void;
};

export default function FeaturedSection({ onCitySearch }: Props) {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Why us */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Why Choose <span className="text-amber-600">EstateFinder</span>
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            We connect buyers and sellers with the best properties and top agents nationwide.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Award,
              title: 'Verified Listings',
              desc: 'Every listing is manually verified by our team to ensure accuracy and quality.',
              color: 'text-amber-500',
              bg: 'bg-amber-50',
            },
            {
              icon: TrendingUp,
              title: 'Market Insights',
              desc: 'Access real-time market data, price trends, and neighborhood analytics.',
              color: 'text-sky-500',
              bg: 'bg-sky-50',
            },
            {
              icon: Building2,
              title: 'Top Agents',
              desc: 'Connect with thousands of verified, top-rated real estate professionals.',
              color: 'text-emerald-500',
              bg: 'bg-emerald-50',
            },
          ].map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="text-center p-8 rounded-2xl bg-stone-50 border border-stone-100 hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-7 h-7 ${color}`} />
              </div>
              <h3 className="font-bold text-stone-900 text-lg mb-2">{title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Browse by city */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
            Browse by City
          </h2>
          <p className="text-stone-500">Explore listings in the country's most vibrant real estate markets.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CITIES.map((city) => (
            <button
              key={city.name}
              onClick={() => onCitySearch(city.name)}
              className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={city.img}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <div className="text-white font-bold text-sm">{city.name}</div>
                <div className="text-stone-300 text-xs">{city.listings} listings</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
