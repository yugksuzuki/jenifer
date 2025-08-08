 export default async function handler(req, res) {
  console.log('🔵 Requisição recebida no webhook Multi360');

  const { text, contact } = req.body;

  console.log('📨 Texto digitado pelo usuário:', text);
  console.log('📇 Dados do contato recebidos:', JSON.stringify(contact, null, 2));

  const isEmail = /\S+@\S+\.\S+/.test(text);
  console.log('🔍 Validação de e-mail:', isEmail ? '✅ Válido' : '❌ Inválido');

  const nome = contact?.name || 'Sem Nome';
  const uid = contact?.uid || 'Sem UID';
  const whatsapp = contact?.key || 'Sem número';

  console.log('🧾 Nome:', nome);
  console.log('🆔 UID:', uid);
  console.log('📱 WhatsApp:', whatsapp);

  if (isEmail) {
    const payload = { nome, email: text, uid, whatsapp };
    console.log('📤 Enviando dados para Make:', JSON.stringify(payload, null, 2));

    try {
      const makeResponse = await fetch('https://hook.us2.make.com/q6birefhp7ryrxxpqtaqawfqk1eo0ysp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const makeResponseBody = await makeResponse.text();
      console.log('✅ Resposta do Make:', makeResponse.status, makeResponseBody);
    } catch (error) {
      console.error('❌ Erro ao enviar para o Make:', error);
    }

    const atendimentoResponse = {
      type: "CREATE_CUSTOMER_SERVICE",
      departmentUUID: "UUID_DO_SEU_DEPARTAMENTO",
      text: "Obrigado! Estamos te conectando com um atendente agora mesmo."
    };

    console.log('📦 Resposta enviada ao Multi360 (atendimento):', atendimentoResponse);
    return res.json(atendimentoResponse);
  }

  // Caso não seja um e-mail válido
  const erroResponse = {
    type: "TEXT",
    text: "Desculpe, o e-mail parece inválido. Por favor, digite um e-mail válido para continuar."
  };

  console.log('⚠️ Resposta enviada ao Multi360 (e-mail inválido):', erroResponse);
  return res.json(erroResponse);
}
