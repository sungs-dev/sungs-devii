const handler = async (m, { conn }) => {
  const url = 'https://files.catbox.moe/3sf8cz.jpg'
  await conn.sendMessage(m.chat, {
    image: { url },
    caption: 'Bermuda, https://files.catbox.moe/3sf8cz.jpg'
  }, { quoted: m })
}

handler.command = /^bermuda$/i
handler.help = ['bermuda']
handler.tags = ['media']

export default handler