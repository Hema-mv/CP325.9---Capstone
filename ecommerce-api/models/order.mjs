import mongoose from 'mongoose';
import OrderDetail from './orderDetail.mjs';

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderDetail', required: true }],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;