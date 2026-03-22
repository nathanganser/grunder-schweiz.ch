# Gründer Schweiz — Projektkontext

Redaktionelles Portal für Schweizer Gründer und Freelancer. Vergleicht Business-Software (Buchhaltung, Rechnungen, Banking, Zeiterfassung) mit Reviews, Bestenlisten und Ratgebern.

## Tech-Stack

- **Framework:** Nuxt 4, Vue 3, TypeScript
- **UI:** Nuxt UI 4 (emerald/slate), Tailwind CSS 4
- **Content:** Nuxt Content 3 mit Zod-Schemas (`content.config.ts`)
- **Package Manager:** pnpm
- **Deployment:** Vercel (statisch, `nitro.prerender.crawlLinks: true`)
- **Build:** `pnpm build` — bricht bei Prerender-Fehlern (404s) ab

## Projektstruktur

```
app/
  pages/           # Dateibasiertes Routing ([slug].vue für dynamische Seiten)
  components/      # Vue-Komponenten (AppHeader, AppFooter, OgImage, etc.)
  layouts/         # default, docs, auth
  types/index.d.ts # TypeScript-Interfaces für Content-Typen
  app.config.ts    # Nuxt UI Farben

content/           # Nummerierte Ordner → URL-Pfade (Nummer wird entfernt)
  3.blog/          # → /blog/*
  5.bestenlisten/  # → /bestenlisten/*
  6.reviews/       # → /reviews/*
  7.legal/         # → /legal/*
  8.methodik.md    # → /methodik
  9.kategorien.yml # → /kategorien
  10.vergleiche/   # → /vergleiche/*

content.config.ts  # Zod-Schemas für alle Content-Collections
nuxt.config.ts     # Module, Route-Rules, Prerender-Config
```

## Sprache & Umlaute

Schreibe deutschen Text mit echten Umlauten und Eszett:
- `für`, `über`, `größer`, `möglich`, `nächste` (nicht `fuer`, `ueber`, etc.)
- Gilt für: UI-Texte, Content-Body, Kommentare, Antworten auf Deutsch

**WICHTIG — URL-Slugs und Dateinamen verwenden KEINE Umlaute:**
- Slugs nutzen `ae`, `oe`, `ue`, `ss` statt `ä`, `ö`, `ü`, `ß`
- Beispiel: Datei `mwst-selbststaendige-schweiz.md` → Link `/blog/mwst-selbststaendige-schweiz`
- Beispiel: Datei `geschaeftskonto-freelancer-schweiz.md` → Link `/bestenlisten/geschaeftskonto-freelancer-schweiz`
- Link-Text darf Umlaute haben, der `href`/`to`-Pfad **nie**: `[Firma gründen](/blog/firma-gruenden-schweiz-kosten)`
- Prüfe bei neuen internen Links immer den tatsächlichen Dateinamen im `content/`-Ordner

## Content-Konventionen

- Dateinamen: `{sortierung}.{slug}.md` (z.B. `1.rechnungssoftware-schweiz.md`) — Punkt-Präfix für Sortierung (wird von Nuxt Content aus dem Pfad entfernt), Slug wird zur URL. **Keine Dash-Präfixe** (`1-slug.md`), da Nuxt Content diese NICHT aus dem Pfad entfernt.
- **Jede Sortierungsnummer darf nur einmal pro Ordner vorkommen.** Doppelte Nummern (z.B. zwei Dateien mit `1.`) führen zu Datenkollisionen in der Content-Datenbank.
- Frontmatter-Schemas sind in `content.config.ts` definiert — halte dich daran
- Content-Collections: `articles`, `rankings`, `reviews`, `comparisons`, `legal`, `methodology`, `categories`
- Jede Review/Bestenliste hat Pflichtfelder für Affiliate-Transparenz (`disclosureText`, `affiliate_url`)

**WICHTIG — YAML-Frontmatter: Werte mit Doppelpunkt in Anführungszeichen setzen:**
- Enthält ein Frontmatter-Wert `: ` (Doppelpunkt + Leerzeichen), **muss** er in Anführungszeichen stehen
- Ohne Anführungszeichen interpretiert der YAML-Parser den Doppelpunkt als verschachtelten Key und verschluckt alle nachfolgenden Felder → zeigt als `[object Object]` auf der Seite
- Falsch: `description: Software Schweiz 2026: Kosten und Vergleich`
- Richtig: `description: "Software Schweiz 2026: Kosten und Vergleich"`
- Gilt für alle Felder: `title`, `description`, `best_for`, `verdict`, etc.
- Im Zweifel: **Werte immer in Anführungszeichen setzen** — schadet nie, schützt vor Parser-Fehlern

## Build & Deploy

- `pnpm dev` — Lokaler Dev-Server
- `pnpm build` — Produktions-Build (statisch via Nitro-Prerender)
- Der Build crawlt alle internen Links. Jeder 404 bricht den Build ab. Deshalb: **interne Links immer gegen existierende Dateien prüfen.**
