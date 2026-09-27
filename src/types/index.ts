export interface MenuItem {
  id: string;
  name: string;
  category: 'Soups' | 'Starters' | 'Main Course' | 'Tandoor' | 'Breads' | 'Rice & Biryani' | 'Quick Bites' | 'Pizza & Chinese' | 'Breakfast & Accompaniments';
  description: string;
  price: string; // e.g. "₹240" or "Price on Request"
  isVeg: true; // 100% Pure Veg property
  isSignature?: boolean;
  available: boolean;
  source: string;
  lastVerified: string;
  imageUrl?: string;
}

export interface RoomCategory {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  capacity: string;
  bedType: string;
  sizeSqFt: string;
  amenities: string[];
  tariff: string; // "Enquire for current tariff"
  imageUrl: string;
  highlights: string[];
}

export interface AmenityItem {
  iconName: string;
  title: string;
  description: string;
}

export interface GoogleReviewSummary {
  aggregateRating: number;
  totalReviews: number;
  source: string;
  profileUrl: string;
  recurringThemes: string[];
  reviews: {
    id: string;
    author: string;
    date: string;
    rating: number;
    text: string;
    verifiedVisit: string;
  }[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'all' | 'exterior' | 'rooms' | 'restaurant' | 'food' | 'team';
  imageUrl: string;
  caption: string;
  verified: boolean;
}

export interface NearbyPlace {
  name: string;
  type: string;
  distance: string;
  mapsUrl: string;
  description: string;
}
