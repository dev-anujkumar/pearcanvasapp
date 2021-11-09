import { getOpenerContent, getOpenerImageSource } from '../../../src/component/OpenerElement/OpenerConstants';
const labelOptions = ["No Label", "Chapter", "Ch", "Part", "Unit"];

describe('testing getOpenerContent', () => {
    let textsemantics = [
        {
            "type": "label",
            "charStart": 0,
            "charEnd": 7
        },
        {
            "type": "number",
            "charStart": 8,
            "charEnd": 10
        }
    ]
    let text = "Chapter X: Opening Element Title";
    it('should return the label according to param', () => {
        let result = getOpenerContent(textsemantics, 'label', text);
        expect(result).toBe('Chapter');
    });
    it('should return the number according to param', () => {
        let result = getOpenerContent(textsemantics, 'number', text);
        expect(result).toBe('X:');
    });
    it('should return the title according to param', () => {
        let result = getOpenerContent(textsemantics, 'title', text);
        expect(result).toBe('Opening Element Title');
    });
    it('should return the label without textsemantics', () => {
        textsemantics = [];
        let result = getOpenerContent(textsemantics, 'label', text);
        expect(result).toBe('No Label');
    });
    it('should return the number without textsemantics', () => {
        textsemantics = [];
        let result = getOpenerContent(textsemantics, 'number', text);
        expect(result).toBe('');
    });
    it('should return the title without textsemantics', () => {
        textsemantics = [];
        let result = getOpenerContent(textsemantics, 'title', text);
        expect(result).toBe('Chapter X: Opening Element Title');
    });
    it('should return the label without textsemantics and text', () => {
        textsemantics = [];
        text = "";
        let result = getOpenerContent(textsemantics, 'label', text);
        expect(result).toBe('No Label');
    });
    it('should return the number without textsemantics and text', () => {
        textsemantics = [];
        text = "";
        let result = getOpenerContent(textsemantics, 'number', text);
        expect(result).toBe('');
    });
    it('should return the title without textsemantics and text', () => {
        textsemantics = [];
        text = "";
        let result = getOpenerContent(textsemantics, 'title', text);
        expect(result).toBe('');
    });
    it('should return the label without matching with textsemantics label', () => {
        textsemantics = [
            {
                "type": "name",
                "charStart": 0,
                "charEnd": 7
            },
            {
                "type": "sname",
                "charStart": 8,
                "charEnd": 10
            }
        ]
        text = "Chapter X: Opening Element Title";
        let result = getOpenerContent(textsemantics, 'label', text);
        expect(result).toBe('No Label');
    });
    it('should return the label without matching with textsemantics number', () => {
        textsemantics = [
            {
                "type": "name",
                "charStart": 0,
                "charEnd": 7
            },
            {
                "type": "sname",
                "charStart": 8,
                "charEnd": 10
            }
        ]
        text = "Chapter X: Opening Element Title";
        let result = getOpenerContent(textsemantics, 'number', text);
        expect(result).toBe('');
    });
    it('should return the label without matching with textsemantics title', () => {
        textsemantics = [
            {
                "type": "name",
                "charStart": 0,
                "charEnd": 7
            },
            {
                "type": "sname",
                "charStart": 8,
                "charEnd": 10
            }
        ]
        text = "Chapter X: Opening Element Title";
        let result = getOpenerContent(textsemantics, 'title', text);
        expect(result).toBe('X: Opening Element Title');
    });
    it('should return the label without matching with textsemantics label and blank title', () => {
        textsemantics = [
            {
                "type": "name",
                "charStart": 0,
                "charEnd": 7
            },
            {
                "type": "sname",
                "charStart": 8,
                "charEnd": 10
            }
        ]
        text = "";
        let result = getOpenerContent(textsemantics, 'label', text);
        expect(result).toBe('');
    });
    it('should return the path with blank parameter', () => {
        let path = 'test image';
        let result = getOpenerImageSource(path);
        expect(result).toBe('test image');
    });
});