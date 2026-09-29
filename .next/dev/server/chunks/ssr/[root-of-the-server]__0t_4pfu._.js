module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[project]/components/StoreProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoreProvider",
    ()=>StoreProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function StoreProvider({ children }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].persist.rehydrate();
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].getState().loadCookieChoice();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLiveTicker"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/components/StoreProvider.tsx",
        lineNumber: 14,
        columnNumber: 10
    }, this);
}
}),
"[project]/lib/catalog.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Données du catalogue Établi — Cyber Monday Pro.
// Les prix sont en € HT. Les avis, logos, statistiques et commandes récentes sont fictifs (voir README).
__turbopack_context__.s([
    "BADGES",
    ()=>BADGES,
    "BOUGHT",
    ()=>BOUGHT,
    "BUNDLE_DISCOUNT",
    ()=>BUNDLE_DISCOUNT,
    "BUNDLE_IDS",
    ()=>BUNDLE_IDS,
    "BUNDLE_NAME",
    ()=>BUNDLE_NAME,
    "BUNDLE_SUB",
    ()=>BUNDLE_SUB,
    "CATEGORIES",
    ()=>CATEGORIES,
    "CATEGORY_COVER",
    ()=>CATEGORY_COVER,
    "COMPANY",
    ()=>COMPANY,
    "CROSS_SELL_IDS",
    ()=>CROSS_SELL_IDS,
    "FEATURED_IDS",
    ()=>FEATURED_IDS,
    "IMAGE_POS",
    ()=>IMAGE_POS,
    "LIVE_ORDERS",
    ()=>LIVE_ORDERS,
    "LOGOS",
    ()=>LOGOS,
    "PAYMENT_BADGES",
    ()=>PAYMENT_BADGES,
    "PAYMENT_LABELS",
    ()=>PAYMENT_LABELS,
    "PRODUCTS",
    ()=>PRODUCTS,
    "REVIEWS",
    ()=>REVIEWS,
    "SITE_IMAGES",
    ()=>SITE_IMAGES,
    "TIERS",
    ()=>TIERS,
    "TONES",
    ()=>TONES,
    "getProduct",
    ()=>getProduct,
    "getProductBySlug",
    ()=>getProductBySlug,
    "imagePos",
    ()=>imagePos,
    "mustProduct",
    ()=>mustProduct,
    "productImage",
    ()=>productImage
]);
const CATEGORIES = [
    {
        id: "all",
        label: "Toutes les offres"
    },
    {
        id: "bureaux",
        label: "Bureaux assis-debout"
    },
    {
        id: "chaises",
        label: "Chaises ergonomiques"
    },
    {
        id: "ecrans",
        label: "Écrans & bras"
    },
    {
        id: "docks",
        label: "Stations d'accueil"
    },
    {
        id: "saisie",
        label: "Claviers & souris"
    },
    {
        id: "visio",
        label: "Casques & webcams"
    },
    {
        id: "eclairage",
        label: "Éclairage"
    }
];
const TONES = {
    bureaux: "var(--color-accent-200)",
    chaises: "var(--color-accent-2-200)",
    ecrans: "var(--color-neutral-200)",
    docks: "var(--color-accent-2-100)",
    saisie: "var(--color-surface)",
    visio: "var(--color-accent-2-200)",
    eclairage: "var(--color-accent-100)"
};
function productImage(p) {
    return `/images/${p.id}.jpg`;
}
const IMAGE_POS = {
    axis: "50% 55%",
    talk: "50% 25%",
    flex2: "50% 45%",
    dock12: "50% 60%",
    k2: "50% 60%",
    cam4k: "50% 75%",
    lumen: "50% 15%"
};
function imagePos(p) {
    return IMAGE_POS[p.id] ?? "center";
}
const SITE_IMAGES = {
    hero: "/images/hero.jpg",
    pack: "/images/pack.jpg",
    situation: "/images/situation.jpg"
};
const CATEGORY_COVER = {
    bureaux: "lift",
    chaises: "axis",
    ecrans: "view27",
    docks: "dock12",
    saisie: "k2",
    visio: "talk",
    eclairage: "lumen"
};
const S = (a)=>a.map(([k, v])=>({
            k,
            v
        }));
const PRODUCTS = [
    {
        id: "lift",
        slug: "lift-pro-160",
        ref: "EL-160",
        cat: "bureaux",
        type: "Bureau assis-debout",
        name: "Établi Lift Pro 160",
        ht: 749,
        was: 999,
        stock: 14,
        init: 60,
        rating: 4.8,
        reviews: 312,
        warrantyYears: 5,
        norm: "EN 527-1",
        short: "Double moteur, hauteur 62–128 cm, 3 positions mémorisées.",
        benefits: [
            "Réglable de 62 à 128 cm : alterner assis et debout réduit la fatigue lombaire et la sédentarité.",
            "3 positions mémorisées, montée en 12 s, fonctionnement silencieux sous 45 dB.",
            "Conforme EN 527-1 et NF D 65-761. Stabilité testée sous 150 kg.",
            "Piètement en acier recyclé à 70 %, plateau certifié FSC, pièces détachées 10 ans.",
            "5 ans pièces et moteurs, extensible à 7 ans."
        ],
        specs: S([
            [
                "Plateau",
                "160 × 80 cm, chêne FSC ou blanc"
            ],
            [
                "Hauteur",
                "62 – 128 cm"
            ],
            [
                "Charge max.",
                "150 kg"
            ],
            [
                "Moteurs",
                "2, anti-collision"
            ],
            [
                "Délai",
                "3 à 5 jours ouvrés"
            ]
        ])
    },
    {
        id: "axis",
        slug: "axis",
        ref: "EA-01",
        cat: "chaises",
        type: "Chaise ergonomique",
        name: "Établi Axis",
        ht: 529,
        was: 719,
        stock: 22,
        init: 80,
        rating: 4.7,
        reviews: 486,
        warrantyYears: 10,
        norm: "NF EN 1335",
        short: "Soutien lombaire réglable, résille respirante, conçue pour 8 h par jour.",
        benefits: [
            "Soutien lombaire réglable en hauteur et profondeur, accoudoirs 4D, assise coulissante.",
            "Résille respirante et bascule synchrone : confort constant sur une journée complète.",
            "Conforme NF EN 1335-1/2/3, certifiée NF Office Excellence.",
            "Testée à 150 000 cycles, 85 % recyclable, dossier et mécanisme remplaçables.",
            "10 ans sur la structure, 5 ans sur le mécanisme."
        ],
        specs: S([
            [
                "Hauteur d'assise",
                "42 – 54 cm"
            ],
            [
                "Poids utilisateur",
                "jusqu’à 150 kg"
            ],
            [
                "Réglages",
                "12"
            ],
            [
                "Coloris",
                "Graphite, Sable"
            ]
        ])
    },
    {
        id: "view27",
        slug: "view-27",
        ref: "EV-27U",
        cat: "ecrans",
        type: 'Écran 27" 4K USB-C',
        name: "Établi View 27",
        ht: 389,
        was: 479,
        stock: 31,
        init: 120,
        rating: 4.6,
        reviews: 205,
        warrantyYears: 3,
        norm: "TCO Certified",
        short: "Dalle IPS 4K, USB-C 90 W et hub intégré : un seul câble.",
        benefits: [
            "Pied réglable en hauteur, inclinaison et pivot ; filtre lumière bleue certifié TÜV.",
            "Un seul câble USB-C 90 W pour image, charge et périphériques.",
            "TCO Certified Gen. 9, EPEAT Gold, conforme ErP.",
            "Châssis en plastique recyclé à 85 %, consommation typique 24 W.",
            "3 ans sur site, garantie zéro pixel mort."
        ],
        specs: S([
            [
                "Dalle",
                '27" IPS, 3840 × 2160'
            ],
            [
                "Connectique",
                "USB-C 90 W, HDMI 2.0, DP 1.4"
            ],
            [
                "Luminosité",
                "350 cd/m²"
            ],
            [
                "VESA",
                "100 × 100"
            ]
        ])
    },
    {
        id: "flex2",
        slug: "flex-duo",
        ref: "EF-D2",
        cat: "ecrans",
        type: "Bras d'écran double",
        name: "Établi Flex Duo",
        ht: 119,
        was: 159,
        stock: 9,
        init: 50,
        rating: 4.7,
        reviews: 158,
        warrantyYears: 5,
        norm: "VESA 75/100",
        short: "Deux écrans jusqu'à 32\", vérin à gaz, passage de câbles intégré.",
        benefits: [
            "Écrans à hauteur des yeux et à bonne distance : moins de tensions cervicales.",
            "Libère jusqu’à 40 % de surface de bureau.",
            "Compatible VESA 75/100, fixation testée à 2 × 9 kg.",
            "Aluminium, réglages sans outil, pièces remplaçables.",
            "5 ans."
        ],
        specs: S([
            [
                "Écrans",
                '2 × 17" à 32"'
            ],
            [
                "Charge",
                "2 – 9 kg par bras"
            ],
            [
                "Fixation",
                "Pince ou œillet"
            ],
            [
                "Rotation",
                "360°"
            ]
        ])
    },
    {
        id: "dock12",
        slug: "dock-12-tb4",
        ref: "ED-12",
        cat: "docks",
        type: "Station d'accueil",
        name: "Établi Dock 12 TB4",
        ht: 189,
        was: 249,
        stock: 27,
        init: 90,
        rating: 4.5,
        reviews: 97,
        warrantyYears: 3,
        norm: "Thunderbolt 4",
        short: "12 ports, deux écrans 4K, charge 96 W, Mac et Windows.",
        benefits: [
            "Un câble pour passer du nomade au poste fixe.",
            "Double affichage 4K 60 Hz, Ethernet 2,5 Gb/s, charge 96 W.",
            "Certifié Thunderbolt 4, conforme CE / RoHS.",
            "Boîtier aluminium, mises à jour firmware 5 ans.",
            "3 ans."
        ],
        specs: S([
            [
                "Ports",
                "12 dont 3 × TB4"
            ],
            [
                "Charge",
                "96 W"
            ],
            [
                "Écrans",
                "2 × 4K 60 Hz"
            ],
            [
                "Réseau",
                "2,5 GbE"
            ]
        ])
    },
    {
        id: "k2",
        slug: "k2-split",
        ref: "EK-2S",
        cat: "saisie",
        type: "Clavier ergonomique",
        name: "Établi K2 Split",
        ht: 99,
        was: 129,
        stock: 40,
        init: 150,
        rating: 4.6,
        reviews: 241,
        warrantyYears: 3,
        norm: "AZERTY NF",
        short: "Clavier scindé à inclinaison négative, AZERTY, 3 appareils.",
        benefits: [
            "Deux demi-claviers et repose-poignets : position neutre des poignets et des épaules.",
            "Multi-appareils (3), touches silencieuses, raccourcis programmables.",
            "Disposition AZERTY NF Z71-300 disponible.",
            "Batterie 12 mois, plastique recyclé à 60 %.",
            "3 ans."
        ],
        specs: S([
            [
                "Connexion",
                "Bluetooth, dongle USB-C"
            ],
            [
                "Autonomie",
                "12 mois"
            ],
            [
                "Disposition",
                "AZERTY, AZERTY NF"
            ],
            [
                "Appareils",
                "3"
            ]
        ])
    },
    {
        id: "m1",
        slug: "m1-vertical",
        ref: "EM-1V",
        cat: "saisie",
        type: "Souris verticale",
        name: "Établi M1 Vertical",
        ht: 59,
        was: 79,
        stock: 52,
        init: 200,
        rating: 4.5,
        reviews: 330,
        warrantyYears: 2,
        norm: "Prévention TMS",
        short: "Poignée à 57°, capteur 4000 dpi, rechargeable USB-C.",
        benefits: [
            "Poignée à 57° : moins de pression sur le canal carpien.",
            "Défilement rapide, 6 boutons programmables.",
            "Conforme CE, recommandée en prévention des TMS.",
            "Batterie rechargeable, 70 jours d’autonomie.",
            "2 ans."
        ],
        specs: S([
            [
                "Angle",
                "57°"
            ],
            [
                "Capteur",
                "400 – 4000 dpi"
            ],
            [
                "Autonomie",
                "70 jours"
            ],
            [
                "Taille",
                "M ou L"
            ]
        ])
    },
    {
        id: "talk",
        slug: "talk-anc",
        ref: "ET-ANC",
        cat: "visio",
        type: "Casque visioconférence",
        name: "Établi Talk ANC",
        ht: 149,
        was: 199,
        stock: 19,
        init: 80,
        rating: 4.6,
        reviews: 178,
        warrantyYears: 2,
        norm: "Certifié Teams",
        short: "Réduction de bruit active, micro perche, certifié Teams et Zoom.",
        benefits: [
            "180 g, coussinets à mémoire de forme : confortable sur une journée d’appels.",
            "Micro perche avec suppression de bruit, bouton Teams dédié.",
            "Certifié Microsoft Teams et Zoom ; protection acoustique EN 50332.",
            "Coussinets remplaçables, autonomie 40 h.",
            "2 ans, remplacement anticipé."
        ],
        specs: S([
            [
                "Autonomie",
                "40 h"
            ],
            [
                "Connexion",
                "Bluetooth 5.3, dongle USB-C"
            ],
            [
                "Poids",
                "180 g"
            ],
            [
                "Certifications",
                "Teams, Zoom"
            ]
        ])
    },
    {
        id: "cam4k",
        slug: "cam-4k",
        ref: "EC-4K",
        cat: "visio",
        type: "Webcam 4K",
        name: "Établi Cam 4K",
        ht: 119,
        was: 159,
        stock: 11,
        init: 70,
        rating: 4.4,
        reviews: 122,
        warrantyYears: 2,
        norm: "Certifiée Zoom",
        short: "4K, cadrage automatique et correction de lumière.",
        benefits: [
            "Cadrage automatique : restez naturel sans vous pencher vers l’écran.",
            "Correction de lumière, double micro, volet de confidentialité.",
            "Certifiée Teams / Zoom, traitement local sans cloud.",
            "Fixation universelle, firmware maintenu 5 ans.",
            "2 ans."
        ],
        specs: S([
            [
                "Résolution",
                "4K 30 i/s, 1080p 60 i/s"
            ],
            [
                "Champ",
                "65 – 90°"
            ],
            [
                "Micros",
                "2"
            ],
            [
                "Fixation",
                "Écran ou trépied"
            ]
        ])
    },
    {
        id: "lumen",
        slug: "lumen",
        ref: "EL-LED",
        cat: "eclairage",
        type: "Lampe LED asymétrique",
        name: "Établi Lumen",
        ht: 139,
        was: 179,
        stock: 24,
        init: 90,
        rating: 4.7,
        reviews: 88,
        warrantyYears: 5,
        norm: "EN 12464-1",
        short: "Éclairage sans reflet sur l'écran, 2700–6500 K, capteur de présence.",
        benefits: [
            "Éclairage asymétrique sans reflet, 500 lux sur le plan de travail.",
            "Température réglable et capteur de présence.",
            "Conforme EN 12464-1 (lieux de travail), UGR < 19.",
            "LED 50 000 h, 7 W, aluminium recyclable.",
            "5 ans."
        ],
        specs: S([
            [
                "Flux",
                "500 lux à 50 cm"
            ],
            [
                "Température",
                "2700 – 6500 K"
            ],
            [
                "Consommation",
                "7 W"
            ],
            [
                "Fixation",
                "Pied ou pince"
            ]
        ])
    }
];
const byId = new Map(PRODUCTS.map((p)=>[
        p.id,
        p
    ]));
const bySlug = new Map(PRODUCTS.map((p)=>[
        p.slug,
        p
    ]));
function getProduct(id) {
    return byId.get(id);
}
function getProductBySlug(slug) {
    return bySlug.get(slug);
}
function mustProduct(id) {
    const p = byId.get(id);
    if (!p) throw new Error(`Produit inconnu : ${id}`);
    return p;
}
const BUNDLE_IDS = [
    "lift",
    "axis",
    "view27",
    "flex2",
    "k2",
    "m1"
];
const BUNDLE_DISCOUNT = 0.12;
const BUNDLE_NAME = "Pack Complete Your Workspace";
const BUNDLE_SUB = "Bureau, chaise, écran 27\", bras, clavier, souris";
const TIERS = [
    {
        n: 3,
        p: 5
    },
    {
        n: 5,
        p: 10
    },
    {
        n: 10,
        p: 15
    }
];
const BADGES = {
    lift: "Meilleure vente",
    axis: "N°1 des office managers",
    view27: "Recommandé IT",
    talk: "Choix des équipes hybrides",
    flex2: "Souvent acheté ensemble"
};
const BOUGHT = {
    lift: 143,
    axis: 212,
    view27: 168,
    flex2: 96,
    dock12: 74,
    k2: 88,
    m1: 131,
    talk: 102,
    cam4k: 57,
    lumen: 49
};
const FEATURED_IDS = [
    "lift",
    "axis",
    "view27",
    "talk"
];
const CROSS_SELL_IDS = [
    "lumen",
    "talk",
    "cam4k",
    "dock12",
    "flex2",
    "m1"
];
const REVIEWS = [
    {
        name: "Claire Dubreuil",
        role: "Office manager",
        co: "Studio de design · 45 salariés",
        stars: "★★★★★",
        title: "18 postes équipés en une commande",
        text: "Devis reçu en 3 heures, livraison et montage sur site le même jour. Les équipes ont adopté les bureaux assis-debout dès la première semaine.",
        product: "Pack Complete Your Workspace × 18"
    },
    {
        name: "Mehdi Benali",
        role: "Responsable achats",
        co: "ESN · 220 salariés",
        stars: "★★★★★",
        title: "Bon de commande et paiement à 30 jours",
        text: "Bon de commande accepté, facture PDF conforme immédiatement. Exactement ce qu'il faut pour notre circuit de validation.",
        product: "Établi Axis × 40"
    },
    {
        name: "Sophie Laurent",
        role: "Consultante indépendante",
        co: "Entreprise individuelle",
        stars: "★★★★★",
        title: "Mes journées ont changé",
        text: "La chaise Axis et le bras d'écran ont réglé mes douleurs de nuque. Prix HT clairs, TVA récupérable, rien à redire.",
        product: "Établi Axis + Flex Duo"
    },
    {
        name: "Thomas Girard",
        role: "DAF",
        co: "Cabinet comptable · 18 salariés",
        stars: "★★★★☆",
        title: "Remise volume bien pensée",
        text: "Le palier −10 % dès 5 postes a fait la différence face à notre fournisseur habituel. Délai un peu serré sur les écrans.",
        product: "Établi View 27 × 6"
    }
];
const LOGOS = [
    {
        name: "HALDEN",
        weight: 700,
        spacing: "0.18em",
        serif: false
    },
    {
        name: "vektor",
        weight: 600,
        spacing: "-0.04em",
        serif: false
    },
    {
        name: "Maison Ferro",
        weight: 400,
        spacing: "0.02em",
        serif: true
    },
    {
        name: "LUMIO",
        weight: 500,
        spacing: "0.3em",
        serif: false
    },
    {
        name: "Atelier Nord",
        weight: 650,
        spacing: "-0.02em",
        serif: false
    },
    {
        name: "brisk&co",
        weight: 500,
        spacing: "0",
        serif: false
    }
];
const LIVE_ORDERS = [
    {
        who: "Office manager",
        co: "agence de 32 salariés",
        city: "Lyon",
        what: "6 × Pack Complete Your Workspace",
        ago: "il y a 4 min"
    },
    {
        who: "Responsable achats",
        co: "ESN de 180 salariés",
        city: "Nantes",
        what: "24 × Établi Axis",
        ago: "il y a 9 min"
    },
    {
        who: "Consultant indépendant",
        co: "entreprise individuelle",
        city: "Bordeaux",
        what: "Établi Lift Pro 160 + Flex Duo",
        ago: "il y a 12 min"
    },
    {
        who: "DAF",
        co: "cabinet de 15 salariés",
        city: "Lille",
        what: "5 × Établi View 27",
        ago: "il y a 18 min"
    },
    {
        who: "Office manager",
        co: "start-up de 60 salariés",
        city: "Paris",
        what: "10 × Établi Talk ANC",
        ago: "il y a 23 min"
    }
];
const PAYMENT_BADGES = [
    "CB",
    "Visa",
    "Mastercard",
    "Virement SEPA",
    "Paiement 30 j",
    "Bon de commande",
    "3-D Secure"
];
const PAYMENT_LABELS = {
    card: "Carte bancaire",
    transfer: "Virement SEPA",
    net30: "Paiement à 30 jours",
    po: "Bon de commande"
};
const COMPANY = {
    name: "Etabli SAS",
    address: "12 rue du Faubourg, 75011 Paris",
    siret: "912 345 678 00017",
    vat: "FR27912345678",
    rcs: "RCS Paris 912 345 678",
    phone: "01 84 60 12 00",
    iban: "FR76 3000 4000 0312 3456 7890 143",
    bic: "BNPAFRPP"
};
}),
"[project]/lib/format.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eur",
    ()=>eur,
    "eur2",
    ()=>eur2,
    "formatCountdown",
    ()=>formatCountdown,
    "formatLongDate",
    ()=>formatLongDate,
    "formatShortDate",
    ()=>formatShortDate,
    "pad2",
    ()=>pad2,
    "pctLabel",
    ()=>pctLabel,
    "pdfSafe",
    ()=>pdfSafe,
    "r2",
    ()=>r2,
    "splitDuration",
    ()=>splitDuration
]);
// Formatage des prix et dates au format fr-FR.
const nf2 = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});
const nf0 = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});
const r2 = (v)=>Math.round((v + Number.EPSILON) * 100) / 100;
function eur(v) {
    const r = r2(v);
    return (Number.isInteger(r) ? nf0 : nf2).format(r);
}
function eur2(v) {
    return nf2.format(r2(v));
}
function pctLabel(ht, was) {
    return "−" + Math.round((1 - ht / was) * 100) + " %";
}
const pad2 = (n)=>String(n).padStart(2, "0");
function splitDuration(ms) {
    const left = Math.max(0, ms);
    return {
        d: Math.floor(left / 864e5),
        h: Math.floor(left / 36e5) % 24,
        m: Math.floor(left / 6e4) % 60,
        s: Math.floor(left / 1e3) % 60
    };
}
function formatCountdown(ms) {
    const { d, h, m, s } = splitDuration(ms);
    return `${d}j ${pad2(h)}:${pad2(m)}:${pad2(s)}`;
}
const formatLongDate = (d)=>new Date(d).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });
const formatShortDate = (d)=>new Date(d).toLocaleDateString("fr-FR");
function pdfSafe(t) {
    return String(t).replace(/[  ]/g, " ").replace(/−/g, "-").replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
}
}),
"[project]/lib/hooks.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSaleEnd",
    ()=>getSaleEnd,
    "isMobileNow",
    ()=>isMobileNow,
    "useLive",
    ()=>useLive,
    "useLiveTicker",
    ()=>useLiveTicker,
    "useNow",
    ()=>useNow,
    "useSaleCountdown",
    ()=>useSaleCountdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/catalog.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
// --- Horloge partagée : un seul intervalle pour tous les compteurs ---------------------------
const listeners = new Set();
let timer = null;
let tick = 0;
function subscribe(cb) {
    listeners.add(cb);
    if (!timer) {
        timer = setInterval(()=>{
            tick = Date.now();
            listeners.forEach((l)=>l());
        }, 1000);
    }
    tick = Date.now();
    return ()=>{
        listeners.delete(cb);
        if (!listeners.size && timer) {
            clearInterval(timer);
            timer = null;
        }
    };
}
function useNow() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, ()=>tick || null, ()=>null);
}
// --- Date de fin de l'opération -------------------------------------------------------------
const END_KEY = "etabli_end";
const FALLBACK_MS = (31 * 3600 + 14 * 60) * 1000;
function getSaleEnd(now = Date.now()) {
    const fromEnv = Date.parse(process.env.NEXT_PUBLIC_SALE_END ?? "");
    if (!Number.isNaN(fromEnv)) return fromEnv;
    try {
        const stored = Number(localStorage.getItem(END_KEY));
        if (stored && stored > now) return stored;
        const end = now + FALLBACK_MS;
        localStorage.setItem(END_KEY, String(end));
        return end;
    } catch  {
        return now + FALLBACK_MS;
    }
}
function useSaleCountdown() {
    const now = useNow();
    if (now === null) return null;
    return Math.max(0, getSaleEnd(now) - now);
}
const useLive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        viewers: Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRODUCTS"].map((p, i)=>[
                p.id,
                11 + i * 7 % 23
            ])),
        jitter: ()=>set((s)=>({
                    viewers: Object.fromEntries(Object.entries(s.viewers).map(([id, v])=>[
                            id,
                            Math.max(6, v + Math.round(Math.random() * 4 - 2))
                        ]))
                }))
    }));
function useLiveTicker() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const t = setInterval(()=>useLive.getState().jitter(), 6000);
        return ()=>clearInterval(t);
    }, []);
}
const isMobileNow = ()=>("TURBOPACK compile-time value", "undefined") !== "undefined" && window.matchMedia("(max-width: 759px)").matches;
}),
"[project]/lib/pricing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FREE_SHIPPING_FROM_HT",
    ()=>FREE_SHIPPING_FROM_HT,
    "INSTALL_PER_POSTE_HT",
    ()=>INSTALL_PER_POSTE_HT,
    "SHIPPING_HT",
    ()=>SHIPPING_HT,
    "UPGRADE_WINDOW_MS",
    ()=>UPGRADE_WINDOW_MS,
    "VAT_RATE",
    ()=>VAT_RATE,
    "WORKDAYS_PER_YEAR",
    ()=>WORKDAYS_PER_YEAR,
    "addBusinessDays",
    ()=>addBusinessDays,
    "bundlePrices",
    ()=>bundlePrices,
    "computeCart",
    ()=>computeCart,
    "countPostes",
    ()=>countPostes,
    "displayPrice",
    ()=>displayPrice,
    "lineTotalWithTier",
    ()=>lineTotalWithTier,
    "orderHasPoste",
    ()=>orderHasPoste,
    "perWorkday",
    ()=>perWorkday,
    "soldPercent",
    ()=>soldPercent,
    "tierFor",
    ()=>tierFor,
    "tierProgress",
    ()=>tierProgress,
    "upgradeOffers",
    ()=>upgradeOffers
]);
// Règles de prix, remises, livraison, installation et TVA — fonctions pures, testées dans tests/pricing.test.ts.
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/catalog.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/format.ts [app-ssr] (ecmascript)");
;
;
const VAT_RATE = 0.2;
const SHIPPING_HT = 19;
const FREE_SHIPPING_FROM_HT = 300;
const INSTALL_PER_POSTE_HT = 49;
const WORKDAYS_PER_YEAR = 220;
const displayPrice = (ht, mode)=>mode === "TTC" ? ht * (1 + VAT_RATE) : ht;
function tierFor(postes) {
    let pct = 0;
    for (const t of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIERS"])if (postes >= t.n) pct = t.p;
    return pct;
}
function bundlePrices() {
    const sum = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUNDLE_IDS"].reduce((s, id)=>s + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mustProduct"])(id).ht, 0);
    const was = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUNDLE_IDS"].reduce((s, id)=>s + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mustProduct"])(id).was, 0);
    return {
        sum,
        was,
        ht: Math.round(sum * (1 - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUNDLE_DISCOUNT"]))
    };
}
function countPostes(lines, bundleQty) {
    return bundleQty + lines.reduce((m, l)=>Math.max(m, l.qty), 0);
}
function computeCart(lines, bundleQty, install) {
    let sub = 0;
    let was = 0;
    let count = bundleQty;
    for (const l of lines){
        const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProduct"])(l.id);
        if (!p) continue;
        sub += p.ht * l.qty;
        was += p.was * l.qty;
        count += l.qty;
    }
    if (bundleQty > 0) {
        const b = bundlePrices();
        sub += b.ht * bundleQty;
        was += b.was * bundleQty;
    }
    const postes = countPostes(lines, bundleQty);
    const tier = tierFor(postes);
    const vol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["r2"])(sub * tier / 100);
    const net = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["r2"])(sub - vol);
    const ship = sub === 0 || net >= FREE_SHIPPING_FROM_HT ? 0 : SHIPPING_HT;
    const inst = install && sub > 0 ? INSTALL_PER_POSTE_HT * Math.max(postes, 1) : 0;
    const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["r2"])(net + ship + inst);
    const tva = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["r2"])(base * VAT_RATE);
    const ttc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["r2"])(base + tva);
    return {
        sub,
        was,
        postes,
        tier,
        vol,
        net,
        ship,
        inst,
        base,
        tva,
        ttc,
        save: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["r2"])(was - sub + vol),
        count
    };
}
function tierProgress(postes, unit = "poste") {
    const t = tierFor(postes);
    const next = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIERS"].find((x)=>postes < x.n);
    const rest = next ? next.n - postes : 0;
    return {
        message: next ? `Plus que ${rest} ${unit}${rest > 1 ? "s" : ""} pour débloquer −${next.p} %` : "Remise maximale débloquée. Au-delà de 10 postes : devis.",
        current: t ? `−${t} % appliqués` : "Remise volume",
        fill: Math.min(postes / 10, 1) * 100
    };
}
function lineTotalWithTier(p, qty) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["r2"])(p.ht * qty * (1 - tierFor(qty) / 100));
}
const perWorkday = (ht, warrantyYears)=>ht / (warrantyYears * WORKDAYS_PER_YEAR);
const soldPercent = (p)=>Math.round((1 - p.stock / p.init) * 100);
function addBusinessDays(from, n) {
    const d = new Date(from);
    while(n > 0){
        d.setDate(d.getDate() + 1);
        const w = d.getDay();
        if (w !== 0 && w !== 6) n--;
    }
    return d;
}
const UPGRADE_WINDOW_MS = 15 * 60 * 1000;
function upgradeOffers(o) {
    const ups = [];
    const b = bundlePrices();
    if (o.hasPoste) {
        ups.push({
            id: "poste",
            kicker: "Poste supplémentaire",
            title: "Équipez un poste de plus : pack complet à −20 %",
            desc: "Au lieu de −12 %. Même configuration, livré et installé avec votre commande.",
            ht: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["r2"])(b.sum * 0.8),
            was: b.sum
        });
    }
    ups.push({
        id: "warranty",
        kicker: "Extension de garantie",
        title: "+2 ans de garantie sur toute la commande",
        desc: "Intervention sur site sous 48 h, pièces et main-d’œuvre incluses.",
        ht: Math.max(29, Math.round(o.sub * 0.04)),
        was: Math.max(49, Math.round(o.sub * 0.07))
    });
    const accId = [
        "lumen",
        "talk",
        "cam4k",
        "dock12"
    ].find((id)=>!o.ids.includes(id)) ?? "lumen";
    const acc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mustProduct"])(accId);
    ups.push({
        id: "acc",
        kicker: "Accessoire complémentaire",
        title: `${acc.name} · ${acc.type}`,
        desc: acc.short,
        ht: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["r2"])(acc.ht * 0.8),
        was: acc.was
    });
    return ups;
}
const orderHasPoste = (bundleQty, ids)=>bundleQty > 0 || ids.includes("lift") || ids.includes("axis");
}),
"[project]/lib/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COOKIE_KEY",
    ()=>COOKIE_KEY,
    "useStore",
    ()=>useStore
]);
// État global : panier, préférence HT/TTC, commande (persistés) + formulaire de checkout et UI (transitoires).
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/catalog.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pricing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/format.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const COOKIE_KEY = "etabli_cookies";
const emptyCart = {
    cart: [],
    bundleQty: 0
};
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        cart: [],
        bundleQty: 0,
        tax: "HT",
        install: false,
        order: null,
        upgrades: {},
        hydrated: false,
        drawerOpen: false,
        justAdded: null,
        quoteOpen: false,
        quoteDefault: 10,
        quoteSent: false,
        pay: "card",
        billingDiff: false,
        form: {},
        errors: {},
        cgvOk: false,
        toastOff: false,
        cookieChoice: null,
        cookieReady: false,
        cookieReopened: false,
        add: (id, qty = 1)=>{
            const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProduct"])(id);
            if (!p || qty < 1) return;
            set((s)=>{
                const i = s.cart.findIndex((l)=>l.id === id);
                const cart = [
                    ...s.cart
                ];
                if (i >= 0) cart[i] = {
                    ...cart[i],
                    qty: cart[i].qty + qty
                };
                else cart.push({
                    id,
                    qty
                });
                return {
                    cart,
                    drawerOpen: true,
                    justAdded: (qty > 1 ? `${qty} × ` : "") + p.name
                };
            });
        },
        addBundle: ()=>set((s)=>({
                    bundleQty: s.bundleQty + 1,
                    drawerOpen: true,
                    justAdded: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUNDLE_NAME"]
                })),
        setQty: (id, qty)=>set((s)=>{
                if (id === "bundle") return {
                    bundleQty: Math.max(0, qty),
                    justAdded: null
                };
                const cart = qty <= 0 ? s.cart.filter((l)=>l.id !== id) : s.cart.map((l)=>l.id === id ? {
                        ...l,
                        qty
                    } : l);
                return {
                    cart,
                    justAdded: null
                };
            }),
        setTax: (tax)=>set({
                tax
            }),
        setInstall: (install)=>set({
                install
            }),
        openDrawer: ()=>set({
                drawerOpen: true,
                justAdded: null
            }),
        closeDrawer: ()=>set({
                drawerOpen: false
            }),
        openQuote: (minPostes = 0)=>set((s)=>({
                    quoteOpen: true,
                    quoteSent: false,
                    drawerOpen: false,
                    quoteDefault: Math.max(10, minPostes, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeCart"])(s.cart, s.bundleQty, false).postes)
                })),
        closeQuote: ()=>set({
                quoteOpen: false
            }),
        submitQuote: ()=>set({
                quoteSent: true
            }),
        setPay: (pay)=>set((s)=>({
                    pay,
                    errors: omit(s.errors, [
                        "card",
                        "exp",
                        "cvc",
                        "po"
                    ])
                })),
        setBillingDiff: (billingDiff)=>set({
                billingDiff
            }),
        setField: (k, v)=>set((s)=>({
                    form: {
                        ...s.form,
                        [k]: v
                    },
                    errors: omit(s.errors, [
                        k
                    ])
                })),
        fillDemo: ()=>set({
                errors: {},
                form: {
                    email: "c.martin@halden.fr",
                    prenom: "Camille",
                    nom: "Martin",
                    tel: "06 12 34 56 78",
                    fonction: "Office manager",
                    societe: "Halden SAS",
                    siret: "832 456 789 00021",
                    tva: "FR48832456789",
                    adresse: "18 rue de Paradis",
                    cp: "75010",
                    ville: "Paris",
                    card: "4242 4242 4242 4242",
                    exp: "09/28",
                    cvc: "123",
                    po: "BC-2026-0412"
                }
            }),
        setCgv: (cgvOk)=>set((s)=>({
                    cgvOk,
                    errors: omit(s.errors, [
                        "cgv"
                    ])
                })),
        placeOrder: ()=>{
            const s = get();
            const errors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateCheckout"])({
                form: s.form,
                pay: s.pay,
                billingDiff: s.billingDiff,
                cgvOk: s.cgvOk
            });
            if (Object.keys(errors).length) {
                set({
                    errors
                });
                return {
                    ok: false,
                    errors
                };
            }
            const c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeCart"])(s.cart, s.bundleQty, s.install);
            const f = s.form;
            const items = [];
            if (s.bundleQty) items.push({
                name: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUNDLE_NAME"],
                qty: s.bundleQty,
                unit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bundlePrices"])().ht
            });
            for (const l of s.cart)items.push({
                name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mustProduct"])(l.id).name,
                qty: l.qty,
                unit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mustProduct"])(l.id).ht
            });
            const ids = s.cart.map((l)=>l.id);
            const now = Date.now();
            const addr = `${f.adresse}, ${f.cp} ${f.ville}`;
            const order = {
                no: `ETB-${new Date().getFullYear()}-${10000 + Math.floor(Math.random() * 89999)}`,
                date: now,
                items,
                sub: c.sub,
                tier: c.tier,
                vol: c.vol,
                ship: c.ship,
                inst: c.inst,
                base: c.base,
                tva: c.tva,
                ttc: c.ttc,
                postes: c.postes,
                company: f.societe ?? "",
                siret: f.siret ?? "",
                vatNo: f.tva ?? "",
                contact: `${f.prenom} ${f.nom}`,
                email: f.email ?? "",
                addr,
                bill: s.billingDiff ? `${f.bAdresse}, ${f.bCp} ${f.bVille}` : addr,
                pay: s.pay,
                po: f.po ?? "",
                hasPoste: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderHasPoste"])(s.bundleQty, ids),
                ids,
                upEnd: now + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UPGRADE_WINDOW_MS"],
                deliv: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatLongDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addBusinessDays"])(now, 4)),
                install: s.install
            };
            // Les données de carte ne sont jamais conservées.
            const { card: _c, exp: _e, cvc: _v, ...safeForm } = s.form;
            void _c;
            void _e;
            void _v;
            set({
                order,
                ...emptyCart,
                upgrades: {},
                install: false,
                drawerOpen: false,
                errors: {},
                cgvOk: false,
                form: safeForm
            });
            return {
                ok: true,
                no: order.no
            };
        },
        addUpgrade: (id)=>set((s)=>({
                    upgrades: {
                        ...s.upgrades,
                        [id]: true
                    }
                })),
        dismissToasts: ()=>set({
                toastOff: true
            }),
        loadCookieChoice: ()=>{
            let c = null;
            try {
                c = localStorage.getItem(COOKIE_KEY);
            } catch  {}
            set({
                cookieChoice: c === "all" || c === "necessary" ? c : null,
                cookieReady: true
            });
        },
        setCookieChoice: (cookieChoice)=>{
            try {
                localStorage.setItem(COOKIE_KEY, cookieChoice);
            } catch  {}
            set({
                cookieChoice,
                cookieReopened: false
            });
        },
        reopenCookies: ()=>set({
                cookieReopened: true
            })
    }), {
    name: "etabli_state",
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
    skipHydration: true,
    partialize: (s)=>({
            cart: s.cart,
            bundleQty: s.bundleQty,
            tax: s.tax,
            install: s.install,
            order: s.order,
            upgrades: s.upgrades
        }),
    onRehydrateStorage: ()=>()=>useStore.setState({
                hydrated: true
            })
}));
function omit(o, keys) {
    const c = {
        ...o
    };
    for (const k of keys)delete c[k];
    return c;
}
}),
"[project]/lib/validation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Validation du formulaire de commande B2B (règles du README).
__turbopack_context__.s([
    "EMAIL_RE",
    ()=>EMAIL_RE,
    "VAT_RE",
    ()=>VAT_RE,
    "isCardExpiry",
    ()=>isCardExpiry,
    "isCardNumber",
    ()=>isCardNumber,
    "isCvc",
    ()=>isCvc,
    "isEmail",
    ()=>isEmail,
    "isPostalCode",
    ()=>isPostalCode,
    "isSiret",
    ()=>isSiret,
    "isVatNumber",
    ()=>isVatNumber,
    "stripSpaces",
    ()=>stripSpaces,
    "validateCheckout",
    ()=>validateCheckout
]);
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const VAT_RE = /^[A-Z]{2}[0-9A-Z]{8,12}$/;
const stripSpaces = (s)=>s.replace(/\s/g, "");
const isEmail = (s)=>EMAIL_RE.test(s.trim());
const isSiret = (s)=>/^\d{14}$/.test(stripSpaces(s));
const isVatNumber = (s)=>VAT_RE.test(stripSpaces(s).toUpperCase());
const isPostalCode = (s)=>/^\d{5}$/.test(s.trim());
const isCardNumber = (s)=>/^\d{16}$/.test(stripSpaces(s));
const isCvc = (s)=>/^\d{3,4}$/.test(s.trim());
function isCardExpiry(s, now = new Date()) {
    const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(s.trim());
    if (!m) return false;
    const month = Number(m[1]);
    const year = 2000 + Number(m[2]);
    if (month < 1 || month > 12) return false;
    // Valide jusqu'à la fin du mois d'expiration.
    return new Date(year, month, 1).getTime() > now.getTime();
}
const REQUIRED = [
    "email",
    "prenom",
    "nom",
    "societe",
    "adresse",
    "cp",
    "ville"
];
function validateCheckout({ form: f, pay, billingDiff, cgvOk, now }) {
    const e = {};
    const val = (k)=>(f[k] ?? "").trim();
    const req = (k, msg = "Champ requis")=>{
        if (!val(k)) e[k] = msg;
    };
    REQUIRED.forEach((k)=>req(k));
    if (val("email") && !isEmail(val("email"))) e.email = "Adresse e-mail invalide";
    if (!isSiret(val("siret"))) e.siret = "14 chiffres requis";
    if (val("tva") && !isVatNumber(val("tva"))) e.tva = "Format attendu : FR12345678901";
    if (val("cp") && !isPostalCode(val("cp"))) e.cp = "5 chiffres";
    if (billingDiff) {
        req("bAdresse");
        req("bVille");
        req("bCp");
        if (val("bCp") && !isPostalCode(val("bCp"))) e.bCp = "5 chiffres";
    }
    if (pay === "card") {
        if (!isCardNumber(val("card"))) e.card = val("card") ? "Numéro incomplet (16 chiffres)" : "Champ requis";
        if (!val("exp")) e.exp = "Champ requis";
        else if (!isCardExpiry(val("exp"), now)) e.exp = "Format MM/AA, date non échue";
        if (!val("cvc")) e.cvc = "Champ requis";
        else if (!isCvc(val("cvc"))) e.cvc = "3 ou 4 chiffres";
    }
    if (pay === "po") req("po", "Numéro de bon de commande requis");
    if (!cgvOk) e.cgv = "Veuillez accepter les CGV";
    return e;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0t_4pfu._.js.map