// Use this sample to create your own voice commands
intent('What does this app do?', 'What can I do here?', 
       reply('This is a news ai'));



const API_KEY = 'afdf21a9caf9428f820793090303ccf1';
let savedArticles = [];

// News by Source
intent('Give me the news from $(source* (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    if(p.source.value) {
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value
        .toLowerCase().split(" ").join("-")}`;
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        if(!articles.length) {
            p.play("Sorry, please try searching for news from a different source")
            return;
        }
        
        savedArticles = articles;
        
        p.play({command: 'newsHeadlines', articles});
        p.play(`Here are the (latest|recent) ${p.source.value}`);
        
        p.play('Would you like me to read the headlines for you?');
        p.then(confirmation)
    })
})

// News by term
intent('Tell me about $(term* (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
    if(p.term.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`;
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        if(!articles.length) {
            p.play("Sorry, please try searching for something else.")
            return;
        }
        
        savedArticles = articles;
        
        p.play({command: 'newsHeadlines', articles});
        p.play(`Here are the (latest|recent) articles on ${p.term.value}`);
        
         p.play('Would you like me to read the headlines for you?');
         p.then(confirmation);
        
    })
})

const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}`;

// News by categories
intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    if(p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.C.value}`;
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        if(!articles.length) {
            p.play("Sorry, please try searching for a different category.")
            return;
        }
        
        savedArticles = articles;
        
        p.play({command: 'newsHeadlines', articles});
        if(p.C.value) {
            p.play(`Here are the (latest|recent) articles on ${p.C.value}`);
        }
        p.play(`Here are the (latest|recent) news`);
        
        p.play('Would you like me to read the headlines for you?');
        p.then(confirmation)
    })
})

const confirmation = context(() => {
    intent('yes', async (p) => {
        for(let i=0; i<savedArticles.length; i++) {
            p.play({command: 'highlight', article: savedArticles[i]});
            p.play(`${savedArticles[i].title}`)
        }
    })
    
    intent('no', (p) => {
        p.play('Sure, sounds good to me.')
    })
})

intent('Open (the|) (article|) (number|) $(number* (.*))', (p) => {
    if(p.number.value) {
         p.play({command: 'open', number: p.number.value, articles: savedArticles});   
    }
})

intent('(go|) back', (p) => {
    p.play("Okay! going back.");
    p.play({command: 'newsHeadlines', articles: []})
})