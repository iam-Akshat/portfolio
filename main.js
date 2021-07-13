document.querySelectorAll('.smart-input input,.smart-input label').forEach(el =>{
    el.addEventListener('click',(ev)=>{
        if(ev.target.value) ev.target.classList.add('filled')
    })
})

const hamburger = document.querySelectorAll('.burger')[0]
const menu = document.querySelectorAll('nav ul')[0]
const menu_lines = document.querySelectorAll('.burger .line')
let toggle = false
hamburger.addEventListener('click', () => {
    menu.classList.toggle('open')
    if (!toggle) {
        menu_lines[0].style.transform = 'rotate(45deg)'
        menu_lines[1].style.transform = 'rotate(-45deg)'
        menu_lines[2].style.transform = 'rotate(-90deg)'
    } else {
        menu_lines[0].style.transform = 'rotate(0deg)'
        menu_lines[1].style.transform = 'rotate(0deg)'
        menu_lines[2].style.transform = 'rotate(0deg)'
    }
    toggle = !toggle

})
const removeActiveFromOtherLinks = (exceptThisLink) => {
    const all_links = [
        'l-1',
        'l-2',
        'l-3',
        'l-4',
    ]
    all_links.forEach(link => {
        if (link !== exceptThisLink) {
            const notEl = document.querySelector('li.' + link)
            if (notEl.classList.contains('active')) {
                notEl.classList.remove('active')
            }
        }
    })
}
const observerOptions = {
    // rootMargin: '0px 0px 50% 0px',
    threshold: 0.33
}
const ib = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // based on assumption that last name in classList always related link number
        const section_number = entry.target.classList[entry.target.classList.length - 1];
        if (entry.isIntersecting) {
            removeActiveFromOtherLinks(section_number)
            document.querySelector('li.' + section_number).classList.add('active')

        }
    })

}, observerOptions)

document.querySelectorAll('section').forEach(section => {
    ib.observe(section)
})
// form
const validateEmail = (mail) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return true
    }
    return false
}

const createErrorElement = (msg) => {
    const errorEl = document.createElement('div')
    errorEl.className = 'error-msg'
    errorEl.innerText = msg
    errorEl.style.color = 'red'
    return errorEl
}
const handleErrorDisplay = (element,msg,elName) =>{
    if (!errors[elName]) {
        const errRef = createErrorElement(msg)
        element.parentElement.append(errRef)
        errors[elName] = errRef
    }
}
const handleErrorRemoval = (elName) =>{
    errors[elName] && errors[elName].remove()
    errors[elName] = false
}
const url = 'https://us-central1-akshatsethi.cloudfunctions.net/function-1'
const form = document.querySelector('.form-holder form')
const submitBtn = document.querySelector('.form-holder form button')
const emailInput = document.getElementById('email')
const nameInput = document.getElementById('name')
const bodyInput = document.getElementById('body')

const errors = {
    email: false,
    name: false,
    body: false
}
// required parameters
// email, name, message
let emailSendError = false;
const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!validateEmail(emailInput.value)) {
        handleErrorDisplay(emailInput,'A valid email is required','email')
    } else {
        handleErrorRemoval('email')
    }

    if (nameInput.value.trim().length == 0) {
        handleErrorDisplay(nameInput,'A valid name is required','name')
    } else {
        handleErrorRemoval('name')
    }
    if (bodyInput.value.trim().length == 0) {
        handleErrorDisplay(bodyInput,'A valid message body is required','body')
    } else {
        handleErrorRemoval('body')
    }
    if (errors.body || errors.email || errors.name) return;

    (async()=>{
        try {
            submitBtn.disabled = true
            await fetch(url,{
                method:'POST',
                body:JSON.stringify({
                    email: emailInput.value,
                    name: nameInput.value,
                    message: bodyInput.value
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            form.innerHTML = ''
            form.appendChild(createErrorElement('Email sent successfully'))
        } catch (error) {
            form.innerHTML = ''
            form.appendChild(createErrorElement('Error!! PLease contact me@akshatsethi.com'))
        }

    })();
}
submitBtn.addEventListener('click', handleFormSubmit)