import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import MicIcon from '@mui/icons-material/Mic'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import './SpeechToText.css'

function SpeechToText(props) {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    finalTranscript,
    resetTranscript,
    ...data
  } = useSpeechRecognition();

  useEffect(() => {
    if(props?.isSpeechToTextEnabled){
      startMic()
    }
    if (props.enableChildCalled) {
      SpeechRecognition.stopListening()
      props.handleRecordedText(finalTranscript)
      resetTranscript()
    }
  }, [props.isSpeechToTextEnabled, props.enableChildCalled]);

  const startMic = (e) => {
    console.log("isRecodring startMic", transcript, "Listening", listening);
    if (listening) {
      SpeechRecognition.stopListening()
      resetTranscript()
    }
    startListening()
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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MicIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        value ={transcript}
      />
  );
}

export default SpeechToText                                        