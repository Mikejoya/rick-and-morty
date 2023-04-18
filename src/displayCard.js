import $ from 'jquery';
function display(id){
    $(".container-first-character").html('');
    console.log($(".container-firts-character"));
    $.ajax({
        url: `https://rickandmortyapi.com/api/character/${id}`,
        success: (data)=>{
            location.hash = data.name;
            console.log(data.location.name);
            $(".container-firts-character").append(`
            <article class="character-first-info">
            <figure><img src="${data.image}" alt=""></figure>
            <div class="icon-close">
            <span class="material-icons">
            cancel
            </span>
            </div>
            <section class="info-card">
            <p>Name: <span>${data.name}</span></p>
            <p>Status: <span>${data.status}</span></p>
            <p>Species: <span>${data.species}</span></p>
            <p>Gender: <span>${data.gender}</span></p>
            <p>Origin: <span>${data.origin.name}</span></p>
            <p>Location: <span>${data.location.name}</span></p>
            </div>
            </section>
            </article>
            `).show();
            console.log(id);
            $(".icon-close").on('click', () => {
                console.log('funcion lista');
                location.hash = 'characters';
                $(".container-firts-character").empty();
                $(".container-firts-character").hide();
            });
        }
    });
};
export { display };