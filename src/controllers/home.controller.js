import Response from '../helpers/response.helper';
import { MESSAGES, STATUS_CODES } from '../constants';

const { WELCOME } = MESSAGES;

/**
 * This class creates the welcome response
 */
export default class HomeController {
  /**
     * Hello World to test the functions
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} - returns success/200 object
     */
  static helloWorld(req, res) {
    return Response.send(res, STATUS_CODES.OK, undefined, { message: WELCOME });
  }
}
