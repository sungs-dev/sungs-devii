const handler = async (m, { args, conn, usedPrefix, command }) => {
try {
if (!args[0]) return conn.reply(m.chat, `👑 Ingresa el enlace.`, m, rcanal)
let data = []
const url = encodeURIComponent(args[0])
await m.react('🕒')
if (/(instagram\.com)/i.test(args[0])) {
try {
const api = `${global.APIs.adonix.url}/download/instagram?apikey=${global.APIs.adonix.key}&url=${url}`
const res = await fetch(api)
const json = await res.json()
if (json.status && json.data?.length) {
data = json.data.map(v => v.url)
}} catch (e) {}
}
if (/(facebook\.com|fb\.watch)/i.test(args[0]) && !data.length) {
try {
const api = `${global.APIs.adonix.url}/download/facebook?apikey=${global.APIs.adonix.key}&url=${url}`
const res = await fetch(api)
const json = await res.json()
if (json.status && json.result?.media?.video_hd) {
data = [json.result.media.video_hd]
}} catch (e) {}
}
if (!data.length) {
try {
const api = `${global.APIs.vreden.url}/api/igdownload?url=${url}`
const res = await fetch(api)
const json = await res.json()
if (json.resultado?.respuesta?.datos?.length) {
data = json.resultado.respuesta.datos.map(v => v.url)
}} catch (e) {}
}
if (!data.length) {
try {
const api = `${global.APIs.delirius.url}/download/instagram?url=${url}`
const res = await fetch(api)
const json = await res.json()
if (json.status && json.data?.length) {
data = json.data.map(v => v.url)
}} catch (e) {}
}
if (!data.length) return conn.reply(m.chat, `😿 No pude obtener el contenido solicitado.`, m, rcanal)
for (let media of data) {
await conn.sendFile(m.chat, media, 'media.mp4', `*👑 AQUI ESTA TU SOLICITUD 👑*\n> ${botname}`, m, rcanal)
await m.react('🌟')
}} catch (error) {
await m.react('✖️')
await m.reply(`😔 Error: \n\n${error.message}`)
}}

handler.command = ['instagram', 'ig', 'facebook', 'fb']
handler.tags = ['descargas']
handler.help = ['instagram', 'ig', 'facebook', 'fb']
handler.group = true

export default handler