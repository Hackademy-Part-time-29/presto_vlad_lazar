let navbar=document.querySelector('#navbar');
let buttonSearch=document.querySelector('#button-search');
let articleWrapper=document.querySelector('#articleWrapper');
let categoriesAccordionBody=document.querySelector("#categoriesAccordionBody");
let priceInput=document.querySelector('#priceInput');
let priceInputValue=document.querySelector('#priceInputValue')
let wordInput=document.querySelector('#wordInput')
window.addEventListener('scroll', ()=>{
    let scrolled=window.scrollY;
    if(scrolled > 0){
        navbar.classList.remove("navbar-classes");
        navbar.classList.add("scrolledNavbar");
    }else{
        navbar.classList.add("navbar-classes");
        navbar.classList.remove("scrolledNavbar");
    }
});

fetch("./annunci.json").then((response)=>response.json()).then((data)=>{
    function truncateWord(string){
        if(string.length>15){
            return string.split(' ')[0]+"...";
        }else{
            return string;
        }
    }
    function showCards(data){
        articleWrapper.innerHTML="";
        data.forEach((article)=>{
            let card=document.createElement('div');
            card.classList.add('articleCard');
            card.innerHTML= `
            <p class="articleName" title="${article.name}">${truncateWord(article.name)}</p>
            <p class="articleCategory">${article.category}</p>
            <p class="articlePrice">${article.price}</p>
            <i class="fa-regular fa-heart id='${article.id}'"></i>
            `
            articleWrapper.appendChild(card);
        });
        let heartIcons=document.querySelectorAll('.fa-heart');
        heartIcons.forEach((icon)=>{
            icon.addEventListener('click',()=>{
                if(!favourites.includes(icon.id)){
                    favourites.push(icon.id);
                }else{
                    let index=favourites.indexOf(icon.id);
                    favourites.splice(index, 1);
                }
            })
        })
    }
    function generateRadius(){
        let categories= data.map((annuncio)=> annuncio.category);
        let uniqueCategories=[];
        categories.forEach((category)=>{
            if(!uniqueCategories.includes(category)){
                uniqueCategories.push(category);
            }
            });
            console.log(uniqueCategories);
            uniqueCategories.forEach((category)=>{
                let div=document.createElement("div");
                div.classList.add("form-check");
                div.innerHTML=`
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}"/>
                <label class="form-check-label" for="${category}">${category}</label>
                `;
                categoriesAccordionBody.appendChild(div);
            });
        }
    function filterByCategory(array){
        let selectedButton=Array.from(radioButtons).find((button)=>button.checked);
        category=selectedButton.id;
        if(category!='All'){
        let filtered=array.filter((article)=>article.category==category);
        return filtered;
        }else{
            return array;
        }
    } 
    function initialSetPriceInput(array){
        let prices=array.map((annuncio)=>+annuncio.price);
        prices.sort((a,b)=>a-b);
        let maxPrice=Math.ceil(prices.pop());
        let minPrice=Math.floor(prices.shift());
        priceInput.max=maxPrice;
        priceInput.min=minPrice;
        priceInput.value=maxPrice;
        priceInputValue.innerHTML=maxPrice;
    }
    function filterByPrice(array){
        let filtered = array.filter((article)=>+article.price<=priceInput.value);
        return filtered;
    }
    function filterByWord(array){
        let filtered=array.filter((annuncio)=>annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));
        return filtered;
    }
    function globalFilter(){
        let filteredByCategory=filterByCategory(data);
        let filteredByCategoryAndPrice=filterByPrice(filteredByCategory);
        let filteredByCategoryAndPriceAndWord=filterByWord(filteredByCategoryAndPrice);
        showCards(filteredByCategoryAndPriceAndWord);
    }
    let favourites=[];
    showCards(data);
    generateRadius();
    initialSetPriceInput(data);
    let radioButtons=document.querySelectorAll(".form-check-input");
    radioButtons.forEach((button)=>{
        button.addEventListener('click', ()=>{
            globalFilter();
        });
    });
    priceInput.addEventListener('input', ()=>{
        globalFilter();
        priceInputValue.innerHTML=priceInput.value;
    });
    wordInput.addEventListener('input', ()=>{
        globalFilter();
    });
});
