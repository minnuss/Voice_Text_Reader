const main = document.querySelector('main')
const voicesSelect = document.getElementById('voices')
const textArea = document.getElementById('text')
const btnRead = document.getElementById('read')
const btnToggle = document.getElementById('toggle')
const btnClose = document.querySelector('.close')

// data for each box
const data = [
    {
        image: 'img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: 'img/hungry.jpg',
        text: "I'm Hungry"
    },
    {
        image: 'img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: 'img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: 'img/grandma.jpg',
        text: "I want to go to Grandma"
    },
    {
        image: 'img/home.jpg',
        text: "I want to go Home"
    },
    {
        image: 'img/outside.jpg',
        text: "I want to go Outside"
    },
    {
        image: 'img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: 'img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: 'img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: 'img/tired.jpg',
        text: "I'm Tired"
    }
]

data.forEach(createBox)

// create speech boxes
function createBox(item) {
    const box = document.createElement('div')

    const { image, text } = item

    box.classList.add('box')
    box.innerHTML = `
    <img src="${image}" alt="${text}">
    <p class="info">${text}</p>
    `

    box.addEventListener('click', () => {
        // send text value from box to setTextMessage()
        setTextMessage(text)
        speakText()

        // add active effect
        box.classList.add('active')

        setTimeout(() => {
            box.classList.remove('active')
        }, 1000);
    })

    main.appendChild(box)
}

// Get voices options from API
let voices = []

function getVoices() {
    // console.log(speechSynthesis.getVoices())

    voices = speechSynthesis.getVoices()

    voices.forEach(voice => {
        const option = document.createElement('option')

        option.value = voice.name
        option.innerText = `${voice.name} ${voice.lang}`

        voicesSelect.appendChild(option)
    })
}

// Init speech synth
const message = new SpeechSynthesisUtterance()

// Set text value
function setTextMessage(text) {
    message.text = text
}

// Speak text
function speakText() {
    speechSynthesis.speak(message)
}

// Set voice from voice select option
function setVoice(e) {
    console.log('ja sam this value', this.value)
    console.log('ja sam e type', e.type)
    message.voice = voices.find(voice => voice.name === this.value)
    // voices.forEach(vo => console.log(vo))
    console.log('i am selected voice', message.voice)
}

// voices option select
speechSynthesis.addEventListener('voiceschanged', getVoices)

// bring text box
btnToggle.addEventListener('click', () => {
    document.getElementById('text-box').classList.toggle('show')
})

// close button
btnClose.addEventListener('click', () => {
    document.getElementById('text-box').classList.remove('show')
})

// Change voice from voice select option
voicesSelect.addEventListener('change', setVoice)

// Read text button
btnRead.addEventListener('click', () => {
    setTextMessage(textArea.value)
    speakText()
})

getVoices()