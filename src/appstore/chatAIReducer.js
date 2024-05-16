import { TOGGLE_AI_CHATBOX, UPDATE_CHAT_HISTORY } from '../constants/Action_Constants';

const initalData = [{
    "sender": "user",
    "message": "What do you mean by data? Answer in 1000 words"
},
{
    "sender": "ai",
        "message": `
                <h2>Syntax</h2>

                <p>Syntax refers to the set of rules that dictate how programs in a certain programming language must be written. It is the structure or form of written commands that are understood and correctly processed by a computer. Syntax is basically a programming language's grammar.</p>

                <h3>Key Elements of Syntax:</h3>

                <ul>
                    <li>Commands: These are specific instructions given to a computer to perform specific tasks.</li>
                    <li>Functions: These are blocks of code that perform a specific task.</li>
                    <li>Operators: These are symbols that tell the computer to perform specific mathematical or logical manipulations.</li>
                    <li>Variables: These are named memory locations used to store values.</li>
                </ul>

                <p>In essence, syntax is a set of rules that specify how to write correctly structured programs in a language. It is crucial to follow these rules when coding to ensure that the computer can interpret and execute the commands as intended.</p> `
}
]
const INITIAL_STATE = {
    isAIChatboxOpen: true,
    chatHistory: [...initalData]
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function chatboxAIReducer(state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch (action.type) {
        case TOGGLE_AI_CHATBOX:
            return {
            ...state,
            isAIChatboxOpen:action.payload
            }
        case UPDATE_CHAT_HISTORY:
            console.log('updating value',action)
            return {
                ...state,
                chatHistory:[...state.chatHistory,action.payload]
            }
        default:
            return state
    }
}
