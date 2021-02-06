document.querySelectorAll('.smart-input input,.smart-input label').forEach(el =>{
    el.addEventListener('click',(ev)=>{
        if(ev.target.value) ev.target.classList.add('filled')
    })
})

const hamburger = document.querySelectorAll('.burger')[0]
const menu = document.querySelectorAll('nav ul')[0]
const menu_lines = document.querySelectorAll('.burger .line') 
let toggle = false
hamburger.addEventListener('click',()=>{
    menu.classList.toggle('open')
    if(!toggle){
        menu_lines[0].style.transform = 'rotate(45deg)'
        menu_lines[1].style.transform = 'rotate(-45deg)'
        menu_lines[2].style.transform = 'rotate(-90deg)'
    }else{
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
    all_links.forEach(link=>{
        if(link!==exceptThisLink){
            const notEl = document.querySelector('li.'+link)
            if(notEl.classList.contains('active')){
                notEl.classList.remove('active')
            }
        }
    })
}
const observerOptions = {
    // rootMargin: '0px 0px 50% 0px',
    threshold: 0.33
}
const ib = new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry => {
        // based on assumption that last name in classList always related link number
        const section_number = entry.target.classList[entry.target.classList.length-1];
        if(entry.isIntersecting){
            removeActiveFromOtherLinks(section_number)
            document.querySelector('li.'+section_number).classList.add('active')
            
        }
    })

},observerOptions)

document.querySelectorAll('section').forEach(section=>{
    ib.observe(section)
})
