// Rank ladder with micro-tiers
// Each major rank is divided into I/II/III by splitting the distance to the next rank into thirds.
// Rookie tiers: 0 / 67 / 133 / 200 (Junior)
// Junior tiers: 200 / 383 / 566 / 750 (Prospect)
// etc.

export const RANKS = [
  { name: 'Rookie', floor: 0, next: 200 },
  { name: 'Junior', floor: 200, next: 750 },
  { name: 'Prospect', floor: 750, next: 2000 },
  { name: 'Varsity', floor: 2000, next: 5000 },
  { name: 'Captain', floor: 5000, next: 10000 },
  { name: 'All-Star', floor: 10000, next: 25000 },
  { name: 'Legend', floor: 25000, next: Infinity },
]

export function getRank(lifetimeShots) {
  const shots = Math.max(0, lifetimeShots || 0)

  for (let i = RANKS.length - 1; i >= 0; i--) {
    const rank = RANKS[i]
    if (shots >= rank.floor) {
      const span = rank.next === Infinity ? 0 : rank.next - rank.floor
      const progress = rank.next === Infinity ? 1 : (shots - rank.floor) / span

      let tier
      let tierFloor
      let tierCeil
      if (rank.next === Infinity) {
        tier = 'III'
        tierFloor = rank.floor
        tierCeil = rank.floor
      } else {
        const third = span / 3
        if (progress < 1 / 3) {
          tier = 'I'
          tierFloor = rank.floor
          tierCeil = rank.floor + third
        } else if (progress < 2 / 3) {
          tier = 'II'
          tierFloor = rank.floor + third
          tierCeil = rank.floor + 2 * third
        } else {
          tier = 'III'
          tierFloor = rank.floor + 2 * third
          tierCeil = rank.next
        }
      }

      const tierProgress = tierCeil > tierFloor ? (shots - tierFloor) / (tierCeil - tierFloor) : 1
      const nextRankShots = rank.next === Infinity ? 0 : rank.next - shots
      const nextTierShots = rank.next === Infinity ? 0 : Math.max(0, Math.ceil(tierCeil - shots))

      return {
        name: rank.name,
        tier,
        fullName: `${rank.name} ${tier}`,
        progress,
        tierProgress: Math.min(1, Math.max(0, tierProgress)),
        shotsToNextRank: Math.max(0, nextRankShots),
        shotsToNextTier: nextTierShots,
        nextRankName: RANKS[i + 1]?.name ?? null,
        isMax: rank.next === Infinity,
      }
    }
  }

  return {
    name: 'Rookie',
    tier: 'I',
    fullName: 'Rookie I',
    progress: 0,
    tierProgress: 0,
    shotsToNextRank: 200,
    shotsToNextTier: 67,
    nextRankName: 'Junior',
    isMax: false,
  }
}
