const topicName = document.querySelector('.topic-name');




const urlParams = new URLSearchParams( window.location.search);
const topic = urlParams.get('topic');

topicName.textContent = topic;


