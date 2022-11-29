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
        selectedElement: [],
      },
    }));
    let props = {enable: true}
    let props2 = {enable: false}
    const keyboardWrapper = mount(
      <Provider enable store={store}>
        <KeyboardWrapper {...props}>
          <input id="focus" type="text" />
        </KeyboardWrapper>
      </Provider>
    );
    expect(keyboardWrapper).toHaveLength(1);
    const keyboardWrapper2 = mount(
      <Provider enable store={store}>
        <KeyboardWrapper {...props2}>
          <input id="focus" type="text" />
        </KeyboardWrapper>
      </Provider>
    );
    expect(keyboardWrapper2).toHaveLength(1);

  });

  it("moveCursor > if", () => {
    moveCursor(
      { keyCode: 38, stopPropagation: () => { }, preventDefault: () => { } },
      {
        firstChild: {
          firstChild: {
            parentNode: {},
            querySelector: () => ({ parentNode: {} }),
          },
        },
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          classList: {
            contains: () => "figureCredit"
          },
          className: [],
          querySelector: () => ({ parentNode: { id: QUERY_SELECTOR + "-1" } }),
        },
      },
      0
    );
  });

  it("moveCursor > else if", () => {
    moveCursor(
      { keyCode: 40, stopPropagation: () => { }, preventDefault: () => { } },
      {
        textContext: ["1", "2"],
        firstChild: {
          firstChild: {
            parentNode: {},
            querySelector: () => ({ parentNode: {} }),
          },
        },
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          className: [],
          querySelector: () => ({ parentNode: { id: QUERY_SELECTOR + "-1" } }),
        },
      },
      0
    );
  });

  it("moveCursor > else if > else", () => {
    moveCursor(
      { keyCode: 0, stopPropagation: () => { }, preventDefault: () => { } },
      {
        textContext: ["1", "2"],
        firstChild: {
          firstChild: {
            parentNode: {},
            querySelector: () => ({ parentNode: {} }),
          },
        },
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          className: [],
          querySelector: () => ({ parentNode: { id: QUERY_SELECTOR + "-1" } }),
        },
      },
      0
    );
  });

  it("isFirtstChild > if > 1st if > if", () => {
    moveCursor(
      { keyCode: 38, stopPropagation: () => { }, preventDefault: () => { } },
      {
        firstChild: {
          firstChild: {
            parentNode: {},
            querySelector: () => ({ parentNode: {} }),
          },
        },
        className: 'codeNoHighlightLine',
        parentNode: {
          className: 'codeNoHighlightLine',
          id: QUERY_SELECTOR + "-1",
          classList: {
            contains: () => "figureCredit"
          },
          querySelector: () => ({ parentNode: { id: QUERY_SELECTOR + "-1" } }),
        },
      },
      0
    );
  });

  it("isFirtstChild > if > 1st if > else", () => {
    moveCursor(
      { keyCode: 38, stopPropagation: () => { }, preventDefault: () => { } },
      {
        firstChild: {
          firstChild: {
            parentNode: {},
            querySelector: () => ({ parentNode: {} }),
          },
        },
        className: 'codeNoHighlightLine',
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          classList: {
            contains: () => "figureCredit"
          },
          querySelector: () => ({ parentNode: { id: QUERY_SELECTOR + "-1" } }),
        },
      },
      0
    );
  });

  it("isLastChild > if > 1st if > if", () => {
    moveCursor(
      { keyCode: 40, stopPropagation: () => { }, preventDefault: () => { } },
      {
        firstChild: {
          firstChild: {
            parentNode: {},
            querySelector: () => ({ parentNode: {} }),
          },
        },
        className: 'codeNoHighlightLine',
        parentNode: {
          className: 'codeNoHighlightLine',
          id: QUERY_SELECTOR + "-1",
          classList: {
            contains: () => "figureCredit"
          },
          querySelector: () => ({ parentNode: { id: QUERY_SELECTOR + "-1" } }),
        },
      },
      0
    );
  });

  it("isLastChild > if > 1st if > else", () => {
    moveCursor(
      { keyCode: 40, stopPropagation: () => { }, preventDefault: () => { } },
      {
        firstChild: {
          firstChild: {
            parentNode: {},
            querySelector: () => ({ parentNode: {} }),
          },
        },
        className: 'codeNoHighlightLine',
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          classList: {
            contains: () => "figureCredit"
          },
          querySelector: () => ({ parentNode: { id: QUERY_SELECTOR + "-1" } }),
        },
      },
      0
    );
  });

  it("isLastChild > if > 2nd if", () => {
    moveCursor(
      { keyCode: 40, stopPropagation: () => { }, preventDefault: () => { } },
      {
        lastChild: "lastChild",
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          classList: {
            contains: () => "figureTitle"
          },
          querySelector: () => ({ parentNode: { id: QUERY_SELECTOR + "-1" } }),
        },
        nextSibling: {
          id: 'f-e-s'
        },
        nodeName: 'SPAN'
      },
      0
    );
  });

  it("isLastChild > if > 1st else if > else if", () => {
    moveCursor(
      { keyCode: 40, stopPropagation: () => { }, preventDefault: () => { } },
      {
        lastChild: {
          parentNode: {
            nodeName: "CODE"
          },
          nodeName: "IMG"
        },
        textContent: "",
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          classList: {
            contains: () => "figureTitle"
          },
          className: {
            includes: () => { }
          },
          querySelector: () => ({ parentNode: { id: QUERY_SELECTOR + "-1" } }),
        },
        nodeName: 'SPAN'
      },
      0
    );
  });

  it("isLastChild > if > 1st else if > else if", () => {
    moveCursor(
      { keyCode: 40, stopPropagation: () => { }, preventDefault: () => { } },
      {
        lastChild: {
          className: "Wirisformula",
          parentNode: {
            nodeName: "CODE"
          },
          nodeName: "IMG"
        },
        textContent: "",
        parentNode: {
          id: QUERY_SELECTOR + "-1",
          classList: {
            contains: () => "figureTitle"
          },
          className: {
            includes: () => { }
          },
          querySelector: () => ({ parentNode: { id: QUERY_SELECTOR + "-1" } }),
        },
        nodeName: 'SPAN'
      },
      0
    );
  });

});