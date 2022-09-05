"use strict"

let searchValue = document.getElementById('search_input');
let result = document.querySelector('.result');
searchValue.addEventListener('keyup', search);


function search(event){
    if(event.key === 'Enter'){
        loadImg();
        document.getElementById('search_input').value = '';
    }
}


function loadImg(){
    removeImg();
    const url = 'https://api.unsplash.com/search/photos/?query=' + searchValue.value + '&per_page=9&client_id=FA1ZpXGC2IivkRntnBJ7lpHVMpVJ_mSK7KtsN5ad_XY';
    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json()
        }
        else{
            alert(response.status)
        }
    })
    .then(data => {
        const imageNotes = [];
        for(let i = 0; i < data.results.length; i++){
            imageNotes[i] = document.createElement('div');
            imageNotes[i].className = 'img';
            imageNotes[i].style.backgroundImage = 'url('+ data.results[i].urls.raw +')'
            imageNotes[i].addEventListener('dblclick', 
            function(){
                window.open(data.results[i].links.download, 
                '_blank');
            });
            document.querySelector('.result').appendChild(imageNotes[i]);
        }
    })
}

function removeImg(){
    document.querySelector('.result').innerHTML = '';
}