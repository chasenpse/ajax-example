var app = {
    url: "fetch.php",
    data: false,
    output: "",
    fetchData: function (url) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                app.data = JSON.parse(xmlhttp.responseText);
                app.createTable(app.data);
            } else {
                
            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send();
        document.getElementById("fetchData").setAttribute('value', 'loading...');
        document.getElementById("fetchData").setAttribute('class', 'loading');
    },
    createTable: function (d) {
        app.output += "<table id='items'><tr>" +
                    "<th class='item-Name'>Name</th>" +
                    "<th class='item-Beds'>Bedrooms</th>" +
                    "<th class='item-Baths'>Bathrooms</th>" +
                    "<th class='item-FloorplanName'>Floorplan</th>" +
                    "<th class='item-Rent'>Rent</th>" +
                    "<th class='item-Link'>Apply</th>" +
                    "</tr>";
        for (i=0; i<d.length; i++) {
            app.output += "<tr id='aptId-" + app.data[i].ApartmentId + "' class='item'>" +
                    "<td class='item-Name'>" + app.data[i].ApartmentName + "</td>" +
                    "<td class='item-Beds'>" + app.data[i].Beds + "</td>" +
                    "<td class='item-Baths'>" + app.data[i].Baths + "</td>" +
                    "<td class='item-FloorplanName'>" + app.data[i].FloorplanName + "</td>" +
                    "<td class='item-Rent'>$" + app.data[i].MinimumRent + " - $" + app.data[i].MaximumRent + "</td>" +
                    "<td class='item-Link'><a href='" + app.data[i].ApplyOnlineURL + "'>Apply</a></td>" +
                    "</tr>";
        }
        app.output += "</table>";
        document.getElementById("mainContainer").innerHTML = app.output; 
    }
}

//init
$(function () {
    $(document).on('click touchstart', '#fetchData', function (e) {
        app.fetchData(app.url);
    });
});