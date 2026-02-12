# GFS Solutions Marketing

Repository marketing di GFS Solutions con landing page Next.js, materiale Elementor e un plugin WordPress di supporto.

## Contenuti
- `gfs_landingpage/` - landing page Next.js
- `gfs_wp_plugin/` - plugin WordPress (widget)
- `elementor-*.json` - export Elementor
- `test-pagina.html` - pagina di test

## Avvio locale (landing)
```bash
cd gfs_landingpage
npm install
npm run dev
```
Apri `http://localhost:3000`.

## Struttura (landing)
- `gfs_landingpage/app/` - pagine e layout (App Router)
- `gfs_landingpage/public/` - asset statici
- `gfs_landingpage/next.config.ts` - config Next.js

## Deploy
Consigliato su Vercel: collega la repo e seleziona la cartella `gfs_landingpage` come root del progetto.

## Note
Le variabili d'ambiente sono ignorate da Git (`.env*`).
