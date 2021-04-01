
function ability(h){
    var habilidades = [];
    for(var x=0; x < h.abilities.length; x++){
        habilidades.push(h['abilities'][x].ability.name);
    };
    return habilidades
}

function movesFunction(m){
    var moves = [];
    for(var x=0; x < 4; x++){
        moves.push(m['moves'][x].move.name);
    };
    return moves
}

function miFuncion(url){
    $(document).on('ready turbolinks:load', function(){
    
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json'
        })
        .done(function(data){
            var padre = document.getElementById("padre");
            for(var d=0; d<data['results'].length; d++){
                padre.innerHTML += `
                <div style="display:flex">
                    <p> ${data['results'][d]['name']} </p>
                    <input type="button" value="quiero saber mas" data-id="${d+1}">
                    </div>
                    `
                };
            if(data['next']){
                padre.innerHTML += `<button onclick="${alert(data['next'])}">Siguiente</button>`
            }
        });
            
        
            
        $("#padre").click(function(event) {
            $.ajax({
                type: 'GET',
                url: "https://pokeapi.co/api/v2/pokemon/"+event.target.dataset.id,
                dataType: 'json'
            })
            .done(function(data){
                alert(`
                nombre: ${data['name']}
                tipo: ${data['types'][0].type.name}
                habilidades: ${ability(data)}
                movimientos: ${movesFunction(data)}
                `);
                
            })
            .fail(function(){
                console.log('no hay nada');
            });
        });
            
    });
}

    
miFuncion('https://pokeapi.co/api/v2/pokemon');
    
    
