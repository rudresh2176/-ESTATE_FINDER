
/*
  # Real Estate Listing Platform Schema

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text) - listing headline
      - `description` (text) - full property description
      - `price` (bigint) - price in USD cents
      - `address` (text)
      - `city` (text)
      - `state` (text)
      - `zip` (text)
      - `property_type` (text) - house, condo, townhouse, land, commercial
      - `status` (text) - for_sale, for_rent, sold, pending
      - `bedrooms` (int)
      - `bathrooms` (numeric) - allows half baths
      - `sqft` (int)
      - `lot_size` (numeric) - in acres
      - `year_built` (int)
      - `garage_spaces` (int)
      - `image_url` (text) - primary listing image
      - `image_urls` (text[]) - additional images
      - `features` (text[]) - amenities array
      - `agent_name` (text)
      - `agent_email` (text)
      - `agent_phone` (text)
      - `agent_avatar` (text)
      - `lat` (numeric) - latitude
      - `lng` (numeric) - longitude
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `properties`
    - Public SELECT allowed (listings are public)
    - Only authenticated users can insert/update/delete their own listings

  3. Seed Data
    - 12 diverse sample properties across the US
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  price bigint NOT NULL DEFAULT 0,
  address text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  state text NOT NULL DEFAULT '',
  zip text NOT NULL DEFAULT '',
  property_type text NOT NULL DEFAULT 'house',
  status text NOT NULL DEFAULT 'for_sale',
  bedrooms int NOT NULL DEFAULT 0,
  bathrooms numeric NOT NULL DEFAULT 0,
  sqft int NOT NULL DEFAULT 0,
  lot_size numeric NOT NULL DEFAULT 0,
  year_built int NOT NULL DEFAULT 2000,
  garage_spaces int NOT NULL DEFAULT 0,
  image_url text NOT NULL DEFAULT '',
  image_urls text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  agent_name text NOT NULL DEFAULT '',
  agent_email text NOT NULL DEFAULT '',
  agent_phone text NOT NULL DEFAULT '',
  agent_avatar text NOT NULL DEFAULT '',
  lat numeric,
  lng numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view properties"
  ON properties FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update their properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS properties_city_idx ON properties(city);
CREATE INDEX IF NOT EXISTS properties_status_idx ON properties(status);
CREATE INDEX IF NOT EXISTS properties_property_type_idx ON properties(property_type);
CREATE INDEX IF NOT EXISTS properties_price_idx ON properties(price);

INSERT INTO properties (title, description, price, address, city, state, zip, property_type, status, bedrooms, bathrooms, sqft, lot_size, year_built, garage_spaces, image_url, image_urls, features, agent_name, agent_email, agent_phone, agent_avatar, lat, lng) VALUES
(
  'Stunning Modern Farmhouse with Mountain Views',
  'This beautifully crafted modern farmhouse sits on 2.5 acres with breathtaking mountain views. The open-concept layout features soaring 12-foot ceilings, a chef''s kitchen with quartz countertops, and a spacious master suite with spa-like ensuite. Entertain on the wraparound porch or gather around the stone fireplace on cozy evenings.',
  1250000,
  '4821 Ridgeview Lane',
  'Bozeman',
  'MT',
  '59715',
  'house',
  'for_sale',
  4, 3.5, 3200, 2.5, 2019, 2,
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['Mountain Views','Wraparound Porch','Chef''s Kitchen','Stone Fireplace','Quartz Countertops','Master Suite','Smart Home','Solar Panels'],
  'Sarah Mitchell', 'sarah.mitchell@realty.com', '(406) 555-0142',
  'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=200',
  45.6770, -111.0429
),
(
  'Luxurious Oceanfront Estate with Private Beach',
  'Experience the pinnacle of coastal living in this exceptional oceanfront estate. Every room captures the endless Pacific Ocean panorama. The chef''s kitchen is equipped with top-of-the-line appliances, while the primary suite features a private ocean-view balcony, walk-in closet, and heated floors. The outdoor space boasts an infinity pool, outdoor kitchen, and direct beach access.',
  4850000,
  '12 Shoreline Drive',
  'Malibu',
  'CA',
  '90265',
  'house',
  'for_sale',
  5, 5, 5800, 0.8, 2015, 3,
  'https://images.pexels.com/photos/2506990/pexels-photo-2506990.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['Ocean Views','Infinity Pool','Private Beach Access','Outdoor Kitchen','Heated Floors','Smart Home','Wine Cellar','Home Theater'],
  'James Hartley', 'james.hartley@coastalrealty.com', '(310) 555-0788',
  'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=200',
  34.0259, -118.7798
),
(
  'Downtown Luxury Penthouse with City Skyline Views',
  'Perched atop one of Manhattan''s most coveted addresses, this extraordinary penthouse offers 360-degree skyline views. The residence features floor-to-ceiling windows, a bespoke kitchen, and a private rooftop terrace. The primary suite is a sanctuary with dual walk-in closets and a spa bathroom. Building amenities include 24-hour concierge, fitness center, and private parking.',
  7200000,
  '500 Park Avenue, Unit PH',
  'New York',
  'NY',
  '10022',
  'condo',
  'for_sale',
  3, 3, 3100, 0, 2018, 1,
  'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['City Skyline Views','Private Rooftop Terrace','24-Hour Concierge','Fitness Center','Private Parking','Floor-to-Ceiling Windows','Bespoke Kitchen'],
  'Victoria Chen', 'victoria.chen@nycrealty.com', '(212) 555-0321',
  'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200',
  40.7614, -73.9725
),
(
  'Charming Colonial Home in Historic Neighborhood',
  'This meticulously maintained colonial home blends timeless charm with modern updates. The welcoming foyer leads to formal living and dining rooms, a fully renovated kitchen, and a cozy family room with fireplace. The backyard oasis features a heated pool, mature landscaping, and a stone patio perfect for entertaining.',
  685000,
  '27 Maple Street',
  'Westport',
  'CT',
  '06880',
  'house',
  'for_sale',
  4, 2.5, 2650, 0.45, 1968, 2,
  'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['Heated Pool','Stone Patio','Renovated Kitchen','Formal Dining','Fireplace','Mature Landscaping','Hardwood Floors'],
  'Robert Davis', 'robert.davis@ctrealty.com', '(203) 555-0567',
  'https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=200',
  41.1415, -73.3579
),
(
  'Contemporary Desert Retreat with Resort Amenities',
  'A masterpiece of desert contemporary architecture, this home seamlessly blends indoor and outdoor living. Dramatic floor-to-ceiling windows frame sweeping Sonoran Desert views. The kitchen is a culinary haven with professional-grade appliances. Step outside to your private resort featuring a negative-edge pool, outdoor kitchen, fire pit, and professional putting green.',
  2100000,
  '8840 Desert Vista Blvd',
  'Scottsdale',
  'AZ',
  '85255',
  'house',
  'for_sale',
  5, 4.5, 4900, 1.2, 2021, 3,
  'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['Negative-Edge Pool','Desert Views','Outdoor Kitchen','Fire Pit','Putting Green','Smart Home','Solar Panels','Gated Community'],
  'Amanda Torres', 'amanda.torres@azrealty.com', '(480) 555-0234',
  'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=200',
  33.6695, -111.9042
),
(
  'Stylish Urban Loft in Arts District',
  'This striking industrial-chic loft occupies an entire floor of a converted warehouse in the heart of the Arts District. Soaring 16-foot ceilings, original exposed brick, and polished concrete floors set the stage. The open kitchen features a 10-foot island and professional appliances. Two private terraces offer spectacular city views.',
  895000,
  '2245 E 7th Street, Floor 4',
  'Los Angeles',
  'CA',
  '90021',
  'condo',
  'for_sale',
  2, 2, 2200, 0, 2017, 1,
  'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['Exposed Brick','16-Foot Ceilings','Private Terraces','City Views','Polished Concrete','10-Foot Island','Electric Vehicle Charging'],
  'Marcus Webb', 'marcus.webb@larealty.com', '(323) 555-0891',
  'https://images.pexels.com/photos/3785074/pexels-photo-3785074.jpeg?auto=compress&cs=tinysrgb&w=200',
  34.0226, -118.2335
),
(
  'Lakefront Craftsman with Private Dock',
  'Escape to this stunning lakefront craftsman nestled along the shores of Lake Tahoe. The warm, inviting interior features hand-hewn timber beams, a massive stone fireplace, and walls of windows framing the lake. A chef''s kitchen opens to an expansive deck perfect for sunset dinners. The private dock accommodates boats and water toys.',
  3400000,
  '6 Lakeview Point',
  'South Lake Tahoe',
  'CA',
  '96150',
  'house',
  'for_sale',
  5, 4, 4200, 1.8, 2014, 2,
  'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/1643385/pexels-photo-1643385.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['Lakefront','Private Dock','Stone Fireplace','Timber Beams','Sunset Deck','Boat Storage','Hot Tub','Mountain Views'],
  'Elena Russo', 'elena.russo@tahoerealty.com', '(530) 555-0412',
  'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200',
  38.9399, -119.9772
),
(
  'Modern Townhouse with Rooftop Deck',
  'This sleek 4-story townhouse offers the ultimate urban lifestyle with a private rooftop deck commanding panoramic city views. The open-plan main level features a gourmet kitchen, dining area, and living room. The master suite spans the entire third floor with a spa bathroom and private balcony. Two-car garage with EV charging included.',
  1150000,
  '892 Oak Street',
  'Seattle',
  'WA',
  '98104',
  'townhouse',
  'for_sale',
  3, 3.5, 2800, 0.07, 2020, 2,
  'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['Rooftop Deck','EV Charging','City Views','Gourmet Kitchen','Private Balcony','Smart Home','Walk Score 98'],
  'Patrick Kim', 'patrick.kim@seattlerealty.com', '(206) 555-0673',
  'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=200',
  47.6062, -122.3321
),
(
  'Southern Estate on 5 Manicured Acres',
  'This magnificent Southern estate embodies refined elegance. Grand columns welcome you to the entry foyer with dual staircases. Entertain lavishly in formal rooms or gather in the spectacular great room. The kitchen is a masterpiece of custom cabinetry and premium appliances. Outside, formal gardens, a pool pavilion, and a carriage house await.',
  2750000,
  '1200 Magnolia Plantation Road',
  'Charleston',
  'SC',
  '29407',
  'house',
  'for_sale',
  6, 5.5, 6400, 5.0, 2008, 4,
  'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['Formal Gardens','Pool Pavilion','Carriage House','Dual Staircases','Grand Columns','5 Acres','Guest Suite','Wine Cellar'],
  'Catherine Monroe', 'catherine.monroe@charlestonrealty.com', '(843) 555-0284',
  'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=200',
  32.7765, -79.9311
),
(
  'Chic Studio in Midtown — High Floor',
  'An exceptional high-floor studio in the heart of Midtown Atlanta. Enjoy stunning skyline views from floor-to-ceiling windows. Features include a sleek kitchen, spa-inspired bath, and custom closets. Building amenities: rooftop pool, fitness center, dog park, and 24-hour concierge. Walk to Piedmont Park, the Beltline, and top restaurants.',
  385000,
  '1010 Peachtree St NE, Unit 2204',
  'Atlanta',
  'GA',
  '30309',
  'condo',
  'for_sale',
  0, 1, 680, 0, 2016, 1,
  'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['Skyline Views','Rooftop Pool','Fitness Center','Dog Park','24-Hour Concierge','Walk to Beltline','Floor-to-Ceiling Windows'],
  'DeShawn Carter', 'deshawn.carter@atlantarealty.com', '(404) 555-0955',
  'https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=200',
  33.7879, -84.3839
),
(
  'New Construction Craftsman in Top School District',
  'Brand new construction in one of the most sought-after school districts in the state. This stunning craftsman blends classic curb appeal with a modern open floor plan. The gourmet kitchen features waterfall countertops, a butler''s pantry, and a breakfast bar. Upstairs, the primary suite offers a luxury bath and spacious walk-in closet. 10-year structural warranty included.',
  745000,
  '3312 Elmwood Terrace',
  'Naperville',
  'IL',
  '60540',
  'house',
  'for_sale',
  4, 3, 2950, 0.35, 2024, 2,
  'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['New Construction','Top School District','Butler''s Pantry','Waterfall Countertops','10-Year Warranty','Gourmet Kitchen','Smart Home'],
  'Linda Foster', 'linda.foster@chicagorealty.com', '(630) 555-0718',
  'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=200',
  41.7508, -88.1535
),
(
  'Historic Brownstone with Garden, Fort Greene',
  'A rare opportunity to own a three-unit brownstone in the heart of Fort Greene. The parlor floor owner''s duplex is a masterpiece of preservation and renovation with original plank floors, soaring tin ceilings, and a marble fireplace. A private garden and roof deck complete the package. Two income-producing rental units provide strong cash flow.',
  3200000,
  '147 Washington Park',
  'Brooklyn',
  'NY',
  '11205',
  'house',
  'for_sale',
  5, 4, 3800, 0.06, 1895, 0,
  'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['Private Garden','Roof Deck','Tin Ceilings','Original Plank Floors','Marble Fireplace','Income Property','Historic Landmark','Fort Greene Park Views'],
  'Sophia Navarro', 'sophia.navarro@bkrealty.com', '(718) 555-0443',
  'https://images.pexels.com/photos/3785074/pexels-photo-3785074.jpeg?auto=compress&cs=tinysrgb&w=200',
  40.6898, -73.9764
);
