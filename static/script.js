document.addEventListener("DOMContentLoaded", function () {
    const chatlog = document.getElementById("chatlog");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    // Function to add a message to the chatlog
    function addMessage(message, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message " + sender;
        messageDiv.textContent = message;
        chatlog.appendChild(messageDiv);
        chatlog.scrollTop = chatlog.scrollHeight;
    }

    // Function to handle user input and generate a response
    function handleUserInput() {
        const userMessage = userInput.value;
        addMessage(userMessage, "user");
        userInput.value = ""; // Clear the input field

        // Send user message to the backend to get a response
        fetch("/get_response", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userMessage }),
        })
        .then((response) => response.json())
        .then((data) => {
            const botMessage = data.message;
            addMessage(botMessage, "bot");
        })
        .catch((error) => {
            console.error("Error:", error);
            addMessage("Oops! Something went wrong. Please try again later.", "bot");
        });
    }

    // Handle the click event on the send button
    sendButton.addEventListener("click", function () {
        handleUserInput();
    });

    // Handle the "Enter" key press in the input field
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });
});
