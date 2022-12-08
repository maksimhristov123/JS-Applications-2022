function lockedProfile() {
    let listElement = document.getElementById('main');

    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then(res => res.json())
        .then(data => {
            Object.entries(data).forEach((user, index )=> {
                let profileElement = createElement('div', ['class', 'profile'], "", listElement);
                createElement('img', ['class', 'userIcon', 'src', './iconProfile2.png' ], "", profileElement);
                createElement('label', [], "Lock", profileElement);
                createElement('input', ['type','radio', 'name', `user${index}Locked`,'value', 'lock','checked', true], "", profileElement);
                createElement('label', [], "Unlock", profileElement);
                createElement('input', ['type', 'radio', 'name',`user${index}Locked`,'value', 'unlock'] , "", profileElement );
                createElement('br',[],"", profileElement);
                createElement('hr',[],"", profileElement);
                createElement('label', [], "Username", profileElement);
                createElement('input', ['type', 'text', 'name',`user${index}Username`,'value', `${user[1].username}`, 'disabled', 'true', 'readonly', 'true' ] , "", profileElement );
                let userElement = createElement('div',['class',`user${index}HiddenFields`, 'style', 'display:none'], "",profileElement);
                createElement('hr',[],"", userElement);
                createElement('label', [], "Email:", userElement);
                createElement('input', ['type', 'email', 'name',`user${index}Email`,'value', `${user[1].email}`, 'disabled', 'true', 'readonly', 'true' ] , "", userElement );
                createElement('label', [], "Age:", userElement);
                createElement('input', ['type', 'text', 'name',`user${index}Age`,'value', `${user[1].age}`, 'disabled', 'true', 'readonly', 'true' ] , "", userElement );
                let buttonElement = createElement('button', [], "Show more", profileElement);

                buttonElement.addEventListener('click', function(e){
                    e.preventDefault();
                    let buttonParrent = this.parentNode;
                    let radioUnlckEl = buttonParrent.querySelector(`input[value = "unlock"]`);

                    if(radioUnlckEl.checked && this.textContent === 'Show more'){
                        this.textContent = 'Hide It';
                        userElement.setAttribute('style', 'display:block');
                        console.log('ok');
                    }else{
                        this.textContent = 'Show more';
                        userElement.setAttribute('style', 'display:none');

                        console.log('not ok');
                    }
                })
            })
        })

    
}

let createElement = (tag, attributes, content, parent) => {
    let element = document.createElement(tag);

    for (let i = 0; i < attributes.length; i+=2) {
        element.setAttribute(attributes[i], attributes[i+1]);
    }

    element.textContent = content;

    if(parent && parent !== ""){
        parent.appendChild(element)
    }

    return element
}
