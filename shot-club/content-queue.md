# TikTok Content Queue

Weekly content plan for Pull My Card. Edit this file to change formats, games, or hooks. The producer agent runs each morning at 6 AM and pulls today's slot.

---

## Week of July 28–Aug 3, 2024

### Monday, July 28 — The Pull

- **Format**: the-pull
- **Game ID**: game_202407_northstars_hawks
- **Render Variants**: ["vintage", "holo", "prestige"]
- **Hook Template**: "Fresh pack pull 🏒 {team} vs {opponent} — who gets the rare? {achievement}"
- **Hashtags**: #hockeycard #packing #rare #northstars #youth #hockey
- **Notes**: Start the week strong with a pack opening. Use our top game this season.

---

### Tuesday, July 29 — Sponsor Flex

- **Format**: sponsor-flex
- **Game ID**: game_202407_sabres_redwings
- **Render Variants**: ["prestige", "chrome", "neon"]
- **Hook Template**: "Powered by {sponsor} 🥩 {player} — {stat_highlight}. Support local, pull premium."
- **Hashtags**: #sponsorship #premium #meatpack #local #hockey #youth
- **Notes**: Feature the day's MVP with meat pack sponsor branding. Tuesday is high-engagement day.

---

### Wednesday, July 30 — Style Roulette

- **Format**: style-roulette
- **Game ID**: game_202407_lightning_maple
- **Render Variants**: ["vintage", "chrome", "prestige"]
- **Hook Template**: "Style spin 🎨 Same card, three looks. Which is your vibe? {player} {team}"
- **Hashtags**: #stylecheck #carddesign #roulette #hockey #vintage #chrome #prestige
- **Notes**: Mid-week refresh. Same player, show off design flexibility.

---

### Thursday, July 31 — Parent POV

- **Format**: parent-pov
- **Game ID**: game_202407_stoney_creek
- **Render Variants**: ["holo", "prestige", "neon"]
- **Hook Template**: "Mom's reaction 📸 {player}'s hat trick captured forever. Custom card from Pull My Card."
- **Hashtags**: #parentproud #hatrick #hockey #memories #youth #trading
- **Notes**: Appeal to parents. Emphasize collectibility and memory-keeping.

---

### Friday, Aug 1 — The Pull (Extended)

- **Format**: the-pull
- **Game ID**: game_202408_northstars_lightning
- **Render Variants**: ["prestige", "holo", "vintage"]
- **Hook Template**: "Friday pack 🎊 {team} battle — vintage meets modern. What's in YOUR pulls this week?"
- **Hashtags**: #packpull #friday #vibes #hockeylife #youth #collectible
- **Notes**: End-of-week energy. Highest views expected; use our strongest game matchup.

---

### Saturday, Aug 2 — Sponsor Flex (Repeat)

- **Format**: sponsor-flex
- **Game ID**: game_202407_cougar_phoenix
- **Render Variants**: ["neon", "prestige", "chrome"]
- **Hook Template**: "Championship card 🥇 {player} — {stat_highlight}. Backed by {sponsor} since day one."
- **Hashtags**: #championship #premium #beef #sponsor #hockey #youth
- **Notes**: Weekend engagement. Double-down on sponsorship messaging.

---

### Sunday, Aug 3 — Parent POV (Wrap-up)

- **Format**: parent-pov
- **Game ID**: game_202408_dynasty_pride
- **Render Variants**: ["vintage", "prestige", "holo"]
- **Hook Template**: "Sunday keepsake 💚 {player} — moment frozen in time. A card for keeps."
- **Hashtags**: #family #keepsake #hockey #memories #youth #tradingcard
- **Notes**: Closing the week. Reflective tone. Low urgency; high sentiment.

---

## Format Definitions

### the-pull
Mid-roll pack opening. User pulls a fresh card, we show it. High production value.
- Tone: Excitement, discovery
- Sponsor mention: Optional subtle tag ("Powered by {sponsor}")
- Stats: Feature game context (opponent, date, achievement)

### sponsor-flex
Player achievement + meat pack branding. Emphasize "premium" and "local."
- Tone: Pride, partnership
- Sponsor mention: Prominent (e.g., "Premium [Sponsor] Partner Card")
- Stats: Game MVP or best stat line

### style-roulette
Same card, three design treatments (vintage / chrome / neon / holo / prestige).
- Tone: Visual, playful
- Sponsor mention: None (focus on design)
- Stats: Show on each variant

### parent-pov
Parents' emotional response angle. "Your kid's achievement, forever."
- Tone: Heartfelt, collectible
- Sponsor mention: None
- Stats: Achievement + team context (date, opponent)

---

## Game Data & Rendering

**Game IDs** are looked up in the Supabase `games` table. Each game record contains:
- `id` (game_YYYYMM_team1_team2)
- `team` (home or primary team)
- `opponent`
- `date`
- `players` (array of player stats from that game)

**Card rendering**:
- Endpoint: `https://boxscorecard.app/render/card?style={style}&data={json}&scale=1.5&bg=transparent`
- Styles: `vintage`, `holo`, `prestige`, `chrome`, `neon` (map to builder IDs)
- Data: URI-encoded CardData object (see `src/lib/cards/builders.ts` in boxscorecard)

---

## Notes for Editors

- **Hook templates** support these placeholders: `{team}`, `{opponent}`, `{player}`, `{name}`, `{achievement}`, `{stat_highlight}`, `{date}`, `{sponsor}`
- **Hashtags** are concatenated with spaces; max 30 per TikTok post
- Keep **Render Variants** to 2–4 styles per slot (avoid same style twice)
- **Game IDs** are stable once set; if no games that week, move to a different week or use an evergreen game
- Analyst runs Sunday 6 PM: it will rewrite this file with top-performing formats and auto-selected games
