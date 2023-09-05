const nav = document.querySelector('nav');
const info = document.querySelector('#info');

let puppies;

const fetchPuppies = async()=> {
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-FTB-ET-WEB-FT/players');
    const json = await response.json();
    puppies = json.data;
    render(); 
};

const render = () => {
    const hash = window.location.hash.slice(1)*1;
    const html = puppies.players.map( puppy => {
        return `
            <a href='#${puppy.id !== hash ? puppy.id : ''}' class='${ puppy.id === hash ? 'selected': ''}'>
            ${ puppy.name }
            </a>
        `;
    }).join('');
    nav.innerHTML = html;

    const puppy = puppies.players.find( puppy => {
        return puppy.id === hash;
    });

    let infoHtml = 'Pick your player!'
    if(puppy){
        infoHtml = `
        <div style='background-image:url(${ puppy.imageUrl})'>
        ${ puppy.breed }
        </div>   
    `;
    } 

    info.innerHTML = infoHtml;
};

window.addEventListener('hashchange', () => {
    render();
});

fetchPuppies();