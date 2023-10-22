const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete(){
  quoteContainer.hidden = false;
  loader.hidden = true;
}


async function newQuote() {
  loading();
    const oneQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(oneQuote);
    if(!oneQuote.name) {
      authorText.textContent = 'Unknown';
    }else {
      authorText.textContent = oneQuote.name;
    }
    if (oneQuote.content.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = oneQuote.content;
    complete();
  }
  
  function arrQuote(quote) {
    const quoteObject = {
      content: quote.content,
      name: quote.originator.name,
    };
    apiQuotes.push(quoteObject);
  }
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'eeb9ac2373mshd5b8c9b9483ecb8p17cd00jsn56ada7d9265c',
      'Content-Type': 'application/json',
    },
  };
  
  let apiQuotes = [];
  let totalQuotesFetched = 0;
  const maxQuotes = 10;
  
  async function getQuotes() {
    loading();
    const apiUrl = 'https://quotes15.p.rapidapi.com/quotes/random/';
    try {
      const response = await fetch(apiUrl, options);
      const quotes = await response.json();
      arrQuote(quotes); // Call the arrQuote function with the received quote.
      totalQuotesFetched++;
      if (totalQuotesFetched < maxQuotes) {
        setTimeout(getQuotes, 1500);
      } else {
        newQuote(); // Call newQuote when all 100 quotes are fetched.
      }
    } catch (error) {
      
      console.error(error);
    }
  }

  function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
  }

  newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
  // Start fetching quotes
  getQuotes().then(() => {
    // This block will execute after all quotes are fetched.
    console.log("All quotes fetched.");
  });
  