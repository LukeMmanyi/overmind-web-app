const realisticButton = document.querySelector('.real');
const dramaButton = document.querySelector('.fake');
const decisionButton = document.querySelector('.d-m');
const socialButton = document.querySelector('.s-i');
const strategyButton = document.querySelector('.str');
const continueButton = document.querySelector('.continue-button')


let selectedTopic = null;
let selectedStyle = null;

const styleButtons = document.querySelectorAll('.real, .fake')
const  topicButtons = document.querySelectorAll('.d-m, .s-i, .str')

realisticButton.addEventListener('click', () => {
  styleButtons.forEach(button => {
    button.classList.remove("selected");
  });
  realisticButton.classList.add('selected');
  selectedStyle = 'realistic'
  checkReady();
})

dramaButton.addEventListener('click', () => {
  styleButtons.forEach(button => {
    button.classList.remove("selected");
  });
  dramaButton.classList.add('selected');
  selectedStyle = 'fantasy';
  checkReady();
})

decisionButton.addEventListener('click', () => {
  topicButtons.forEach(button => {
    button.classList.remove("selected");
  });
  decisionButton.classList.add('selected');
  selectedTopic = 'decision making';
  checkReady();
})

socialButton.addEventListener('click', () => {
  topicButtons.forEach(button => {
    button.classList.remove("selected");
  });
  socialButton.classList.add('selected');
  selectedTopic = 'social intelligence';
  checkReady();
})


strategyButton.addEventListener('click', () => {
  topicButtons.forEach(button => {
    button.classList.remove("selected");
  });
  strategyButton.classList.add('selected');
  selectedTopic = 'strategy';
  checkReady();
})

function checkReady() {
  if (selectedStyle && selectedTopic) {
    continueButton.style.display = 'block';
  } else {
    continueButton.style.display = 'none';
  }
}


continueButton.addEventListener('click', () => {
  const topic = encodeURIComponent(selectedTopic);
  const style = encodeURIComponent(selectedStyle)
  window.location.href = `training.html?topic=${topic}&style=${style}`
})


