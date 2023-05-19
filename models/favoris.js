
const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectID;
const favoriteSchema = mongoose.model('favorite',

    {
        computerIds: [
            {
                type: objectId,
                required: true,
                ref: 'Computer',
            },
        ],
        userId: {
            type: objectId,
            required: true,
        },
    }
)
module.exports = favoriteSchema;
