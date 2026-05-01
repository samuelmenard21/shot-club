import { supabase } from './supabase'

// ============================================================
// Public reads
// ============================================================

// Search seeded clubs by typeahead (used in coach signup)
export async function searchClubs(query, limit = 12) {
  if (!query || query.trim().length < 2) return []
  const q = query.trim().toLowerCase()
  const { data } = await supabase
    .from('clubs')
    .select('id, name, slug, city, governing_body, gender_type')
    .ilike('search_text', `%${q}%`)
    .eq('is_active', true)
    .order('is_seeded', { ascending: false })
    .limit(limit)
  return data || []
}

// Get a club by slug (re-export pattern matches clubs.js getClubBySlug
// but includes the seeded metadata fields)
export async function getClubBySlugFull(slug) {
  if (!slug) return null
  const { data } = await supabase
    .from('clubs')
    .select('id, name, slug, city, governing_body, gender_type, org_type, is_seeded')
    .eq('slug', slug)
    .maybeSingle()
  return data
}

// Get team by short invite code (for player join flow)
export async function getTeamInviteByCode(code) {
  if (!code) return null
  const { data } = await supabase
    .from('team_invites')
    .select('id, team_id, code, max_uses, uses_count, expires_at, is_active, team:teams(id, name, age_division, tier, club:clubs(id, name, slug, city))')
    .eq('code', code.toLowerCase())
    .eq('is_active', true)
    .maybeSingle()
  return data
}

// Get all teams in a club (for association overview pages later)
export async function getTeamsByClub(clubId) {
  if (!clubId) return []
  const { data } = await supabase
    .from('teams')
    .select('id, name, age_division, tier, season, team_code, owner_coach_id')
    .eq('club_id', clubId)
    .eq('is_active', true)
    .order('age_division')
  return data || []
}

// ============================================================
// Coach actions (require auth)
// ============================================================

// Calls find_or_create_team RPC.
// Returns: { teamId, teamExisted, ownerCoachName, isOwner }
export async function findOrCreateTeam({ clubId, coachId, ageDivision, tier, season = '2025-26' }) {
  const { data, error } = await supabase.rpc('find_or_create_team', {
    p_club_id: clubId,
    p_coach_id: coachId,
    p_age_division: ageDivision,
    p_tier: tier,
    p_season: season,
  })
  if (error) throw error
  // RPC returns table — Supabase returns array
  const row = Array.isArray(data) ? data[0] : data
  if (!row) throw new Error('No team result')
  return {
    teamId: row.team_id,
    teamExisted: row.team_existed,
    ownerCoachName: row.owner_coach_name,
    isOwner: row.is_owner,
  }
}

// Request to join an existing team (if not owner)
export async function requestJoinTeam({ teamId, coachId }) {
  const { data, error } = await supabase.rpc('request_join_team', {
    p_team_id: teamId,
    p_coach_id: coachId,
  })
  if (error) throw error
  return data // 'requested' | 'already_member' | 'already_owner'
}

// Owner approves a pending coach
export async function approveTeamCoach({ teamId, pendingCoachId, approverCoachId }) {
  const { data, error } = await supabase.rpc('approve_team_coach', {
    p_team_id: teamId,
    p_pending_coach_id: pendingCoachId,
    p_approver_coach_id: approverCoachId,
  })
  if (error) throw error
  return data
}

// Get this coach's teams (with role info)
export async function getMyTeams(coachId) {
  if (!coachId) return []
  const { data } = await supabase
    .from('team_coaches')
    .select('role, team:teams(id, name, age_division, tier, season, team_code, club:clubs(id, name, slug))')
    .eq('coach_id', coachId)
    .in('role', ['owner', 'coach'])
  return (data || []).map((r) => ({ ...r.team, role: r.role }))
}

// Get pending coaches for teams this coach owns
export async function getPendingCoachesForOwnedTeams(coachId) {
  if (!coachId) return []
  // First, find teams this coach owns
  const { data: owned } = await supabase
    .from('team_coaches')
    .select('team_id')
    .eq('coach_id', coachId)
    .eq('role', 'owner')
  const teamIds = (owned || []).map((t) => t.team_id)
  if (teamIds.length === 0) return []

  // Then get pending coaches in those teams
  const { data } = await supabase
    .from('team_coaches')
    .select('id, team_id, requested_at, coach:coaches(id, display_name, email), team:teams(id, name)')
    .in('team_id', teamIds)
    .eq('role', 'pending')
    .order('requested_at')
  return data || []
}

// Create a player invite for a team (returns the short code)
export async function createTeamInvite({ teamId, coachId }) {
  const { data, error } = await supabase.rpc('create_team_invite', {
    p_team_id: teamId,
    p_coach_id: coachId,
  })
  if (error) throw error
  return data // the short code string
}

// Get most recent active invite for a team (so we don't create new ones every time)
export async function getActiveTeamInvite(teamId) {
  if (!teamId) return null
  const { data } = await supabase
    .from('team_invites')
    .select('id, code, uses_count, max_uses, expires_at, created_at')
    .eq('team_id', teamId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  return data
}

// Get or create an active invite (idempotent — the dashboard always shows one)
export async function getOrCreateTeamInvite({ teamId, coachId }) {
  const existing = await getActiveTeamInvite(teamId)
  if (existing) return existing.code
  return await createTeamInvite({ teamId, coachId })
}

// ============================================================
// Submit a club that's not in the seed list (Tier 3)
// ============================================================
export async function submitPendingClub({ name, city, province, governingBody, genderType, submitterEmail, notes, coachId }) {
  const { error } = await supabase.from('pending_clubs').insert({
    name: name.trim(),
    city: city?.trim() || '',
    province: province || 'ON',
    governing_body: governingBody || null,
    gender_type: genderType || 'coed',
    submitted_by_coach_id: coachId || null,
    submitter_email: submitterEmail || null,
    submitter_notes: notes || null,
  })
  if (error) throw error
}

// ============================================================
// Constants — the dropdown options the UI uses
// ============================================================
export const AGE_DIVISIONS = ['U7', 'U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15', 'U16', 'U17', 'U18']
export const TIERS = ['House', 'Select', 'A', 'AA', 'AAA']
