// Generates the four printable shot-challenge sheets as self-contained static
// HTML (QR embedded inline — no external requests, prints cleanly, and
// Save-as-PDF works offline). Run: node scripts/gen-trackers.mjs
// Visual language matches the "Organic" design handoff (cream/terracotta/sage,
// Caprasimo + Figtree) so the printed sheet and the in-app dashboard read as
// the same product. Geometry (box count, shots/box, medal placement) comes
// from lib/challengeSpecs.js — the single source of truth shared with the
// in-app TrackerGrid — so the two can never drift apart.
import fs from 'node:fs'
import qrcode from 'qrcode-generator'
import { CHALLENGE_SPECS, CHALLENGE_ORDER, milestonesFor, boxCount } from '../src/lib/challengeSpecs.js'

const TOK = {
  bg: '#f5ead8', surface: '#ebddc5', text: '#201e1d', divider: 'rgba(32,30,29,0.16)',
  accent: '#c67139', accent2: '#7a8a5e',
  accent2100: '#f0fae1', accent2400: '#aebf92',
  neutral500: '#a19786',
  headingFont: "'Caprasimo', Georgia, serif", bodyFont: "'Figtree', system-ui, sans-serif",
}

function qrSvg(url) {
  const qr = qrcode(0, 'M')
  qr.addData(url)
  qr.make()
  return qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true })
}

// Every tracker sheet is exactly 5 rows regardless of tier, so the printed
// page height never changes — Rookie's 20 boxes just run 5 rows x 4 cols
// instead of 5 x 10. Boxes worth more than 50 shots/box get a dashed
// half-line ("color in half"); the last column of every row is the sage
// "checkpoint" tint, matching the dashboard's checkpoint column.
function gridRowsHtml(spec) {
  const total = boxCount(spec)
  const rowCount = 5
  const cols = total / rowCount
  const split = spec.step > 50
  let out = ''
  for (let r = 0; r < rowCount; r++) {
    const target = Math.round((spec.total * (r + 1)) / rowCount)
    let cells = ''
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c
      const value = (idx + 1) * spec.step
      const isCheckpoint = c === cols - 1
      const border = isCheckpoint ? TOK.accent2400 : TOK.divider
      const bg = isCheckpoint ? TOK.accent2100 : '#fff'
      cells += `<div class="box" style="border-color:${border};background:${bg};">
        ${split ? `<div class="box-half" style="border-right-color:${border};"></div><div class="box-half"></div>` : ''}
        <span class="box-val">${value.toLocaleString()}</span>
      </div>`
    }
    out += `<div class="grid-row"><div class="row-target">${target.toLocaleString()}</div><div class="row-boxes" style="grid-template-columns:repeat(${cols},1fr);">${cells}</div></div>`
  }
  return out
}

function page(spec) {
  const total = spec.total
  const totalStr = total.toLocaleString()
  const step = spec.step
  const level = CHALLENGE_ORDER.indexOf(spec.id) + 1
  const trackerUrl = `hockeyshotchallenge.com/start?challenge=${spec.id}&src=print${spec.id}`
  const qr = qrSvg(`https://${trackerUrl}`)
  const unitLabel = step >= 1000 ? `${Math.round(step / 100) / 10}k` : `${step}`

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${spec.label} — ${totalStr} Shot Challenge — Printable Tracker</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Caprasimo:wght@400&family=Figtree:wght@400;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: ${TOK.bodyFont}; background: #ded2ba; color: ${TOK.text}; padding: 16px; }
  h1 { font-family: ${TOK.headingFont}; font-weight: 400; }
  .sheet { max-width: 780px; margin: 0 auto; background: ${TOK.bg}; border-radius: 20px; overflow: hidden;
    box-shadow: 0 8px 30px rgba(32,30,29,0.18); padding: 0.42in; }

  .banner { background: ${spec.tint}; color: ${TOK.text}; border-radius: 20px; padding: 20px 22px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
  .banner-kicker { font-family: ${TOK.headingFont}; font-weight: 400; font-size: 14px; letter-spacing: 0.03em; color: ${spec.accentText}; }
  .banner h1 { font-size: 34px; line-height: 1; margin: 6px 0; }
  .banner h1 .sub { font-size: 17px; font-weight: 400; font-family: ${TOK.bodyFont}; }
  .banner-sub { font-size: 12.5px; opacity: .85; max-width: 4.4in; }
  .badge { text-align: center; flex: none; background: ${spec.badge}; color: ${spec.badgeFg};
    border-radius: 14px; padding: 10px 16px; white-space: nowrap; }
  .badge-name { font-family: ${TOK.headingFont}; font-weight: 400; font-size: 14px; }
  .badge-level { font-size: 10px; opacity: .85; }

  .who { display: flex; gap: 0.4in; margin-bottom: 14px; }
  .who .fld { flex: 1; }
  .who label { display: block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; opacity: .55; margin-bottom: 6px; }
  .who .line { border-bottom: 1.5px solid ${TOK.divider}; height: 4px; }

  .how { font-size: 12px; opacity: .75; margin-bottom: 14px; }

  .grid { display: flex; flex-direction: column; gap: 0.14in; margin-bottom: 16px; }
  .grid-row { display: flex; align-items: center; gap: 0.14in; }
  .row-target { width: 0.55in; font-size: 11px; text-align: right; opacity: .7; flex: none; }
  .row-boxes { display: grid; gap: 0.12in; flex: 1; }
  .box { position: relative; height: 0.56in; border-radius: 8px; border: 2px solid; display: flex; overflow: hidden; }
  .box-half { flex: 1; border-right: 1.5px dashed; }
  .box-half + .box-val { }
  .box-val { position: absolute; bottom: 3px; right: 5px; font-size: 8px; color: ${TOK.neutral500}; }

  .types { display: flex; align-items: center; gap: 0.12in; flex-wrap: wrap; font-size: 11.5px; margin-bottom: 14px; }
  .types .lbl { opacity: .65; }
  .pill { border: 1.5px solid ${TOK.divider}; border-radius: 999px; padding: 4px 12px; }

  .qrband { display: flex; align-items: center; gap: 20px; background: #2e2b25; color: ${TOK.bg};
    border-radius: 20px; padding: 18px 22px; margin-bottom: 12px; }
  .qrbox { width: 0.95in; height: 0.95in; flex: none; background: ${TOK.bg}; border-radius: 10px; padding: 6px; }
  .qrbox svg { width: 100%; height: 100%; display: block; }
  .qrtxt h3 { font-family: ${TOK.bodyFont}; font-weight: 700; font-size: 14px; margin-bottom: 6px; }
  .benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 0.2in; font-size: 10.5px; opacity: .92; margin-bottom: 6px; }
  .qrtxt .brand { font-family: ${TOK.headingFont}; font-weight: 400; font-size: 17px; color: #ffc6a5; }
  .qrtxt .path { font-size: 9.5px; opacity: .6; }

  .footbar { text-align: center; background: #fff2eb; color: #8c491a; border-radius: 12px;
    padding: 9px 0; font-size: 12px; font-weight: 700; }

  .actions { max-width: 780px; margin: 14px auto 30px; display: flex; gap: 10px;
    justify-content: center; flex-wrap: wrap; }
  .btn { font-family: ${TOK.headingFont}; font-weight: 400; font-size: 14px; border-radius: 12px;
    padding: 12px 22px; cursor: pointer; text-decoration: none; display: inline-block; border: none; }
  .btn--print { background: ${TOK.accent}; color: ${TOK.bg}; }
  .btn--live { background: ${TOK.bg}; color: ${TOK.text}; border: 2px solid ${TOK.divider}; }

  @media print {
    .actions { display: none; }
    body { background: #fff; padding: 0; }
    .sheet { box-shadow: none; border-radius: 0; max-width: 100%; }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
  <div class="sheet">
    <div class="banner">
      <div>
        <div class="banner-kicker">HockeyShotChallenge<span style="opacity:.75">.com</span></div>
        <h1>${totalStr} <span class="sub">Shot Challenge</span></h1>
        <div class="banner-sub">Color a box every ${unitLabel} shots. Fill the whole sheet to become a ${spec.label}.</div>
      </div>
      <div class="badge">
        <div class="badge-name">${spec.label}</div>
        <div class="badge-level">Level ${level} of 4</div>
      </div>
    </div>

    <div class="who">
      <div class="fld"><label>Name</label><div class="line"></div></div>
      <div class="fld"><label>Number</label><div class="line"></div></div>
      <div class="fld"><label>Team</label><div class="line"></div></div>
    </div>

    <div class="how">Every practice, count your shots. Each box = ${unitLabel} shots — watch the ${totalStr} fill up.</div>

    <div class="grid">${gridRowsHtml(spec)}</div>

    <div class="types">
      <span class="lbl">Mix in all four shot types:</span>
      <span class="pill">Wrist</span><span class="pill">Snap</span><span class="pill">Slap</span><span class="pill">Backhand</span>
    </div>

    <div class="qrband">
      <div class="qrbox">${qr}</div>
      <div class="qrtxt">
        <h3>Scan, sign in with Google, and keep going online — free, no app to install</h3>
        <div class="benefits">
          <div>✓ Track every shot type</div><div>✓ Run multiple challenges</div>
          <div>✓ Keep your streak alive</div><div>✓ Team &amp; association leaderboards</div>
          <div>✓ Challenge other players</div><div>✓ Share your progress instantly</div>
        </div>
        <div class="brand">HockeyShotChallenge.com</div>
        <div class="path">${trackerUrl}</div>
      </div>
    </div>

    <div class="footbar">HockeyShotChallenge.com — free printable shot tracker. Print it, stick it on the fridge, or track it live online.</div>
  </div>

  <div class="actions">
    <button class="btn btn--print" onclick="window.print()">Print this sheet</button>
    <a class="btn btn--live" href="https://${trackerUrl}">Track it live instead →</a>
  </div>
  <script>
    // Auto-print only when explicitly asked (?print=1), which is what the app's
    // own "get the printable" links pass. These pages are in the sitemap, so a
    // visitor arriving from search must get a readable page — not an immediate
    // print dialog.
    if (new URLSearchParams(location.search).get('print') === '1') window.print();
  </script>
</body>
</html>
`
}

for (const id of CHALLENGE_ORDER) {
  const spec = CHALLENGE_SPECS[id]
  fs.writeFileSync(`public/${id}-tracker.html`, page(spec))
}
console.log(`✅ Wrote ${CHALLENGE_ORDER.map((id) => `public/${id}-tracker.html`).join(', ')}`)
