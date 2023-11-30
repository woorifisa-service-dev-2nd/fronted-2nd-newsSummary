

const text = document.getElementById('search')
const searchClick = document.getElementById('btn')

searchClick.addEventListener('click', (event) => {
    const textValue = text.value;
    console.log(textValue);

    const url = '/search/news'
    const body =JSON.stringify({ query : textValue})
    const options = optionsFrom('POST', body)

    fetch(url, optionsFrom)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
    })

})



const optionsFrom = (method, body, headers) => {
    return {
        method,

        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body
    };
};

