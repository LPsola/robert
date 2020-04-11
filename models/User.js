const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const addressSchema = new Schema({
  city: String,
  street: String,
  streetNumber: String,
  country: String,
  latitude: String,
  longitude: String
});

const userSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  address: addressSchema,
  bankDetails: String, // on rajoutera ca plus tard mais si tu as des idées go for it :)
  role: {
    type: String,
    enum: ['CARE_GIVER', 'CARE_RECEIVER'],
  },
  bio: String,
  rating: Number,
  careGiverId: { type: Schema.Types.ObjectId, ref: 'CareGiver' },
  careReceiverId: { type: Schema.Types.ObjectId, ref: 'CareReceiver' },
  password: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

userSchema.set('toJSON', {
  virtuals: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
