import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { retry } from 'radash';

/**
 * Waits for a DynamoDB Local instance to be ready to receive commands.
 *
 * @param dynamoDbClient - {@link DynamoDBClient | `DynamoDBClient`} instance to check.
 */
export const dynamoDbLocalReady = async (
  dynamoDbClient: DynamoDBClient,
): Promise<void> => {
  await retry(
    {
      backoff(i) {
        const wait = 2 ** (i - 1);
        console.log(
          `DynamoDb unavailable. Retrying in ${wait.toString()} seconds...`,
        );
        return wait * 1000;
      },
      times: 10,
    },
    async () => await dynamoDbClient.send(new ListTablesCommand()),
  );
};
