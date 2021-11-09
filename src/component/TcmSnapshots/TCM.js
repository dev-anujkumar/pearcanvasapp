import moment from 'moment';

const TCM = {
    formatDateTime(timestamp, formatter = 'D.M.YY HH:mm A') {
        const intTime = parseInt(timestamp);
        return moment(intTime).format(formatter);
    },
    formatTime(timestamp, formatter = 'HH:mm A') {
        const intTime = parseInt(timestamp);
        return moment(intTime).format(formatter);
    }
};
export default TCM;
