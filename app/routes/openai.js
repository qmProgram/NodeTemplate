'use strict'

const OpenAi = require('../controllers/openai')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { generateText } = require('../../config/openai')

module.exports = function (app, passport) {
  app.post('/chat-process', async (req, res) => {
    try {
      const { prompt, options, id } = req.body

      if (!prompt) {
        throw new Error('Message is empty')
      }
      const detail = await generateText(prompt)
      
      User.findOne({ id: 'admin' }).then((user) => {
        user.promts.push({
          text: prompt,
          time: Date.now(),
        })
        return user.save()
      })
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
