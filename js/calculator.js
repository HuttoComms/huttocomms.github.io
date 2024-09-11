google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

// Tax Rate Calculator and Graphing
//   Original code by City of Round Rock, Texas
//   Modified for the City of Hutto
// 2024-09-03 C. Scott Wyatt (CSW) began the conversion
// 2024-09-11 CSW - Updated values and calculations 

// Version 2.x should use arrays to consolidate budget lines!!
//   Array for property tax entities
//   Array for departments and lines 
//   Cycle through the arrays instead of hard-coding lines

// Major entity tax rates, including county and ISD
// 2024-09-11 Verified Data
var taxRateCity = 0.4221140 ;
var taxRateCityWithIS = 0.4221140 ;
var taxRateCounty = 0.3331160 ;
var taxRateSchools = 1.2075000 ; 
var taxRateHigherEd = 0.039130 ;
var taxRateESD = 0.100000 ;
var taxRateRoads = 0.044329 ;
var taxRateWCID = 0.017000 ;

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

// Set Google Chart options
var chart;
var data;
var taxData;
var formatter;

var optionsMonthly = {
  legend: "none",
  vAxis: {
    title: "Cost per month",
    format: "currency",
  },
  bar: { groupWidth: "90%" },
  annotations: { alwaysOutside: true },
};

var optionsAllTaxes = {
  legend: "none",
  bar: { groupWidth: "90%" },
  annotations: { alwaysOutside: true },
};

// 'legend': 'none',  -- removes the default legend
var optionsPie = {
   pieSliceText: 'label',
  'width': 700,
  'height': 700,
  slices: {  0: {offset: 0.2}},
  colors: ["#1C5D78", "#849AB2", "#C25027", "#D9A28D",
    "#C14B55", "#A3A3A3", "#5B74C8"]
}

function drawChart() {

listTaxRates = document.getElementById("taxRateList");  
taxRateChosen = parseFloat(listTaxRates.options[listTaxRates.selectedIndex].value);
taxRateCity = taxRateChosen

  // Write property tax rates by tax entity to page
  // Added formatting to fixed-length decimal places 
  document.getElementById("taxRateCityWithIS").innerHTML = 
    accounting.toFixed(taxRateCityWithIS, 6);
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
  var amountSaved = (homeMultiplier * 0.065039) / 100;

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
// 2024-09-11 CSW - Updated values based on 2025 spreadsheet 
  var portionPolice = monthlyIndividualCityTax * 0.2971 ;
  var portionStreets = monthlyIndividualCityTax * 0.1447 ;
  var portionParks = monthlyIndividualCityTax *  0.0637 ;
  var portionDevServices = monthlyIndividualCityTax *  0.0611 ;
  var portionFinance = monthlyIndividualCityTax *  0.0500 ;
  var portionIT = monthlyIndividualCityTax *  0.0443 ;
  var portionHR = monthlyIndividualCityTax *  0.0395 ;
  var portionEng = monthlyIndividualCityTax *  0.0354 ;
  // CMO = City Manager's Office
  var portionCMO = monthlyIndividualCityTax *  0.0339 ;
  var portionLegal = monthlyIndividualCityTax *  0.0244 ;
  // ConstInsp = Construction Inspection
  var portionConstInsp = monthlyIndividualCityTax *  0.0234 ;
  var portionEconDev = monthlyIndividualCityTax *  0.0211 ;  
  // NonDept = Non-Departmental
  var portionNonDept = monthlyIndividualCityTax *  0.0202 ;
  var portionCityCouncil = monthlyIndividualCityTax *  0.0201 ;
  var portionFacilities = monthlyIndividualCityTax *  0.0195 ;
  var portionLibrary = monthlyIndividualCityTax *  0.0170 ;
  var portionComms = monthlyIndividualCityTax *  0.0160 ;
  var portionMuniCourt = monthlyIndividualCityTax *  0.0157 ;
  var portionCitySec = monthlyIndividualCityTax *  0.0133 ;
  // EMC = Emergency Management 
  var portionEMC = monthlyIndividualCityTax *  0.0104 ;
  var portionFleet = monthlyIndividualCityTax *  0.0102 ;
  // Culture = Community & Culture Development
  var portionCulture = monthlyIndividualCityTax *  0.0099 ;
  var portionStratOps = monthlyIndividualCityTax *  0.0055 ;
  // XferOut = Transfers Out
  var portionXferOut = monthlyIndividualCityTax *  0.0035 ;
  // All categories after the top 10
  var portionOther = monthlyIndividualCityTax * 0.2059 ;

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
  
  // Data used for Department portion chart
  //   Passed as an array to Google Charts 
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
      "Information Technology",
      portionIT,
      "fill-color:rgb(160,133,175);fill-opacity: 0.7",
      accounting.formatMoney(portionIT),
    ],
    [
      "Human Resources",
      portionHR,
      "fill-color:rgb(218,237,180);fill-opacity: 0.7",
      accounting.formatMoney(portionHR),
    ],
    [
      "Engineering",
      portionEng,
      "fill-color:rgb(207,154,184);fill-opacity: 0.7",
      accounting.formatMoney(portionEng),
    ],
	[
      "City Manager's Office",
      portionCMO,
      "fill-color:rgb(128,250,128);fill-opacity: 0.7",
      accounting.formatMoney(portionCMO),
    ],
    [
      "Legal",
      portionLegal,
      "fill-color:rgb(160,133,175);fill-opacity: 0.7",
      accounting.formatMoney(portionLegal),
    ],
    
  ]);

  // Variables and taxData array to draw chart of overall property taxes
  // 2024-09-11 CSW - Updated city tax to include debt service
  var monthlyTaxCity = (homeTaxNumber * taxRateCityWithIS) / 12;
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
      "Upper Brushy Creek WCID",
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
  
  // Format data in the arrays for accounting style
  formatter = new google.visualization.NumberFormat({
    negativeColor: "red",
    negativeParens: true,
    fractionDigits: 2,
    pattern: "$###,###.##",
  });

  formatter.format(data, 1);
  formatter.format(taxData, 1);

  // Insert the charts into the HTML page 
  chartAll = new google.visualization.BarChart(
    document.getElementById("allTaxesChart")
  );
  chartAll.draw(taxData, optionsAllTaxes);

  chartMonthly = new google.visualization.ColumnChart(
    document.getElementById("monthlyChart")
  );
  chartMonthly.draw(data, optionsMonthly);

  chartCompPie = new google.visualization.PieChart(
  	document.getElementById("allTaxesPieChart")
  );
  chartCompPie.draw(taxData, optionsPie);

}

// If the window is resized, redraw all charts
$(window).resize(function () {
  drawChart();
});
