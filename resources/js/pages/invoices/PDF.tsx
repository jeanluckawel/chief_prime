import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Types
type Customer = { name: string };
type Item = { description: string; quantity: number; unit_price: number };
type Invoice = {
    invoice_number: string;
    customer: Customer;
    items: Item[];
    total: number;
};

// Styles PDF
const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 14, fontFamily: 'Helvetica' },
    section: { marginBottom: 10, padding: 10 },
    header: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
});

// Document PDF
const InvoiceDocument: React.FC<{ invoice: Invoice }> = ({ invoice }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text>Invoice {invoice.invoice_number}</Text>
            </View>

            <View style={styles.section}>
                <Text>Customer: {invoice.customer.name}</Text>
            </View>

            <View style={styles.section}>
                {invoice.items.map((item, index) => (
                    <Text key={index}>
                        {item.description} — Qty: {item.quantity} — Unit: {item.unit_price} $
                    </Text>
                ))}
            </View>

            <View style={styles.section}>
                <Text>Total: {invoice.total} $</Text>
            </View>
        </Page>
    </Document>
);

// Composant React pour télécharger le PDF
export default function PDFPage({ invoice }: { invoice: Invoice }) {
    return (
        <div className="p-4">
            <h1>Invoice PDF</h1>
            <PDFDownloadLink
                document={<InvoiceDocument invoice={invoice} />}
                fileName={`invoice_${invoice.invoice_number}.pdf`}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '5px',
                }}
            >
                {({ loading }) => (loading ? 'Generating...' : 'Download PDF')}
            </PDFDownloadLink>
        </div>
    );
}
