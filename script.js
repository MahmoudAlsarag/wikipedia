let resultsContainer = document.getElementsByClassName("container")[0]
let span = document.getElementById('up')



window.onscroll = function () {
    if(window.scrollY >= 100 ) {
        span.style.display = "block";
    }else{
        span.style.display = "none";

    }
};
span.onclick = function(){
    window.scrollTo({
        left:0,
        top:0,
        behavior:"smooth", 
    });
};

const validateInput = (el) => {
    if(el.value === ""){
        resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
    }else{
        generateResults(el.value, el)
    }
}

const generateResults = (searchValue, inputField) => {
    fetch(
        "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="
        + searchValue
        
    )
    .then(response => response.json())

    .then(data => {
        let results = data.query.search
        let numberOfResults = data.query.search.length
        resultsContainer.innerHTML = ""
        
        for(let i=0; i<numberOfResults; i++) {
            let result = document.createElement("div")
            result.classList.add("results")
            result.innerHTML = `
            <div>
                <h3>${results[i].title}</h3>
                <p>${results[i].snippet}</p>
            </div>
            <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
            `
            resultsContainer.appendChild(result)
            
        }
        if(inputField.value === ""){
            resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
        }
    }
    )
}


