import config from "./config"
export const redirect = () => {
    const currentUrl = window.parent.location.href
    const windowOrigin = window.parent.location.origin
    if (!(windowOrigin.includes('dev') || windowOrigin.includes('staging') ||
        windowOrigin.includes('qa') || windowOrigin.includes('test') ||
        windowOrigin.includes('prf') || windowOrigin.includes('stg'))) {
        config.IES_REDIRECT_URL = 'https://iam.pearson.com/auth/loginRedirect.html?tree=Login&url='
    } else if (windowOrigin.includes('prf')) {
        config.IES_REDIRECT_URL = 'https://iam-ppe.pearson.com/auth/loginRedirect.html?tree=Login&url='
    }
    const redirectUrl = config.IES_REDIRECT_URL + encodeURIComponent(currentUrl)
    window.parent.location.replace(redirectUrl)
}