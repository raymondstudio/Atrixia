export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          auth_user_id: string;
          full_name: string;
          email: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id: string;
          full_name: string;
          email: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string;
          full_name?: string;
          email?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      preferences: {
        Row: {
          id: string;
          profile_id: string;
          budget_min: number;
          budget_max: number;
          currency: string;
          favorite_categories: string[];
          preferred_marketplaces: string[];
          preferred_brands: string[];
          prioritize_price: boolean;
          prioritize_quality: boolean;
          prioritize_shipping: boolean;
          prioritize_seller: boolean;
          prioritize_reviews: boolean;
          dark_mode: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          budget_min?: number;
          budget_max?: number;
          currency?: string;
          favorite_categories?: string[];
          preferred_marketplaces?: string[];
          preferred_brands?: string[];
          prioritize_price?: boolean;
          prioritize_quality?: boolean;
          prioritize_shipping?: boolean;
          prioritize_seller?: boolean;
          prioritize_reviews?: boolean;
          dark_mode?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          budget_min?: number;
          budget_max?: number;
          currency?: string;
          favorite_categories?: string[];
          preferred_marketplaces?: string[];
          preferred_brands?: string[];
          prioritize_price?: boolean;
          prioritize_quality?: boolean;
          prioritize_shipping?: boolean;
          prioritize_seller?: boolean;
          prioritize_reviews?: boolean;
          dark_mode?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          profile_id: string;
          title: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          title: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          title?: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          role?: "user" | "assistant" | "system";
          content?: string;
          created_at?: string;
        };
      };
      search_sessions: {
        Row: {
          id: string;
          profile_id: string | null;
          conversation_id: string | null;
          message_id: string | null;
          query: string;
          search_type: "text" | "image";
          image_url: string | null;
          status: "processing" | "completed" | "failed";
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id?: string | null;
          conversation_id?: string | null;
          message_id?: string | null;
          query: string;
          search_type?: "text" | "image";
          image_url?: string | null;
          status?: "processing" | "completed" | "failed";
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string | null;
          conversation_id?: string | null;
          message_id?: string | null;
          query?: string;
          search_type?: "text" | "image";
          image_url?: string | null;
          status?: "processing" | "completed" | "failed";
          completed_at?: string | null;
          created_at?: string;
        };
      };
      recommendations: {
        Row: {
          id: string;
          search_session_id: string;
          recommended_product_id: string | null;
          confidence_score: number | null;
          recommendation_reason: string | null;
          tradeoffs: string | null;
          alternatives: Json;
          ai_summary: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          search_session_id: string;
          recommended_product_id?: string | null;
          confidence_score?: number | null;
          recommendation_reason?: string | null;
          tradeoffs?: string | null;
          alternatives?: Json;
          ai_summary?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          search_session_id?: string;
          recommended_product_id?: string | null;
          confidence_score?: number | null;
          recommendation_reason?: string | null;
          tradeoffs?: string | null;
          alternatives?: Json;
          ai_summary?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
