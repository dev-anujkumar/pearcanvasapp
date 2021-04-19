import { checkTCM } from '../../../src/component/SlateWrapper/SlateWrapperConstants';
import { OPENER, ELEMENT_ASSESSMENT, TABLE_EDITOR, ASSESSMENT, SHOW_HIDE, CONTAINER, POETRY, CITATION, MULTI_COLUMN, MULTI_COLUMN_GROUP, WORKED_EXAMPLE, TEXT } from '../../../src/component/SlateWrapper/SlateWrapperConstants';



describe('testing  elm type of  tcm --', () => {
  it('should return the opener element', () => {
    expect(checkTCM({ type: 'openerelement' })).toEqual(OPENER);
  });
  it('should return the tableasmarkup, figure element', () => {
    const element = { type: 'figure', figuretype: 'tableasmarkup' };
    expect(checkTCM(element)).toEqual(TABLE_EDITOR);
  });
  it('should return the assessment, figure element', () => {
    const element = { type: 'figure', figuretype: 'assessment' };
    expect(checkTCM(element)).toEqual(ASSESSMENT);
  });
  it('should return the assessment, figure element', () => {
    const element = { type: 'figure', figuretype: 'jhhhhvv' };
    expect(checkTCM(element)).toEqual(TEXT);
  });
  it('should return the element-assessment', () => {
    expect(checkTCM({ type: 'element-assessment' })).toEqual(ELEMENT_ASSESSMENT);
  });
  it('should return the showhide', () => {
    expect(checkTCM({ type: 'showhide' })).toEqual(SHOW_HIDE);
  });
  it('should return the element-aside ', () => {
    expect(checkTCM({ type: 'element-aside' })).toEqual(CONTAINER);
  });
  it('should return the poetry ', () => {
    expect(checkTCM({ type: 'poetry' })).toEqual(POETRY);
  });
  it('should return the citations', () => {
    expect(checkTCM({ type: 'citations' })).toEqual(CITATION);
  });
  it('should return the groupedcontent', () => {
    expect(checkTCM({ type: 'groupedcontent' })).toEqual(MULTI_COLUMN);
  });
  it('should return the group', () => {
    expect(checkTCM({ type: 'group' })).toEqual(MULTI_COLUMN_GROUP);
  });
  it('should return the workedexample', () => {
    expect(checkTCM({ type: 'workedexample' })).toEqual(WORKED_EXAMPLE);
  });
});