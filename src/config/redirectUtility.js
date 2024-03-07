
export const redirect = () => {
    const currentUrl = window.parent.location.href
    let iesRedirectUrl = "https://iam-stage.pearson.com/auth/loginRedirect.html?tree=Login&url="
    const windowOrigin = window.parent.location.origin
    if (!(windowOrigin.includes('dev') || windowOrigin.includes('staging') ||
        windowOrigin.includes('qa') || windowOrigin.includes('test') ||
        windowOrigin.includes('prf') || windowOrigin.includes('stg'))) {
        iesRedirectUrl = 'https://iam.pearson.com/auth/loginRedirect.html?tree=Login&url='
    } else if (windowOrigin.includes('prf')) {
        iesRedirectUrl = 'https://iam-ppe.pearson.com/auth/loginRedirect.html?tree=Login&url='
    }
    const redirectUrl = iesRedirectUrl + encodeURIComponent(currentUrl)
    window.parent.location.replace(redirectUrl)
}