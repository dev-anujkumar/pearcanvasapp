import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import MicIcon from '@mui/icons-material/Mic'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import './SpeechToText.css'

function SpeechToText(props) {
  const [isRecording, setIsRecording] = useState('');
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    finalTranscript,
    interimTranscript,
    resetTranscript,
    ...data
  } = useSpeechRecognition();

  useEffect(() => {
    if (props.enableChildCalled) {
      console.log('INSIDE USEEFFECT', isRecording)
      props.handleRecordedText(isRecording)
    }
  }, [props.enableChildCalled]);

  const startMic = (e) =>{
    console.log("CHECING TEXT VALUE", e.target.value)
    setIsRecording(e.target.value)
    // startListening();
    console.log("isRecodring startMic", transcript, "Listening", listening);
    // props.handleRecordedText(text)
  }

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
        <TextField
        id="input-with-icon-textfield"
        label="Recording..."
        onChange={(e) => startMic(e)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MicIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        value = {isRecording}
      />
  );
}

export default SpeechToText                                        