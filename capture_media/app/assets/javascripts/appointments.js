
$(document).ready(function () {
    listenMyAppointments();
    listingPickedDates();
    sortByDate();
});


function Package(attributes) {
    this.name = attributes.name;
    this.description = attributes.description;
}


$(function () {
    $("form#new_appointment").on("submit", function (e) {
        //debugger
        var $form = $(this);
        var action = $form.attr("action");
        var params = $form.serialize()

        $.ajax({
            url: action,
            data: params,
            dataType: "json",
            method: "POST"
        }).success(function (json) {
            $("div.appointments").val(" ")
            var appointment = new Appointment(json);
            var appointmentLi = appointment.youScheduled()
            document.getElementById("scheduled").innerHTML = appointmentLi
        })
            .error(function (response) {
                console.log("You broke it?", response)
            })
        e.preventDefault();
        listenMyAppointments();
    })
})

function listenMyAppointments() {
    $("a#appointments").click(function (e) {
        e.preventDefault();
        //debugger
        fetchAppointments()
    })
}

function fetchAppointments() {
    fetch('/users/1/appointments.json', {
        headers: { 'Contnent-Type': 'application/json' }
    })
        .then(response => response.json()
            .then(data => createAppointments(data))
        )
}

function createAppointments(data) {
    data.forEach((appt) => {
        let appointment = new Appointment(appt)
        let appointmentHTML = appointment.formatDateHtml()
        $("div#my-scheduled-time").append(appointmentHTML + "<br>")
        console.log("appoinment.formatAdmiredHtml()")
        //document.getElementById("client").innerHTML += appointmentHTML + "<br>";
    })
}

class Appointment {
    constructor(attributes) {
        this.name = attributes.name;
        this.date = attributes.date;
        this.quantity = attributes.quantity;
        this.package_id = attributes.package_id;
    }
}

Appointment.prototype.youScheduled = function () {
    return `Hello ${this.name}, your appointment is ${this.date}`;
};

Appointment.prototype.formatDateHtml = function () {
    // use a loop to get all of the information to every appointment
    return `Name: ${this.name}   
        Date: ${this.date} 
        Quantity: ${this.quantity}   
        Package: ${this.package_id}`
}


$(document).ready(function () {
    $("a.load_package").click(function (e) {
        e.preventDefault();
        const x = document.getElementById("package");
        x.addEventListener("click", function (event) {
            fetchPopularPackage()
        });
        function fetchPopularPackage() {
            fetch('/packages/popular.json', {
                headers: { 'Contnent-Type': 'application/json' }
            })
                .then(resp => resp.json())
                .then(data => {
                    const package = new Package(data.name, data.description)
                    const packageHTML = package.formatAdmiredHtml()
                    //debugger
                    document.getElementById('admired').innerHTML = packageHTML
                })
        }
        class Package {
            constructor(name, description) {
                this.name = name;
                this.description = description;
            }
        }
        Package.prototype.formatAdmiredHtml = function () {
            return `${this.name}  ${this.description}`
        }
    });
    listenMyAppointments();
})

function listingPickedDates() {
    // debugger
    $("a.favored").click(function (e) {
        e.preventDefault();
        // need to share the this.href with button
        // set a data attritbute onto the button
        // look this up and see why it doesn't work
        // let button = $("#sort")
        // button.val(this.href)
        // console.log(this.href)
        $.ajax({
            url: this.href,
            dataType: "json",
            method: "GET"
        }).success(function (json) {
            // clear the HTML in the div
            //debugger
            console.log(json["appointments"])
            $("div#choosen").html("") //empties the div
            // iterate over each appointment within JSON
            let knowledge = json["appointments"]
            // this works but I cannot see the list of appointments that have selected a package all at once.
            knowledge.forEach((occasion) => {
                var meeting = new Appointment(occasion);
                var peopleChoice = meeting.selectedDateAndName()
                $("div#choosen").append(peopleChoice)
                // document.getElementById("choosen").innerHTML = peopleChoice
            })
            // with each appointment data, append a name and date
        })
            .error(function (response) {
                console.log("Something went wrong!!!", response)
            })
    })
}

Appointment.prototype.selectedDateAndName = function () {
    return `<p>${this.name} has selected this package for ${this.date}.</p>`
}


// we want to sort the appointment in order of when the picture will be taken
function sortByDate() {
    $("#sort").click(function (e) {
        e.preventDefault();
        console.log(this)
        // url: /packages/2
        $.ajax({
            url: "/packages/2",
            dataType: "json",
            method: "GET"
        }).success(function (json) {
            debugger
            console.log(json["apppointments"])
            let engage = json["appointments"]
            for (let i = 0, len = engage.length; i < len; i++) {
                //console.log(engage[i]);
                //console.log(engage[i].name);
                console.log(engage[i]['date'])
                // const time = engage[i]['date']
                // time.sort(function (a, b) {
                //     return a - b
                // });
            }
        })
    })
}