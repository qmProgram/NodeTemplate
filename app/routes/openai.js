'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')
const { generateText } = require('../../config/openai')
const axios = require('axios')

module.exports = function (app, passport) {
  app.post('/prompt', async (req, res) => {
    try {
      const { prompt, options, id } = req.body

      if (!prompt) {
        throw new Error('Message is empty')
      }

      User.findOne({ id: 'admin' }).then((user) => {
        user.prompts = prompt
        return user.save()
      })
      res.send({ message: null, status: 'Success' })
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
      const user = await User.findOne({ id: 'admin' })
      const prompts = []
      user.prompts.map((pm, _) => {
        prompts.push(
          { content: pm.title, role: 'user' },
          { content: pm.text, role: 'assistant' }
        )
      })
      const detailRes = await axios({
        url: 'http://chat.qimengmeta.com/chat',
        method: 'post',
        data: {
          prompt: prompts,
          message: prompt,
          options: {},
        },
      })
      //   const datares = {
      //     conversationId: options.conversationId,
      //     parentMessageId: options.parentMessageId,
      //     detail: detailRes.data,
      //     role: 'assistant',
      //     text: detailRes.data.text,
      //     id: detailRes.data.id,
      //   }

      res.send({ message: null, status: 'Success', data: detailRes.data })
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
