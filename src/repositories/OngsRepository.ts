import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { IOng } from "../models/Ong";

export default class OngsRepository {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly ongTable = process.env.ONGS_TABLE
  ) {}
  async getAllOngs(): Promise<IOng[]> {
    const ongs = await this.docClient
      .scan({
        TableName: this.ongTable,
      })
      .promise();

    return ongs.Items as IOng[];
  }
  async createOng(ong: IOng): Promise<IOng> {
    await this.docClient
      .put({
        TableName: this.ongTable,
        Item: ong,
      })
      .promise();

    return ong;
  }

  async updateOng(partialOng: Partial<IOng>): Promise<IOng> {
    const updated = await this.docClient
      .update({
        TableName: this.ongTable,
        Key: { id: partialOng.id },
        UpdateExpression: "set #name = :name, description = :description",
        ExpressionAttributeNames: {
          "#name": "name",
        },
        ExpressionAttributeValues: {
          ":name": partialOng.name,
          ":description": partialOng.description,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return updated.Attributes as IOng;
  }

  async deleteOngById(id: string) {
    return this.docClient
      .delete({
        TableName: this.ongTable,
        Key: { id: id },
      })
      .promise();
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
    });
  }

  return new AWS.DynamoDB.DocumentClient();
}
