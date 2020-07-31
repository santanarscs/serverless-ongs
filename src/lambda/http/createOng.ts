import "source-map-support/register";
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

import OngService from "../../services/OngService";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { name, description } = JSON.parse(event.body);

  const ongService = new OngService();
  const ong = await ongService.createOng(name, description);

  return {
    statusCode: 201,
    body: JSON.stringify({
      item: ong,
    }),
  };
};
