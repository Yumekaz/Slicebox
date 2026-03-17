# ☕ slicebox — send coffee cake

A digital gift box inspired by [digibouquet](https://digibouquet.vercel.app/). Pick 6–10 coffee cake slices, write a card, and share a link that opens like a gift — lid animation included.

## Flow (matches digibouquet)

1. **Landing** → Build a Box / Build in Black & White / View Bakery  
2. **Pick** → PICK 6 TO 10 SLICES. Click to add (click badge to remove). Hover for tooltip (name + meaning + occasion). Bottom bar shows selection pills.  
3. **Arrange** → See your cakes composed on a wooden board with decorative leaves, just like the bouquet preview.  
4. **Card** → WRITE THE CARD. "Dear [name]" / message / "Sincerely, [from]". Flanking cake illustrations on each side.  
5. **Share** → Shareable link generated. Data is base64-encoded in the URL hash — no backend needed.  
6. **Receive** → Box lid lifts away with CSS animation. Card fades in. "Send one back" button.  
7. **Bakery** → Gallery of example boxes (like digibouquet's garden).

## 12 Cake Varieties

Streusel · Cinnamon Swirl · Blueberry · Walnut Espresso · Lemon Drizzle · Cardamom Plum · Peach Cream · Chocolate Marble · Apple Cinnamon · Coconut Lime · Raspberry Almond · Vanilla Bean

Each has: a unique hand-drawn SVG illustration, watercolor blob background, unique colour palette, meaning text, and occasion tag shown on hover.

## Project Structure

```
slicebox/
├── wrapper.webp              ← Optimised background image
├── public/                  ← Static site root (served by Vercel)
│   ├── index.html           Landing
│   ├── pick.html            Pick 6–10 slices
│   ├── arrange.html         Arrangement preview
│   ├── card.html            Write the card
│   ├── share.html           Share the link
│   ├── receive.html         Recipient's view (reads URL hash)
│   ├── bakery.html          Gallery
│   ├── css/
│   │   └── main.css         All shared styles
│   └── js/
│       ├── state.js         sessionStorage + URL encode/decode
│       ├── data.js          Cake data + SVG rendering
│       ├── pick.js
│       ├── arrange.js
│       ├── card.js
│       ├── share.js
│       ├── receive.js
│       └── bakery.js
├── vercel.json              Vercel config (serves public/)
├── package.json             Project metadata
└── README.md
```

## Deploy

### Vercel (recommended)
```bash
npm i -g vercel
cd slicebox
vercel
```
The `vercel.json` is already configured to serve from `public/`.

### Netlify
Set **Publish directory** to `public` in your Netlify settings, or drag the `public/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

### GitHub Pages
Push to a repo → Settings → Pages → Deploy from branch `main` → `/public`.

### Locally
```bash
npx serve public
# or
python3 -m http.server 8080 --directory public
```

## Shareable URLs

The full box data (cake IDs, card text, mono flag) is JSON → base64-encoded into the URL hash of `receive.html`:
```
yourdomain.com/receive.html#box=eyJzZWxlY3Rpb24iOlsic3RyZXVzZWwiXSwi...
```

No server, no database. Works on any static host.

## Customise

**Add a cake** — append to the `SB.CAKES` array in `public/js/data.js`. Add a palette in `SB._palettes`, and optionally add inner/top decorations in `SB._cakeInner` / `SB._cakeTop`.

**Change limits** — edit `MIN` and `MAX` in `public/js/pick.js` (currently 6 and 10).

**Change the arrangement** — edit the `POSITIONS` array in `public/js/arrange.js` to reposition cakes.

---
made with slicebox ☕
