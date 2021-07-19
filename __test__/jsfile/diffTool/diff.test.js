import HtmlDiff from '../../../src/js/difftool/HtmlDiff';

describe('Html diff tool test cases', () => {
  test('verifying scenario 1', () => {
    const accpetedTxn = "currently i'm testing delete functionality";
    const pendingTxn = "currently i'm testing functionality &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;functionality";
    const expectedOutput = "currently i'm testing <del class=\"diffdel\">delete </del>functionality<ins class=\"diffins\"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;functionality</ins>";
    expect(HtmlDiff.execute(accpetedTxn, pendingTxn)).toEqual(expectedOutput);
  });

  test('verifying scenario 2', () => {
    const accpetedTxn = "currently i'm testing delete &nbsp;&nbsp;functionality";
    const pendingTxn = "currently i'm testing functionality add new one";
    const expectedOutput = "currently i'm testing <del class=\"diffdel\">delete &nbsp;&nbsp;</del>functionality<ins class=\"diffins\">&nbsp;add new one</ins>";
    expect(HtmlDiff.execute(accpetedTxn, pendingTxn)).toEqual(expectedOutput);
  });

  test('verifying scenario 3', () => {
    const accpetedTxn = "currently i'm testing delete functionality";
    const pendingTxn = "currently i'm testing &nbsp;&nbsp;functionality add new one";
    const expectedOutput = "currently i'm testing<del class=\"diffmod\">&nbsp;delete</del><ins class=\"diffmod\"> &nbsp;&nbsp;</ins>functionality <ins class=\"diffins\">add new one</ins>";
    expect(HtmlDiff.execute(accpetedTxn, pendingTxn)).toEqual(expectedOutput);
  });

  test('verifying scenario 4', () => {
    const accpetedTxn = 'one two three';
    const pendingTxn = 'one  three fifty';
    const expectedOutput = 'one  <del class="diffdel">two</del>three <ins class="diffins">fifty</ins>';
    expect(HtmlDiff.execute(accpetedTxn, pendingTxn)).toEqual(expectedOutput);
  });

  test('verifying scenario 5', () => {
    const accpetedTxn = 'testing the new scenarios on this new line';
    const pendingTxn = 'tes&nbsp;&nbsp;ting the new  on this new line';
    const expectedOutput = '<del class="diffmod">testing</del><ins class="diffmod">tes&nbsp;&nbsp;ting</ins> the new<del class="diffdel">&nbsp;scenarios</del>  on this new line';
    expect(HtmlDiff.execute(accpetedTxn, pendingTxn)).toEqual(expectedOutput);
  });

  test('verifying scenario 6', () => {
    const accpetedTxn = "currently i'm testing delete functionality";
    const pendingTxn = 'currently  testing  functionality add new one';
    const expectedOutput = "currently<del class=\"diffdel\">&nbsp;i'm</del>  testing  <del class=\"diffdel\">delete</del>functionality <ins class=\"diffins\">add new one</ins>";
    expect(HtmlDiff.execute(accpetedTxn, pendingTxn)).toEqual(expectedOutput);
  });

  test('verifying scenario 7', () => {
    const accpetedTxn = 'hello world we are testing space issue';
    const pendingTxn = 'hello world neware testing space issue';
    const expectedOutput = 'hello world <del class="diffmod">we are</del><ins class="diffmod">neware</ins> testing space issue';
    expect(HtmlDiff.execute(accpetedTxn, pendingTxn)).toEqual(expectedOutput);
  });
});
