import React from "react";
import { mount } from "enzyme";
import KeyboardWrapper, {
  moveCursor,
  QUERY_SELECTOR,
} from "../../../src/component/Keyboard/KeyboardWrapper";
import { Provider } from "react-redux";
import { createStore } from "redux";

describe("KeyboardWrapper Testing", () => {
  it("", () => {
    const store = createStore(() => ({
      keyboardReducer: {
        selectedElement: {},
      },
    }));
    const keyboardWrapper = mount(
      <Provider enable store={store}>
        <KeyboardWrapper>
          <input id="focus" type="text" />
        </KeyboardWrapper>
      </Provider>
    );

    // keyboardWrapper.find('#focus').node.focus();
  });

  it("User Press Up arrow key and id is KW child", () => {
    moveCursor(
      { keyCode: 38, stopPropagation: () => {}, preventDefault: () => {} },
      {
        firstChild: {
          firstChild: {
            parentNode: {},
          },
        },
        parentNode: {
          id: QUERY_SELECTOR + "-1",
        },
      },
      0
    );
  });

  
});