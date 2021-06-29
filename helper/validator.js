const {check, validationResult} = require('express-validator');

exports.validaResponseData = [
  check('startDate')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Start date can not be empty!')
    .isISO8601()
    .toDate(),
  check('endDate')
    .escape()
    .not()
    .isEmpty()
    .withMessage('End date can not be empty!')
    .isISO8601()
    .toDate(),
  check('minCount')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .isNumeric(),
  check('maxCount')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];