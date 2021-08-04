const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    cityId: {type: Number, required: true},
    owner: {type: Types.ObjectId, ref: 'User'},
})

module.exports = model('Fav', schema)