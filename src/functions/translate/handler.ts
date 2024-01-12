import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { getBlog, postEnBlog } from './microcms';
import { translateText } from './translator'

const translate: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const contentId = event.body.id
  console.log(`Get blog [${contentId}]`)
  const blog = await getBlog(contentId)
  console.log('Translate blog title')
  const translatedTitle = await translateText(blog.title)
  console.log('Translate blog content')
  const translatedContent = await translateText(blog.content)
  console.log('Post translated blog')
  const translatedBlogId = await postEnBlog(contentId, translatedTitle, translatedContent)
  return formatJSONResponse({
    message: `Put translated contents. [${translatedBlogId}]`
  });
};

export const main = middyfy(translate);
