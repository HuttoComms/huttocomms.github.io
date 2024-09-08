google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

// Tax Rate Calculator and Graphing
//   Original code by City of Round Rock, Texas
//   Modified for the City of Hutto
// 2024-09-03 C. S. Wyatt began conversion

// Version 2.x should use arrays to consolidate budget lines!!
//   Array for property tax entities
//   Array for departments and lines 
//   Cycle through the arrays, instead of hard-coding lines

// Major entity tax rates, including county and ISD
var taxRateCity = 0.4221140;
var taxRateCounty = 0.3331160;
var taxRateSchools = 1.2075000;
var taxRateHigherEd = 0.0383200;
var taxRateESD = 0.1000000;
var taxRateRoads = 0.0443290;
var taxRateWCID = 0.0162650;

// Average home value for the city - UPDATE ANNUALLY
var avgHomeValue = 361281;

/*
// 2024-09-05 Values (Saved for reference)
var taxRateCity = 0.4221140;
var taxRateCounty = 0.3331160; 
// Schools = Hutto ISD
var taxRateSchools = 1.2075000; 
// ESD = Emergency Services District 3
var taxRateESD = 0.1000000;
// Higher Education = Community College, Extensions
var taxRateHigherEd = 0.0383200;
// Water Control Improvement District
var taxRateWCID = 0.0162650;
// Special Road Improvement Tax
var taxRoads = 0.0443290;
*/

// Initialize drop-down choices
var listTaxRates = document.getElementById("taxRateList");  
var taxRateChosen = parseFloat(listTaxRates.options[listTaxRates.selectedIndex].value);
var taxRateCity = taxRateChosen

// Default the Home Value to the average assessment for City
document.getElementById("homeValue").value = avgHomeValue;

var chart;
var data;
var taxData;
var formatter;

var options = {
  legend: "none",
  vAxis: {
    title: "Cost per month",
    format: "currency",
  },
  bar: { groupWidth: "90%" },
  annotations: { alwaysOutside: true },
};

var options2 = {
  legend: "none",
  bar: { groupWidth: "90%" },
  annotations: { alwaysOutside: true },
};

function drawChart() {

listTaxRates = document.getElementById("taxRateList");  
taxRateChosen = parseFloat(listTaxRates.options[listTaxRates.selectedIndex].value);
taxRateCity = taxRateChosen

  // Write property tax rates by tax entity to page
  // Added formatting to fixed length 
  document.getElementById("taxRateCity").innerHTML = 
    accounting.toFixed(taxRateCity, 6);
  document.getElementById("taxRateCounty").innerHTML =
	accounting.toFixed(taxRateCounty, 6);
  document.getElementById("taxRateSchools").innerHTML = 
    accounting.toFixed(taxRateSchools, 6);
  document.getElementById("taxRateHigherEd").innerHTML = 
    accounting.toFixed(taxRateHigherEd, 6);
  document.getElementById("taxRateWCID").innerHTML = 
    accounting.toFixed(taxRateWCID, 6);
  document.getElementById("taxRateESD").innerHTML = 
    accounting.toFixed(taxRateESD, 6);
  document.getElementById("taxRateRoads").innerHTML = 
    accounting.toFixed(taxRateRoads, 6);
  

  // Calculate tax estimates using avgHomeValue
  var homeMultiplier = accounting.unformat(
    document.getElementById("homeValue").value
    );

  var homeTaxNumber = homeMultiplier / 100;
  var individualCityTax = homeTaxNumber * taxRateCity;
  var monthlyIndividualCityTax = individualCityTax / 12;
  var amountSaved = (homeMultiplier / 100) * 0.117;

  // WRITE TAX INFO TO PAGE
  document.getElementById("taxRateDisp").innerHTML = 
    accounting.toFixed(taxRateChosen, 6);
  document.getElementById("monthlyRateInfo").innerHTML = 
    accounting.formatMoney(monthlyIndividualCityTax);
  document.getElementById("yearlyRateInfo").innerHTML =
    accounting.formatMoney(individualCityTax);
  document.getElementById("yourHomeValue").innerHTML =
    accounting.formatMoney(homeMultiplier);
  document.getElementById("amountSaved").innerHTML =
    accounting.formatMoney(amountSaved);

// Eventually, an array with Description, ID, percentage, etc.
  var portionPolice = monthlyIndividualCityTax * 0.3023;
  var portionStreets = monthlyIndividualCityTax * 0.1472;
  var portionParks = monthlyIndividualCityTax * 0.0648;
  var portionDevServices = monthlyIndividualCityTax * 0.0622;
  var portionFinance = monthlyIndividualCityTax * 0.0508;
  var portionHR = monthlyIndividualCityTax * 0.0402;
  var portionIT = monthlyIndividualCityTax * 0.0451;
  var portionEng = monthlyIndividualCityTax * 0.0360;
  // CMO = City Manager's Office
  var portionCMO = monthlyIndividualCityTax * 0.0345;
  // NonDept = Non-Departmental
  var portionNonDept = monthlyIndividualCityTax * 0.0206;
  var portionLegal = monthlyIndividualCityTax * 0.0248;
  // ConstInsp = Construction Inspection
  var portionConstInsp = monthlyIndividualCityTax * 0.0238;
  var portionEconDev = monthlyIndividualCityTax * 0.0215;  
  var portionCityCouncil = monthlyIndividualCityTax * 0.0205;
  var portionFacilities = monthlyIndividualCityTax * 0.0199;
  var portionLibrary = monthlyIndividualCityTax * 0.0170;
  var portionComms = monthlyIndividualCityTax * 0.0162;
  var portionMuniCourt = monthlyIndividualCityTax * 0.0160;
  var portionCitySec = monthlyIndividualCityTax * 0.0135;
  // EMC = Emergency Management 
  var portionEMC = monthlyIndividualCityTax * 0.0106;
  var portionFleet = monthlyIndividualCityTax * 0.0104;
  // Culture = Community & Culture Development
  var portionCulture = monthlyIndividualCityTax * 0.0101;
  var portionStratOps = monthlyIndividualCityTax * 0.0056;
  // XferOut = Transfers Out
  var portionXferOut = monthlyIndividualCityTax * 0.0036;
  // All categories after Engineering
  var portionOther = monthlyIndividualCityTax * 0.25015;

// Eventually, cycle through the array and write document 
  document.getElementById("portionPolice").innerHTML =
    accounting.formatMoney(portionPolice);
  document.getElementById("portionStreets").innerHTML =
    accounting.formatMoney(portionStreets);
  document.getElementById("portionParks").innerHTML =
    accounting.formatMoney(portionParks);
  document.getElementById("portionDevServices").innerHTML =
    accounting.formatMoney(portionDevServices);
  document.getElementById("portionFinance").innerHTML =
    accounting.formatMoney(portionFinance);
  document.getElementById("portionHR").innerHTML =
    accounting.formatMoney(portionHR);
  document.getElementById("portionIT").innerHTML =
    accounting.formatMoney(portionIT);
  document.getElementById("portionEng").innerHTML =
    accounting.formatMoney(portionEng);
  document.getElementById("portionCMO").innerHTML =
    accounting.formatMoney(portionCMO);
  document.getElementById("portionNonDept").innerHTML =
    accounting.formatMoney(portionNonDept);
  document.getElementById("portionLegal").innerHTML =
    accounting.formatMoney(portionLegal);
  document.getElementById("portionConstInsp").innerHTML =
    accounting.formatMoney(portionConstInsp);
  document.getElementById("portionEconDev").innerHTML =
    accounting.formatMoney(portionEconDev);
  document.getElementById("portionCityCouncil").innerHTML =
    accounting.formatMoney(portionCityCouncil);
  document.getElementById("portionFacilities").innerHTML =
    accounting.formatMoney(portionFacilities);
  document.getElementById("portionLibrary").innerHTML =
    accounting.formatMoney(portionLibrary);
  document.getElementById("portionComms").innerHTML =
    accounting.formatMoney(portionComms);
  document.getElementById("portionMuniCourt").innerHTML =
    accounting.formatMoney(portionMuniCourt);
  document.getElementById("portionCitySec").innerHTML =
    accounting.formatMoney(portionCitySec);
  document.getElementById("portionEMC").innerHTML =
    accounting.formatMoney(portionEMC);
  document.getElementById("portionFleet").innerHTML =
    accounting.formatMoney(portionFleet);
  document.getElementById("portionCulture").innerHTML =
    accounting.formatMoney(portionCulture);
  document.getElementById("portionStratOps").innerHTML =
    accounting.formatMoney(portionStratOps);
  document.getElementById("portionXferOut").innerHTML =
    accounting.formatMoney(portionXferOut);  
  
  data = google.visualization.arrayToDataTable([
    ["Department", "Monthly Cost", { role: "style" }, { role: "annotation" }],
    [
      "Police",
      portionPolice,
      "fill-color: rgb(106,153,153);fill-opacity: 0.7",
      accounting.formatMoney(portionPolice),
    ],
    [
      "Streets and Drainage",
      portionStreets,
      "fill-color:rgb(208,108,110);fill-opacity: 0.7",
      accounting.formatMoney(portionStreets),
    ],    
    [
      "Parks and Rec",
      portionParks,
      "fill-color:rgb(40,120,187);fill-opacity: 0.7",
      accounting.formatMoney(portionParks),
    ],    
    [
      "Development Services",
      portionDevServices,
      "fill-color:rgb(140,202,141);fill-opacity: 0.7",
      accounting.formatMoney(portionDevServices),
    ],
    [
      "Finance Department",
      portionFinance,
      "fill-color:rgb(210,154,113);fill-opacity: 0.7",
      accounting.formatMoney(portionFinance),
    ],
    [
      "Human Resources",
      portionHR,
      "fill-color:rgb(218,237,180);fill-opacity: 0.7",
      accounting.formatMoney(portionHR),
    ],
    [
      "Information Technology",
      portionIT,
      "fill-color:rgb(160,133,175);fill-opacity: 0.7",
      accounting.formatMoney(portionIT),
    ],
    [
      "Engineering",
      portionEng,
      "fill-color:rgb(207,154,184);fill-opacity: 0.7",
      accounting.formatMoney(portionEng),
    ],
	[
      "Other Items",
      portionOther,
      "fill-color:rgb(128,250,128);fill-opacity: 0.7",
      accounting.formatMoney(portionOther),
    ],
  ]);

  var monthlyTaxCity = (homeTaxNumber * taxRateCity) / 12;
  var monthlyTaxCounty = (homeTaxNumber * taxRateCounty) / 12;
  var monthlyTaxSchools = (homeTaxNumber * taxRateSchools) / 12;
  var monthlyTaxHigherEd = (homeTaxNumber * taxRateHigherEd) / 12;
  var monthlyTaxESD = (homeTaxNumber * taxRateESD) / 12;
  var monthlyTaxRoads = (homeTaxNumber * taxRateRoads) / 12;
  var monthlyTaxWCID = (homeTaxNumber * taxRateWCID) / 12;
  
  taxData = google.visualization.arrayToDataTable([
    [
      "Entity",
      "Monthly Cost",
      { role: "style" },
      { role: "annotation" },
      { role: "tooltip" },
    ],
    [
      "City of Hutto",
      monthlyTaxCity,
      "fill-color:rgb(28,93,120);fill-opacity: 0.7",
      accounting.formatMoney(monthlyTaxCity),
      "Monthly Cost: " +
        accounting.formatMoney(monthlyTaxCity) +
        "\nRate = $" +
        taxRateCity +
        " per $100 valuation",
    ],
    [
      "Williamson County",
      monthlyTaxCounty,
      "fill-color:rgb(132,154,178);fill-opacity: 0.7",
      accounting.formatMoney(monthlyTaxCounty),
      "Monthly Cost: " +
        accounting.formatMoney(monthlyTaxCounty) +
        "\nRate = $" +
        taxRateCounty +
        " per $100 valuation",
    ],
    [
      "Hutto ISD",
      monthlyTaxSchools,
      "fill-color:rgb(194,80,39);fill-opacity: 0.7",
      accounting.formatMoney(monthlyTaxSchools),
      "Monthly Cost: " +
        accounting.formatMoney(monthlyTaxSchools) +
        "\nRate = $" +
        taxRateSchools +
        " per $100 valuation",
    ],
    [
      "Higher Education",
      monthlyTaxHigherEd,
      "fill-color:rgb(217,162,141);fill-opacity: 0.7",
      accounting.formatMoney(monthlyTaxHigherEd),
      "Monthly Cost: " +
        accounting.formatMoney(monthlyTaxHigherEd) +
        "\nRate = $" +
        taxRateHigherEd +
        " per $100 valuation",
    ],
    [
      "Emergency Services District",
      monthlyTaxESD,
      "fill-color:rgb(193,75,85);fill-opacity: 0.7",
      accounting.formatMoney(monthlyTaxESD),
      "Monthly Cost: " +
        accounting.formatMoney(monthlyTaxESD) +
        "\nRate = $" +
        taxRateESD +
        " per $100 valuation",
    ],    [
      "FM/RM Road Improvements",
      monthlyTaxRoads,
      "fill-color:rgb(163,163,163);fill-opacity: 0.7",
      accounting.formatMoney(monthlyTaxRoads),
      "Monthly Cost: " +
        accounting.formatMoney(monthlyTaxRoads) +
        "\nRate = $" +
        taxRateRoads +
        " per $100 valuation",
    ],  
    [
      "Water Control Improvement District",
      monthlyTaxWCID,
      "fill-color:rgb(91,116,133);fill-opacity: 0.7",
      accounting.formatMoney(monthlyTaxWCID),
      "Monthly Cost: " +
        accounting.formatMoney(monthlyTaxWCID) +
        "\nRate = $" +
        taxRateWCID +
        " per $100 valuation",
    ],
  ]);

  formatter = new google.visualization.NumberFormat({
    negativeColor: "red",
    negativeParens: true,
    fractionDigits: 2,
    pattern: "$###,###.##",
  });

  formatter.format(data, 1);
  formatter.format(taxData, 1);

  chartAll = new google.visualization.BarChart(
    document.getElementById("allTaxesChart")
  );
  chartAll.draw(taxData, options2);

  chartMonthly = new google.visualization.ColumnChart(
    document.getElementById("monthlyChart")
  );
  chartMonthly.draw(data, options);

}

$(window).resize(function () {
  drawChart();
});
