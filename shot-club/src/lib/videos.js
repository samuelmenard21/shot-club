import { supabase } from './supabase'

export async function getSkillVideos(skillType = null) {
  let query = supabase
    .from('skill_videos')
    .select('id, title, youtube_id, skill_type, sort_order')
    .eq('is_active', true)
    .order('sort_order')

  if (skillType) query = query.eq('skill_type', skillType)

  const { data } = await query
  return data || []
}
