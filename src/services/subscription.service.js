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

  /**
   * Finds all subscribers to a topic
   * @param {Object} filter
   * @return {Promise<Boolean|Object>}
   */
  static async findAll(filter) {
    try {
      return await Subscription.find(filter).sort({ _id: -1 }).lean();
    } catch (e) {
      Logger.error(e.stack);
      return false;
    }
  }
}
