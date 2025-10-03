import mongoose, {Schema} from 'mongoose'

const cartItemsSchema = new Schema ({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})
const cartSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [cartItemsSchema]
},{ timestamps: true}
)

export const Cart = mongoose.model('Cart', cartSchema)