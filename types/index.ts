import { Database } from "./database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type UserPreferences = Database["public"]["Tables"]["preferences"]["Row"];
export type SearchSession = Database["public"]["Tables"]["search_sessions"]["Row"];
export type Recommendation = Database["public"]["Tables"]["recommendations"]["Row"];
export type Conversation = Database["public"]["Tables"]["conversations"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];

export interface MarketplaceResultItem {
  id: string;
  marketplace: string;
  title: string;
  price: number;
  currency: string;
  shippingDays: number;
  sellerRating: number;
  trustScore: number;
  listingUrl: string;
  imageUrl: string;
}

export interface DecisionReportData {
  id: string;
  productName: string;
  confidenceScore: number;
  summary: string;
  pros: string[];
  cons: string[];
  tradeoffs: string;
  alternatives: Array<{
    type: "budget" | "speed" | "quality";
    productName: string;
    price: number;
    reasoning: string;
  }>;
  marketplaceResults: MarketplaceResultItem[];
}
