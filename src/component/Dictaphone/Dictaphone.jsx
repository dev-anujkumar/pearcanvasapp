import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// import { createSpeechlySpeechRecognition } from 'speech-recognition-polyfill'
import {IconButton } from '@mui/material'
import MicIcon from '@mui/icons-material/Mic'
import TextField from '@mui/material/TextField'
import tinymce from 'tinymce/tinymce';

// const appId = 'a7a97c3c-f49d-4db5-b9e5-81c8620ba89e'
// const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId)
// SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition)

function Dictaphone(props) {
    const [speechText, setSpeechText] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const toggleRecording = (finalTranscript) => {
        if (isRecording) {
            SpeechRecognition.stopListening()
            const editor = tinymce?.activeEditor
            let selection = editor.selection;

            // Get the cursor position
            let cursorPos = selection.getRng();

            // Insert the text at the cursor position
            editor.insertContent(finalTranscript, { skip_undo: true }, cursorPos);
            resetTranscript()
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
        transcript, browserSupportsSpeechRecognition, finalTranscript, resetTranscript
    } = useSpeechRecognition()
    
    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true })
        tinymce.activeEditor.focus()
    }
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>
    }

    return (
        <div>
            {isRecording &&
                <TextField 
                label='Recorded Speech to Text'
                variant='outlined'
                multiline
                rows={4}
                value={transcript}
                fullWidth
                />}
            <IconButton
                color='primary'
                aria-label='record'
                onClick={() => toggleRecording(finalTranscript)}
                style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: isRecording ? '#007fa3' : '#dcdcdc', color: isRecording && '#f0f8ff'}}
            >
                <MicIcon />
            </IconButton>
        </div>
    )
}

export default Dictaphone
