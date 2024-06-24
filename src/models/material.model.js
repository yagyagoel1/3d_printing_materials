import { Schema } from 'mongoose';


const materialSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    technology: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    colors: {
        type: [String],
        required: true,
        trim: true,
        lowercase: true
    },
    pricePerGram: {
        type: Number,
        required: true

    },
    applicationTypes: {
        type: [String],
        required: true,
        trim: true,
        lowercase: true
    },
    imageUrl: {
        type: String,
        required: true
    },

});

const Material = mongoose.model('Material', materialSchema);