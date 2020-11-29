import Logger from '../logger/winston';
import Models from '../models';

const { Subscription } = Models;
/**
 * Handles database logic for subscriptions
 */
export default class SubscriptionService {
  /**
     * Subscription data
     * @param {Object} data
     * @return {Promise<Boolean|Object>}
     */
  static async create(data) {
    try {
      return await Subscription.create(data);
    } catch (e) {
      Logger.error(e.stack);
      return false;
    }
  }
}
