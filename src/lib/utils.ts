import { createClient } from '@supabase/supabase-js'
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const supabaseUrl = 'https://yrlpnxyyoegmlaqknbfv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlybHBueHl5b2VnbWxhcWtuYmZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NzUxMTAsImV4cCI6MjA3NjU1MTExMH0.Kud2K-fkpQ9LI3thNUMA08_3Uh220_ty7i1ixgcJf1Q';

export const supabase = createClient(supabaseUrl, supabaseKey);