const mapImages = {
  kalahari: 'https://files.catbox.moe/3sf8cz.jpg',      // Kalahari (original intacta)
  alpes:    'https://files.catbox.moe/u87o1o.jpg',      // Alpes
  bermuda:  'https://files.catbox.moe/b09zpc.jpg',      // Bermuda
  purgatorio:'https://files.catbox.moe/3c5xp3.jpg'      // Purgatorio
}

const mapNames = {
  kalahari:   '*KALAHARI*',
  alpes:      '*ALPES*',
  bermuda:    '*BERMUDA*',
  purgatorio: '*PURGATORIO*'
}

const handler = async (m, { conn, command }) => {
  let mapaKey = command.toLowerCase()
  if (mapImages[mapaKey]) {
    await conn.sendMessage(m.chat, {
      image: { url: mapImages[mapaKey] },
      caption: mapNames[mapaKey]
    }, { quoted: m })
  }
}

handler.help = Object.keys(mapImages)
handler.tags = ['media']
handler.command = /^(kalahari|alpes|bermuda|purgatorio)$/i

export default handler