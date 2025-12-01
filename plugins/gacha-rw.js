import fs from 'fs'

const handler = async (m, { conn }) => {
  // Lee el archivo JSON donde estan los personajes
  let personajes
  try {
    personajes = JSON.parse(fs.readFileSync('jsons/character/character.json', 'utf8')) // ruta para los personajes
  } catch (e) {
    return await conn.sendMessage(m.chat, { text: '- No se pudo cargar los personajes porque no se leyo la base de datos.' }, { quoted: m })
  }
  // Elige personaje random
  const personaje = personajes[Math.floor(Math.random() * personajes.length)]
  // De ese personaje, elige foto random
  const foto = personaje.fotos[Math.floor(Math.random() * personaje.fotos.length)]

  // Construye el caption
  const text = `- Nombre: *${personaje.nombre}*\n- Id: *${personaje.id}*\n- Estado: *${personaje.estado}*\n- Valor: *${personaje.valor.toLocaleString()}*`

  // Muestra la foto y texto
  await conn.sendMessage(m.chat, {
    image: { url: foto },
    caption: text
  }, { quoted: m })
}

handler.command = ['rw']
handler.help = ['rw']
handler.tags = ['gacha']

export default handler
