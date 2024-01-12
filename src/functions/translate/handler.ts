import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { getBlog } from './microcms';
import { translateText } from './translator'

const translate: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const blog = await getBlog(event.body.id)
  const translatedTitle = await translateText(blog.title)
  const translatedContent = await translateText(blog.content)

  console.log(`Translated Title: ${translatedTitle}`)
  console.log(`Translated Content: ${translatedContent}`)
  return formatJSONResponse({
    message: `Put translated contents.`
  });
};

export const main = middyfy(translate);
