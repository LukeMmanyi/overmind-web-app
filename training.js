const topicName = document.querySelector('.topic-name');
const submitButton = document.querySelector('.submit');
const userResponse = document.querySelector(".user-response")
const urlParams = new URLSearchParams( window.location.search);
const topicInfo = document.querySelector('.topic-info');
const topic = urlParams.get('topic');
const score = document.querySelector('.ai-score');
const whatWorked = document.querySelector('.ai-response-1');
const needWork = document.querySelector('.ai-response-2');
const strongerMove = document.querySelector('.ai-response-3');
const aiResponse = document.querySelector('.ai-response');



let aiSituation;

topicName.textContent = topic;

userResponse.addEventListener("input", () => {

  if (!userResponse.value) {
        submitButton.classList.remove("submit-active");
    } else {
       submitButton.classList.add("submit-active");
    }
})

async function getChallenge() {

  const message = `I have an application called overmind. It tests users cognitive abilities and helps them foster their decision making. You are the mentor that will give them a situation according to a topic and tell them how they did with scrutiny. Now please give them a situation that cab be applicable in the real world and actually have them interested and wanting to do more challenges. It has to mae them learn, be fun, and addictive. The topic is ${topic}. Make the response around 270 characters. can go less or more if you want. Remember only the challenge not the scoring yet. Try to be unique with the situations so we don't get the same one twice. No emojis or anything just give me the situation text straight up`;

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
  
   const aiSituationData = await sendAIData.json();

   aiSituation = aiSituationData.content[0].text;

  topicInfo.textContent = aiSituation;
 
}

async function sendResponse(userResponse) {
  
  const message = `I know you don;t remember the previous inquiry, but i made a application called overmind. i am using ai to critique and score users responses to situations pertaining to ${topic}. this is the situation that you came up with - ${aiSituation}. Now here is the user response - ${userResponse}. Now i want you Score the users response. I want you to give the consulting in 4 distinct categories. A score out of 100, what they did good and worked, what needs work and what they did wrong, what would have been a stronger and better move and thinking strategy. make the 3 explanations around 197 characters each. I want you to give the response back ONLY in JSON format. No other unnecessary text at beginning or end just the JSON object itself, so when i get the data back to my backend i can have it as an object that i can extract obj.score, obj.whatWorked, obj.needWork, obj.betterMove. also DO NOT wrap the response in Markdown code blocks/backticks.`;

  const userResponseObj = {
    message: message
  }


  const userData = await fetch('http://localhost:3000/sendUR', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(userResponseObj)

  })

  const aiResponseData = await userData.json()

  console.log(aiResponseData.content[0].text)

  const aiObj = JSON.parse(aiResponseData.content[0].text);

  score.textContent = aiObj.score;

  whatWorked.textContent = aiObj.whatWorked;
  needWork.textContent = aiObj.needWork;
  strongerMove.textContent = aiObj.betterMove;

   aiResponse.style.display = 'block'
}

getChallenge();

submitButton.addEventListener('click', () => {
  sendResponse(userResponse.value)
  submitButton.textContent = 'ANALYZING...';
 
})

