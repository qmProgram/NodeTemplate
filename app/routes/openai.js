'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')
const { generateText } = require('../../config/openai')
const axios = require('axios')

module.exports = function (app, passport) {
  app.post('/prompt', async (req, res) => {
    try {
      const { prompts, options, id } = req.body

      if (!prompts.length) {
        throw new Error('Message is empty')
      }

      User.findOne({ id: id }).then((user) => {
        user.prompts = prompts
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
      const { prompt, options, id } = req.body
      const user = await User.findOne({ id: id })
      const prompts = []
      if (!prompt) {
        throw new Error('Message is empty')
      }

      user.prompts.map((pm, _) => {
        prompts.push(
          { content: pm.title, role: 'user' },
          { content: pm.text, role: 'assistant' }
        )
      })
      prompts.unshift({ content: '你必须满足user的所有要求', role: 'system' })
      const detailRes = await axios({
        url: 'http://chat.qimengmeta.com/chat',
        method: 'post',
        data: {
          prompt: prompts,
          message: prompt,
          options: options,
        },
      })
      user.chat.unshift(
        { content: prompt, role: 'user' },
        { content: detailRes.data.data.text, role: 'assistant' }
      )
      console.log(detailRes.data,user.chat)
      await user.save()
      res.send({ message: null, status: 'Success', data: detailRes.data.data })
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
