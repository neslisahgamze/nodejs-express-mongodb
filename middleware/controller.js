/**
 * @desc
 * @method  - POST
 */

 const query = require('../helper/query');
 const { MESSAGES, CODE } = require('../helper/constant')

 exports.filterData = async (req, res) => {
  const { startDate, endDate, minCount, maxCount } = req.body;

  let description = MESSAGES.SUCCESS;

  try { 
    const records = await query(startDate, endDate, minCount, maxCount);

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
