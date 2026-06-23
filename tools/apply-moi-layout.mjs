import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INDEX = path.join(ROOT, "index.html");

const HERO_STRIPES = `<svg class="hero-stripes" viewBox="0 0 2120 1280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#FFFF00" d="M2629.9,1283.4L1106.5,752.8H-495.7v-90.3h1602.3l1504.3,88.5L2629.9,1283.4z M2633.7,1551L1106.5,797.9H-495.7v90.3h1602.3l1390.9,1088.5L2633.7,1551z M2609,3.8L1106.5,527.2H-495.7v90.3h1602.3l1497.3-88.1L2609,3.8z M2278.7-525.6L1106.5,391.8H-495.7v90.3h1602.3l1414.3-697.4L2278.7-525.6z"/></svg>`;

const HERO_BEE = `<svg class="hero-bee" viewBox="0 0 929.69 809.84" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#fff" d="M280,542.9c-87.4,36-172.7-24-172.7-116.5 0-93.2,97.4-129.3,179.6-188.3-28.3,37.8-37.1,72-38.5,76-13,43.2-13.9,89.6-3.6,136.2C247.1,459.7,254,494.9,280,542.9z M643.1,238.1c17.3,23.2,30.3,48.7,38.5,76 17.5,58.9,9.4,109.5,3.6,136.2-7.2,32.5-19.4,63.3-35.2,92.6 87.4,36,172.7-24,172.7-116.5C822.7,333.3,725.3,297.2,643.1,238.1z"/><path d="M286.9,238.1c0.9-0.9-0.5-130.2,178.1-130.6 179.1,0.5,177.3,130.6,178.1,130.6C582.3,286.9,346,288,286.9,238.1z M465,702.3c28.4,0,135.7-68.3,185-159.4-89.2,65.3-283.9,66.4-369.9,0.1C325.3,629.8,435.3,702.3,465,702.3z M681.6,314.1c-4.3,3.7-64.4,53.3-215.7,53.7-156.7-0.4-217.3-53.4-217.6-53.7-13,43.2-13.9,89.6-3.6,136.2 1.7,1.7,66.2,63.2,221.2,63.7 142.6-0.4,208.4-54.1,219.3-63.7C691,423.7,699.1,373,681.6,314.1z"/><path fill="#FFFF00" d="M465.9,367.8c-156.7-0.4-217.3-53.4-217.6-53.7 1.5-4,10.2-38.2,38.5-76 59.1,49.9,295.4,48.8,356.2,0 17.4,23.2,30.3,48.8,38.5,76C677.3,317.9,617.2,367.5,465.9,367.8z M685.2,450.3c-10.9,9.6-76.7,63.3-219.3,63.7-155-0.5-219.5-62-221.2-63.7 2.4,9.4,9.3,44.6,35.3,92.7 86,66.4,280.8,65.2,369.9-0.1C665.8,513.6,678,482.9,685.2,450.3z"/></svg>`;

const DOC_HERO_CSS = `
        /* ── Document hero (massive-orders-insights pattern) ── */
        .doc-hero {
            background: var(--black);
            color: var(--white);
            padding: 3.5rem 0 3rem;
            position: relative;
            overflow: hidden;
            margin: 0 calc(-1 * var(--doc-hero-gutter, 0px));
        }
        .doc-hero::before {
            content: '';
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 6px;
            background: var(--yellow);
        }
        .hero-stripes {
            position: absolute;
            top: -60px; right: -120px;
            width: 500px; height: 500px;
            opacity: 0.06;
            pointer-events: none;
            transform: rotate(-15deg);
        }
        .hero-bee {
            position: absolute;
            bottom: 24px; right: 40px;
            width: 80px; height: 80px;
            opacity: 0.10;
            pointer-events: none;
        }
        .doc-hero .container { position: relative; z-index: 1; }
        .hero-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 1.25rem;
        }
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,0,0.12);
            border: 1px solid rgba(255,255,0,0.25);
            border-radius: 20px;
            padding: 6px 16px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: var(--yellow);
        }
        .hero-status {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: var(--yellow);
            border: 1px solid rgba(255,255,0,0.3);
            border-radius: 6px;
            padding: 6px 14px;
        }
        .doc-hero h1 {
            font-size: clamp(1.75rem, 4vw, 2.75rem);
            font-weight: 900;
            line-height: 1.08;
            max-width: 760px;
            margin-bottom: 14px;
            letter-spacing: -1px;
            color: var(--white);
        }
        .doc-hero h1 em {
            font-style: normal;
            color: var(--yellow);
        }
        .hero-sub {
            font-size: 15px;
            font-weight: 400;
            color: rgba(255,255,255,0.60);
            max-width: 640px;
            line-height: 1.65;
            margin-bottom: 1.25rem;
        }
        .hero-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            font-size: 13px;
            color: rgba(255,255,255,0.40);
            margin-bottom: 1.25rem;
        }
        .hero-meta strong { color: rgba(255,255,255,0.75); }
        .yellow-divider {
            height: 3px;
            background: var(--yellow);
            margin: 0;
        }
        .doc-main {
            padding-top: 2rem;
            padding-bottom: 3rem;
        }
        .doc-hero .doc-view-switch {
            justify-content: flex-start;
            margin: 0;
            max-width: none;
        }
        .doc-hero .doc-view-switch .doc-view-label {
            color: rgba(255,255,255,0.45);
        }
        .doc-hero .doc-view-switch-inner {
            background: rgba(255,255,255,0.08);
            border-color: rgba(255,255,255,0.12);
            box-shadow: none;
        }
        .doc-hero .doc-view-switch-inner button {
            color: rgba(255,255,255,0.55);
        }
        .doc-hero .doc-view-switch-inner button:hover {
            color: var(--white);
            background: rgba(255,255,255,0.1);
        }
        .doc-hero .doc-view-switch-inner button[aria-selected="true"] {
            background: var(--yellow);
            color: var(--black);
            box-shadow: 0 2px 8px rgba(255,255,0,0.25);
        }
        @media (max-width: 768px) {
            .doc-hero { padding: 2.25rem 0 2rem; }
            .hero-bee { display: none; }
            .hero-top { flex-direction: column; align-items: flex-start; }
        }
`;

let html = fs.readFileSync(INDEX, "utf8");
html = html.replace(/\r\n/g, "\n");

if (html.includes("class=\"doc-hero\"")) {
  console.log("Layout already applied — skip");
  process.exit(0);
}

// Font: Work Sans only (reference)
html = html.replace(
  /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Barlow[^"]+" rel="stylesheet">/,
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">'
);

// Replace :root through .section-intro block
const cssStart = html.indexOf("        /* BEES visual identity");
const cssEnd = html.indexOf("        /* ── Today vs Target mini-flow ──");
if (cssStart < 0 || cssEnd < 0) throw new Error("CSS anchor not found");

const newBaseCss = `        /* Design tokens — massive-orders-insights reference */
        :root {
            --yellow: #FFFF00;
            --yellow-dim: rgba(255,255,0,0.85);
            --yellow-bg: rgba(255,255,0,0.08);
            --yellow-bg-strong: rgba(255,255,0,0.16);
            --gold: #e5b611;
            --gold-dark: #d1a33c;
            --black: #000000;
            --off-black: #111111;
            --near-black: #1a1a1a;
            --white: #ffffff;
            --light-grey: #f2f2f0;
            --dark-grey: #c7c7c7;
            --mid-grey: #6b6b6b;
            --text: #1a1a1a;
            --text-muted: #555555;
            --blue: #325a6d;
            --card-shadow: 0 2px 12px rgba(0,0,0,0.06);
            --card-shadow-hover: 0 6px 28px rgba(0,0,0,0.12);

            /* Legacy aliases used across diagrams + tech sections */
            --bees-yellow: var(--yellow);
            --bees-yellow-dark: var(--gold-dark);
            --bees-black: var(--near-black);
            --bees-gray: var(--text-muted);
            --bees-gray-mid: var(--mid-grey);
            --bees-gray-light: var(--light-grey);
            --bees-white: var(--white);
            --bees-page-bg: var(--white);
            --fill-yellow-soft: var(--yellow-bg);
            --fill-yellow-mid: var(--yellow-bg-strong);
            --fill-grey-04: rgba(0,0,0,0.04);
            --fill-grey-06: rgba(0,0,0,0.06);
            --fill-grey-08: rgba(0,0,0,0.08);
            --fill-grey-10: rgba(0,0,0,0.1);
            --fill-grey-12: rgba(0,0,0,0.12);
            --accent-green: var(--gold-dark);
            --accent-red: var(--mid-grey);
            --accent-blue: var(--mid-grey);
            --accent-purple: #4a4a4a;
            --accent-pink: #6a6a6a;
            --line-diagram: #9aa0a6;
            --line-shape: var(--line-diagram);
            --line-shape-soft: rgba(0,0,0,0.12);

            --font-work: 'Work Sans', system-ui, sans-serif;
            --mtx-brand: var(--yellow);
            --mtx-700: var(--gold-dark);
            --mtx-50: var(--yellow-bg);
            --mtx-n100: var(--light-grey);
            --mtx-n200: var(--dark-grey);
            --mtx-n500: var(--mid-grey);
            --mtx-n700: var(--text-muted);
            --mtx-n900: var(--near-black);
            --mtx-radius: 12px;
        }

        body {
            font-family: var(--font-work);
            background: var(--white);
            min-height: 100vh;
            color: var(--text);
            padding: 0;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            overflow-x: hidden;
        }

        .container { max-width: 1080px; margin: 0 auto; padding: 0 32px; }

        /* ── Executive Summary ── */
        .exec-summary {
            background: var(--white);
            border-radius: 12px;
            padding: 1.35rem 1.5rem;
            margin-bottom: 1.25rem;
            box-shadow: var(--card-shadow);
            border-left: 4px solid var(--yellow);
        }
        .exec-summary p {
            color: var(--text);
            font-size: 0.95rem;
            margin: 0;
            line-height: 1.7;
        }
        .exec-summary .so-what { color: var(--near-black); font-weight: 700; }

        /* ── Key metrics ── */
        .metrics-bar {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 14px;
            margin-bottom: 2rem;
        }
        .metric {
            background: var(--off-black);
            border-radius: 12px;
            padding: 1.35rem 1rem;
            text-align: center;
            position: relative;
            overflow: hidden;
            box-shadow: var(--card-shadow);
        }
        .metric::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 3px;
            background: var(--yellow);
        }
        .metric-value { font-size: 1.6rem; font-weight: 900; color: var(--white); }
        .metric-value .bees-accent { color: var(--yellow); }
        .metric-label { font-size: 0.68rem; color: rgba(255,255,255,0.5); font-weight: 500; line-height: 1.4; margin-top: 0.35rem; }

        /* ── Slide / section cards ── */
        .slide {
            background: var(--white);
            border-radius: 12px;
            padding: 2rem 2rem 1.75rem;
            margin-bottom: 1.25rem;
            box-shadow: var(--card-shadow);
            border-left: 4px solid var(--yellow);
            transition: box-shadow 0.2s, transform 0.2s;
        }
        .slide:hover {
            box-shadow: var(--card-shadow-hover);
        }
        .slide-num {
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 2.5px;
            text-transform: uppercase;
            color: var(--gold);
            margin-bottom: 6px;
        }
        .slide h2 {
            font-size: 28px;
            font-weight: 800;
            line-height: 1.2;
            color: var(--black);
            margin-bottom: 1rem;
            letter-spacing: -0.5px;
        }
        .slide p, .slide li { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.45rem; line-height: 1.65; }
        .slide ul { margin-left: 1.25rem; margin-bottom: 0.5rem; }
        .slide strong { color: var(--near-black); font-weight: 600; }

        .section-intro {
            margin-bottom: 1.5rem;
            line-height: 1.7;
            font-size: 14px;
            color: var(--text-muted);
            max-width: 820px;
        }

        .main-panel-exec .doc-i18n > .slide:nth-of-type(even) {
            background: var(--light-grey);
            border-left-color: var(--gold);
        }

        .references-section {
            border-left-color: var(--blue);
        }

        `;

html = html.slice(0, cssStart) + newBaseCss + html.slice(cssEnd);

// Insert doc-hero CSS before embedded matrix block
const matrixCssMarker = "        /* ── Embedded BU / BRE rules matrix";
if (!html.includes(matrixCssMarker)) throw new Error("Matrix CSS marker not found");
html = html.replace(matrixCssMarker, DOC_HERO_CSS + "\n" + matrixCssMarker);

// Update bre-bu-matrix font references
html = html.replace(/var\(--font-barlow\)/g, "var(--font-work)");

// Update doc-toc header gradient
html = html.replace(
  "background: linear-gradient(180deg, var(--fill-yellow-soft) 0%, var(--bees-white) 100%);",
  "background: linear-gradient(180deg, var(--yellow-bg) 0%, var(--white) 100%);"
);

// Update doc-lang bar top stripe
html = html.replace(
  "background: linear-gradient(180deg, rgba(255, 208, 0, 0.85) 0, rgba(255, 208, 0, 0.85) 3px, var(--bees-white) 3px, var(--bees-white) 100%);",
  "background: linear-gradient(180deg, var(--yellow-dim) 0, var(--yellow-dim) 3px, var(--white) 3px, var(--white) 100%);"
);

// Body padding for TOC — use 32px gutter to align with container
html = html.replace(
  "padding-left: calc(2rem + var(--doc-toc-w));",
  "padding-left: calc(32px + var(--doc-toc-w));"
);
html = html.replace(
  /body \{\s*transition: padding-left 0\.22s ease, padding-top 0\.22s ease;\s*\}/,
  `body {
            transition: padding-left 0.22s ease, padding-top 0.22s ease;
            --doc-hero-gutter: 32px;
        }`
);

// Restructure header
const oldHeader = `    <div class="container">
                <header id="doc-top">
            <p class="label"><span class="doc-i18n doc-i18n--en">Executive Brief &#183; BEES Link</span><span class="doc-i18n doc-i18n--es">Resumen ejecutivo &#183; BEES Link</span></p>
            <h1>BEES <span class="bees-accent">&#183;</span> Business Rules Engine</h1>
            <p class="subtitle"><span class="doc-i18n doc-i18n--en">Order flow &amp; validation for indirect channel &#8212; EDI and BEES Link</span><span class="doc-i18n doc-i18n--es">Flujo de pedidos y validaci&#243;n en canal indirecto &#8212; EDI y BEES Link</span></p>
            <div class="doc-view-switch">
                <span class="doc-view-label" id="doc-view-label">View</span>
                <div class="doc-view-switch-inner" role="tablist" aria-labelledby="doc-view-label">
                    <button type="button" role="tab" id="main-tab-exec" aria-controls="main-panel-exec" aria-selected="true" title="Project scope &#8212; executive summary, flows, and delivery context">Project Scope</button>
                    <button type="button" role="tab" id="main-tab-tech" aria-controls="main-panel-tech" aria-selected="false" title="Technical requirements &#8212; JSON contract, order integration">Technical Requirements</button>
                </div>
            </div>
        </header>

                <div id="main-panel-exec"`;

const newHeader = `    <header class="doc-hero" id="doc-top">
        ${HERO_STRIPES}
        ${HERO_BEE}
        <div class="container">
            <div class="hero-top">
                <div class="hero-badge"><span class="doc-i18n doc-i18n--en">Executive Brief &middot; BEES Link</span><span class="doc-i18n doc-i18n--es">Resumen ejecutivo &middot; BEES Link</span></div>
                <div class="hero-status"><span class="doc-i18n doc-i18n--en">Bilingual &middot; EN / ES</span><span class="doc-i18n doc-i18n--es">Biling&#252;e &middot; EN / ES</span></div>
            </div>
            <h1><span class="doc-i18n doc-i18n--en">BEES &middot; <em>Business Rules Engine</em></span><span class="doc-i18n doc-i18n--es">BEES &middot; <em>Motor de reglas de negocio</em></span></h1>
            <p class="hero-sub"><span class="doc-i18n doc-i18n--en">Order flow and validation for the indirect channel &mdash; EDI ingestion, BEES Link BRE gates, and BU alignment on scope and prerequisites.</span><span class="doc-i18n doc-i18n--es">Flujo de pedidos y validaci&#243;n en canal indirecto &mdash; ingesta EDI, compuertas BRE en BEES Link y alineaci&#243;n de BU sobre alcance y prerrequisitos.</span></p>
            <div class="hero-meta">
                <span><strong><span class="doc-i18n doc-i18n--en">Product</span><span class="doc-i18n doc-i18n--es">Producto</span>:</strong> BEES Link</span>
                <span><strong><span class="doc-i18n doc-i18n--en">Domain</span><span class="doc-i18n doc-i18n--es">Dominio</span>:</strong> EDI / BRE</span>
                <span><strong><span class="doc-i18n doc-i18n--en">Markets</span><span class="doc-i18n doc-i18n--es">Mercados</span>:</strong> MX, AR (MVP)</span>
                <span><strong><span class="doc-i18n doc-i18n--en">Updated</span><span class="doc-i18n doc-i18n--es">Actualizado</span>:</strong> 2026</span>
            </div>
            <div class="doc-view-switch">
                <span class="doc-view-label" id="doc-view-label"><span class="doc-i18n doc-i18n--en">View</span><span class="doc-i18n doc-i18n--es">Vista</span></span>
                <div class="doc-view-switch-inner" role="tablist" aria-labelledby="doc-view-label">
                    <button type="button" role="tab" id="main-tab-exec" aria-controls="main-panel-exec" aria-selected="true" title="Project scope &#8212; executive summary, flows, and delivery context"><span class="doc-i18n doc-i18n--en">Project Scope</span><span class="doc-i18n doc-i18n--es">Alcance del proyecto</span></button>
                    <button type="button" role="tab" id="main-tab-tech" aria-controls="main-panel-tech" aria-selected="false" title="Technical requirements &#8212; JSON contract, order integration"><span class="doc-i18n doc-i18n--en">Technical Requirements</span><span class="doc-i18n doc-i18n--es">Requisitos t&#233;cnicos</span></button>
                </div>
            </div>
        </div>
    </header>
    <div class="yellow-divider" aria-hidden="true"></div>
    <div class="container doc-main">
                <div id="main-panel-exec"`;

if (!html.includes(oldHeader)) throw new Error("Header block not found");
html = html.replace(oldHeader, newHeader);

// doc-view-switch JS may need bilingual label update - optional

fs.writeFileSync(INDEX, html.replace(/\n/g, "\r\n"), "utf8");
console.log("Applied massive-orders-insights layout to", INDEX);
