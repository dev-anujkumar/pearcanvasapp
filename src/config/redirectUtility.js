import config from "./config"
export const redirect = () => {
    const currentUrl = window.parent.location.href
    const windowOrigin = window.parent.location.origin
    if (!(windowOrigin.includes('dev') || windowOrigin.includes('staging') ||
        windowOrigin.includes('qa') || windowOrigin.includes('test') ||
        windowOrigin.includes('perf') || windowOrigin.includes('prf') || windowOrigin.includes('stg'))) {
        config.IES_REDIRECT_URL = 'https://iam.pearson.com/auth/XUI/?realm=/pearson&authIndexType=service&authIndexValue=Login&goto='
    } else if (windowOrigin.includes('perf') || windowOrigin.includes('prf')) {
        config.IES_REDIRECT_URL = 'https://iam-ppe.pearson.com/auth/XUI/?realm=/pearson&authIndexType=service&authIndexValue=Login&goto='
    }
    const redirectUrl = config.IES_REDIRECT_URL + encodeURIComponent(currentUrl)
    window.parent.location.replace(redirectUrl)
}