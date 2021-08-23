export default {
    "&multiLine": {
      control: {
        fontSize: "12pt",
        lineHeight: 1.2,
        border: "1px solid #007fa3",
        height: "150px"
      },

      highlighter: {
        padding: 9
      },
  
      input: {
        padding: 9,
        maxHeight: 150,
        outline: 0,
        border: 0,
        overflowY : "auto"
      }
    },
  
    suggestions: {
    top: '15px',
      list: {
        width: '100%',
        maxHeight: '261px',
        padding: '1px 1px 10px',
        borderRadius: '2px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
        backgroundColor: '#fffffe',
        overflowY: 'auto',
        fontSize: '16px'
      },
  
      item: {
        padding: '10px 10px',
        color: '#007fa3',
        "&focused": {
            backgroundColor: '#f0f0f0'
        }
      }
    }
  };
  