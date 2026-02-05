import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendPasswordResetEmailParams {
  email: string
  resetUrl: string
  name?: string
}

export async function sendPasswordResetEmail({
  email,
  resetUrl,
  name,
}: SendPasswordResetEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Perfumes Custom <onboarding@resend.dev>', // Cambiar cuando tengas dominio verificado
      to: email,
      subject: 'Restablecer tu contraseña',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Restablecer contraseña</h2>
          <p>Hola${name ? ` ${name}` : ''},</p>
          <p>Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para crear una nueva contraseña:</p>
          <div style="margin: 30px 0;">
            <a href="${resetUrl}"
               style="background-color: #000;
                      color: white;
                      padding: 12px 24px;
                      text-decoration: none;
                      border-radius: 5px;
                      display: inline-block;">
              Restablecer contraseña
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            Este enlace expirará en 15 minutos por razones de seguridad.
          </p>
          <p style="color: #666; font-size: 14px;">
            Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px;">
            Perfumes Custom<br>
            Este es un correo automático, por favor no respondas.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Error al enviar email:', error)
      return { success: false, error }
    }

    console.log('Email enviado:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error al enviar email:', error)
    return { success: false, error }
  }
}
