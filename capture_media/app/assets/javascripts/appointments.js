function Appointment(attributes) {
    this.name = attributes.name;
    this.date = attributes.date;
    this.quantity = attributes.quantity;
    this.package_id = attributes.package_id;
}

function Packages(attributes) {
    this.name = attributes.name;
    this.description = attributes.description;
}

Appointment.prototype;

Appointment.prototype.youScheduled = function() {
    // console.log(`Hello, ${this.name}, your appointment is ${this.date}.`);
    return `Hello ${this.name}, your appointment is ${this.date}`;
    // alert {`Hello ${this.name}, your appointment is ${this.date}`};
};

$(function(){
     $("form#new_appointment").on("submit", function(e){
         var $form = $(this);
         var action = $form.attr("action");
         var params = $form.serialize()

         $.ajax({
             url: action,
             data: params,
             dataType: "json",
             method: "POST"
         }).success(function(json){
            //console.log(json)
            $("div.appointments").val(" ")
            var appointment = new Appointment(json);
            var appointmentLi = appointment.youScheduled()
            document.getElementById("scheduled").innerHTML = appointmentLi //"Hello " + appointment.name + ", " + "your appointment is " + appointment.date + ".";
            // $("div.appointments").append(appointmentLi)
         })
         .error(function(response){
             console.log("You broke it?", response)
         })
        e.preventDefault();
     })
})

// $.get(this.href).success(function(json){
//     var $pictures = $("div#appointments")
//     $pictures.html

//     Object.keys(json).forEach(function(appointment) {
//         // debugger
//         // console.log(key + '=' + obj[key]);
//     });
// });

$(function(){
    $("a#appointments").on("click", function(e){
        $.ajax({
            method: 'GET',
            url: '/users/1/appointments.json',
            dataType: 'json'
            // how to GET appointments using JSON
        }).done(function(response){
            debugger
            // console.log("div#appointments", response)
            // Be sure to format the appointments using Alice's example for JSON formatting: https://codepen.io/Balbasuar/pen/LXNyrV?editors=1010
            $("div#appointments").append(response)
        })
        // THE FOLLOWING CODE IS MEANT TO DISPLAY JSON WITHOUT USING JQUERY, BUT USING FETCH INSTEAD
        // Var url = '/users/1/appointments.json'
        // fetch(url, {
        //     Method: 'GET',
        //     dataType: 'json'
        // })
        // .then(response => response.json())
        // .then(data => {
        //     const appointment = new Appointment(data.message)
        //     const appointmentHTML = appointment.formatDateHtml ()
        //     Document.getElementById('div#appointment').innerHTML = appointmentHTML
        // })
        // }

        // Class Appointment {
        //     Constructor(message){
        //         This.name = message
        //     }
        // }

        // Appointment.prototype.formatDateHtml = function(){
        //     Return `Name: ${this.name}
        //     Date: ${this.date}
        //     Quantity:${this.quantity}
        //     Package: ${this.package_id}`
        // }

        // e.preventDefault();
    })
})



$(function(){
    $("a.load_package").on("click", function(e) { 
        $.ajax({
            method: "GET",
            url: '/packages/popular.json',
            dataType: 'json'
        }).done(function(response){
            console.log("a.load_package", response)
            // how to append the JSON to the page
            // Be sure to format the appointments using Alice's example for JSON formatting: https://codepen.io/Balbasuar/pen/LXNyrV?editors=1010
            // return this.name + " " + this.description
            $("div.popular").append(response);
        })
        e.preventDefault();
    })
})
