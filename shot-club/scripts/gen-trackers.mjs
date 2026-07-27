// Generates the fun, kid-facing printable shot-challenge trackers as fully
// self-contained static HTML (QR embedded inline — no external requests, prints
// cleanly, and Save-as-PDF works offline). Run: node scripts/gen-trackers.mjs
// Outputs: public/5k-tracker.html and public/10k-tracker.html
import fs from 'node:fs'
import qrcode from 'qrcode-generator'

function qrSvg(url) {
  const qr = qrcode(0, 'M')
  qr.addData(url)
  qr.make()
  // cellSize/margin don't matter — we render scalable and size via CSS.
  return qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true })
}

function boxes(count, step, milestones) {
  // 10 rows x 10 boxes. Mark milestone boxes (where cumulative hits a medal).
  let rows = ''
  for (let r = 0; r < 10; r++) {
    let cells = ''
    for (let c = 0; c < 10; c++) {
      const n = r * 10 + c + 1
      const cum = n * step
      const medal = milestones.find((m) => m.at === cum)
      cells += medal
        ? `<div class="box box--milestone">${medal.emoji}</div>`
        : `<div class="box"></div>`
    }
    const rowTotal = (r + 1) * 10 * step
    rows += `<div class="grid-row"><div class="row-label">${rowTotal.toLocaleString()}</div><div class="row-boxes">${cells}</div></div>`
  }
  return rows
}

function page({ total, step, milestones, qrUrl, accent }) {
  const totalStr = total.toLocaleString()
  const qr = qrSvg(qrUrl)
  const medalStrip = milestones
    .map((m) => `<div class="medal"><div class="medal-emoji">${m.emoji}</div><div class="medal-num">${m.at.toLocaleString()}</div></div>`)
    .join('')
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My ${totalStr} Shot Challenge — Printable Tracker</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Trebuchet MS', 'Segoe UI', Arial, sans-serif; background: #e9eef5; color: #16233a; padding: 16px; }
  .sheet { max-width: 780px; margin: 0 auto; background: #fff; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.12); }

  .banner { background: linear-gradient(135deg, #1a3a52 0%, ${accent} 100%); color: #fff; padding: 22px 26px; position: relative; }
  .banner-kicker { font-size: 12px; letter-spacing: 3px; text-transform: uppercase; opacity: .85; font-weight: 700; }
  .banner h1 { font-size: 40px; line-height: .98; font-weight: 900; letter-spacing: -1px; margin: 4px 0 6px; }
  .banner h1 .num { color: #ffd24a; }
  .banner-sub { font-size: 14px; opacity: .95; }
  .puck { position: absolute; top: 18px; right: 22px; font-size: 44px; }

  .who { display: flex; gap: 10px; padding: 16px 26px 6px; flex-wrap: wrap; }
  .who .fld { flex: 1; min-width: 120px; }
  .who label { display: block; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: #7a8aa3; font-weight: 700; margin-bottom: 4px; }
  .who .line { border-bottom: 2px solid #c3cede; height: 26px; }
  .who .line--sm { max-width: 70px; }

  .how { padding: 6px 26px 4px; font-size: 13px; color: #46587a; font-weight: 600; }
  .how b { color: ${accent}; }

  .grid { padding: 10px 26px 6px; }
  .grid-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
  .row-label { width: 52px; text-align: right; font-size: 11px; font-weight: 800; color: #9aa8bf; }
  .row-boxes { display: grid; grid-template-columns: repeat(10, 1fr); gap: 6px; flex: 1; }
  .box { aspect-ratio: 1; border: 2px solid #2b3a55; border-radius: 6px; background: #fff; }
  .box--milestone { border-color: ${accent}; background: #fff7e0; display: flex; align-items: center; justify-content: center; font-size: 15px; }

  .section-row { display: flex; gap: 14px; padding: 12px 26px; flex-wrap: wrap; }
  .medals { flex: 1.4; min-width: 260px; }
  .panel-title { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #7a8aa3; font-weight: 800; margin-bottom: 8px; }
  .medal-row { display: flex; gap: 8px; }
  .medal { flex: 1; border: 2px dashed #c3cede; border-radius: 10px; padding: 8px 4px; text-align: center; }
  .medal-emoji { font-size: 26px; filter: grayscale(1); opacity: .55; }
  .medal-num { font-size: 12px; font-weight: 800; color: #46587a; margin-top: 2px; }

  .tally { flex: 1; min-width: 200px; }
  .tally-hint { font-size: 11px; color: #7a8aa3; margin: -4px 0 8px; }
  .tally-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .tally-box { border: 2px solid #2b3a55; border-radius: 10px; padding: 8px 10px; }
  .tally-box .t-name { font-size: 12px; font-weight: 800; color: #16233a; }
  .tally-box .t-line { border-bottom: 1.5px solid #c3cede; height: 18px; margin-top: 6px; }

  .digitize { display: flex; align-items: center; gap: 16px; margin: 6px 26px 22px; padding: 16px; border-radius: 14px; background: #16233a; color: #fff; }
  .digitize-qr { width: 92px; height: 92px; background: #fff; border-radius: 10px; padding: 7px; flex-shrink: 0; }
  .digitize-qr svg { width: 100%; height: 100%; display: block; }
  .digitize-txt h3 { font-size: 17px; font-weight: 900; margin-bottom: 3px; }
  .digitize-txt p { font-size: 13px; opacity: .9; line-height: 1.4; }
  .digitize-txt .url { color: #ffd24a; font-weight: 800; }

  .foot { text-align: center; font-size: 11px; color: #9aa8bf; padding: 0 26px 16px; }

  @media print {
    body { background: #fff; padding: 0; }
    .sheet { box-shadow: none; border-radius: 0; max-width: 100%; }
    .digitize { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .banner { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
  <div class="sheet">
    <div class="banner">
      <div class="puck">🏒</div>
      <div class="banner-kicker">Hockey Shot Challenge</div>
      <h1><span class="num">${totalStr}</span> Shot Challenge</h1>
      <div class="banner-sub">Color a box every <b>${step}</b> shots. Fill the whole sheet to win. 🥅</div>
    </div>

    <div class="who">
      <div class="fld"><label>Name</label><div class="line"></div></div>
      <div class="fld" style="flex:0 0 70px"><label>Number</label><div class="line line--sm"></div></div>
      <div class="fld"><label>Team</label><div class="line"></div></div>
    </div>

    <div class="how">Every practice, count your shots. Each box = <b>${step} shots</b>. Watch the ${totalStr} fill up!</div>

    <div class="grid">${boxes(100, step, milestones)}</div>

    <div class="section-row">
      <div class="medals">
        <div class="panel-title">Color the medal when you get there</div>
        <div class="medal-row">${medalStrip}</div>
      </div>
      <div class="tally">
        <div class="panel-title">Keep a tally by shot type</div>
        <div class="tally-hint">Add a mark (llll) for each shot as you practice — mix up all four!</div>
        <div class="tally-grid">
          <div class="tally-box"><div class="t-name">🎯 Wrist</div><div class="t-line"></div></div>
          <div class="tally-box"><div class="t-name">⚡ Snap</div><div class="t-line"></div></div>
          <div class="tally-box"><div class="t-name">💥 Slap</div><div class="t-line"></div></div>
          <div class="tally-box"><div class="t-name">🔄 Backhand</div><div class="t-line"></div></div>
        </div>
      </div>
    </div>

    <div class="digitize">
      <div class="digitize-qr">${qr}</div>
      <div class="digitize-txt">
        <h3>📱 Tired of coloring boxes?</h3>
        <p>Scan to track it on your phone — live team leaderboards, streaks, and ranks. Free, no app to install.<br><span class="url">hockeyshotchallenge.com</span></p>
      </div>
    </div>

    <div class="foot">🏒 Hockey Shot Challenge — free printable ${totalStr} shot tracker. Print it, stick it on the fridge, or track it live online.</div>
  </div>
  <script>
    if (!location.href.includes('print')) window.print();
  </script>
</body>
</html>
`
}

const FIVE = {
  total: 5000, step: 50, accent: '#ff7a29',
  qrUrl: 'https://hockeyshotchallenge.com/start?src=print5k',
  milestones: [
    { at: 1250, emoji: '🥉' }, { at: 2500, emoji: '🥈' },
    { at: 3750, emoji: '🥇' }, { at: 5000, emoji: '🏆' },
  ],
}
const TEN = {
  total: 10000, step: 100, accent: '#2979ff',
  qrUrl: 'https://hockeyshotchallenge.com/start?src=print10k',
  milestones: [
    { at: 2500, emoji: '🥉' }, { at: 5000, emoji: '🥈' },
    { at: 7500, emoji: '🥇' }, { at: 10000, emoji: '🏆' },
  ],
}

fs.writeFileSync('public/5k-tracker.html', page(FIVE))
fs.writeFileSync('public/10k-tracker.html', page(TEN))
console.log('✅ Wrote public/5k-tracker.html and public/10k-tracker.html')
