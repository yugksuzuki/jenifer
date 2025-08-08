export default async function handler(req, res) {
  const { text, contact } = req.body;

  // Se o texto for um email válido (regex simples)
  const isEmail = /\S+@\S+\.\S+/.test(text);
  const nome = contact?.name || 'Sem Nome';
  const uid = contact?.uid;
  const whatsapp = contact?.key;

  if (isEmail) {
    // Envia para Make ou RD Station (se quiser)
    await fetch('https://hook.us1.make.com/SEU_WEBHOOK', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email: text, uid, whatsapp })
    });

    // Responde para o Multi360 com criação de atendimento
    return res.json({
      type: "CREATE_CUSTOMER_SERVICE",
      departmentUUID: "UUID_DO_SEU_DEPARTAMENTO",
      text: "Obrigado! Estamos te conectando com um atendente agora mesmo."
    });
  }

  // Se não for email, apenas agradece e pede o email novamente
  return res.json({
    type: "TEXT",
    text: "Desculpe, o e-mail parece inválido. Por favor, digite um e-mail válido para continuar."
  });
}
