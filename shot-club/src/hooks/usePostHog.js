import { useCallback } from 'react'
import posthog from 'posthog-js'

export function usePostHog() {
  const trackEvent = useCallback((eventName, properties = {}) => {
    if (typeof window !== 'undefined') {
      posthog.capture(eventName, properties)
    }
  }, [])

  const trackChallengePicked = useCallback((challengeId, challengeLabel) => {
    trackEvent('challenge_picked', {
      challenge_id: challengeId,
      challenge_label: challengeLabel,
    })
  }, [trackEvent])

  const trackBlogViewed = useCallback((slug, title) => {
    trackEvent('blog_article_viewed', {
      blog_slug: slug,
      blog_title: title,
    })
  }, [trackEvent])

  const trackTrackerDownloaded = useCallback((challengeId) => {
    trackEvent('tracker_pdf_downloaded', {
      challenge_id: challengeId,
    })
  }, [trackEvent])

  const trackTrackLiveClicked = useCallback((challengeId) => {
    trackEvent('track_live_clicked', {
      challenge_id: challengeId,
    })
  }, [trackEvent])

  const trackClubSearched = useCallback((query) => {
    trackEvent('club_search', {
      search_query: query,
    })
  }, [trackEvent])

  const trackClubSelected = useCallback((clubId, clubName) => {
    trackEvent('club_selected', {
      club_id: clubId,
      club_name: clubName,
    })
  }, [trackEvent])

  const trackSignup = useCallback((userType, challenge, club) => {
    trackEvent('user_signup', {
      user_type: userType, // 'player', 'parent', 'coach'
      challenge_id: challenge,
      club_id: club,
    })
  }, [trackEvent])

  const trackShotsLogged = useCallback((count, shotType, challenge) => {
    trackEvent('shots_logged', {
      shot_count: count,
      shot_type: shotType,
      challenge_id: challenge,
    })
  }, [trackEvent])

  const trackChallengeCompleted = useCallback((challengeId, daysToComplete) => {
    trackEvent('challenge_completed', {
      challenge_id: challengeId,
      days_to_complete: daysToComplete,
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackChallengePicked,
    trackBlogViewed,
    trackTrackerDownloaded,
    trackTrackLiveClicked,
    trackClubSearched,
    trackClubSelected,
    trackSignup,
    trackShotsLogged,
    trackChallengeCompleted,
  }
}
