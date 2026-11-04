import { EmailSubjectEnum } from "../../Enum/index.js";

export const templates={

[EmailSubjectEnum.CONFIRM_EMAIL]:(data)=>{

     const {
      title = "Confirm Email",
      code,
      name = "",
      websiteUrl = "#",
      facebookUrl = "https://facebook.com/yourpage",
      instagramUrl = "https://instagram.com/yourpage",
      twitterUrl = "https://twitter.com/yourpage",
    } = data;

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#f2f2f2; font-family:Arial, Helvetica, sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f2f2;">
  <tr>
    <td align="center" style="padding:30px 10px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; background-color:#ffffff; border:1px solid #d9d9d9;">

        <!-- Header -->
        <tr>
          <td style="padding:30px 40px 20px 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="left" style="font-size:26px; font-weight:bold; color:#222222; letter-spacing:1px;">LINK-iT</td>
                <td align="right" style="font-size:12px;">
                  <a href="${websiteUrl}" style="color:#888888; text-decoration:none;">View in Website</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Banner (الأيقونة: ظرف) -->
        <tr>
          <td style="padding:0 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" bgcolor="#a8284f" style="background-color:#a8284f; padding:35px 0; font-size:52px; line-height:52px; color:#ffffff;">
                  &#9993;
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td align="center" style="padding:40px 40px 10px 40px; font-size:26px; font-weight:bold; color:#a8284f;">
            ${title}
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td align="center" style="padding:0 40px 25px 40px; font-size:14px; line-height:22px; color:#555555;">
            Hi ${name}, use the verification code below to confirm your email address.
          </td>
        </tr>

        <!-- Code -->
        <tr>
          <td style="padding:0 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" bgcolor="#a8284f" style="background-color:#a8284f; padding:16px 0; font-size:24px; font-weight:bold; letter-spacing:6px; color:#ffffff;">
                  ${code}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Expiry -->
        <tr>
          <td align="center" style="padding:20px 40px 0 40px; font-size:12px; color:#999999;">
            This code expires in 10 minutes. If you didn't request it, you can ignore this email.
          </td>
        </tr>

        <!-- Stay in touch -->
        <tr>
          <td align="center" style="padding:40px 40px 15px 40px; font-size:14px; font-weight:bold; color:#222222;">
            Stay in touch
          </td>
        </tr>

        <!-- Social -->
        <tr>
          <td align="center" style="padding:0 40px 40px 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:0 8px;">
                  <a href="${facebookUrl}" style="display:inline-block; width:40px; height:40px; line-height:40px; text-align:center; border-radius:50%; background-color:#1b8ad3; color:#ffffff; font-weight:bold; font-size:18px; text-decoration:none;">f</a>
                </td>
                <td style="padding:0 8px;">
                  <a href="${instagramUrl}" style="display:inline-block; width:40px; height:40px; line-height:40px; text-align:center; border-radius:50%; background-color:#d6336c; color:#ffffff; font-weight:bold; font-size:16px; text-decoration:none;">in</a>
                </td>
                <td style="padding:0 8px;">
                  <a href="${twitterUrl}" style="display:inline-block; width:40px; height:40px; line-height:40px; text-align:center; border-radius:50%; background-color:#3aa3d9; color:#ffffff; font-weight:bold; font-size:16px; text-decoration:none;">t</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>`;
  },


  [EmailSubjectEnum.FORGET_PASSWORD]:(data)=>{

     const {
      title = "Confirm Email",
      code,
      name = "",
      websiteUrl = "#",
      facebookUrl = "https://facebook.com/yourpage",
      instagramUrl = "https://instagram.com/yourpage",
      twitterUrl = "https://twitter.com/yourpage",
    } = data;

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#f2f2f2; font-family:Arial, Helvetica, sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f2f2;">
  <tr>
    <td align="center" style="padding:30px 10px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; background-color:#ffffff; border:1px solid #d9d9d9;">

        <!-- Header -->
        <tr>
          <td style="padding:30px 40px 20px 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="left" style="font-size:26px; font-weight:bold; color:#222222; letter-spacing:1px;">LINK-iT</td>
                <td align="right" style="font-size:12px;">
                  <a href="${websiteUrl}" style="color:#888888; text-decoration:none;">View in Website</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Banner (الأيقونة: ظرف) -->
        <tr>
          <td style="padding:0 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" bgcolor="#a8284f" style="background-color:#a8284f; padding:35px 0; font-size:52px; line-height:52px; color:#ffffff;">
                  &#9993;
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td align="center" style="padding:40px 40px 10px 40px; font-size:26px; font-weight:bold; color:#a8284f;">
            ${title}
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td align="center" style="padding:0 40px 25px 40px; font-size:14px; line-height:22px; color:#555555;">
            Hi ${name}, use the verification code below to confirm your email address.
          </td>
        </tr>

        <!-- Code -->
        <tr>
          <td style="padding:0 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" bgcolor="#a8284f" style="background-color:#a8284f; padding:16px 0; font-size:24px; font-weight:bold; letter-spacing:6px; color:#ffffff;">
                  ${code}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Expiry -->
        <tr>
          <td align="center" style="padding:20px 40px 0 40px; font-size:12px; color:#999999;">
            This code expires in 10 minutes. If you didn't request it, you can ignore this email.
          </td>
        </tr>

        <!-- Stay in touch -->
        <tr>
          <td align="center" style="padding:40px 40px 15px 40px; font-size:14px; font-weight:bold; color:#222222;">
            Stay in touch
          </td>
        </tr>

        <!-- Social -->
        <tr>
          <td align="center" style="padding:0 40px 40px 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:0 8px;">
                  <a href="${facebookUrl}" style="display:inline-block; width:40px; height:40px; line-height:40px; text-align:center; border-radius:50%; background-color:#1b8ad3; color:#ffffff; font-weight:bold; font-size:18px; text-decoration:none;">f</a>
                </td>
                <td style="padding:0 8px;">
                  <a href="${instagramUrl}" style="display:inline-block; width:40px; height:40px; line-height:40px; text-align:center; border-radius:50%; background-color:#d6336c; color:#ffffff; font-weight:bold; font-size:16px; text-decoration:none;">in</a>
                </td>
                <td style="padding:0 8px;">
                  <a href="${twitterUrl}" style="display:inline-block; width:40px; height:40px; line-height:40px; text-align:center; border-radius:50%; background-color:#3aa3d9; color:#ffffff; font-weight:bold; font-size:16px; text-decoration:none;">t</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>`;
  },
}





export const verifyEmailTemplete =(data)=>{
    return templates[data.subject](data);

}