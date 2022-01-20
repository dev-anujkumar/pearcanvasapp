import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore } from "redux";
import KeyboardUpDown from "../../../src/component/Keyboard/KeyboardUpDown";

describe("KeyboardWrapper Testing", () => {
  it("", () => {
    const store = createStore(() => ({
      keyboardReducer: {
        selectedElement: {},
      },
    }));
    mount(
      <Provider store={store}>
        <KeyboardUpDown />
      </Provider>
    );
  });
});
