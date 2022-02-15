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
            querySelector : () =>({parentNode: {}}),
          },
        },
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          querySelector : () =>({parentNode: {id:QUERY_SELECTOR+ "-1"}}),
        },
      },
      0
    );
  });

  it("User Press down arrow key and id is KW child", () => {
    moveCursor(
      { keyCode: 40, stopPropagation: () => {}, preventDefault: () => {} },
      {
        textContext: ["1", "2"],
        firstChild: {
          firstChild: {
            parentNode: {},
            querySelector : () =>({parentNode: {}}),
          },
        },
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          querySelector : () =>({parentNode: {id:QUERY_SELECTOR+ "-1"}}),
        },
      },
      0
    );
  });

  it("isLastChild function else if case", () => {
    moveCursor(
      { keyCode: 40, stopPropagation: () => {}, preventDefault: () => {} },
      {
        textContext: ["1", "2"],
        firstChild: {
          firstChild: {
            parentNode: {},
            querySelector : () =>({parentNode: {}}),
          },
        },
        lastChild: {

        },
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          querySelector : () =>({parentNode: {id:QUERY_SELECTOR+ "-1"}}),
          parentNode: {
            id: QUERY_SELECTOR + "-1",
            querySelector : () =>({parentNode: {id:QUERY_SELECTOR+ "-1"}}),
          }
        },
      },
      0
    );
  });

  it("isLastChild function if condition - else if case", () => {
    moveCursor(
      { keyCode: 40, stopPropagation: () => {}, preventDefault: () => {} },
      {
        textContext: [],
        firstChild: {
          firstChild: {
            parentNode: {},
            querySelector : () =>({parentNode: {}}),
          },
        },
        lastChild: {
          nodeName: "IMG"
        },
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          querySelector : () =>({parentNode: {id:QUERY_SELECTOR+ "-1"}}),
          parentNode: {
            id: QUERY_SELECTOR + "-1",
            querySelector : () =>({parentNode: {id:QUERY_SELECTOR+ "-1"}}),
          }
        },
      },
      0
    );
  });

  it("isLastChild function if condition - else case", () => {
    moveCursor(
      { keyCode: 40, stopPropagation: () => {}, preventDefault: () => {} },
      {
        textContext: [],
        firstChild: {
          firstChild: {
            parentNode: {},
          querySelector : () =>({parentNode: {}}),
          },
        },
        lastChild: {
          nodeName: "IMG"
        },
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          querySelector : () =>({parentNode: {id:QUERY_SELECTOR+ "-1"}}),
          parentNode: {
            id: "different id",
            querySelector : () =>({parentNode: {id:"different id"}}),
          }
        },
      },
      0
    );
  });

  it("User Press Up arrow key - isFirstChild- if - else if condition", () => {
    moveCursor(
      { keyCode: 38, stopPropagation: () => {}, preventDefault: () => {} },
      {
        // firstChild: {
        //   firstChild: {
        //     parentNode: {},
        //   },
        // },
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          querySelector : () =>({parentNode: {id:QUERY_SELECTOR+ "-1"}}),
        },
      },
      0
    );
  });

  it("User Press Up arrow key - isFirstChild- if - else if query selector condition", () => {
    moveCursor(
      { keyCode: 38, stopPropagation: () => {}, preventDefault: () => {} },
      {
        nodeName: "IMG",
        firstChild: {
          firstChild: {
            parentNode: {},
            querySelector : () =>({parentNode: {}}),
          },
        },
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          querySelector : () =>({parentNode: {id:QUERY_SELECTOR+ "-1"}}),
          parentNode: {
            id: QUERY_SELECTOR + "-1",
            querySelector : () =>({parentNode: {id:QUERY_SELECTOR+ "-1"}}),
          }
        },
      },
      0
    );
  });

});