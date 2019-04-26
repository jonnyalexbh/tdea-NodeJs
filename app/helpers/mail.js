const SendGrid = require('@sendgrid/mail');

const { API_KEY_SENDGRID } = process.env;

SendGrid.setApiKey(API_KEY_SENDGRID);

const send = async (email, data) => {
  const msg = {
    to: email,
    from: 'Tecnológico de Antioquia <extension@tdea.edu.co>',
    templateId: process.env.EMAIL_TEMPLATE_WELLCOME,
    dynamic_template_data: data,
  };

  try {
    await SendGrid.send(msg);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  send,
};
