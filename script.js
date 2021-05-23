const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const btnTwitter = document.getElementById('twitter');
const btnNewQuote = document.getElementById('new-quote');
const uiLoader = document.getElementById('loader');

// Get Quote from API
async function getQuote() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        // make an API call using headers from proxy call
        const respone = await fetch(proxyUrl + apiUrl);
        // const respone  = await fetch(apiUrl, {
        //         method: "GET", 
        //         body: JSON.stringify(data),
        //         mode: 'cors',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         }
        //     }
        // )
        const data = await respone.json();
        authorText.innerText = data.quoteAuthor === '' ? 'Unknown' : data.quoteAuthor;
        
        // reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // console.log(data);
    }
    catch (error) {
        getQuote();
        console.log("Erorr>>>: ", error);
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
    
}
// uiLoader.classList.add('hide-loader');
// Event listeners
btnNewQuote.addEventListener('click', getQuote);
btnTwitter.addEventListener('click', tweetQuote);
// On Load
getQuote();