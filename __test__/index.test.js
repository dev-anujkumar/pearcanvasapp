
describe('App component', () => { 
    it('renders without crashing', () => {
        const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("../src/index.js");
      });
});