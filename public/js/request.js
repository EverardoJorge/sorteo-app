var x = 0;
var max = document.getElementById("maxTickets").value;

document.getElementById('newTicket').addEventListener("click", createTicket)
document.getElementById("saveTickets").addEventListener("click", getTickets);

function createTicket() {
    x++
    var radio = '<input type="radio" id="statusTicket_'+x+'" name="statusTicket_'+x+'" value="Pendiente" checked><label for="">Pendiente</label><input type="radio" id="statusTicket_'+x+'" name="statusTicket_'+x+'" value="Comprado"><label for="">Comprado</label>';
    var input = '<input type="number" name="ticket_'+x+'" id="ticket_'+x+'">';
    var div = document.createElement('div');
    div.innerHTML = input + radio;
    document.getElementById('tickets').appendChild(div);

}


function getTickets() {
    var newTickets = [];
for (let i = 1; i <= x; i++) {
    var status = document.querySelector('input[id="statusTicket_'+i+'"]:checked').value
    var ticket = document.getElementById('ticket_'+i).value;
        newTickets.push({status, ticket})
    }

    request(newTickets)
}



///HACER LA PETICION HTTP PARA ACTUALIZAR LOS DATOS DEL USUARIO
function request(arrayTickets) {
    console.log(arrayTickets)
}

