import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  experience: {
    years: {
      type: Number,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
  },
  location: {
    clinic: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  fees: {
    type: Number,
    required: true,
  },
  cashback: {
    type: Number,
    default: null,
  },
  rating: {
    percentage: {
      type: Number,
      default: null,
    },
    totalPatients: {
      type: Number,
      default: null,
    },
  },
  isDoctorOfTheHour: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    enum: ['Available Now', 'Available Today', 'Available Tomorrow','Not Available'],
    required: true,
  },
  languages: [{
    type: String,
    required: true,
  }],
  modeOfConsult: [{
    type: String,
    enum: ['Hospital Visit', 'Online'],
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'doctors'
});

// Create indexes for better query performance
doctorSchema.index({ 'experience.years': 1 });
doctorSchema.index({ fees: 1 });
doctorSchema.index({ availability: 1 });
doctorSchema.index({ languages: 1 });
doctorSchema.index({ modeOfConsult: 1 });

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export default Doctor; 