import axios from "axios";
import { TOGGLE_AI_CHATBOX, UPDATE_CHAT_HISTORY } from "../../constants/Action_Constants";
import config from "../../config/config";
import store from "../../appstore/store";

export const startInterval = (time, setPendingStatus) => {
    const intervalId = setInterval(() => { setPendingStatus() }, time)
    return intervalId
}

export const resetInterval = (intervalId) => {
    if (intervalId) {
        clearInterval(intervalId)
    }
}

export const toggleAIChatbox = (payload) => {
    return {
        type: TOGGLE_AI_CHATBOX,
        payload
    }
}

export const updateChatHistory = (payload) => {
    return {
        type: UPDATE_CHAT_HISTORY,
        payload
    }
}
export const handleSendMessageAPI = async (promptText) => {
    const api_key = `d9508ee6-3984-4435-bd0b-652825190f32`;
    // const api_key = `0a463959-62e4-459d-85c6-c192b535b6b6`;
    const bodyObj = {
        "model": "gpt-4",
        "temperature": 0.5,
        "max_tokens": 512,
        "top_p": 1,
        messages: [
            {
                role: 'user',
                content: `${promptText} : Provide the answer in HTML format`,
            },
        ],
    };
    const url = `${config.REACT_APP_API_URL}v1/ai/gen/llmChatAsync`
    const response = await axios.post(url, bodyObj,
        {
            "Content-Type": "application/json",
            aiauth: api_key,
            // 'x-prsn-user-id': 'abcd'
        })
    console.log('response', response)
    if (response?.data?.status) {
        await fetchContentFromAI(response.data.data, api_key);
    } else {
        console.log("There is some issue in the response")
    }
   

}
export const fetchContentFromAI = async (taskId, api_key) => {
    
    const url = `${config.REACT_APP_API_URL}v1/ai/gen/chatAsyncStatus?task_id=${taskId}`;
    return axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            "aiauth": api_key
        }
    }).then(res => {
        if (res?.data?.status !== 'Completed') {
            resetInterval(config.AI_TIMER_REF);
            config.AI_TIMER_REF = startInterval(5000, () => { fetchContentFromAI(taskId, api_key) })
        }
        else {
            resetInterval(config.AI_TIMER_REF);
            let reply = res?.data?.chat_response;
            store.dispatch(updateChatHistory({sender:'ai', message:reply.content})); 
        }
    })
        .catch(err => {
            console.error("Text generation Error >> ", err);
        })
}