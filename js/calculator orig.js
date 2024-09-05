google.charts.load("current", { packages: ["corechart"] });

google.charts.setOnLoadCallback(drawChart);

//RELEVANT ENTITY TAX RATES

var cityTaxRate = 0.36;

var williamsonCountyTaxRate = 0.400948;

var RRISDTaxRate = 0.8949;

var ACCTaxRate = 0.1013;

var WCIDTaxRate = 0.017;

var avgHomeValue = 376169;
//WRITE AVERAGE HOME VALUE TO INPUT FIELD
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
  //WRITE CITY TAX RATE TO PAGE

  document.getElementById("cityTaxRate").innerHTML = cityTaxRate;

  document.getElementById("williamsonCountyTaxRate").innerHTML =
    williamsonCountyTaxRate;

  document.getElementById("RRISDTaxRate").innerHTML = RRISDTaxRate;

  document.getElementById("ACCTaxRate").innerHTML = ACCTaxRate;

  document.getElementById("WCIDTaxRate").innerHTML = WCIDTaxRate;

  //SET TAX INFO USING avgHomeValue

  var homeMultiplier = accounting.unformat(
    document.getElementById("homeValue").value
  );

  var homeTaxNumber = homeMultiplier / 100;

  var individualCityTax = homeTaxNumber * cityTaxRate;

  var monthlyIndividualCityTax = individualCityTax / 12;

  var amountSaved = (homeMultiplier / 100) * 0.117;

  //WRITE TAX INFO TO PAGE

  document.getElementById("monthlyRateInfo").innerHTML = accounting.formatMoney(
    monthlyIndividualCityTax
  );

  document.getElementById("yearlyRateInfo").innerHTML =
    accounting.formatMoney(individualCityTax);

  document.getElementById("yourHomeValue").innerHTML =
    accounting.formatMoney(homeMultiplier);

  document.getElementById("amountSaved").innerHTML =
    accounting.formatMoney(amountSaved);

  var policeRate = monthlyIndividualCityTax * 0.2792;

  var fireRate = monthlyIndividualCityTax * 0.2209;

  var parksRate = monthlyIndividualCityTax * 0.1109;

  var transportationRate = monthlyIndividualCityTax * 0.0816;

  var fiscalSupportRate = monthlyIndividualCityTax * 0.0497;

  var planningCansRate = monthlyIndividualCityTax * 0.0449;

  var generalServicesRate = monthlyIndividualCityTax * 0.0580;

  var libraryRate = monthlyIndividualCityTax * 0.032;

  var supportServicesRate = monthlyIndividualCityTax * 0.1227; 

  data = google.visualization.arrayToDataTable([
    ["Department", "Monthly Cost", { role: "style" }, { role: "annotation" }],

    [
      "Police",
      policeRate,
      "fill-color: rgb(106,153,153);fill-opacity: 0.7",
      accounting.formatMoney(policeRate),
    ],

    [
      "Fire",
      fireRate,
      "fill-color:rgb(208,108,110);fill-opacity: 0.7",
      accounting.formatMoney(fireRate),
    ],
    
    [
      "Support Services",
      supportServicesRate,
      "fill-color:rgb(40,120,187);fill-opacity: 0.7",
      accounting.formatMoney(supportServicesRate),
    ],
    
    [
      "Parks and Rec",
      parksRate,
      "fill-color:rgb(140,202,141);fill-opacity: 0.7",
      accounting.formatMoney(parksRate),
    ],

    [
      "Transportation",
      transportationRate,
      "fill-color:rgb(210,154,113);fill-opacity: 0.7",
      accounting.formatMoney(transportationRate),
    ],

    [
      "General Services",
      generalServicesRate,
      "fill-color:rgb(218,237,180);fill-opacity: 0.7",
      accounting.formatMoney(generalServicesRate),
    ],

    [
      "Fiscal Support",
      fiscalSupportRate,
      "fill-color:rgb(160,133,175);fill-opacity: 0.7",
      accounting.formatMoney(fiscalSupportRate),
    ],

    [
      "Management & Planning",
      planningCansRate,
      "fill-color:rgb(207,154,184);fill-opacity: 0.7",
      accounting.formatMoney(planningCansRate),
    ],

    [
      "Library",
      libraryRate,
      "fill-color:rgb(255,253,191);fill-opacity: 0.7",
      accounting.formatMoney(libraryRate),
    ],
  ]);

  var cityOfRoundRockTax = (homeTaxNumber * cityTaxRate) / 12;

  var williamsonCountyTax = (homeTaxNumber * williamsonCountyTaxRate) / 12;

  var RRISDTax = (homeTaxNumber * RRISDTaxRate) / 12;

  var ACCTax = (homeTaxNumber * ACCTaxRate) / 12;

  var WCIDTax = (homeTaxNumber * WCIDTaxRate) / 12;

  taxData = google.visualization.arrayToDataTable([
    [
      "Entity",
      "Monthly Cost",
      { role: "style" },
      { role: "annotation" },
      { role: "tooltip" },
    ],

    [
      "City of Round Rock",
      cityOfRoundRockTax,
      "fill-color:rgb(224,240,254);fill-opacity: 0.7",
      accounting.formatMoney(cityOfRoundRockTax),
      "Monthly Cost: " +
        accounting.formatMoney(cityOfRoundRockTax) +
        "\nRate = $" +
        cityTaxRate +
        " per $100 valuation",
    ],

    [
      "Williamson County",
      williamsonCountyTax,
      "fill-color:rgb(73,177,213);fill-opacity: 0.7",
      accounting.formatMoney(williamsonCountyTax),
      "Monthly Cost: " +
        accounting.formatMoney(williamsonCountyTax) +
        "\nRate = $" +
        williamsonCountyTaxRate +
        " per $100 valuation",
    ],

    [
      "RRISD",
      RRISDTax,
      "fill-color:rgb(248,137,136);fill-opacity: 0.7",
      accounting.formatMoney(RRISDTax),
      "Monthly Cost: " +
        accounting.formatMoney(RRISDTax) +
        "\nRate = $" +
        RRISDTaxRate +
        " per $100 valuation",
    ],

    [
      "Austin Community College",
      ACCTax,
      "fill-color:rgb(242,243,196);fill-opacity: 0.7",
      accounting.formatMoney(ACCTax),
      "Monthly Cost: " +
        accounting.formatMoney(ACCTax) +
        "\nRate = $" +
        ACCTaxRate +
        " per $100 valuation",
    ],

    [
      "Upper Brushy Creek Water Control Improvement District",
      WCIDTax,
      "fill-color:rgb(198,189,238);fill-opacity: 0.7",
      accounting.formatMoney(WCIDTax),
      "Monthly Cost: " +
        accounting.formatMoney(WCIDTax) +
        "\nRate = $" +
        WCIDTaxRate +
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

  chart = new google.visualization.ColumnChart(
    document.getElementById("monthlyChart")
  );

  chart.draw(data, options);

  chart2 = new google.visualization.BarChart(
    document.getElementById("allTaxesChart")
  );

  chart2.draw(taxData, options2);
}

$(window).resize(function () {
  drawChart();
});
