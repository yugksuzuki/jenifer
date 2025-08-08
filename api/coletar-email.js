export default async function handler(req, res) {
  const { text, contact } = req.body;
  const email = text;
  const nome = contact?.name || 'Sem Nome';

  // Envie nome + email para Make (via webhook)
  await fetch('https://hook.us2.make.com/ipvr4jltalnynioz3oj7hiyxag9xu5cv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome,
      email,
      uid: contact?.uid,
      whatsapp: contact?.key
    })
  });

  // Responde com a criação do atendimento no Multi360
  return res.json({
    type: "CREATE_CUSTOMER_SERVICE",
    departmentUUID: "SEU_DEPARTAMENTO_UUID",
    text: "Obrigado! Estamos te conectando com um atendente agora mesmo."
  });
}
