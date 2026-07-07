import { useState } from 'react'

export default function NumberPad({ type, onClose, onSave }) {
  const [count, setCount] = useState(0)

  const handleAdd = (n) => {
    setCount(count + n)
  }

  const handleSave = () => {
    if (count > 0) {
      onSave(count)
      setCount(0)
    }
  }

  return (
    <div className="numberpad-overlay" onClick={onClose}>
      <div className="numberpad" onClick={(e) => e.stopPropagation()}>
        <div className="numberpad-header">
          <div className="numberpad-title">How many {type.toLowerCase()} today?</div>
          <button className="numberpad-close" onClick={onClose}>×</button>
        </div>

        <div className="numberpad-display">{count}</div>

        <div className="numberpad-grid">
          {[5, 10].map((n) => (
            <button
              key={n}
              className="numberpad-btn"
              onClick={() => handleAdd(n)}
            >
              +{n}
            </button>
          ))}
        </div>

        <div className="numberpad-actions">
          <button className="numberpad-cancel" onClick={onClose}>Cancel</button>
          <button className="numberpad-save" onClick={handleSave} disabled={count <= 0}>
            Save
          </button>
        </div>

        <style>{styles}</style>
      </div>
    </div>
  )
}

const styles = `
.numberpad-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-end;
  z-index: 999;
}
.numberpad {
  width: 100%;
  background: var(--surface);
  border-radius: 20px 20px 0 0;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
.numberpad-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.numberpad-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: white;
}
.numberpad-close {
  font-size: 32px;
  background: transparent;
  color: var(--text-soft);
  cursor: pointer;
  padding: 0;
  transition: color 0.1s;
}
.numberpad-close:active {
  color: var(--ice);
}
.numberpad-display {
  font-family: var(--font-display);
  font-size: 64px;
  font-weight: 800;
  color: var(--accent);
  text-align: center;
  margin-bottom: 28px;
  line-height: 1;
}
.numberpad-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}
.numberpad-btn {
  background: linear-gradient(135deg, var(--accent) 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 28px 16px;
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s;
  box-shadow: 0 4px 12px rgba(41, 121, 255, 0.3);
}
.numberpad-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 6px rgba(41, 121, 255, 0.5);
}
.numberpad-actions {
  display: flex;
  gap: 12px;
}
.numberpad-cancel {
  flex: 1;
  background: var(--surface);
  color: var(--text-soft);
  border: 1px solid var(--border-dim);
  border-radius: 14px;
  padding: 16px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.1s;
}
.numberpad-cancel:active {
  background: var(--bg);
}
.numberpad-save {
  flex: 1;
  background: linear-gradient(135deg, #3dd68c 0%, #2dbd72 100%);
  color: white;
  border: none;
  border-radius: 14px;
  padding: 16px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.1s;
  box-shadow: 0 4px 12px rgba(61, 214, 140, 0.3);
}
.numberpad-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`
