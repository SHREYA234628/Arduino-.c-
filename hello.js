function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
    addMessage("assistant", text);
}

function addMessage(sender, text) {
    const chat = document.getElementById("chat");
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function wishMe() {
    let hour = new Date().getHours();
    if (hour < 12) speak("Good morning! I am your assistant.");
    else if (hour < 16) speak("Good afternoon! How can I help you?");
    else speak("Good evening! What can I do for you?");
}

window.addEventListener("load", wishMe);

// Voice recognition setup
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let userMessage = event.results[0][0].transcript;
    addMessage("user", userMessage);
    generateResponse(userMessage.toLowerCase());
};

document.getElementById("start-btn").addEventListener("click", () => {
    recognition.start();
});

// Assistant smart replies
function generateResponse(message) {
    let response = "Sorry, I don't understand that yet.";

    if (message.includes("your name")) {
        response = "I am Genie, your AI assistant.";
    } else if (message.includes("time")) {
        response = "The current time is " + new Date().toLocaleTimeString();
    } else if (message.includes("date")) {
        response = "Today's date is " + new Date().toLocaleDateString();
    } else if (message.includes("hello")) {
        response = "Hello! How can I help you today?";
    } else if (message.includes("who is elon musk")) {
        response = "Elon Musk is a billionaire entrepreneur and the CEO of SpaceX and Tesla.";
    } else if (message.includes("joke")) {
        response = "Why don't scientists trust atoms? Because they make up everything!";
    }

    speak(response);
}
