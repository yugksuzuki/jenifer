export default async function handler(req, res) {
  const { text, contact } = req.body;

  const nome = contact?.name || 'Nome não identificado';
  const whatsapp = contact?.key || '';
  const uid = contact?.uid || '';
  const email = contact?.fields?.qualOSeuEmail || text;

  // Envia para o Make
  await fetch('https://hook.us2.make.com/q6birefhp7ryrxxpqtaqawfqk1eo0ysp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, whatsapp, uid })
  });

  // Retorno padrão para abrir atendimento
  return res.json({
    type: "CREATE_CUSTOMER_SERVICE",
    departmentUUID: "UUID_DO_SEU_DEPARTAMENTO",
    text: "Obrigado! Um atendente irá te responder em instantes."
  });
}
