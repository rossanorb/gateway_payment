import { registerAs } from "@nestjs/config";

export default registerAs('configPaymentGateway', () => ({
    erede: {
        pv: process.env.EREDE_PV,
        token: process.env.EREDE_TOKEN,
        url: process.env.EREDE_URL
    },
    cielo: {
        merchantId: process.env.CIELO_MERCHANTID,
        merchantKey: process.env.CIELO_MERCHANTKEY,
        apiQueryUrl: process.env.CIELO_API_QUERY_URL,
        apiUrl: process.env.CIELO_API_URL,
        PaymentId: process.env.CIELO_PAYMENTID
    }
}));