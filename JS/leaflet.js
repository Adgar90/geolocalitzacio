let meteorites = [];

/**
 * Càrrega de dades i creació de la taula amb els meteorits que es mostrarà
 * en el nostre div 'resultat' el qual ens permetrà viatjar a les coordenades
 * del meteorit que volguem. A més a més, ens aportarà informació adicional.
 */
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
    
	let divResultat = document.getElementById("resultat");
	let table = document.createElement("table");
	dades = data;		
	dades.forEach(element => {
        
		let tr = document.createElement("tr");
        let geo = element.geolocation != undefined ? element.geolocation : {"coordinates":[111.11, 222.22]};
		tr.innerHTML = `<td>${element.id}</td>`+
                       `<td>${element.name}</td>`+
                       `<td>${parseInt(element.year)}</td>`+
                       `<td>${element.mass == undefined ? 0 : element.mass }</td>`+
                       `<button onclick="goTo('${element.name}', ${Object.values(geo)[1]})">Ir</button>`
		table.appendChild(tr);
	});
    
	divResultat.appendChild(table);
});
//Inicialització del nostre mapa on fem un setView estandard
var map = L.map('map').setView([41.1111 ,41.111], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Funció goTo ('nom meteorit', lat, long) que rep el nom del meteorit i les 
//seves coordenades per setejar la view en el punt on es troba i afegir un marcador.
function goTo(name, lat, long) {
    map.setView([lat ,long], 15);
    var marker = L.marker([lat, long]);
    marker.bindPopup(`Meteorite name: ${name}`).openPopup();
    marker.addTo(map);
}