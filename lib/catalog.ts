// Données du catalogue Établi — Cyber Monday Pro.
// Les prix sont en € HT. Les avis, logos, statistiques et commandes récentes sont fictifs (voir README).

export type CategoryId =
  | "bureaux"
  | "chaises"
  | "ecrans"
  | "docks"
  | "saisie"
  | "visio"
  | "eclairage";

export const CATEGORIES: { id: "all" | CategoryId; label: string }[] = [
  { id: "all", label: "Toutes les offres" },
  { id: "bureaux", label: "Bureaux assis-debout" },
  { id: "chaises", label: "Chaises ergonomiques" },
  { id: "ecrans", label: "Écrans & bras" },
  { id: "docks", label: "Stations d'accueil" },
  { id: "saisie", label: "Claviers & souris" },
  { id: "visio", label: "Casques & webcams" },
  { id: "eclairage", label: "Éclairage" },
];

/** Teinte de fond des emplacements photo, par catégorie. */
export const TONES: Record<CategoryId, string> = {
  bureaux: "var(--color-accent-200)",
  chaises: "var(--color-accent-2-200)",
  ecrans: "var(--color-neutral-200)",
  docks: "var(--color-accent-2-100)",
  saisie: "var(--color-surface)",
  visio: "var(--color-accent-2-200)",
  eclairage: "var(--color-accent-100)",
};

/** Photos libres de droits (Unsplash), stockées dans /public/images/<id>.jpg. */
export function productImage(p: Pick<Product, "id">): string {
  return `/images/${p.id}.jpg`;
}
/** Cadrage (object-position) des photos dont le sujet n'est pas centré. */
export const IMAGE_POS: Partial<Record<string, string>> = {
  axis: "50% 55%", talk: "50% 25%", flex2: "50% 45%", dock12: "50% 60%", k2: "50% 60%", cam4k: "50% 75%", lumen: "50% 15%",
};
export function imagePos(p: Pick<Product, "id">): string {
  return IMAGE_POS[p.id] ?? "center";
}
/** Visuels de l'accueil et vue « En situation » des fiches. */
export const SITE_IMAGES = {
  hero: "/images/hero.jpg",
  pack: "/images/pack.jpg",
  situation: "/images/situation.jpg",
} as const;
/** Produit dont la photo illustre la catégorie (tuiles du catalogue). */
export const CATEGORY_COVER: Record<CategoryId, string> = {
  bureaux: "lift", chaises: "axis", ecrans: "view27", docks: "dock12", saisie: "k2", visio: "talk", eclairage: "lumen",
};

export interface Product {
  id: string;
  /** Segment d'URL : /produit/[slug]. */
  slug: string;
  ref: string;
  cat: CategoryId;
  type: string;
  name: string;
  /** Prix Cyber Monday, € HT. */
  ht: number;
  /** Prix catalogue, € HT. */
  was: number;
  stock: number;
  /** Stock initial alloué à l'opération. */
  init: number;
  rating: number;
  reviews: number;
  /** Durée de garantie en années. */
  warrantyYears: number;
  norm: string;
  short: string;
  /** 5 bénéfices : ergonomie, productivité, normes, durabilité, garantie. */
  benefits: [string, string, string, string, string];
  specs: { k: string; v: string }[];
}

const S = (a: [string, string][]) => a.map(([k, v]) => ({ k, v }));

export const PRODUCTS: Product[] = [
  {
    id: "lift", slug: "lift-pro-160", ref: "EL-160", cat: "bureaux", type: "Bureau assis-debout", name: "Établi Lift Pro 160",
    ht: 749, was: 999, stock: 14, init: 60, rating: 4.8, reviews: 312, warrantyYears: 5, norm: "EN 527-1",
    short: "Double moteur, hauteur 62–128 cm, 3 positions mémorisées.",
    benefits: [
      "Réglable de 62 à 128 cm : alterner assis et debout réduit la fatigue lombaire et la sédentarité.",
      "3 positions mémorisées, montée en 12 s, fonctionnement silencieux sous 45 dB.",
      "Conforme EN 527-1 et NF D 65-761. Stabilité testée sous 150 kg.",
      "Piètement en acier recyclé à 70 %, plateau certifié FSC, pièces détachées 10 ans.",
      "5 ans pièces et moteurs, extensible à 7 ans.",
    ],
    specs: S([["Plateau", "160 × 80 cm, chêne FSC ou blanc"], ["Hauteur", "62 – 128 cm"], ["Charge max.", "150 kg"], ["Moteurs", "2, anti-collision"], ["Délai", "3 à 5 jours ouvrés"]]),
  },
  {
    id: "axis", slug: "axis", ref: "EA-01", cat: "chaises", type: "Chaise ergonomique", name: "Établi Axis",
    ht: 529, was: 719, stock: 22, init: 80, rating: 4.7, reviews: 486, warrantyYears: 10, norm: "NF EN 1335",
    short: "Soutien lombaire réglable, résille respirante, conçue pour 8 h par jour.",
    benefits: [
      "Soutien lombaire réglable en hauteur et profondeur, accoudoirs 4D, assise coulissante.",
      "Résille respirante et bascule synchrone : confort constant sur une journée complète.",
      "Conforme NF EN 1335-1/2/3, certifiée NF Office Excellence.",
      "Testée à 150 000 cycles, 85 % recyclable, dossier et mécanisme remplaçables.",
      "10 ans sur la structure, 5 ans sur le mécanisme.",
    ],
    specs: S([["Hauteur d'assise", "42 – 54 cm"], ["Poids utilisateur", "jusqu’à 150 kg"], ["Réglages", "12"], ["Coloris", "Graphite, Sable"]]),
  },
  {
    id: "view27", slug: "view-27", ref: "EV-27U", cat: "ecrans", type: 'Écran 27" 4K USB-C', name: "Établi View 27",
    ht: 389, was: 479, stock: 31, init: 120, rating: 4.6, reviews: 205, warrantyYears: 3, norm: "TCO Certified",
    short: "Dalle IPS 4K, USB-C 90 W et hub intégré : un seul câble.",
    benefits: [
      "Pied réglable en hauteur, inclinaison et pivot ; filtre lumière bleue certifié TÜV.",
      "Un seul câble USB-C 90 W pour image, charge et périphériques.",
      "TCO Certified Gen. 9, EPEAT Gold, conforme ErP.",
      "Châssis en plastique recyclé à 85 %, consommation typique 24 W.",
      "3 ans sur site, garantie zéro pixel mort.",
    ],
    specs: S([["Dalle", '27" IPS, 3840 × 2160'], ["Connectique", "USB-C 90 W, HDMI 2.0, DP 1.4"], ["Luminosité", "350 cd/m²"], ["VESA", "100 × 100"]]),
  },
  {
    id: "flex2", slug: "flex-duo", ref: "EF-D2", cat: "ecrans", type: "Bras d'écran double", name: "Établi Flex Duo",
    ht: 119, was: 159, stock: 9, init: 50, rating: 4.7, reviews: 158, warrantyYears: 5, norm: "VESA 75/100",
    short: "Deux écrans jusqu'à 32\", vérin à gaz, passage de câbles intégré.",
    benefits: [
      "Écrans à hauteur des yeux et à bonne distance : moins de tensions cervicales.",
      "Libère jusqu’à 40 % de surface de bureau.",
      "Compatible VESA 75/100, fixation testée à 2 × 9 kg.",
      "Aluminium, réglages sans outil, pièces remplaçables.",
      "5 ans.",
    ],
    specs: S([["Écrans", '2 × 17" à 32"'], ["Charge", "2 – 9 kg par bras"], ["Fixation", "Pince ou œillet"], ["Rotation", "360°"]]),
  },
  {
    id: "dock12", slug: "dock-12-tb4", ref: "ED-12", cat: "docks", type: "Station d'accueil", name: "Établi Dock 12 TB4",
    ht: 189, was: 249, stock: 27, init: 90, rating: 4.5, reviews: 97, warrantyYears: 3, norm: "Thunderbolt 4",
    short: "12 ports, deux écrans 4K, charge 96 W, Mac et Windows.",
    benefits: [
      "Un câble pour passer du nomade au poste fixe.",
      "Double affichage 4K 60 Hz, Ethernet 2,5 Gb/s, charge 96 W.",
      "Certifié Thunderbolt 4, conforme CE / RoHS.",
      "Boîtier aluminium, mises à jour firmware 5 ans.",
      "3 ans.",
    ],
    specs: S([["Ports", "12 dont 3 × TB4"], ["Charge", "96 W"], ["Écrans", "2 × 4K 60 Hz"], ["Réseau", "2,5 GbE"]]),
  },
  {
    id: "k2", slug: "k2-split", ref: "EK-2S", cat: "saisie", type: "Clavier ergonomique", name: "Établi K2 Split",
    ht: 99, was: 129, stock: 40, init: 150, rating: 4.6, reviews: 241, warrantyYears: 3, norm: "AZERTY NF",
    short: "Clavier scindé à inclinaison négative, AZERTY, 3 appareils.",
    benefits: [
      "Deux demi-claviers et repose-poignets : position neutre des poignets et des épaules.",
      "Multi-appareils (3), touches silencieuses, raccourcis programmables.",
      "Disposition AZERTY NF Z71-300 disponible.",
      "Batterie 12 mois, plastique recyclé à 60 %.",
      "3 ans.",
    ],
    specs: S([["Connexion", "Bluetooth, dongle USB-C"], ["Autonomie", "12 mois"], ["Disposition", "AZERTY, AZERTY NF"], ["Appareils", "3"]]),
  },
  {
    id: "m1", slug: "m1-vertical", ref: "EM-1V", cat: "saisie", type: "Souris verticale", name: "Établi M1 Vertical",
    ht: 59, was: 79, stock: 52, init: 200, rating: 4.5, reviews: 330, warrantyYears: 2, norm: "Prévention TMS",
    short: "Poignée à 57°, capteur 4000 dpi, rechargeable USB-C.",
    benefits: [
      "Poignée à 57° : moins de pression sur le canal carpien.",
      "Défilement rapide, 6 boutons programmables.",
      "Conforme CE, recommandée en prévention des TMS.",
      "Batterie rechargeable, 70 jours d’autonomie.",
      "2 ans.",
    ],
    specs: S([["Angle", "57°"], ["Capteur", "400 – 4000 dpi"], ["Autonomie", "70 jours"], ["Taille", "M ou L"]]),
  },
  {
    id: "talk", slug: "talk-anc", ref: "ET-ANC", cat: "visio", type: "Casque visioconférence", name: "Établi Talk ANC",
    ht: 149, was: 199, stock: 19, init: 80, rating: 4.6, reviews: 178, warrantyYears: 2, norm: "Certifié Teams",
    short: "Réduction de bruit active, micro perche, certifié Teams et Zoom.",
    benefits: [
      "180 g, coussinets à mémoire de forme : confortable sur une journée d’appels.",
      "Micro perche avec suppression de bruit, bouton Teams dédié.",
      "Certifié Microsoft Teams et Zoom ; protection acoustique EN 50332.",
      "Coussinets remplaçables, autonomie 40 h.",
      "2 ans, remplacement anticipé.",
    ],
    specs: S([["Autonomie", "40 h"], ["Connexion", "Bluetooth 5.3, dongle USB-C"], ["Poids", "180 g"], ["Certifications", "Teams, Zoom"]]),
  },
  {
    id: "cam4k", slug: "cam-4k", ref: "EC-4K", cat: "visio", type: "Webcam 4K", name: "Établi Cam 4K",
    ht: 119, was: 159, stock: 11, init: 70, rating: 4.4, reviews: 122, warrantyYears: 2, norm: "Certifiée Zoom",
    short: "4K, cadrage automatique et correction de lumière.",
    benefits: [
      "Cadrage automatique : restez naturel sans vous pencher vers l’écran.",
      "Correction de lumière, double micro, volet de confidentialité.",
      "Certifiée Teams / Zoom, traitement local sans cloud.",
      "Fixation universelle, firmware maintenu 5 ans.",
      "2 ans.",
    ],
    specs: S([["Résolution", "4K 30 i/s, 1080p 60 i/s"], ["Champ", "65 – 90°"], ["Micros", "2"], ["Fixation", "Écran ou trépied"]]),
  },
  {
    id: "lumen", slug: "lumen", ref: "EL-LED", cat: "eclairage", type: "Lampe LED asymétrique", name: "Établi Lumen",
    ht: 139, was: 179, stock: 24, init: 90, rating: 4.7, reviews: 88, warrantyYears: 5, norm: "EN 12464-1",
    short: "Éclairage sans reflet sur l'écran, 2700–6500 K, capteur de présence.",
    benefits: [
      "Éclairage asymétrique sans reflet, 500 lux sur le plan de travail.",
      "Température réglable et capteur de présence.",
      "Conforme EN 12464-1 (lieux de travail), UGR < 19.",
      "LED 50 000 h, 7 W, aluminium recyclable.",
      "5 ans.",
    ],
    specs: S([["Flux", "500 lux à 50 cm"], ["Température", "2700 – 6500 K"], ["Consommation", "7 W"], ["Fixation", "Pied ou pince"]]),
  },
];

const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
const bySlug = new Map(PRODUCTS.map((p) => [p.slug, p]));

export function getProduct(id: string): Product | undefined {
  return byId.get(id);
}
export function getProductBySlug(slug: string): Product | undefined {
  return bySlug.get(slug);
}
/** Variante qui échoue bruyamment : pour les ids issus du code, jamais de l'utilisateur. */
export function mustProduct(id: string): Product {
  const p = byId.get(id);
  if (!p) throw new Error(`Produit inconnu : ${id}`);
  return p;
}

/** Pack « Complete Your Workspace » : somme des 6 articles − 12 %. */
export const BUNDLE_IDS = ["lift", "axis", "view27", "flex2", "k2", "m1"] as const;
export const BUNDLE_DISCOUNT = 0.12;
export const BUNDLE_NAME = "Pack Complete Your Workspace";
export const BUNDLE_SUB = "Bureau, chaise, écran 27\", bras, clavier, souris";

/** Paliers de remise volume (postes → % de remise sur le sous-total HT). */
export const TIERS = [
  { n: 3, p: 5 },
  { n: 5, p: 10 },
  { n: 10, p: 15 },
] as const;

export const BADGES: Record<string, string> = {
  lift: "Meilleure vente",
  axis: "N°1 des office managers",
  view27: "Recommandé IT",
  talk: "Choix des équipes hybrides",
  flex2: "Souvent acheté ensemble",
};

export const BOUGHT: Record<string, number> = {
  lift: 143, axis: 212, view27: 168, flex2: 96, dock12: 74, k2: 88, m1: 131, talk: 102, cam4k: 57, lumen: 49,
};

/** Produits vedettes de l'accueil. */
export const FEATURED_IDS = ["lift", "axis", "view27", "talk"];
/** Suggestions cross-sell du panier (dans cet ordre, hors produits déjà au panier). */
export const CROSS_SELL_IDS = ["lumen", "talk", "cam4k", "dock12", "flex2", "m1"];

export interface Review {
  name: string; role: string; co: string; stars: string; title: string; text: string; product: string;
}
export const REVIEWS: Review[] = [
  { name: "Claire Dubreuil", role: "Office manager", co: "Studio de design · 45 salariés", stars: "★★★★★", title: "18 postes équipés en une commande", text: "Devis reçu en 3 heures, livraison et montage sur site le même jour. Les équipes ont adopté les bureaux assis-debout dès la première semaine.", product: "Pack Complete Your Workspace × 18" },
  { name: "Mehdi Benali", role: "Responsable achats", co: "ESN · 220 salariés", stars: "★★★★★", title: "Bon de commande et paiement à 30 jours", text: "Bon de commande accepté, facture PDF conforme immédiatement. Exactement ce qu'il faut pour notre circuit de validation.", product: "Établi Axis × 40" },
  { name: "Sophie Laurent", role: "Consultante indépendante", co: "Entreprise individuelle", stars: "★★★★★", title: "Mes journées ont changé", text: "La chaise Axis et le bras d'écran ont réglé mes douleurs de nuque. Prix HT clairs, TVA récupérable, rien à redire.", product: "Établi Axis + Flex Duo" },
  { name: "Thomas Girard", role: "DAF", co: "Cabinet comptable · 18 salariés", stars: "★★★★☆", title: "Remise volume bien pensée", text: "Le palier −10 % dès 5 postes a fait la différence face à notre fournisseur habituel. Délai un peu serré sur les écrans.", product: "Établi View 27 × 6" },
];

export const LOGOS = [
  { name: "HALDEN", weight: 700, spacing: "0.18em", serif: false },
  { name: "vektor", weight: 600, spacing: "-0.04em", serif: false },
  { name: "Maison Ferro", weight: 400, spacing: "0.02em", serif: true },
  { name: "LUMIO", weight: 500, spacing: "0.3em", serif: false },
  { name: "Atelier Nord", weight: 650, spacing: "-0.02em", serif: false },
  { name: "brisk&co", weight: 500, spacing: "0", serif: false },
];

export interface LiveOrder { who: string; co: string; city: string; what: string; ago: string }
export const LIVE_ORDERS: LiveOrder[] = [
  { who: "Office manager", co: "agence de 32 salariés", city: "Lyon", what: "6 × Pack Complete Your Workspace", ago: "il y a 4 min" },
  { who: "Responsable achats", co: "ESN de 180 salariés", city: "Nantes", what: "24 × Établi Axis", ago: "il y a 9 min" },
  { who: "Consultant indépendant", co: "entreprise individuelle", city: "Bordeaux", what: "Établi Lift Pro 160 + Flex Duo", ago: "il y a 12 min" },
  { who: "DAF", co: "cabinet de 15 salariés", city: "Lille", what: "5 × Établi View 27", ago: "il y a 18 min" },
  { who: "Office manager", co: "start-up de 60 salariés", city: "Paris", what: "10 × Établi Talk ANC", ago: "il y a 23 min" },
];

export const PAYMENT_BADGES = ["CB", "Visa", "Mastercard", "Virement SEPA", "Paiement 30 j", "Bon de commande", "3-D Secure"];

export type PaymentMethod = "card" | "transfer" | "net30" | "po";
export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  card: "Carte bancaire",
  transfer: "Virement SEPA",
  net30: "Paiement à 30 jours",
  po: "Bon de commande",
};

/** Coordonnées de la société : fictives, à remplacer (voir README). */
export const COMPANY = {
  name: "Etabli SAS",
  address: "12 rue du Faubourg, 75011 Paris",
  siret: "912 345 678 00017",
  vat: "FR27912345678",
  rcs: "RCS Paris 912 345 678",
  phone: "01 84 60 12 00",
  iban: "FR76 3000 4000 0312 3456 7890 143",
  bic: "BNPAFRPP",
};
