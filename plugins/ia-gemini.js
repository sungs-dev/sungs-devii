import axios from 'axios';

const handler = async (m, { args }) => {
  const texto = args.join(' ').trim();

  // Si no hay texto, advierte y reacciona con ❌
  if (!texto) {
    if (m?.react) await m.react('❌');
    return m.reply('*⚠️ Por favor escribe un texto después del comando. Ejemplo:\n#ia ¿Cómo está el clima hoy?*');
  }

  // Reacciona con ⏰ mientras espera respuesta
  if (m?.react) await m.react('⏰');

  // Función multi-API, prueba primero la principal y luego hace fallback
  const askAI = async (texto) => {
    // Primera API
    try {
      const url1 = `https://api.stellarwa.xyz/ai/copilot?text=${encodeURIComponent(texto)}&key=stellar-gTEMBetO`;
      const res1 = await axios.get(url1);
      if (res1.data?.result) return res1.data.result;
    } catch (e) {}

    // Fallback a segunda API
    try {
      const url2 = `https://rest.alyabotpe.xyz/ai/copilot?text=${encodeURIComponent(texto)}&key=stellar-0QNEPI8v`;
      const res2 = await axios.get(url2);
      if (res2.data?.result) return res2.data.result;
    } catch (e) {}

    return null;
  };

  const respuesta = await askAI(texto);

  // Reacciona con 🤖 si todo bien, ❌ si no hubo respuesta
  if (respuesta) {
    if (m?.react) await m.react('🤖');
    return m.reply(respuesta);
  } else {
    if (m?.react) await m.react('❌');
    return m.reply('*❗ Ocurrió un error al conectar con la IA.*');
  }
};

handler.help = ['ia <texto>', 'ai <texto>'];
handler.tags = ['ai', 'chatbot'];
handler.command = /^(ia|ai)$/i;

export default handler;