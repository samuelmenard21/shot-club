// Curated drill library, organized by the four shot types we track.

export const DRILL_CATEGORIES = [
  { id: 'wrist',    label: 'Wrist Shots', emoji: '🎯' },
  { id: 'snap',     label: 'Snap Shots',  emoji: '⚡' },
  { id: 'slap',     label: 'Slap Shots',  emoji: '💥' },
  { id: 'backhand', label: 'Backhands',   emoji: '🔄' },
]

export const DRILLS = [
  {
    id: 'wrist-fundamentals',
    category: 'wrist',
    title: 'Fundamental Wrist Shot Mechanics',
    source: 'iTrain Hockey',
    youtubeId: 'HQY14pYYWuQ',
    level: 'all',
  },
  {
    id: 'snap-accuracy',
    category: 'snap',
    title: 'Snap Shot Tutorial for Accuracy',
    source: 'iTrain Hockey',
    youtubeId: 'C5gl160uqW4',
    level: 'beginner',
  },
  {
    id: 'snap-advanced',
    category: 'snap',
    title: 'Advanced Snap Shot Techniques',
    source: 'iTrain Hockey',
    youtubeId: '8fu11fkgDZU',
    level: 'advanced',
  },
  {
    id: 'slap-technique',
    category: 'slap',
    title: 'Perfecting Your Slap Shot Technique',
    source: 'iTrain Hockey',
    youtubeId: '2qkhf4i3FBY',
    level: 'beginner',
  },
  {
    id: 'slap-power',
    category: 'slap',
    title: 'Mastering Slap Shot Power',
    source: 'How To Hockey',
    youtubeId: 'IrXmud5-FK4',
    level: 'advanced',
  },
  {
    id: 'backhand-mechanics',
    category: 'backhand',
    title: 'Backhand Shot Mechanics & Drills',
    source: 'iTrain Hockey',
    youtubeId: '_oX2y4U1lxA',
    level: 'all',
  },
  {
    id: 'backhand-placement',
    category: 'backhand',
    title: 'Perfect Backhand Shot Placement',
    source: 'iTrain Hockey',
    youtubeId: 'xCKPANNS8iY',
    level: 'intermediate',
  },
  {
    id: 'backhand-stability',
    category: 'backhand',
    title: 'Improve Your Backhand Stability',
    source: 'iTrain Hockey',
    youtubeId: 'IpEid1dY8ME',
    level: 'all',
  },
]

export function drillsByCategory(categoryId) {
  return DRILLS.filter((d) => d.category === categoryId)
}

export function youtubeThumbUrl(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

export function youtubeWatchUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`
}
