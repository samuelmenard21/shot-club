// Check if player just hit a milestone
export function checkMilestone(currentShots, previousShots, goalShots) {
  const milestones = [1000, 2500, 5000, 7500, 10000]

  // Add custom goal milestone
  if (goalShots && goalShots > 10000) {
    milestones.push(goalShots)
  }

  // Add 5K intervals for large goals
  if (goalShots && goalShots > 10000) {
    for (let i = 15000; i <= goalShots; i += 5000) {
      milestones.push(i)
    }
  }

  // Find newly hit milestone
  for (const milestone of milestones) {
    if (previousShots < milestone && currentShots >= milestone) {
      return milestone
    }
  }

  // Check if completed goal
  if (previousShots < goalShots && currentShots >= goalShots) {
    return goalShots
  }

  return null
}

export function getMilestoneMessage(shots) {
  if (shots === 1000) return '🎯 You hit 1K shots!'
  if (shots === 2500) return '🔥 2.5K shots! Keep the fire going!'
  if (shots === 5000) return '⭐ 5K shots! Halfway there!'
  if (shots === 7500) return '💪 7.5K shots! Almost to 10K!'
  if (shots === 10000) return '🏆 10K SHOTS! You\'re a champion!'
  return `🎉 You hit ${shots.toLocaleString()} shots!`
}

export function getGoalCompletionMessage(shots) {
  return `🏅 Goal achieved! ${shots.toLocaleString()} shots completed!`
}
