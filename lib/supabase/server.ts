import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gfrbqjeoqoufqxkpiaas.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmcmJxamVvcW91ZnF4a3BpYWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMjAyODgsImV4cCI6MjA3Njc5NjI4OH0.G7rVZtth2aYuV7uY39NqrazqCZ4Fyfn7FuFTbU2W-zY'

export const createClient = async () => {
  const cookieStore = await cookies()
  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Handled in server component
        }
      },
    },
  })
}
