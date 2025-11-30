import fs from 'fs' // nodejs import, ajusta si usas otro framework

const handler = async (m, { conn }) => {
  // Lee el archivo JSON
  let personajes
  try {
    personajes = JSON.parse(fs.readFileSync('jsons/character/character.json', 'utf8')) // ruta relativa o absoluta
  } catch (e) {
    return await conn.sendMessage(m.chat, { text: 'No se pudo cargar la base de datos de personajes.' }, { quoted: m })
  }
  // Elige personaje random
  const personaje = personajes[Math.floor(Math.random() * personajes.length)]
  // De ese personaje, elige foto random
  const foto = personaje.fotos[Math.floor(Math.random() * personaje.fotos.length)]

  // Construye el caption
  const text = `Nombre: *${personaje.nombre}*\nId: *${personaje.id}*\nEstado: *${personaje.estado}*\nValor: *${personaje.valor.toLocaleString()}*`

  // Muestra la foto y texto
  await conn.sendMessage(m.chat, {
    image: { url: foto },
    caption: text
  }, { quoted: m })
}

handler.command = ['rw']
handler.help = ['rw']
handler.tags = ['game']

export default handler