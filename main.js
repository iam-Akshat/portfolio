document.querySelectorAll('.smart-input input,.smart-input label').forEach(el =>{
    console.log(el);
    el.addEventListener('click',(ev)=>{
        if(ev.target.value) ev.target.classList.add('filled')
    })
})