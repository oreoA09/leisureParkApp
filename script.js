'use strict'
let API_KEY = "zKrsqz6TZInjGfN3VFkQZDJNP0P7HNZBNpWiN46J";

function makeRequest(stateCodes, limit) {
	const myHeaders = new Headers();
	myHeaders.append("X-Api-Key", API_KEY);

	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};

	fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${stateCodes}&limit=${limit}`, requestOptions)
		.then(response => response.json())
		.then(result => {
			displayResults(result)
		}).catch(error => console.log('error', error));
}

function displayResults(responseJson) {
	console.log(responseJson);
	const data = responseJson.data;
	$('#results').empty()
	for (let i = 0; i < data.length; i++) {
		$('#results').append(`
    <div class="p-5">
    <h3>${data[i].name}</h3>
		<section id="imgs" class="py-3">
			<img src="${data[i].images[0].url}">
	<img src="${data[i].images[2].url}">
 		</section>
		<p>${data[i].description}
    <span><a href="${data[i].url}">Learn more</a></span></p>
		<hr>
    </div>
    `)
	}
}

function watchForm() {
	$('#form').submit(e => {
		e.preventDefault();
		const park_name = event.target.park_name.value;
		const number = event.target.number.value;
		console.log(name);
		console.log(number);
		makeRequest(park_name, number);
	});
}

$(watchForm);