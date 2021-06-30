/**
 * @desc
 * @method  - POST
 */

 const db = require('./helper/db');
 const { MESSAGES, CODE } = require('./constant')

 exports.filterData = async (req, res) => {
  const { startDate, endDate, minCount, maxCount } = req.body;

  let description = MESSAGES.SUCCESS;

  try { 
    const records = await db(startDate, endDate, minCount, maxCount);

    if (records && !records.length) {
      description = MESSAGES.NOT_AVAILABLE; 
    }

    const payload = {
      "code": CODE.SUCCESS,
      "msg": description,
      records
    };

    res.json(payload);
  } catch(err) {

    const payload = {
      "code": CODE.ERROR,
      "msg": MESSAGES.ERROR,
    };

    res.json(payload)
  }
}
