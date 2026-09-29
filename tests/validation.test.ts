import { describe, expect, it } from "vitest";
import { isCardExpiry, isEmail, isPostalCode, isSiret, isVatNumber, validateCheckout } from "@/lib/validation";

const valid = {
  email: "c.martin@halden.fr", prenom: "Camille", nom: "Martin", societe: "Halden SAS", siret: "832 456 789 00021",
  tva: "FR48832456789", adresse: "18 rue de Paradis", cp: "75010", ville: "Paris",
  card: "4242 4242 4242 4242", exp: "09/28", cvc: "123", po: "BC-1",
};
const now = new Date(2026, 8, 29);

describe("champs", () => {
  it("SIRET : 14 chiffres, espaces tolérés", () => {
    expect(isSiret("832 456 789 00021")).toBe(true);
    expect(isSiret("83245678900021")).toBe(true);
    expect(isSiret("8324567890002")).toBe(false);
    expect(isSiret("8324567890002A")).toBe(false);
  });
  it("TVA intracommunautaire", () => {
    expect(isVatNumber("FR48832456789")).toBe(true);
    expect(isVatNumber("fr48 832 456 789")).toBe(true);
    expect(isVatNumber("FR123")).toBe(false);
    expect(isVatNumber("4812345678901")).toBe(false);
  });
  it("code postal : 5 chiffres", () => {
    expect(isPostalCode("75010")).toBe(true);
    expect(isPostalCode("7501")).toBe(false);
    expect(isPostalCode("75 10")).toBe(false);
  });
  it("e-mail", () => {
    expect(isEmail("a@b.fr")).toBe(true);
    expect(isEmail("a@b")).toBe(false);
  });
  it("expiration de carte", () => {
    expect(isCardExpiry("09/28", now)).toBe(true);
    expect(isCardExpiry("09/26", now)).toBe(true); // valable jusqu'à la fin du mois
    expect(isCardExpiry("08/26", now)).toBe(false);
    expect(isCardExpiry("13/28", now)).toBe(false);
    expect(isCardExpiry("0928", now)).toBe(false);
  });
});

describe("validateCheckout", () => {
  const run = (over: Partial<Parameters<typeof validateCheckout>[0]> = {}) =>
    validateCheckout({ form: valid, pay: "card", billingDiff: false, cgvOk: true, now, ...over });

  it("accepte un formulaire complet", () => {
    expect(run()).toEqual({});
  });
  it("la TVA est facultative", () => {
    expect(run({ form: { ...valid, tva: "" } })).toEqual({});
    expect(run({ form: { ...valid, tva: "XX" } }).tva).toBeDefined();
  });
  it("exige les champs de base, le SIRET et les CGV", () => {
    const e = run({ form: {}, cgvOk: false });
    expect(Object.keys(e)).toEqual(expect.arrayContaining(["email", "prenom", "nom", "societe", "adresse", "cp", "ville", "siret", "card", "exp", "cvc", "cgv"]));
  });
  it("carte : 16 chiffres, expiration, cryptogramme", () => {
    expect(run({ form: { ...valid, card: "4242" } }).card).toBeDefined();
    expect(run({ form: { ...valid, exp: "" } }).exp).toBeDefined();
    expect(run({ form: { ...valid, cvc: "12" } }).cvc).toBeDefined();
  });
  it("hors carte, les champs de carte ne sont pas exigés", () => {
    expect(run({ pay: "transfer", form: { ...valid, card: "", exp: "", cvc: "" } })).toEqual({});
    expect(run({ pay: "net30", form: { ...valid, card: "" } })).toEqual({});
  });
  it("bon de commande : n° obligatoire", () => {
    expect(run({ pay: "po", form: { ...valid, po: "" } }).po).toBe("Numéro de bon de commande requis");
    expect(run({ pay: "po" })).toEqual({});
  });
  it("adresse de facturation distincte : champs requis", () => {
    const e = run({ billingDiff: true });
    expect(Object.keys(e).sort()).toEqual(["bAdresse", "bCp", "bVille"]);
    expect(run({ billingDiff: true, form: { ...valid, bAdresse: "1 rue X", bCp: "6900", bVille: "Lyon" } }).bCp).toBe("5 chiffres");
  });
});
