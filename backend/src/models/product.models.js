import mongoose,{Schema} from 'mongoose';

const specificationsSchema = new Schema({
  netQuantity: String,
  shelfLife: String,
  countryOfOrigin: String,
  usageInstructions: String
}, { _id: false });

const productSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        shortDescription: {
            type: String,
            required: true,
            trim: true
        },
        longDescription: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        imageUrl: {
            type: String,
            required: true
        },
        specification: specificationsSchema,
        rating:{
            type: Number
        },
        reviews: {
            type: Number
        },
    },
    {
        timestamps: true
    })

    export const Product = mongoose.model('Product', productSchema)