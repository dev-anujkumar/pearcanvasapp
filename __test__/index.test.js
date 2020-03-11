
jest.mock('../src/auth/openam.js', () => {
    return function () {
        this.isUserAuthenticated = function () { }
        this.handleSessionExpire = function () { }
        this.logout = function () { }
    }
})
describe('App component', () => { 
    it('renders without crashing', () => {
        const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("../src/index.js");
      });
});