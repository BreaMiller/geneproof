import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dawjfxorxobacrlaxedu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd2pmeG9yeG9iYWNybGF4ZWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDM4MjQsImV4cCI6MjA3NjA3OTgyNH0.jTOIq4rndfNN8aox7OdJpEk2_iZTMjgZvDCByncRMlA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Profile {
  id: string
  user_id: string
  full_name: string | null
  email: string | null
  blood_type: string | null
  mutation_data: string | null
  wellness_score: number
  profile_image_url: string | null
  date_of_birth: string | null
  gender: string | null
  phone: string | null
  address: string | null
  profile_complete_percentage: number
  created_at: string
  updated_at: string
}

export interface BiometricReading {
  id: string
  user_id: string
  physical_score: number
  emotional_score: number
  intellectual_score: number
  reading_date: string
  notes: string | null
  created_at: string
}

export interface Recipe {
  id: string
  name: string
  description: string | null
  meal_type: string | null
  ingredients: any
  instructions: string | null
  health_benefits: any
  image_url: string | null
  biomarker_tags: any
  calories: number | null
  prep_time: number | null
  cook_time: number | null
  servings: number | null
  is_public: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface Herb {
  id: string
  name: string
  description: string | null
  category: string | null
  benefits: any
  image_url: string | null
  biomarker_tags: any
  preparation_instructions: string | null
  dosage: string | null
  precautions: string | null
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface DNAMatch {
  id: string
  user_id: string
  matched_user_id: string
  match_percentage: number
  distance_miles: number | null
  match_status: string
  created_at: string
  updated_at: string
}