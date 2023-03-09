const { OpenAIApi } = require('openai')
const HttpsProxyAgent = require('https-proxy-agent')
const configuration = require('./openaiConfig')
const agent = new HttpsProxyAgent({
  hostname: 'https://open.aiproxy.xyz',
  port: '3128',
})
const openai = new OpenAIApi(configuration, 'https://open.aiproxy.xyz')

async function generateText(message) {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: message,
    temperature: 1,
    max_tokens: 1000,
  })
  console.log(completion, 'gpt2')
  return completion?.data
}

module.exports = { generateText }
