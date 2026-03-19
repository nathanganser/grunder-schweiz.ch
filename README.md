# Gruender Schweiz

Gruender Schweiz ist ein redaktionelles Review- und Ranking-Portal fuer Schweizer Freelancer-Software.

Im Fokus stehen:

- Rechnungssoftware
- Buchhaltungssoftware
- Geschaeftskonten und Banking
- Zeiterfassung und angrenzende Admin-Tools

Die Site setzt auf redaktionelle Bestenlisten, Einzelreviews, Ratgeber und eine sichtbare Methodik mit Affiliate-Disclosure.

## Aktueller Stand

- Home auf Review-Portal-Positionierung umgestellt
- Navigation auf `Kategorien`, `Bestenlisten`, `Reviews`, `Methodik`, `Ratgeber`
- Legacy-Routen wie `pricing`, `login`, `signup`, `docs` und `changelog` fuer v1 deaktiviert oder umgeleitet
- Seed-Content fuer Rankings, Reviews, Methodik, Legal-Minimum und Ratgeber angelegt
- README und Go-live-Todo auf den Portal-Stand gebracht

## Setup

Abhaengigkeiten installieren:

```bash
pnpm install
```

Entwicklungsserver starten:

```bash
pnpm dev
```

Typecheck:

```bash
pnpm exec nuxt typecheck
```

Lint:

```bash
pnpm exec eslint .
```

Production Build:

```bash
pnpm build
```

## Naechste Artikel

Diese Inhalte sollten als naechstes ausgebaut oder vertieft werden:

1. `Rechnung schreiben in der Schweiz: Pflichtangaben fuer Freiberufler`
2. `MWST fuer Selbststaendige in der Schweiz einfach erklaert`
3. `Welche Ausgaben du als Freiberufler abziehen kannst`
4. `Offerte oder Rechnung: Wann du was verwenden solltest`
5. `Buchhaltung fuer Einzelunternehmen: Ein einfacher Monatsablauf`
6. `Belege digital organisieren ohne Chaos`
7. `Steuerruecklagen fuer Selbststaendige richtig planen`
8. `Freelancer-Administration in der Schweiz: Die 10 haeufigsten Fehler`
9. `Wie du offene Rechnungen schneller bezahlt bekommst`
10. `Von der Gruendung bis zur ersten Rechnung: Checkliste fuer Schweizer Solo-Selbstaendige`

## Go-live Todo

### Redaktion und Inhalte

- Ranking-Snapshots zu vollwertigen Bestenlisten ausbauen
- Einzelreviews pro Tool vertiefen und Vendor-Fakten final verifizieren
- die ersten 5 bis 10 Ratgeber-Artikel fertig ausarbeiten
- Schweizer Quellen fuer MWST, Datenschutz und Rechnungslogik pro Artikel sauber einarbeiten

### Recht und Transparenz

- Impressum mit echten Firmendaten fuellen
- Datenschutzseite mit Hosting-, Analytics- und Consent-Details erweitern
- Affiliate-Kennzeichnung final pruefen und global sichtbar machen

### UX und Conversion

- Home-Visuals mit echten Logos, klareren Tool-Cards und staerkeren CTA-Strecken verfeinern
- Kategorien, Rankings und Reviews mobil und auf Tablet visuell testen
- interne Verlinkung zwischen Bestenlisten, Reviews und Ratgeber ausbauen

### Technik

- `pnpm install` ausfuehren
- Typecheck, ESLint und Build sauber durchlaufen lassen
- OG-Bilder, Sitemap, Canonicals und Search-Console-Setup ergaenzen
- Analytics und Consent-Strategie definieren

## Wichtige Regel

Bei Schweizer Rechts- und Steuerfragen nur mit offiziellen oder primaeren Quellen arbeiten. Bei Tool-Fakten nur mit Vendor-Seiten oder offizieller Dokumentation arbeiten. Wenn etwas unklar ist, bleibt es `noch pruefen`.
