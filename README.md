# Invest Site Starter (Latest v2)

En enkel, statisk investeringsside (lys & klassisk) med porteføljetabell og grafer.

## Slik bruker du
1) Last opp hele mappen til et nytt GitHub-repo (f.eks. `invest-site`).
2) Koble Netlify til GitHub og velg repoet. Byggkommando: *(ingen)*, Publiseringsmappe: `/` (rot).
   Alternativt: GitHub Pages — Settings → Pages → Source: Deploy from a branch → main → /root.
3) For å oppdatere tall: rediger `data.json` og commit/push.

## Lokalt (frivillig)
- Åpne `index.html` direkte, eller:
  - Python 3: `python -m http.server 8000` → http://localhost:8000

## Tilpasning
- SoMe-lenker i `index.html` → `#contact`.
- Beholdninger i `data.json`.
- Utseende i `styles.css`.
- Graflogikk i `script.js`.
