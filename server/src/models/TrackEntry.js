const mongoose = require('mongoose');

const {schema} = mongoose;

const stringRequired = {
    type: String,
    required: true
};

const trackEntrySchema = new Schema({
    title: stringRequired,
    text: stringRequired,
    comments: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0   
    },
    image: String,
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    },
    startDate:{
        type: Date,
        min: 0,
        default: Date.now
    },
    endDate: {
        type: Date,
        min: 0,
        default: Date.now
    },
    
   timestamps: true,
    
    
});

const trackEntry = mongoose.model('TrackEntry', trackEntrySchema);

module.exports = trackEntry;

/*

Title -Text
Text -Text
Comments -Text
Rating - 1-10
Image -URL
Latitiude -float
Longitude -float
Start Date -DateTime
End Date -DateTime
Created At - DateTime
Uploaded At -DateTime
*/