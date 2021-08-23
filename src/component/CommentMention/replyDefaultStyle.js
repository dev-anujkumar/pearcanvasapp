export default {
        "&multiLine": {
          control: {
            fontSize: "8pt",
            lineHeight: 1.2,
            border: "1px solid #007fa3",
          },
      
          highlighter: {
            padding: 9
          },
      
          input: {
            padding: 9,
            maxHeight: 40,
            outline: 0,
            border: 0,
            overflowY : "auto"
          }
        },
      
        suggestions: {
        top: '15px',
          list: {
            width: '100%',
            maxHeight: '166px',
            padding: '4px 0 9px',
            borderRadius: '2px',
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
            border: "solid 1px #d3d3d3",
            backgroundColor: '#fffffe',
            overflowY: 'auto',
            fontSize: '12px',
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