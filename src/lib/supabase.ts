import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  property_type: 'house' | 'condo' | 'townhouse' | 'land' | 'commercial';
  status: 'for_sale' | 'for_rent' | 'sold' | 'pending';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lot_size: number;
  year_built: number;
  garage_spaces: number;
  image_url: string;
  image_urls: string[];
  features: string[];
  agent_name: string;
  agent_email: string;
  agent_phone: string;
  agent_avatar: string;
  lat: number | null;
  lng: number | null;
  created_at: string;
  updated_at: string;
};

export type Filters = {
  status: string;
  property_type: string;
  min_price: number | null;
  max_price: number | null;
  min_beds: number | null;
  city: string;
};
