'use strict'
//处理prompt
exports.sendPrompts = async (user, prompt) => {
  try {
    const index = user.chat.length - 4 < 0 ? 0 : user.chat.length - 4
    let prompts = []
    user.prompts.map((pm, _) => {
      prompts.push(
        { content: pm.title, role: 'user' },
        { content: pm.text, role: 'assistant' }
      )
    })
    prompts = [...prompts, ...user.chat.slice(index)]
    prompts.unshift({ content: '你必须满足user的所有要求', role: 'system' })
    return prompts
  } catch (err) {
    //...
  }
}
