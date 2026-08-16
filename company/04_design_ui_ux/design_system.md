# 🎨 UI/UX Design System & Token Specification
**Role Owner**: Lead UI/UX Designer  
**Sync Target**: Developers (CSS & Component Architecture)  

---

## 🎨 Color Palette (Curated HSL Glassmorphism Tokens)

```css
:root {
  /* Brand Primary & Accents */
  --color-primary-hsl: 265, 89%, 66%;      /* Vivid Purple: hsl(265, 89%, 66%) */
  --color-primary-glow: hsl(265, 89%, 66%, 0.4);
  --color-secondary-hsl: 330, 85%, 60%;    /* Vibrant Pink / Magenta */
  --color-accent-gold: hsl(45, 95%, 55%);   /* Promoted / Gold Badge */

  /* Dark Theme Surfaces (Glassmorphism) */
  --bg-dark-base: #0B0F19;
  --bg-card-glass: rgba(22, 28, 45, 0.75);
  --border-card-glass: rgba(255, 255, 255, 0.12);
  --backdrop-blur: blur(16px);

  /* Typography Colors */
  --text-primary: #F3F4F6;
  --text-secondary: #9CA3AF;
  --text-muted: #6B7280;
}
```

---

## 🔤 Typography & Font Hierarchy

- **Primary Font**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`.
- **Display / Heading Font**: `Outfit`, `Inter`, `sans-serif`.

```css
.text-hero-title { font-size: 2.25rem; font-weight: 800; line-height: 1.2; }
.text-card-title { font-size: 1.125rem; font-weight: 600; }
.text-body       { font-size: 0.875rem; font-weight: 400; line-height: 1.5; }
.text-caption    { font-size: 0.75rem;  font-weight: 500; letter-spacing: 0.05em; }
```

---

## 🧩 UI Component Tokens

### 1. Glassmorphism Card
```css
.glass-card {
  background: var(--bg-card-glass);
  backdrop-filter: var(--backdrop-blur);
  -webkit-backdrop-filter: var(--backdrop-blur);
  border: 1px solid var(--border-card-glass);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

### 2. Action Pill Button (Primary)
```css
.btn-primary {
  background: linear-gradient(135deg, hsl(265, 89%, 66%), hsl(330, 85%, 60%));
  color: #ffffff;
  border-radius: 9999px;
  padding: 12px 24px;
  font-weight: 600;
  box-shadow: 0 4px 15px var(--color-primary-glow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--color-primary-glow);
}
```
