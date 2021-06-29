/**
 * @desc
 * @method  - POST
 */

 const db = require('./helper/db');

 exports.filterData = async (req, res) => {
  const { startDate, endDate, minCount, maxCount } = req.body;

  try { 
    const records = await db(startDate, endDate, minCount, maxCount);

    if (!records.length) {
      res.json('No data available')
    }

    const payload = {
      "code": 0,
      "msg":"Success",
      records
    };

    res.json(payload);
  } catch(err) {
    res.json('Error occured...');
  }
}
