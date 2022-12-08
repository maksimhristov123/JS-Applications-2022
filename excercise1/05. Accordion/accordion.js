function solution() {
    let mainElement = document.getElementById('main');

    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(res => res.json())
        .then(data => {
            let response = data;

            data.forEach(post => {
                let title = post.title;
                let postId = post._id;
    
                let postEl = createElement('div', ['class','accordion'], "", mainElement);
                let headEl = createElement('div', ['class', 'head'], "", postEl);
                let titleEl = createElement('span', [], title, headEl);
                let buttonElement = createElement('button', ['class','button', 'id', postId], 'More', headEl);
                let extraEl = createElement('div', ['class','extra'],"",postEl);

                buttonElement.addEventListener('click', function(e){
                    e.preventDefault();

                    let buttonText = this.textContent;
                    console.log(buttonText);

                    if(buttonText === 'More'){
                        this.textContent = 'Less';
                        extraEl.classList.remove('extra');

                        fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${postId}`)
                            .then(res => res.json())
                            .then(postData => {
                                let content = postData.content;
                                let textEl = createElement('p',[],content,extraEl);
                            })
                    }else{
                        this.textContent = 'More';
                        extraEl.textContent = "";
                        extraEl.classList.add('extra');
                    }
                   
                } )
            });
        })
}

solution();

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
