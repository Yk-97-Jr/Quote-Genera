// Target the document elements with the help of id
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const autherText = document.getElementById('author');
const twitterBtn  = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Decalre one global array

let apiQuotes = [];

//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loaing
function completeLoading(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Show new Quotes

function newQuotes(){
    loading();
    // pick a raadom qoutes from apiQuotes[]
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // console.log(quote);
    // check if author field is blank and replace it with 'Unknown'
    if(!quote.author){
        autherText.textContent = 'Unknown'
    } else{
        autherText.textContent = quote.author;
    }
    // check the quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // Set the Quote and hide the loader
    quoteText.textContent = quote.text;
    completeLoading();
}

// Get Quotes from API

async function getQuotes(){
    loading();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";   

    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes)
        newQuotes();
        completeLoading();
    }
    catch(error){
        // Error message
    }
};

// Tweet Qoutes

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${autherText.textContent}`;
    window.open(twitterUrl,'_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',newQuotes);
twitterBtn.addEventListener('click', tweetQuote);

//onLoad

getQuotes();

// loading();