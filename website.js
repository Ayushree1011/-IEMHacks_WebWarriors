const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let canSendMessage = true;
let replyToMessage = null;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function appendMessage(content, color, messageId) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add('replyable'); // Add class for styling replyable messages
    messageDiv.style.color = color;
    messageDiv.setAttribute('data-message-id', messageId); // Store the message ID

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.textContent = content;

    const replyButton = document.createElement('button');
    replyButton.classList.add('reply-button');
    replyButton.textContent = 'Reply';

    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(replyButton);

    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function clearReply() {
    replyToMessage = null;
    messageInput.placeholder = 'Type your message...';
    // Remove highlighted class from all messages
    const messages = document.querySelectorAll('.replyable');
    messages.forEach(message => message.classList.remove('highlighted'));
}

function sendMessage() {
    if (!canSendMessage) return;

    const content = messageInput.value;
    if (content.trim() !== '') {
        const userColor = getRandomColor();
        const messageId = Date.now().toString(); // Generate a unique message ID
        appendMessage(`You: ${content}`, userColor, messageId);
        messageInput.value = '';

        // Disable sending for 5 seconds
        canSendMessage = false;
        setTimeout(() => {
            canSendMessage = true;
        }, 5000); // 5 seconds cooldown

        // Simulate sending message to server
        // Here you can implement sending data to your server using AJAX or WebSocket
        // For demonstration purposes, we're using a simple timeout to simulate server response
    }
}

messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

sendButton.addEventListener('click', sendMessage);

messageContainer.addEventListener('click', function(event) {
    const replyButton = event.target.closest('.reply-button');
    if (replyButton) {
        const messageDiv = replyButton.closest('.message');
        const messageId = messageDiv.getAttribute('data-message-id');
        const messageText = messageDiv.querySelector('.message-content').textContent;

        // Clear previous reply if any
        clearReply();

        // Highlight the message being replied to
        messageDiv.classList.add('highlighted');

        replyToMessage = { messageId, messageText };
        messageInput.placeholder = `Replying to: ${messageText}`;
        messageInput.focus();
    }
});
