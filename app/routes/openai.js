'use strict'

const OpenAi = require('../controllers/openai')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { generateText } = require('../../config/openai')

module.exports = function (app, passport) {
    
  app.post('/prompt', async (req, res) => {
    try {
      const { prompt, options, id } = req.body
      console.log(prompt, 'prompt')
      if (!prompt) {
        throw new Error('Message is empty')
      }
      User.findOne({ id: 'admin' }).then((user) => {
        user.prompts = prompt
        return user.save()
      })
      const detail = await generateText(prompt)

      const data = {
        conversationId: options.conversationId,
        parentMessageId: options.parentMessageId,
        detail,
        role: 'assistant',
        text: detail?.choices[0].text || '请稍后再试',
        id: detail?.id,
      }

      res.send({ message: null, status: 'Success', data })
    } catch (err) {
      console.error(err)
      res.status(500).send({ message: err.message, status: 'Fail' })
    }
  })

  //处理聊天请求
  app.post('/chat', async (req, res) => {
    try {
      const { prompt, options } = req.body

      if (!prompt) {
        throw new Error('Message is empty')
      }

      const detail = await generateChat(prompt)
      const data = {
        conversationId: options.conversationId,
        parentMessageId: options.parentMessageId,
        detail,
        role: 'assistant',
        text: detail.choices[0].message.content,
        id: detail.id,
      }

      res.send({ message: null, status: 'Success', data })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: err.message, status: 'Fail' })
    }
  })

  app.post('/config', async (req, res) => {
    res.send({
      type: 'Success',
      data: {
        apiMode: 'ChatGPTAPI',
        reverseProxy: '',
        timeoutMs: 60000,
      },
    })
  })
}
