// utility function to dispatch event and data to Google Tag Manager DataLayer
export const sendToDataLayer = (event, data) => {
    if (window && window.dataLayer) {
        window.dataLayer.push({
            event,
        ...data
        });
    }
}