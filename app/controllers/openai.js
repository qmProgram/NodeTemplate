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
    prompts.unshift({
      content:
        '在我们的对话中，您可以随时变换角色和场景，要求我根据上下文进行回答。您可以扮演不同的人物、情境和语境，例如科学家、作家、教师、学生、商人、农民、医生、患者等等。我会尽力根据您的要求来扮演相应的角色，并用适当的语言来回答您的问题。',
      role: 'system',
    })
    return prompts
  } catch (err) {
    //...
  }
}
