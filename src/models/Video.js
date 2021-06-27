import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80 },
    fileUrl: { type:String, required: true },
    description: { type: String, required: true, trim: true, minLength: 20 },
    createdAt: { type: Date, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0 },
        rating: { type: Number, default: 0 }
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" } 
});

videoSchema.static( 'formatHashtags', function( hashtags ) {
    return hashtags.split( "," ).map( ( word ) => word.startsWith( "#" ) ? word : `#${word}` );
} );

const video = mongoose.model( "video", videoSchema );
export default video;
