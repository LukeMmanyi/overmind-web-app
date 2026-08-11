const topicName = document.querySelector('.topic-name');
const submitButton = document.querySelector('.submit');
const userResponse = document.querySelector(".user-response")
const urlParams = new URLSearchParams( window.location.search);
const topic = urlParams.get('topic');

topicName.textContent = topic;

userResponse.addEventListener("input", () => {

  if (!userResponse.value) {
        submitButton.classList.remove("submit-active");
    } else {
       submitButton.classList.add("submit-active");
    }
})

async function getChallenge() {
  
  const sendAIData = await fetch("", {
    
  })
}

async function sendResponse(userResponse) {
  
}

submitButton.addEventListener('click', () => {
  sendResponse(userResponse.value)
})

