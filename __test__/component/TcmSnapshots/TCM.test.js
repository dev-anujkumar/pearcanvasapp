import TCM from "../../../src/component/TcmSnapshots/TCM"

it('formatDateTime', () => {
    TCM.formatDateTime('2038-01-19 03:14:07')
})
it('formatDateTime', () => {
    TCM.formatTime('2038-01-19 03:14:07')
})