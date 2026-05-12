import { Home, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-amber-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Estate<span className="text-amber-400">Finder</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed mb-5">
              Your trusted partner in finding the perfect home. Thousands of verified listings across the country.
            </p>
            <div className="flex gap-3">
              {['fb', 'tw', 'ig', 'in'].map((s) => (
                <div key={s} className="w-8 h-8 bg-stone-700 hover:bg-amber-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors text-xs font-bold text-stone-300 hover:text-white uppercase">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Properties</h4>
            <ul className="space-y-2.5 text-sm">
              {['Houses for Sale', 'Condos & Apartments', 'Townhouses', 'New Construction', 'Foreclosures', 'Open Houses'].map((l) => (
                <li key={l}><a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {['Find an Agent', 'Sell Your Home', 'Mortgage Calculator', 'Home Valuation', 'Neighborhood Guide', 'Market Trends'].map((l) => (
                <li key={l}><a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-stone-400">
                <MapPin className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                RUDRESH B S ,Belagavi, Karnataka, India
              </li>
              <li className="flex items-center gap-2.5 text-stone-400">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                +91 78997 72176
              </li>
              <li className="flex items-center gap-2.5 text-stone-400">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                rudreshsakri8@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} EstateFinder. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-stone-500">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
