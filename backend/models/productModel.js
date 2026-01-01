import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        images: { type: Array , required: true },
        subCategory: { type: String , required: true },
        size: { type: Array ,  required: true },
        bestSeller: { type: Boolean, required: true },
        date : { type: Date, required: true },
    },
);

const productModel = mongoose.models.product || mongoose.model('Product', productSchema);
export default productModel;