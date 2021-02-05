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