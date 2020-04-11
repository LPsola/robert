const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const careGiverSchema = new Schema({
    receiversServed: [{type : Schema.Types.ObjectId, ref: 'CareReceiver'}],
    favoriteReceivers:  [{type : Schema.Types.ObjectId, ref: 'CareReceiver'}],
    piggyBank: Number,
    spokenLanguages: [String],
    profileImage: String // cloudinary? config a faire
});

const CareGiver = mongoose.model('CareGiver', careGiverSchema);
module.exports = CareGiver;
