import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tourSchema = new Schema({
    tourName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    hostedBy: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['planned', 'ongoing', 'completed'],
        default: 'planned',
    },
    people: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
    confirmed: {
        type: Boolean
    }
});

tourSchema.pre('save', function (next) {
    const currentDate = new Date();
    if (currentDate >= this.startDate && currentDate <= this.endDate) {
      this.status = 'ongoing';
    } else if (currentDate > this.endDate) {
      this.status = 'completed';
    }
    next();
  });
  
  const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
