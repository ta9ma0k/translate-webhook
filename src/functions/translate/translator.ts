import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate"

const client = new TranslateClient({ region: 'ap-northeast-1' })

export const translateText = async (text: string): Promise<string> => {
  const command = new TranslateTextCommand({
    Text: text,
    SourceLanguageCode: 'ja',
    TargetLanguageCode: 'en'
  })
  try {
    const response = await client.send(command)
    return response.TranslatedText ?? Promise.reject()
  } catch (err) {
    return Promise.reject(err)
  }
}
