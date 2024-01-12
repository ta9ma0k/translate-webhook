import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { getBlog } from './microcms';

const translate: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const blog = await getBlog(event.body.id)
  console.log(blog)
  return formatJSONResponse({
    message: `Put translated contents.`
  });
};

export const main = middyfy(translate);
