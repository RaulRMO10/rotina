import { createClient } from '@supabase/supabase-js';

// A chave publishable é pública por design; o acesso aos dados é protegido por RLS.
export const supabase = createClient(
  'https://nkpcemmigrwcfsapsbvf.supabase.co',
  'sb_publishable_EdMJ5oQoHv7pRkHaG9GyAw_s3d9gb8X',
);
