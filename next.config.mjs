/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
      'pk_test_cXVpZXQtY29sdC0xMi5jbGVyay5hY2NvdW50cy5kZXYk',
    CLERK_SECRET_KEY:
      process.env.CLERK_SECRET_KEY ||
      'sk_test_cXVpZXQtY29sdC0xMi5jbGVyay5hY2NvdW50cy5kZXYk',
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      'https://gfrbqjeoqoufqxkpiaas.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmcmJxamVvcW91ZnF4a3BpYWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMjAyODgsImV4cCI6MjA3Njc5NjI4OH0.G7rVZtth2aYuV7uY39NqrazqCZ4Fyfn7FuFTbU2W-zY',
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
