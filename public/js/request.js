var x = 0;

var max = document.getElementById("maxTickets").value;

document.getElementById('newTicket').addEventListener("click", createTicket)
document.getElementById("saveTickets").addEventListener("click", getTickets);


function createTicket() {
    x++
    var radio = '<input type="radio" id="statusTicket_'+x+'" name="statusTicket_'+x+'" value="Pendiente" checked><label for="">Pendiente</label><input type="radio" id="statusTicket_'+x+'" name="statusTicket_'+x+'" value="Comprado"><label for="">Comprado</label>';
    var input = '<input type="number" name="ticket_'+x+'" id="ticket_'+x+'">';
    var btnRemove = '<input type="button" class="btn btn-danger" id="removeTicket" value="Eliminar"/>';
    var div = document.createElement('div');
    div.setAttribute("id", "newTickets")
    div.innerHTML = input + radio;
    document.getElementById('tickets').appendChild(div);

    // document.getElementById('removeTicket').addEventListener("click", removeTicket)

}

function removeTicket() {
    // document.getElementById("removeTicket").addEventListener("click", () => {
    //     console.log("nose que sucecde");
    //     alert("nose que pase")
    // });
    alert('HELLO WORLD ')
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


async function request(arrayTickets) {
var raffleId = document.getElementById("raffleID").value;
var userId = document.getElementById("userID").value;
const data = {userId, raffleId, tickets: arrayTickets};
const url = 'http://localhost:3000/addtickets';
const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

fetch(url, options)
  .then((response) => response.json())
  .then((json) => console.log(json));

}

