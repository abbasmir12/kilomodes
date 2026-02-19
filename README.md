# KiloModes

A community marketplace for Kilo Code custom modes. Discover, preview, and share AI coding assistant configurations built by developers.

**Built for DeveloperWeek 2026 Hackathon - Kilo "For Devs, By Devs" Challenge**

Live Demo: https://kilomodes.vercel.app

---

## Overview

Kilo Code is an AI coding assistant that supports custom modes - YAML configuration files that define specialized AI personas for specific development tasks. The community creates and shares these modes, but they are scattered across GitHub Discussion threads with no centralized discovery mechanism.

KiloModes solves this problem by providing a searchable, filterable gallery where developers can browse modes, preview configurations, and copy them instantly to use in their own Kilo Code setup.

---

## Key Features

**Instant Publishing**
Submit a mode and it appears immediately in the gallery. No approval queue, no waiting. Built with localStorage for MVP simplicity with clear path to backend integration.

**Smart Discovery**
Real-time search across mode names, descriptions, and tags. Filter by predefined categories or create custom categories for niche use cases.

**One-Click Copy**
Preview full YAML configurations in a modal and copy to clipboard with a single click. Ready to paste directly into Kilo Code.

**Community-Driven**
Users can submit modes with custom categories, enabling organic growth without requiring code changes. Categories like Security, DevOps, Testing, and Architecture are predefined, with flexibility for custom additions.

---

## Technical Stack

- Next.js 16 with App Router
- TypeScript for type safety
- Custom CSS (no framework dependencies)
- Client-side localStorage for data persistence
- Static site generation for optimal performance
- Zero-config Vercel deployment

---

## Project Structure

```
app/
├── page.tsx              # Landing page with hero and featured modes
├── gallery/page.tsx      # Full mode gallery with search and filters
├── submit/page.tsx       # Mode submission form
├── layout.tsx            # Root layout with navigation
└── globals.css           # All styling

components/
├── Navbar.tsx            # Site navigation
├── Footer.tsx            # Site footer
├── ModeCard.tsx          # Mode display card
├── ModeModal.tsx         # YAML preview modal
├── CopyButton.tsx        # Copy-to-clipboard functionality
└── Toast.tsx             # Toast notifications

data/
└── modes.ts              # Default mode data and categories
```

---

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/kilomodes
cd kilomodes
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Mode Submission

Modes can be submitted through the web interface at /submit or by contributing to the GitHub Discussions thread.

### Required Fields
- Mode name
- Category (predefined or custom)
- Description
- YAML configuration

### Optional Fields
- Tags (comma-separated)
- GitHub username

### YAML Format

```yaml
slug: mode-slug
name: Mode Name
model: claude-sonnet-4-5
roleDefinition: >
  Description of the AI persona and its expertise.
customInstructions: >
  1) Specific instruction one
  2) Specific instruction two
  3) Additional guidelines
groups:
  - read
  - edit
```

---

## Roadmap

### Current (MVP)
- Client-side localStorage
- Instant publishing
- Search and filter
- Custom categories

### Future Enhancements
- Backend integration (Supabase/DynamoDB)
- User authentication and profiles
- Community voting and ratings
- Mode analytics and trending
- Collections and favorites
- API for programmatic access

---

## Architecture Decisions

**Why localStorage?**
For the hackathon MVP, localStorage provides instant functionality without backend complexity. The data layer is abstracted to enable seamless migration to a database.

**Why custom CSS?**
Full control over styling, no framework bloat, and a unique visual identity that matches the Kilo Code aesthetic.

**Why static generation?**
Optimal performance and SEO. The gallery page uses client-side hydration for dynamic features while maintaining fast initial loads.

---

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes before submitting a pull request.

---

## License

MIT License - Open source for the community.

---

## Acknowledgments

Built with Kilo Code for the DeveloperWeek 2026 Hackathon. Special thanks to the Kilo community for inspiration and the existing custom modes that populate the gallery.
