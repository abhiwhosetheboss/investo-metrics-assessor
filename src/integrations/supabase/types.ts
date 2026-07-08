export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      analyses: {
        Row: {
          business_model: string | null
          categories: Json | null
          created_at: string
          founder_trust_rating: number | null
          growth_expected: string | null
          id: string
          industry: string | null
          investibility_score: number | null
          market_data: Json | null
          overall_risk: number | null
          pmf_score: number | null
          raw_input: Json | null
          risk_factors: Json | null
          startup_name: string
          strengths: Json | null
          suggestions: Json | null
          updated_at: string
          user_id: string
          weaknesses: Json | null
        }
        Insert: {
          business_model?: string | null
          categories?: Json | null
          created_at?: string
          founder_trust_rating?: number | null
          growth_expected?: string | null
          id?: string
          industry?: string | null
          investibility_score?: number | null
          market_data?: Json | null
          overall_risk?: number | null
          pmf_score?: number | null
          raw_input?: Json | null
          risk_factors?: Json | null
          startup_name: string
          strengths?: Json | null
          suggestions?: Json | null
          updated_at?: string
          user_id: string
          weaknesses?: Json | null
        }
        Update: {
          business_model?: string | null
          categories?: Json | null
          created_at?: string
          founder_trust_rating?: number | null
          growth_expected?: string | null
          id?: string
          industry?: string | null
          investibility_score?: number | null
          market_data?: Json | null
          overall_risk?: number | null
          pmf_score?: number | null
          raw_input?: Json | null
          risk_factors?: Json | null
          startup_name?: string
          strengths?: Json | null
          suggestions?: Json | null
          updated_at?: string
          user_id?: string
          weaknesses?: Json | null
        }
        Relationships: []
      }
      risk_calls: {
        Row: {
          called_at: string
          company_name: string
          delta: number
          direction: string
          grade_due_at: string
          graded: boolean
          graded_at: string | null
          id: string
          new_score: number
          outcome: string | null
          previous_score: number
          price_at_call: number | null
          price_at_grading: number | null
          price_change_pct: number | null
          reasoning: string
          symbol: string
        }
        Insert: {
          called_at?: string
          company_name: string
          delta: number
          direction: string
          grade_due_at: string
          graded?: boolean
          graded_at?: string | null
          id?: string
          new_score: number
          outcome?: string | null
          previous_score: number
          price_at_call?: number | null
          price_at_grading?: number | null
          price_change_pct?: number | null
          reasoning: string
          symbol: string
        }
        Update: {
          called_at?: string
          company_name?: string
          delta?: number
          direction?: string
          grade_due_at?: string
          graded?: boolean
          graded_at?: string | null
          id?: string
          new_score?: number
          outcome?: string | null
          previous_score?: number
          price_at_call?: number | null
          price_at_grading?: number | null
          price_change_pct?: number | null
          reasoning?: string
          symbol?: string
        }
        Relationships: []
      }
      stock_analyses: {
        Row: {
          business_model: string | null
          categories: Json | null
          company_name: string
          created_at: string
          founder_trust_rating: number | null
          growth_expected: string | null
          id: string
          industry: string | null
          investibility_score: number
          last_updated: string
          market_data: Json | null
          overall_risk: number
          pmf_score: number | null
          risk_factors: Json | null
          strengths: Json | null
          suggestions: Json | null
          symbol: string
          weaknesses: Json | null
        }
        Insert: {
          business_model?: string | null
          categories?: Json | null
          company_name: string
          created_at?: string
          founder_trust_rating?: number | null
          growth_expected?: string | null
          id?: string
          industry?: string | null
          investibility_score?: number
          last_updated?: string
          market_data?: Json | null
          overall_risk?: number
          pmf_score?: number | null
          risk_factors?: Json | null
          strengths?: Json | null
          suggestions?: Json | null
          symbol: string
          weaknesses?: Json | null
        }
        Update: {
          business_model?: string | null
          categories?: Json | null
          company_name?: string
          created_at?: string
          founder_trust_rating?: number | null
          growth_expected?: string | null
          id?: string
          industry?: string | null
          investibility_score?: number
          last_updated?: string
          market_data?: Json | null
          overall_risk?: number
          pmf_score?: number | null
          risk_factors?: Json | null
          strengths?: Json | null
          suggestions?: Json | null
          symbol?: string
          weaknesses?: Json | null
        }
        Relationships: []
      }
      stock_score_history: {
        Row: {
          id: string
          investibility_score: number
          overall_risk: number
          price: number | null
          recorded_at: string
          symbol: string
        }
        Insert: {
          id?: string
          investibility_score: number
          overall_risk: number
          price?: number | null
          recorded_at?: string
          symbol: string
        }
        Update: {
          id?: string
          investibility_score?: number
          overall_risk?: number
          price?: number | null
          recorded_at?: string
          symbol?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
