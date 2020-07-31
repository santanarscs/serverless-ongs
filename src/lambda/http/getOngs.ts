import "source-map-support/register";
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

import OngService from "../../services/OngService";

export const handler: APIGatewayProxyHandler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const ongService = new OngService();
  const items = await ongService.getAllOngs();

  return {
    statusCode: 201,
    body: JSON.stringify({
      items,
    }),
  };
};
