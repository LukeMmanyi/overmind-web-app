const topicName = document.querySelector('.topic-name');
const submitButton = document.querySelector('.submit');
const userResponse = document.querySelector(".user-response")
const urlParams = new URLSearchParams( window.location.search);
const topicInfo = document.querySelector('.topic-info');
const topic = urlParams.get('topic');
const style = urlParams.get('style');
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

  const styleInstruction = style === 'fantasy'
    ? "Frame this scenario in a dramatized, heightened setting — think anime, fantasy, or sci-fi inspired stakes and tension — but the core problem must still require real, grounded reasoning to solve. Don't let the dramatization replace the substance of the decision."
    : "Keep this scenario grounded in realistic, everyday circumstances — something that could plausibly happen in real life.";

  const message = `You are a mentor for Overmind, an app that trains cognitive skills through 
high-stakes scenarios. Generate ONE scenario for the topic: ${topic}. 

Style instructions: ${styleInstruction}

Draw from a wide range of domains, including business and career, 
but rotate across other areas too — family and relationships, friendships, 
money and personal finance, health decisions, community or group dynamics, 
ethical dilemmas in everyday life, conflict with strangers or neighbors, 
parenting or caregiving, romantic relationships, or civic/social situations. 
Don't default to business or career every time — vary the domain so repeated 
use doesn't feel repetitive.

The scenario must be specific and put the user in a position where they have 
to make a real decision or navigate a real interpersonal or strategic 
situation — the stakes and reasoning required must be genuine, not trivial, 
regardless of style. Make it engaging enough that the user wants to keep 
training.

Response should be about 270 characters, plain text only, no emojis, 
no formatting, no preamble — just the scenario itself. My age range is 18-25 
so do not make it super advanced but not too easy.`;

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

  i
  
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

   aiResponse.style.display = 'block';
   submitButton.style.display = 'none';

   aiResponse.scrollIntoView({
    behavior: "smooth"
   })
    
}


getChallenge();

submitButton.addEventListener('click', () => {
  sendResponse(userResponse.value)
  submitButton.textContent = 'ANALYZING...';
 
})

