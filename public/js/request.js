document.getElementById("savetickets").addEventListener("click", addTickets);

function addTickets() {
    // GET INPUTS VALUES FROM USER
    var raffleID = document.getElementById("raffleID").value;
    var userID = document.getElementById("userID").value;
    var username = document.getElementById("username").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var state = document.getElementById("state").value;
    var newTickets = document.getElementById("newtickets").value;

    if (newTickets != '') {
        // console.log(username)
        // console.log(lastname)
        // console.log(email)
        // console.log(phone)
        // console.log(state)
        // console.log(newTickets)
        // console.log(raffleID)
        // console.log(userID)
        
        var arrayTickets = newTickets.split(',')

        for (let i = 0; i < arrayTickets.length; i++) {
            ////crear un un objeto para que se envien 
            console.log(arrayTickets[i])
        }

        console.log(jsonTicket)

        ///HACER LA PETICION DE PARA ACTUALIZAR
        // UTILIZAR LA FUNCION FETCH NATIVA DE JAVASCRIPT

    } else {
        alert("No se tiene informacion de los nuevos boletos")
    }
}



// var a = '1,20,39';

// console.log(a.split(',')[1])

