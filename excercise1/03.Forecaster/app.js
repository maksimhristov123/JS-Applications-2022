function attachEvents() {
    let icons = {
        'Sunny' : '☀',
        'Partly sunny' : '⛅',
        'Overcast' : '☁',
        'Rain' : '☂',
        'Degrees' : '°',
    }

    let locationInputValue = document.getElementById('location');
    let submitButtonElement = document.getElementById('submit');

    // Results containers
    let forecastElement = document.getElementById('forecast');
    let currentElement = document.getElementById('current');
    let upcomingElement = document.getElementById('upcoming');

    let createElement = (tag, classes, content, parent) => {
        let element = document.createElement(tag);

        classes.forEach(cls => {
            element.classList.add(cls);
        });

        element.textContent = content;

        if(parent && parent !== ""){
            parent.appendChild(element)
        }

        return element
    }

    submitButtonElement.addEventListener('click', (e) => {
        e.preventDefault();
        let city = locationInputValue.value;
        let results = [];

        fetch('http://localhost:3030/jsonstore/forecaster/locations')
            .then(res => res.json())
            .then(data => {
                results = data.filter(town => town.name === city);
                forecastElement.setAttribute('style', 'display:block;');
            })
            .then(daily => {
                let code = results[0].code;

                fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
                    .then(res => res.json())
                    .then(data => {
                        let conditionData = data.forecast.condition;
                        let forecastData = data.name;
                        let highData = data.forecast.high;
                        let lowData = data.forecast.low;

                        let forcastsElement = createElement('div', ['forecasts'], "", currentElement);
                        createElement('span', ['condition' , 'symbol'], icons[conditionData], forcastsElement);
                        let conditionElement = createElement('span', ['condition'], "", forcastsElement);
                        createElement('span', ['forecast-data'], forecastData, conditionElement)
                        createElement('span', ['forecast-data'], `${lowData}°/${highData}°`, conditionElement)
                        createElement('span', ['forecast-data'], conditionData, conditionElement);
                    })
                    .catch(err => forecastElement.textContent = "Error")

                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
                    .then(res => res.json())
                    .then(data => {
                        let forecastInfoElement = createElement('div', ['forecast-info'], "",upcomingElement);

                        let forecastData = data.forecast;

                        console.log(data);
                        forecastData.forEach(el => {
                            let upcomingElement = createElement('span',['upcoming'],"", forecastInfoElement);
                            createElement('span', ['symbol'], icons[el.condition], upcomingElement);
                            createElement('span', ['forecast-data'], `${el.low}°/${el.high}°`, upcomingElement);
                            createElement('span', ['forecast-data'], el.condition, upcomingElement);

                        })
                    })
                    .catch(err => forecastElement.textContent = "Error")
            })
            .catch(err => forecastElement.textContent = "Error")
    })
}


attachEvents();