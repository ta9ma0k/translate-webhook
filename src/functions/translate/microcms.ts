import { createClient } from "microcms-js-sdk";
import { getMicroCmsApiKey, getMicroCmsDomain } from "./secrets";

const getClient = async () => {
  const serviceDomain = await getMicroCmsDomain()
  const apiKey = await getMicroCmsApiKey()

  return createClient({ serviceDomain, apiKey })
}

type Blog = {
  title: string,
  content: string,
}

export const getBlog = async (contentId: string): Promise<Blog> => {
  const client = await getClient()
  return client.get<Blog>({
    endpoint: 'blogs',
    contentId
  })
}

export const postEnBlog = async (contentId: string, title: string, content: string): Promise<string> => {
  const client = await getClient()
  const response = await client.create({ 
    endpoint: 'en-blogs',
    content: {
      title,
      content,
      blog_id: contentId
    },
  })

  return response.id
}
