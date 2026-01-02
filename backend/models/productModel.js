import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    images: { type: Array, required: true }, // Matches imagesUrl
    size: { type: Array, required: true },   // Matches JSON.parse(sizes)
    bestSeller: { type: Boolean, required: true },
    date: { type: Number, required: true },  // Changed to Number for Date.now()
});

const productModel = mongoose.models.product || mongoose.model('Product', productSchema);
export default productModel;