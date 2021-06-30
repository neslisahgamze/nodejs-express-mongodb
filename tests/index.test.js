const {MongoClient} = require('mongodb');
require("dotenv").config();
const query = require('../helper/query');
const request = require('supertest');
const app = require('../app');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should return []', async () => {
    const result = await query("2020-01-01", "2020-01-02", 23, 1200);
    expect(result).toStrictEqual([])
  });

  it('should return invalid data', async () => {
    const result = await query("2016-12-26", "2016-12-27", 170, 4300);
    expect(result).toStrictEqual(
      [{
        "createdAt": new Date('2016-12-26T20:04:41.545Z'),
        "key": "IKWfNFIs",
        "totalCount": 3575,
      },
      {
        "createdAt": new Date('2016-12-26T20:04:41.545Z'),
        "key": "IKWfNFIs",
        "totalCount": 3575,
      },
      {
        "createdAt": new Date('2016-12-26T08:39:01.409Z'),
        "key": "vJLRsZHB",
        "totalCount": 2369,
      },
    ])
  });

  it('should return data not available', async () => {
    const payload = {
      startDate: 2016-12-26,
      endDate: 2016-12-29,
      minCount: 170,
      maxCount: 4300
    }
    await request(app)
      .post('/')
      .send(payload)
      .expect({ code: 0, msg: 'Data not available', records: [] });
  });

  it('should return 200', async () => {
    const payload = {
      startDate: 2016-12-26,
      endDate: 2020-12-29,
      minCount: 170,
      maxCount: 4300
    }
    await request(app)
      .post('/')
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('should return invalid data', async () => {
    const payload = {
      startDate: 2016-12-26,
      endDate: 2020-12-29,
      minCount: "asas",
      maxCount: 4300
    }
    await request(app)
      .post('/')
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(422);
      });
  });

  it('should return invalid data without params', async () => {
    const payload = {
      startDate: 2016-12-26,
      endDate: 2020-12-29,
    }
    await request(app)
      .post('/')
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(422);
      });
  });
});

