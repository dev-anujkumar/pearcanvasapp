import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// import { createSpeechlySpeechRecognition } from 'speech-recognition-polyfill'
import { Box, IconButton } from '@mui/material'
import MicIcon from '@mui/icons-material/Mic'
import TextField from '@mui/material/TextField'

// const appId = 'a7a97c3c-f49d-4db5-b9e5-81c8620ba89e'
// const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId)
// SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition)

function Dictaphone(props) {
    const [speechText, setSpeechText] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const toggleRecording = () => {
        if (isRecording) {
            SpeechRecognition.stopListening()
        } else {
            startListening()
        }
        setIsRecording(prevState => !prevState)
        if (speechText) {
            setSpeechText('')
        } else {
            setSpeechText('Recorded speech will appear here...')
        }
    }

    const {
        transcript, listening, browserSupportsSpeechRecognition, finalTranscript, interimTranscript
        , ...data
    } = useSpeechRecognition()
    console.log('data', interimTranscript)
    if (finalTranscript !== '' && interimTranscript === '' && !listening) {
        console.log('speech end')
        // listening = false
    }
    const startListening = () => SpeechRecognition.startListening({ continuous: true })
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>
    }

    return (
        <div>
            {/* <TextField
                label='Recorded Speech to Text'
                variant='outlined'
                multiline
                rows={4}
                value={transcript}
                fullWidth

                InputProps={{
                    endAdornment: (
                        <IconButton
                            color='primary'
                            aria-label='record'
                            onClick={toggleRecording}
                            style={{ position: 'absolute', bottom: 0, right: 0 }}
                            onTouchEnd={SpeechRecognition.stopListening}
                            onMouseUp={SpeechRecognition.stopListening}
                        >
                            <Box
                                borderRadius='50%'
                                width='40px'
                                height='40px'
                                backgroundColor={speechText ? '#4CAF50' : '#e0e0e0'}
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                            >
                                <MicIcon style={{ color: 'white' }} />
                            </Box>
                        </IconButton>
                    )
                }}
            /> */}
            <IconButton
                color='primary'
                aria-label='record'
                onClick={toggleRecording}
                style={{ position: 'absolute', bottom: 0, right: 0 }}
                onTouchEnd={SpeechRecognition.stopListening}
                onMouseUp={SpeechRecognition.stopListening}
                backgroundColor={speechText ? '#4CAF50' : '#e0e0e0'}
            >
                <MicIcon />
            </IconButton>
        </div>
    )
}

export default Dictaphone
