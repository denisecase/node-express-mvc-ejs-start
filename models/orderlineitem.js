/** 
*  Order Line Item model
*  Describes the characteristics of each attribute in an order line item - one entry on a customer's order.
*
* @author Denise Case <dcase@nwmissouri.edu>
*
*/

// see <https://mongoosejs.com/> for more information
const mongoose = require('mongoose')

const OrderLineItemSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  orderID: { type: Number, required: true },
  lineNumber: { type: Number, required: true },
  productID: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 }
})

module.exports = mongoose.model('OrderLineItem', OrderLineItemSchema)
