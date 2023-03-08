const { OpenAIApi } = require('openai')
const configuration = require('./openaiConfig')
const openai = new OpenAIApi(configuration)

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
