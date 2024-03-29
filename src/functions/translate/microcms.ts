import {createClient} from "microcms-js-sdk";

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
})

type Blog = {
  title: string,
  content: string,
}

export const getBlog = (contentId: string): Promise<Blog> => {
  return client.get<Blog>({
    endpoint: 'blogs',
    contentId
  })
}

export const postEnBlog = async (contentId: string, title: string, content: string): Promise<string> => {
  const response = await client.create({ 
    endpoint: 'en-blogs',
    contentId,
    content: {
      title,
      content,
      blog_id: contentId
    },
  })

  return response.id
}
