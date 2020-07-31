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
  const id = event.pathParameters.id;

  const ongService = new OngService();
  await ongService.deleteOngById(id);

  return {
    statusCode: 200,
    body: "",
  };
};
