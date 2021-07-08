import Match from '../../../src/js/difftool/Match'

  it('We can check if the Match called the class constructor', () => {
    const MatchClass = new Match(1,2, 3);
    expect(MatchClass.startInOld).toBe(1);
    expect(MatchClass.startInNew).toBe(2);
    expect(MatchClass.size).toBe(3);  
  });

  it('Checking endInOld function', () => {
    const MatchClass = new Match(1,2, 3);
    const spy = jest.spyOn(MatchClass, 'endInOld').and.returnValue(
      2
    );
    expect(MatchClass.endInOld).toBe(2);
    expect(spy).toHaveBeenCalled();
  });