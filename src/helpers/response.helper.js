import { STATUS_CODES } from '../constants';

/**
 * Customised responses
 * @export
 * @class Response
 */
export default class Response {
  /**
     * @static
     * @param {Object} res - response object
     * @param {Number} [code=STATUS.OK] http-status-code
     * @param {Object | null} data to return back
     * @param {Object} [meta=] any other information to be passed
     * @param {string} [status=OK] default OK, or ERROR
     * @memberOf Response
     * @returns {Object} response returned to user
     */
  static send(res, code = STATUS_CODES.OK, data, meta, status = 'success') {
    res.status(code).json({
      status,
      code,
      meta,
      data,
    });
  }
}
