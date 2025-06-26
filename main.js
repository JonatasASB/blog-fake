const btnInsert = document.querySelector('#insert')

async function readPosts() {
    const postArea = document.getElementById('posts');
    postArea.innerHTML = 'Carregando...'

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let posts = await response.json();

    if (posts.length > 0) {
        postArea.innerHTML = ''


        for (let i = 0; i < posts.length; i++) {
            const postDiv = document.createElement('div')
            postDiv.className = 'post'

            const titlePost = document.createElement('h2')
            titlePost.innerHTML = posts[i].title
            postDiv.appendChild(titlePost)


            const bodyPost = document.createElement('p')
            bodyPost.innerHTML = posts[i].body
            postDiv.appendChild(bodyPost)

            postArea.appendChild(postDiv)
        }

    } else {
        postArea.innerHTML = 'Nenhum post encontrado'
    }
}
readPosts()

async function addNewPost(title, body, userId) {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            body: body,
            userId: userId
        })
    })

    const titleNewPost = document.querySelector('#title')
    const bodyNewPost = document.querySelector('#body')


    titleNewPost.value = '';
    bodyNewPost.value = '';

    readPosts();
}

btnInsert.addEventListener('click', () => {
    let title = document.querySelector('#title').value;
    let body = document.querySelector('#body').value;

    if (title && body) {
        addNewPost(title, body);
    } else {
        alert('Preencha todos os campos')
    }
})