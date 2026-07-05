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
          <div className="numberpad-title">Add {type} shots</div>
          <button className="numberpad-close" onClick={onClose}>×</button>
        </div>

        <div className="numberpad-display">{count}</div>

        <div className="numberpad-grid">
          {[1, 5, 10].map((n) => (
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
          <button className="numberpad-clear" onClick={() => setCount(0)}>Clear</button>
          <button className="numberpad-save" onClick={handleSave} disabled={count <= 0}>
            Save {count > 0 ? count : ''}
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
  margin-bottom: 20px;
}
.numberpad-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: white;
}
.numberpad-close {
  font-size: 28px;
  background: transparent;
  color: var(--text-soft);
  cursor: pointer;
  padding: 0;
}
.numberpad-display {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 800;
  color: var(--accent);
  text-align: center;
  margin-bottom: 20px;
  line-height: 1;
}
.numberpad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}
.numberpad-btn {
  background: var(--bg);
  color: white;
  border: 1px solid var(--border-dim);
  border-radius: 12px;
  padding: 16px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.1s;
}
.numberpad-btn:active {
  background: var(--accent);
  border-color: var(--accent);
}
.numberpad-actions {
  display: flex;
  gap: 10px;
}
.numberpad-clear {
  flex: 1;
  background: transparent;
  color: var(--text-soft);
  border: 1px solid var(--border-dim);
  border-radius: 12px;
  padding: 12px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.numberpad-save {
  flex: 1;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.1s;
}
.numberpad-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`
