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
  bg: '#ffffff', surface: '#ffffff', text: '#000000', divider: '#000000',
  accent: '#000000', accent2: '#000000',
  accent2100: '#f8f8f8', accent2400: '#000000',
  neutral500: '#000000',
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
// instead of 5 x 10. The last column of every row is the milestone "checkpoint",
// with thicker border and star marker for visual emphasis on print.
function gridRowsHtml(spec) {
  const total = boxCount(spec)
  const rowCount = 5
  const cols = total / rowCount
  let out = ''
  for (let r = 0; r < rowCount; r++) {
    const target = Math.round((spec.total * (r + 1)) / rowCount)
    let cells = ''
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c
      const value = (idx + 1) * spec.step
      const isCheckpoint = c === cols - 1
      const boxClass = isCheckpoint ? 'box box--milestone' : 'box'
      cells += `<div class="${boxClass}">
        <span class="box-val">${value.toLocaleString()}</span>
        ${isCheckpoint ? '<span class="box-star">★</span>' : ''}
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
  body { font-family: ${TOK.bodyFont}; background: #f5f5f5; color: ${TOK.text}; padding: 16px; }
  h1 { font-family: ${TOK.headingFont}; font-weight: 400; }
  .sheet { max-width: 780px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 0.42in; }

  .banner { background: #ffffff; color: ${TOK.text}; border: 2px solid #000000; border-radius: 12px; padding: 20px 22px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
  .banner-kicker { font-family: ${TOK.headingFont}; font-weight: 400; font-size: 14px; letter-spacing: 0.03em; color: #000000; }
  .banner h1 { font-size: 34px; line-height: 1; margin: 6px 0; }
  .banner h1 .sub { font-size: 17px; font-weight: 400; font-family: ${TOK.bodyFont}; }
  .banner-sub { font-size: 12.5px; opacity: .85; max-width: 4.4in; }
  .badge { text-align: center; flex: none; background: #f0f0f0; color: #000000;
    border: 1.5px solid #000000; border-radius: 8px; padding: 12px 16px; white-space: nowrap; }
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
  .box { position: relative; height: 0.56in; border-radius: 8px; border: 1.5px solid ${TOK.divider}; display: flex; overflow: hidden; }
  .box--milestone { border-width: 2.5px !important; }
  .box-val { position: absolute; bottom: 3px; right: 5px; font-size: 10px; font-weight: 600; color: ${TOK.text}; }
  .box-star { position: absolute; top: 2px; left: 3px; font-size: 12px; color: ${TOK.text}; }

  .types { display: flex; align-items: center; gap: 0.12in; flex-wrap: wrap; font-size: 11.5px; margin-bottom: 20px; }
  .types .lbl { opacity: .65; }
  .pill { border: 1.5px solid ${TOK.divider}; border-radius: 999px; padding: 4px 12px; }

  .signoff { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.3in; margin-bottom: 20px; }
  .signoff-fld { }
  .signoff-label { display: block; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; opacity: .55; margin-bottom: 8px; }
  .signoff-line { border-bottom: 1px solid ${TOK.divider}; height: 0.2in; }

  .qrband { display: flex; align-items: center; gap: 20px; background: #ffffff; color: #000000;
    border: 1.5px solid #000000; border-radius: 12px; padding: 18px 22px; margin-bottom: 12px; }
  .qrbox { width: 0.95in; height: 0.95in; flex: none; background: #ffffff; border: 1px solid #000000; border-radius: 8px; padding: 6px; }
  .qrbox svg { width: 100%; height: 100%; display: block; }
  .qrtxt h3 { font-family: ${TOK.bodyFont}; font-weight: 700; font-size: 13px; margin-bottom: 6px; color: #000000; }
  .benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 0.2in; font-size: 10px; opacity: 1; margin-bottom: 6px; color: #000000; }
  .qrtxt .brand { font-family: ${TOK.headingFont}; font-weight: 600; font-size: 16px; color: #000000; }
  .qrtxt .path { font-size: 9px; opacity: 0.8; color: #000000; }

  .footbar { text-align: center; background: #f5f5f5; color: #000000; border: 1px solid #cccccc; border-radius: 8px;
    padding: 12px 0; font-size: 11px; font-weight: 600; }

  .actions { max-width: 780px; margin: 14px auto 30px; display: flex; gap: 10px;
    justify-content: center; flex-wrap: wrap; }
  .btn { font-family: ${TOK.bodyFont}; font-weight: 600; font-size: 14px; border-radius: 8px;
    padding: 12px 22px; cursor: pointer; text-decoration: none; display: inline-block; border: 1.5px solid #000000; }
  .btn--print { background: #000000; color: #ffffff; }
  .btn--live { background: #ffffff; color: #000000; border: 1.5px solid #000000; }

  @media print {
    .actions { display: none !important; }
    body { background: #ffffff !important; padding: 0 !important; }
    .sheet { box-shadow: none !important; border-radius: 0 !important; max-width: 100% !important; background: #ffffff !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    .box { border: 1.5px solid #000000 !important; border-color: #000000 !important; background: #ffffff !important; }
    .box--milestone { border-width: 2.5px !important; border-color: #000000 !important; }
    .box-val { color: #000000 !important; font-weight: 700 !important; }
    .box-star { color: #000000 !important; }
    .row-target { opacity: 1 !important; color: #000000 !important; font-weight: 600 !important; }
    .row-boxes { background: #ffffff !important; }
    .banner { background: #ffffff !important; color: #000000 !important; border: 1.5px solid #000000 !important; }
    .banner h1 { color: #000000 !important; }
    .banner-sub { opacity: 1 !important; color: #000000 !important; }
    .badge { background: #ffffff !important; color: #000000 !important; border: 1.5px solid #000000 !important; }
    .who { color: #000000 !important; }
    .who label { opacity: 1 !important; color: #000000 !important; }
    .who .line { border-color: #000000 !important; }
    .how { opacity: 1 !important; color: #000000 !important; }
    .pill { border-color: #000000 !important; color: #000000 !important; }
    .signoff { color: #000000 !important; }
    .signoff-label { opacity: 1 !important; color: #000000 !important; }
    .signoff-line { border-color: #000000 !important; }
    .types { color: #000000 !important; }
    .types .lbl { opacity: 1 !important; color: #000000 !important; }
    .qrband { background: #ffffff !important; border: 1.5px solid #000000 !important; color: #000000 !important; }
    .qrbox { background: #ffffff !important; border: 1px solid #000000 !important; }
    .qrtxt h3 { color: #000000 !important; }
    .benefits { color: #000000 !important; }
    .qrtxt .brand { color: #000000 !important; }
    .qrtxt .path { opacity: 1 !important; color: #000000 !important; }
    .footbar { background: #ffffff !important; color: #000000 !important; border: 1px solid #000000 !important; }
  }
</style>
</head>
<body>
  <div class="sheet">
    <div class="banner">
      <div>
        <div class="banner-kicker">HockeyShotChallenge<span style="opacity:.75">.com</span></div>
        <h1>${totalStr} <span class="sub">Shot Challenge</span></h1>
        <div class="banner-sub">Color a box every ${unitLabel} shots. Fill the whole sheet to become ${spec.label.match(/^[aeiou]/i) ? 'an' : 'a'} ${spec.label}.</div>
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

    <div class="signoff">
      <div class="signoff-fld">
        <span class="signoff-label">Coach/Parent Signature</span>
        <div class="signoff-line"></div>
      </div>
      <div class="signoff-fld">
        <span class="signoff-label">Date Completed</span>
        <div class="signoff-line"></div>
      </div>
      <div class="signoff-fld">
        <span class="signoff-label">Notes</span>
        <div class="signoff-line"></div>
      </div>
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
