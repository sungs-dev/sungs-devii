export async function before(m, { groupMetadata, conn }) {
  if (!m.text || !global.prefix.test(m.text)) return
  const usedPrefix = global.prefix.exec(m.text)[0]
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase()
  if (!command || command.length === 0) return

  const extraCommands = [
    'setbanner', 'setname', 'setcurrency', 'setmoneda', 'inspect', 'ai', 'bard', 'chatgpt',
    'dalle', 'flux', 'gemini', 'purgatorio', 'kalahari', 'bermuda', 'alpes', 'ia', 'iavoz',
    'luminai', 'openai', 'yotsuba', 'yotsuba-nakano-ia', 'formarsala',
    'menufreefire', 'menusystem', 'menuherramientas', 'menudescargas', 'menusockets',
    'menuassistant', 'menujuegos', 'menugestion', 'menurpg', 'menugrupos', 'menuowner',
    'menunsfw', 'menuemox', 'menustickers'
  ]
  const extraCategories = [
    'menufreefire', 'menusystem', 'menuherramientas', 'menudescargas', 'menusockets',
    'menuassistant', 'menujuegos', 'menugestion', 'menurpg', 'menugrupos', 'menuowner',
    'menunsfw', 'menuemox', 'menustickers'
  ]

  const validCommand = (command, plugins) => {
    if (extraCommands.includes(command)) return true
    for (let plugin of Object.values(plugins)) {
      if (plugin.command &&
        (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)) {
        return true
      }
    }
    return false
  }

  let chat = global.db.data.chats[m.chat]
  let settings = global.db.data.settings[this.user.jid]
  let owner = [...global.owner.map(([number]) => number)]
    .map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
  if (chat.modoadmin) return
  if (settings.self) return
  if (command === 'mute' || command === 'bot') return
  if (chat.isMute && !owner) return
  if (chat.isBanned && !owner) return

  if (validCommand(command, global.plugins)) {
    // Comando válido: sigue la ejecución normal
  } else {
    // Si es 'menu' + algo no existente
    if (/^menu/i.test(command)) {
      if (!extraCategories.includes(command)) {
        return conn.reply(m.chat, `👑 La categoría *${command}*\nno fue encontrada en mi base.\nPara ver mi lista de categorías usa *#help*`, m)
      }
    }
    // Cualquier otro comando no existente
    return conn.reply(m.chat, `👑 El comando *${command}*\nno fue encontrado en mi base.\nPara ver mi lista de comandos usa *#help*`, m)
  }
}