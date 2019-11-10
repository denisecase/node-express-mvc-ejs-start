/** 
*  Order model
*  Describes the characteristics of each attribute in an order resource.
*
* @author Denise Case <dcase@nwmissouri.edu>
*
*/

// see <https://mongoosejs.com/> for more information
const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  orderID: { type: Number, required: true, unique: true, default: 555 },
  email: { type: String, required: true },
  datePlaced: { type: Date, required: true, default: Date.now() },
  dateShipped: { type: Date, required: false },
  paymentType: { type: String, enum: ['NA', 'credit card', 'cash', 'check'], required: true, default: 'NA' },
  paid: { type: Boolean, default: false }
})

module.exports = mongoose.model('Order', OrderSchema)
