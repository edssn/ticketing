import mongoose from "mongoose";

interface PaymentAttrs {
    orderId: string;
    stripeId: string;
}

interface PaymentDoc extends mongoose.Document {
    orderId: string;
    stripeId: string;
}

interface PaymentModel extends mongoose.Model<PaymentDoc>{
    build(attrs: PaymentAttrs): PaymentDoc;
}

const paymentsSchema = new mongoose.Schema({
    orderId: {
        required: true,
        type: String,
    },
    stripeId: {
        required: true,
        type: String,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

paymentsSchema.statics.build = (attrs: PaymentAttrs) => {
    return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>('Payment', paymentsSchema);

export { Payment };