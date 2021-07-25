//Need to make a user input for lat and lon



var api_url = "https://api.tomtom.com/search/2/poiSearch/food.json?lat="+user_lat+"&lon="+user_lon+"&key=SXX8XLsLjiUj4FwmBAYiLIQIKWrFfMzj";
console.log(api_url);
var api_url2 = "https://api.tomtom.com/search/2/poiSearch/restaurant.json?lat="+user_lat+"&lon="+user_lon+"&key=SXX8XLsLjiUj4FwmBAYiLIQIKWrFfMzj";
var api_url3 = "https://api.covidactnow.org/v2/county/WA.json?apiKey=fcbd7916cfa7444b99741974aaff668e";

var user_lat = window.prompt("Enter your latitude: ");
var user_lon = window.prompt("Enter your longitude: ");

var api_url = "https://api.tomtom.com/search/2/poiSearch/food.json?lat="+user_lat+"&lon="+user_lon+"&key=SXX8XLsLjiUj4FwmBAYiLIQIKWrFfMzj";
console.log(api_url);
var api_url2 = "https://api.tomtom.com/search/2/poiSearch/restaurant.json?lat="+user_lat+"&lon="+user_lon+"&key=SXX8XLsLjiUj4FwmBAYiLIQIKWrFfMzj";

/*const myRequest = new Request('https://api.tomtom.com/search/2/poiSearch/indian.json?lat=47.674911&lon=-122.124001&key=SXX8XLsLjiUj4FwmBAYiLIQIKWrFfMzj');
let names = [];
let addresses = [];
let final = fetch(myRequest)
  .then(response => response.json())
  .then(data => {
    //console.log(data['results']);
    data['results'].forEach(function(item){
      names.push(item['poi']['name']);
      addresses.push(item['address']['freeformAddress']);
    })
    show(data['results']);
  }).catch(console.error);
console.log(final);
console.log(names);
*/

// Defining async function
async function getapi(url, url2, url3) {
    
    // Storing response
    const response = await fetch(url);
    var data = await response.json();
    //url3 = "https://api.covidactnow.org/v2/county/" + data['results'][0][countrySubdivision] + ".json?apiKey=fcbd7916cfa7444b99741974aaff668e";
    console.log(url2);
    const response2 = await fetch(url2);
    var data2 = await response2.json();
    
    const response3 = await fetch(url3);
    let data3 = await response3.json();
    /*data.forEach(function(item){
      console.log(item1['riskLevels']['overall']);
    })*/
    console.log('hello');
    show(data['results'], data2['results'],data3);
}
getapi(api_url, api_url2, api_url3);

function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}

function show(data, data2, data3) {
  console.log("garage");
  let names = [];
  let addresses = [];
  data.forEach(function(item){
    data3.forEach(function(item1){
      //console.log('');
      //console.log(item['address']['countrySecondarySubdivision'] + ' County');
      //console.log('');
      //console.log(item1['county']);
      /*if(item['address']['countrySecondarySubdivision'] + ' County' === item1['county']){
        console.log('yay');
      }
      if(item1['riskLevels']['overall'] = 1){
        console.log('3');
      }*/
      if((item['address']['countrySecondarySubdivision'] + ' County' === item1['county']) && (item1['riskLevels']['overall'] = 1)){
        names.push(item['poi']['name']);
        addresses.push(item['address']['freeformAddress']);
      }
    })
  })
  data2.forEach(function(item){
    data3.forEach(function(item1){
      if((item['address']['countrySecondarySubdivision'] + ' County' === item1['county']) && (item1['riskLevels']['overall'] = 1)){
        names.push(item['poi']['name']);
        addresses.push(item['address']['freeformAddress']);
      }
    })
  })
  let final = [names, addresses];
  console.log(final);
  createTable([names, addresses]);

  /*let tab = 
    `<tr>
      <th>Name</th>
      <th>Address</th>
    </tr>`;
    
  // Loop to access all rows 
  for (let r of data) {

    tab += `<tr> 
      <td>${r['poi']['name']} </td>
      <td>${r['address']['freeformAddress']} </td>        
      </tr>`;
    }
    //console.log(tab);
    // Setting innerHTML as tab variable
    document.getElementById("restaurants").innerHTML = tab;*/
}

