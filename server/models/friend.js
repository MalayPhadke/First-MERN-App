const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FriendSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    desc: {
        type: String
    },
});

module.exports = mongoose.model('Friend', FriendSchema)


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema
// const passportLocalMongoose = require('passport-local-mongoose');

// const UserSchema = new Schema({
//     watchlist: {
//         title: String,
//         image_url: String,
//         synopsis: String,
//         episodes: Number,
//         score: Number,
//         type: String,
//         status: {
//             type: String,
//             enum: ['Completed', 'Watching', 'Considering', 'On Hold'],
//             default: 'Watching'
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     }
// })

// UserSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model("User", UserSchema);