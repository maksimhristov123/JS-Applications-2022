function attachEvents() {
    let loadBtnElement = document.getElementById('btnLoadPosts');
    let btnViewPostElement = document.getElementById('btnViewPost');

    let selectElement = document.getElementById('posts');
    let postListElement = document.getElementById('post-comments');
    let postTitleElement = document.getElementById('post-title');
    let postBodyElement = document.getElementById('post-body');

    loadBtnElement.addEventListener('click', function(e){
        e.preventDefault();

        fetch('http://localhost:3030/jsonstore/blog/posts')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Object.entries(data).forEach(post => {
                    let bodyRes = post[1].body;
                    let _id = post[1].id;
                    let titleRes = post[1].title;

                    let optionEl = createElement('option',['value', _id], titleRes, selectElement);
                })
            })
    })

    btnViewPostElement.addEventListener('click', function(e){
        e.preventDefault();

        let selectValue = selectElement.value;

        fetch(`http://localhost:3030/jsonstore/blog/comments`)
        .then(response => response.json())
        .then(comm => {
            console.log(comm)
        })

        console.log(selectValue);
        postListElement.innerHTML = "";

        fetch('http://localhost:3030/jsonstore/blog/comments')
            .then(response => response.json())
            .then(coments => { 
                Object.entries(coments).forEach(c => {
                    if(c[1].postId === selectValue){
                        
                        let commentsListElement = createElement('li',['id',c[1].id],c[1].text, postListElement);
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

attachEvents();