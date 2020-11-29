import { Schema, model } from 'mongoose';

const subscription_schema = new Schema({
  topic: String,
  url: { type: String, unique: true, lowercase: true },
  active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: Date,
}, { versionKey: false });

const SubscriptionModel = model('Subscription', subscription_schema);

export default SubscriptionModel;
