import fs from 'fs'

const CLAIM_COOLDOWN = 5 * 60 * 1000
let claimCooldowns = {}

const handler = async (m, { conn }) => {
  // Solo se puede usar respondiendo a un mensaje del bot, con imagen
  const quoted = m.quoted
  if (!quoted || !quoted.caption) return conn.sendMessage(m.chat, { text: '🌛 Debes responder a una imagen del personaje con este comando.' }, { quoted: m })

  // Control de cooldown por usuario
  const now = Date.now()
  claimCooldowns[m.sender] = claimCooldowns[m.sender] || 0
  if (now - claimCooldowns[m.sender] < CLAIM_COOLDOWN) {
    const mins = Math.ceil((CLAIM_COOLDOWN - (now - claimCooldowns[m.sender])) / 1000 / 60)
    return await conn.sendMessage(m.chat, { text: `🌛 Espera ${mins} min para volver a usar este comando.` }, { quoted: m })
  }
  claimCooldowns[m.sender] = now

  // Extrae nombre y id del personaje desde el caption
  const nombreMatch = quoted.caption.match(/Nombre: \*(.*?)\*/)
  const idMatch = quoted.caption.match(/Id: \*(\d+)\*/)
  const nombrePersonaje = nombreMatch ? nombreMatch[1] : null
  const idPersonaje = idMatch ? idMatch[1] : null

  if (!nombrePersonaje || !idPersonaje)
    return await conn.sendMessage(m.chat, { text: '🌛 No se pudo identificar el personaje en la imagen.' }, { quoted: m })

  // Lee database
  let db
  try {
    db = JSON.parse(fs.readFileSync('jsons/character/database.json', 'utf8'))
  } catch (e) {
    db = {}
  }

  // Si ya está reclamado
  if (db[idPersonaje]) {
    return await conn.sendMessage(m.chat, { 
      text: `🍃 Este personaje ya fue reclamado por *${db[idPersonaje].nombre}*.` 
    }, { quoted: m })
  }

  // Guarda el personaje reclamado
  db[idPersonaje] = {
    user: m.sender,
    nombre: m.pushName || m.sender.split('@')[0],
    timestamp: Date.now()
  }
  fs.writeFileSync('jsons/character/database.json', JSON.stringify(db, null, 2))

  await conn.sendMessage(m.chat, {
    text: `🍃 El personaje *${nombrePersonaje}* fue reclamado por *${m.pushName || m.sender.split('@')[0]}*.`
  }, { quoted: m })
}

handler.command = ['c', 'obtener']
handler.help = ['c', 'obtener']
handler.tags = ['game']
export default handler