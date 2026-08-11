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

  const message = `I have an application called overmind. It tests users cognitive abilities and helps them foster their decision making. You are the mentor that will give them a situation according to a topic and tell them how they did with scrutiny. Now please give them a situation that cab be applicable in the real world and actually have them interested and wanting to do more challenges. It has to mae them learn, be fun, and addictive. The topic is ${topic}. Make the response around 270 characters. can go less or more if you want. Remember only the challenge not the scoring yet. Try to be unique with the situations so we don't get the same one twice`;

  const messageObj = {
    message: message
  }
  
  const sendAIData = await fetch("http://localhost:3000/getAIR", {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },

    body: JSON.stringify(messageObj)
  }) 
  
  const aiSituation = await sendAIData.json();

  console.log(aiSituation);
  console.log('hello');
}

async function sendResponse(userResponse) {
  
}

 getChallenge();

submitButton.addEventListener('click', () => {
  sendResponse(userResponse.value)
})

