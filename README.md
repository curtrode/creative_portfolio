# Curt Rode Portfolio - Vibe Coding Edition

A modern, interactive portfolio website showcasing poetry, digital literature, and music projects with a contemporary "vibe coding" aesthetic.

## Features

### 🎨 Modern Design
- Dark theme with vibrant accent colors
- Smooth animations and transitions
- Responsive design for all devices
- Interactive floating elements

### 🚀 Interactive Elements
- Smooth scrolling navigation
- Animated project cards
- Audio player controls
- Parallax effects
- Background particles
- Typewriter effect

### 📱 Mobile Friendly
- Responsive grid layouts
- Mobile navigation menu
- Touch-friendly interactions
- Optimized for all screen sizes

### 🎵 Content Sections
- **Poetry**: Published works with metadata
- **Digital Literature**: Interactive projects and 3D sculptures
- **Music Timeline**: Band history from 1994-present
- **About**: Bio with code snippet visual

## File Structure

```
portfolio/
├── index.html          # Main HTML structure
├── style.css          # Complete CSS styling
├── script.js          # Interactive JavaScript
└── README.md          # This file
```

## Local Development

1. Open `index.html` in a web browser
2. For best experience, serve via local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## Customization

### Colors
Edit CSS variables in `:root` section of `style.css`:
- `--primary`: Main accent color
- `--secondary`: Secondary accent color
- `--accent`: Tertiary accent color

### Content
- Update project information in HTML
- Add new sections by following existing patterns
- Modify timeline events in the Music section

### Animations
- Adjust animation durations in CSS
- Modify particle behavior in JavaScript
- Customize floating element physics

## Easter Eggs

Try the Konami Code: ↑↑↓↓←→←→BA

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes

- Uses CSS Grid and Flexbox for layouts
- Intersection Observer for scroll animations
- Optimized for 60fps animations
- Minimal JavaScript bundle

## Future Enhancements

- [ ] Add actual audio player integration
- [ ] Implement project filtering
- [ ] Add blog/writing section
- [ ] Integrate with CMS
- [ ] Add contact form
- [ ] Implement dark/light theme toggle

---

Built with ❤️ and modern web technologies
