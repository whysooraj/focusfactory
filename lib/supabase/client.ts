import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gfrbqjeoqoufqxkpiaas.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmcmJxamVvcW91ZnF4a3BpYWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMjAyODgsImV4cCI6MjA3Njc5NjI4OH0.G7rVZtth2aYuV7uY39NqrazqCZ4Fyfn7FuFTbU2W-zY'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Helper types
export type Tables = Database['public']['Tables']
export type TableName = keyof Tables
export type TableRow<T extends TableName> = Tables[T]['Row']
export type TableInsert<T extends TableName> = Tables[T]['Insert']
export type TableUpdate<T extends TableName> = Tables[T]['Update']
