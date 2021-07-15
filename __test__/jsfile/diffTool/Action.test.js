import Action from '../../../src/js/difftool/Action'

    it('checking the object keys and values', () => {
        expect(Action.equal).toBe(0);
        expect(Action.delete).toBe(1);
        expect(Action.insert).toBe(2);
        expect(Action.none).toBe(3);
        expect(Action.replace).toBe(4);
    });
  