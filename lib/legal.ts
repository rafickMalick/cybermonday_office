// Textes légaux : rédigés pour le prototype, à faire relire par un juriste avant mise en ligne.

export interface LegalDoc {
  id: string;
  title: string;
  updated: string;
  sections: { h: string; p: string[] }[];
}

export const LEGAL_DOCS: LegalDoc[] = [
  {
    id: "mentions", title: "Mentions légales", updated: "1er septembre 2026",
    sections: [
      { h: "Éditeur du site", p: [
        "Etabli SAS, société par actions simplifiée au capital de 250 000 €, immatriculée au RCS de Paris sous le numéro 912 345 678.",
        "Siège social : 12 rue du Faubourg, 75011 Paris. TVA intracommunautaire : FR27912345678.",
        "Directrice de la publication : Hélène Carrière, Présidente. Contact : contact@etabli.pro · 01 84 60 12 00.",
      ] },
      { h: "Hébergement", p: ["Le site est hébergé par OVH SAS, 2 rue Kellermann, 59100 Roubaix, France."] },
      { h: "Propriété intellectuelle", p: ["L'ensemble des contenus (textes, visuels, marques, logos) est la propriété d'Etabli SAS ou de ses partenaires. Toute reproduction sans autorisation écrite est interdite."] },
    ],
  },
  {
    id: "cgv", title: "Conditions générales de vente", updated: "1er septembre 2026",
    sections: [
      { h: "1. Champ d’application", p: [
        "Les présentes conditions s’appliquent aux ventes conclues entre Etabli SAS et tout acheteur professionnel (entreprise, profession libérale, association, administration) agissant dans le cadre de son activité.",
        "Les ventes aux consommateurs sont régies par des conditions distinctes, disponibles sur demande.",
      ] },
      { h: "2. Prix", p: [
        "Les prix sont indiqués en euros hors taxes (HT) et toutes taxes comprises (TTC, TVA 20 %), éco-participation incluse. Les prix Cyber Monday sont valables jusqu’à la date indiquée ou dans la limite des stocks alloués.",
        "Les remises sur volume (−5 % dès 3 postes, −10 % dès 5, −15 % dès 10) sont calculées sur le sous-total HT et cumulables avec les offres en cours, hors devis spécifique.",
      ] },
      { h: "3. Commande et devis", p: ["La commande est ferme dès sa validation et l’envoi de la confirmation par e-mail. Les devis sont valables 15 jours."] },
      { h: "4. Paiement", p: [
        "Carte bancaire et virement SEPA : paiement comptant. Paiement à 30 jours et bon de commande : réservés aux entreprises dont le SIRET est validé, facture payable à 30 jours date de facture.",
        "Tout retard entraîne des pénalités égales à trois fois le taux d’intérêt légal et une indemnité forfaitaire pour frais de recouvrement de 40 € (art. L441-10 du Code de commerce).",
      ] },
      { h: "5. Livraison et installation", p: [
        "Livraison en France métropolitaine sous 3 à 5 jours ouvrés, offerte dès 300 € HT. L’installation sur site (49 € HT par poste) comprend le montage, les réglages et la reprise des emballages.",
        "Les réserves éventuelles doivent être portées sur le bon de livraison et confirmées sous 3 jours (art. L133-3 du Code de commerce).",
      ] },
      { h: "6. Retours", p: ["À titre commercial, Etabli accepte les retours sous 30 jours à compter de la livraison, pour tout produit complet dans son emballage d’origine. L’enlèvement est gratuit ; le remboursement intervient sous 14 jours."] },
      { h: "7. Garanties", p: ["Chaque produit bénéficie de la garantie constructeur indiquée sur sa fiche (2 à 10 ans), extensible à la commande. La garantie légale des vices cachés s’applique (art. 1641 du Code civil)."] },
      { h: "8. Réserve de propriété", p: ["Les produits restent la propriété d’Etabli SAS jusqu’au paiement intégral du prix. Les risques sont transférés à l’acheteur dès la livraison."] },
      { h: "9. Litiges", p: ["Les présentes conditions sont soumises au droit français. À défaut d’accord amiable, compétence est attribuée au Tribunal de commerce de Paris."] },
    ],
  },
  {
    id: "cgu", title: "Conditions d'utilisation", updated: "1er septembre 2026",
    sections: [
      { h: "Objet", p: ["Les présentes conditions encadrent l’accès et l’utilisation du site etabli.pro et du compte entreprise."] },
      { h: "Compte entreprise", p: ["L’utilisateur garantit l’exactitude des informations de sa société (raison sociale, SIRET, TVA). Il est responsable de la confidentialité de ses identifiants et des commandes passées depuis son compte."] },
      { h: "Usage du site", p: ["Toute utilisation automatisée (extraction de prix, robots) ou contraire à l’ordre public est interdite. Etabli peut suspendre un compte en cas d’usage abusif."] },
      { h: "Responsabilité", p: ["Etabli s’efforce d’assurer l’exactitude des informations publiées mais ne saurait être tenue responsable d’une interruption temporaire du service."] },
    ],
  },
  {
    id: "confidentialite", title: "Politique de confidentialité", updated: "1er septembre 2026",
    sections: [
      { h: "Responsable du traitement", p: ["Etabli SAS traite vos données personnelles conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés. Délégué à la protection des données : dpo@etabli.pro."] },
      { h: "Données collectées", p: ["Identité et coordonnées professionnelles (nom, fonction, e-mail, téléphone), données société (raison sociale, SIRET, TVA, adresses), historique de commandes. Les données bancaires sont traitées exclusivement par notre prestataire de paiement certifié PCI-DSS."] },
      { h: "Finalités et bases légales", p: ["Exécution des commandes et facturation (contrat) ; obligations comptables et fiscales (obligation légale) ; prévention de la fraude et amélioration du service (intérêt légitime) ; prospection B2B, que vous pouvez refuser à tout moment."] },
      { h: "Durées de conservation", p: ["Données clients : 3 ans après la dernière commande. Factures : 10 ans (obligation comptable). Prospects : 3 ans après le dernier contact."] },
      { h: "Destinataires", p: ["Nos équipes, transporteurs et installateurs pour la livraison, prestataire de paiement, hébergeur. Aucune donnée n’est vendue. Les données sont hébergées dans l’Union européenne."] },
      { h: "Vos droits", p: ["Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité. Écrivez à dpo@etabli.pro. Vous pouvez également saisir la CNIL (cnil.fr)."] },
    ],
  },
  {
    id: "cookies", title: "Politique cookies", updated: "1er septembre 2026",
    sections: [
      { h: "Cookies nécessaires", p: ["Panier, préférence HT/TTC, sécurité et session. Ils ne peuvent pas être désactivés."] },
      { h: "Mesure d’audience", p: ["Statistiques anonymisées de fréquentation, déposées uniquement avec votre accord."] },
      { h: "Gestion de vos choix", p: ["Vous pouvez modifier vos préférences à tout moment via le lien « Gérer les cookies » en bas de page. Les cookies sont conservés 13 mois au maximum."] },
    ],
  },
];

export const getLegalDoc = (id: string): LegalDoc | undefined => LEGAL_DOCS.find((d) => d.id === id);
