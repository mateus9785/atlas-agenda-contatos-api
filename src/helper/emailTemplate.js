const { verifyNullEmptyUndefined } = require("./validation")

const apiUrl = process.env.API_URL;
const baseUrl = process.env.BASE_URL;

function emailTemplate(subject, content, link) {
    const now = new Date();

    const trLink = `
    <tr>
        <td style="padding:20px 0 30px 0">
            <a href="${link}"
                class="m_-1928243519598368248funsales-btn" target="_blank"
                data-saferedirecturl="https://www.google.com/url?q=${link}&amp;source=gmail&amp;ust=1595612342400000&amp;usg=AFQjCNENswv7RAO8a4TcUayG3NQVrZDMvQ">
                Confirmar
            </a>
        </td>
    </tr>
`

    return `
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
            style="border-collapse:collapse;border:1px solid #f5f5f5">
            <tbody>
                <tr>
                    <td align="center" bgcolor="#2A3259" style="padding:20px 0 20px 0">
                        <a href="${baseUrl}" title="Atlas"
                            style="outline:0 none;border:0 none;text-decoration:none;display:table;margin:auto" target="_blank"
                            data-saferedirecturl="https://www.google.com/url?q=${baseUrl}&amp;source=gmail&amp;ust=1595612342399000&amp;usg=AFQjCNHk6QdLqW5MpKytVLfuMWEpWPrN6g">
                            <img src="${apiUrl}/image/contact-logo.png"
                                alt="Atlas" title="Atlas" width="auto" height="60" style="display:block" class="CToWUd">
                        </a>
                    </td>
                </tr>
                <tr style="border:0 none">
                    <td style="padding:35px">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="font-family:Roboto,Arial,sans-serif;font-size:17px;color:#6d7278;text-align:center;line-height:22px">
                            <tbody>
                                <tr>
                                    <td style="font-family:Roboto,Arial,sans-serif;font-weight:bold;font-size:24px;color:rgba(0,0,0,0.87);line-height:24px;padding:15px 0 15px 0">
                                        ${subject}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:20px 0 30px 0">
                                        ${content}
                                    </td>
                                </tr>
                                ${!verifyNullEmptyUndefined(link) ? trLink : ""}
                                <tr>
                                    <td style="padding:20px 0 30px 0">
                                        Obrigado
                                        <br>
                                        <b><i>Equipe Atlas</i></b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="border:0 none">
                    <td align="center" bgcolor="#fff"
                        style="text-align:center;padding:25px 0 25px 0;font-family:Roboto,Arial,sans-serif;font-size:10px;color:#8f8686;letter-spacing:0">
                        Copyright © ${now.getFullYear()} Atlas - Todos os direitos reservados.
                    </td>
                </tr>
            </tbody>
        </table>
    `
}

module.exports = emailTemplate;