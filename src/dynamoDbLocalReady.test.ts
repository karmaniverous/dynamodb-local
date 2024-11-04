import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { expect } from 'chai';

import { setupDynamoDbLocal, teardownDynamoDbLocal } from './docker';
import { dynamoDbLocalReady } from './dynamoDbLocalReady';
import { env } from './env';

const dynamoDbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: 'fakeAccessKeyId',
    secretAccessKey: 'fakeSecretAccessKey',
  },
  endpoint: 'http://localhost:8000',
  region: 'local',
});

describe('entityClient', function () {
  before(async function () {
    await setupDynamoDbLocal(env.dynamoDbLocalPort);
  });

  it('queries dynamodb tables', async function () {
    await dynamoDbLocalReady(dynamoDbClient);

    expect(true).to.be.true;
  });

  after(async function () {
    await teardownDynamoDbLocal();
  });
});
