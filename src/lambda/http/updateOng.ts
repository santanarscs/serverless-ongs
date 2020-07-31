import "source-map-support/register";
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

import OngService from "../../services/OngService";
import { IOng } from "../../models/Ong";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;

  const ongService = new OngService();
  const ong: Partial<IOng> = { ...JSON.parse(event.body), id };

  const ongUpdated = await ongService.updateOng(ong);

  return {
    statusCode: 200,
    body: JSON.stringify({
      item: ongUpdated,
    }),
  };
};
