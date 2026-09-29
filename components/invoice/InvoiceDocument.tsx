import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { COMPANY, PAYMENT_LABELS } from "@/lib/catalog";
import { eur2, formatShortDate, pdfSafe } from "@/lib/format";
import type { Order } from "@/lib/store";

const s = StyleSheet.create({
  page: { paddingTop: 50, paddingHorizontal: 50, paddingBottom: 70, fontFamily: "Helvetica", fontSize: 10, color: "#15181E" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  h1: { fontFamily: "Helvetica-Bold", fontSize: 22 },
  small: { fontSize: 9, marginTop: 3 },
  bold: { fontFamily: "Helvetica-Bold" },
  right: { textAlign: "right" },
  rule: { borderBottomWidth: 0.6, borderBottomColor: "#D1D1D1", marginVertical: 12 },
  th: { fontFamily: "Helvetica-Bold", fontSize: 9 },
  col1: { width: "46%" },
  colQty: { width: "10%", textAlign: "right" },
  colPu: { width: "20%", textAlign: "right" },
  colTot: { width: "24%", textAlign: "right" },
  line: { flexDirection: "row", marginBottom: 7 },
  totals: { alignSelf: "flex-end", width: "52%", marginTop: 6 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  footer: { position: "absolute", left: 50, right: 50, bottom: 40, fontSize: 8 },
});

const t = (v: string | number) => pdfSafe(String(v));

/** Facture PDF : mentions légales, SIRET client, lignes, remise, TVA, échéance ou IBAN selon le paiement. */
export function InvoiceDocument({ order: o }: { order: Order }) {
  const invoiceNo = "F-" + o.no.slice(4);
  return (
    <Document title={`Facture ${invoiceNo}`} author={COMPANY.name}>
      <Page size="A4" style={s.page}>
        <View style={s.row}>
          <View>
            <Text style={s.h1}>établi</Text>
            <Text style={s.small}>{t(`${COMPANY.name} - ${COMPANY.address}`)}</Text>
            <Text style={s.small}>{t(`SIRET ${COMPANY.siret} - TVA ${COMPANY.vat}`)}</Text>
          </View>
          <View style={s.right}>
            <Text style={[s.bold, { fontSize: 16 }]}>FACTURE</Text>
            <Text style={{ marginTop: 3 }}>{t(`N° ${invoiceNo}`)}</Text>
            <Text style={{ marginTop: 3 }}>{t(`Date : ${formatShortDate(o.date)}`)}</Text>
            <Text style={{ marginTop: 3 }}>{t(`Commande ${o.no}`)}</Text>
          </View>
        </View>
        <View style={s.rule} />

        <View style={[s.row, { marginBottom: 6 }]}>
          <View style={{ width: "55%" }}>
            <Text style={[s.bold, { fontSize: 9 }]}>Facturé à</Text>
            <Text style={[s.bold, { fontSize: 11, marginTop: 5 }]}>{t(o.company)}</Text>
            <Text style={s.small}>{t(`SIRET ${o.siret}${o.vatNo ? ` - TVA ${o.vatNo}` : ""}`)}</Text>
            <Text style={s.small}>{t(o.bill)}</Text>
            <Text style={s.small}>{t(`${o.contact} - ${o.email}`)}</Text>
          </View>
          <View style={{ width: "40%" }}>
            <Text style={[s.bold, { fontSize: 9 }]}>Livraison</Text>
            <Text style={[s.small, { marginTop: 5 }]}>{t(o.addr)}</Text>
            <Text style={s.small}>{t(`Prévue le ${o.deliv}`)}</Text>
          </View>
        </View>

        <View style={[s.line, { marginTop: 18 }]}>
          <Text style={[s.th, s.col1]}>Désignation</Text>
          <Text style={[s.th, s.colQty]}>Qté</Text>
          <Text style={[s.th, s.colPu]}>PU HT</Text>
          <Text style={[s.th, s.colTot]}>Total HT</Text>
        </View>
        <View style={[s.rule, { marginTop: 0, marginBottom: 10 }]} />
        {o.items.map((i) => (
          <View key={i.name} style={s.line} wrap={false}>
            <Text style={s.col1}>{t(i.name)}</Text>
            <Text style={s.colQty}>{i.qty}</Text>
            <Text style={s.colPu}>{t(eur2(i.unit))}</Text>
            <Text style={s.colTot}>{t(eur2(i.unit * i.qty))}</Text>
          </View>
        ))}
        <View style={s.rule} />

        <View style={s.totals} wrap={false}>
          <Row label="Sous-total HT" value={eur2(o.sub)} />
          {o.vol > 0 && <Row label={`Remise volume -${o.tier} %`} value={"-" + eur2(o.vol)} />}
          <Row label="Livraison" value={o.ship ? eur2(o.ship) : "Offerte"} />
          {o.inst > 0 && <Row label="Installation sur site" value={eur2(o.inst)} />}
          <Row label="Total HT" value={eur2(o.base)} bold />
          <Row label="TVA 20 %" value={eur2(o.tva)} />
          <View style={[s.totalRow, { marginTop: 4 }]}>
            <Text style={[s.bold, { fontSize: 13 }]}>Total TTC</Text>
            <Text style={[s.bold, { fontSize: 13 }]}>{t(eur2(o.ttc))}</Text>
          </View>
        </View>

        <View style={{ marginTop: 28 }} wrap={false}>
          <Text style={s.bold}>{t(`Règlement : ${PAYMENT_LABELS[o.pay]}${o.pay === "po" && o.po ? ` - BC ${o.po}` : ""}`)}</Text>
          {o.pay === "net30" && <Text style={s.small}>{t(`Échéance : ${formatShortDate(o.date + 30 * 864e5)}`)}</Text>}
          {o.pay === "transfer" && <Text style={s.small}>{t(`IBAN ${COMPANY.iban} - BIC ${COMPANY.bic}`)}</Text>}
        </View>

        <View style={s.footer} fixed>
          <Text>Pénalités de retard : 3 fois le taux d&apos;intérêt légal. Indemnité forfaitaire pour frais de recouvrement : 40 €.</Text>
          <Text style={{ marginTop: 3 }}>Garantie constructeur incluse - Retours acceptés sous 30 jours.</Text>
        </View>
      </Page>
    </Document>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={s.totalRow}>
      <Text style={bold ? s.bold : undefined}>{t(label)}</Text>
      <Text style={bold ? s.bold : undefined}>{t(value)}</Text>
    </View>
  );
}
