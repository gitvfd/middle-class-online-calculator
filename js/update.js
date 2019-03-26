function update(){
    update2010();
    update2000();
}

function update2010(){
    svg2010s.selectAll("*").remove();

    var crtSelected = document.getElementById("ctrSel").options[document.getElementById("ctrSel").selectedIndex].value
    //var criSelected = document.getElementById("criSelector").options[document.getElementById("criSelector").selectedIndex].value
    var householdSize = document.getElementById("householdSize").innerHTML;
    var hhFactor = 1;
    if (householdSize!=1)
        hhFactor = Math.sqrt(parseFloat(householdSize));

    var incomeTime = '';
    if (document.getElementById('yearlyRadio').checked) {
        incomeTime = document.getElementById('yearlyRadio').value
    } else if (document.getElementById('monthlyRadio').checked) {
        incomeTime = document.getElementById('monthlyRadio').value
    }

    //if (criSelected=="-")
    //fixed value so far while we decide if we need to pick something else.
        criSelected = "Population share by income class";
    var incomeSelected = document.getElementById("incomeSel").value;
    if (incomeSelected != "your income")
            incomeSelected = incomeTime*document.getElementById("incomeSel").value

    var chartData2010s = dataTot.filter(function (d) { return d.Country == crtSelected && d.Indicator == criSelected && d.Period == "Mid 2010s"})
    
    var threshold_low = dataThresholds.filter(function (d) { return d.country == crtSelected })[0].Middle_income_lower_threshold_NC;
    var threshold_up = dataThresholds.filter(function (d) { return d.country == crtSelected })[0].Middle_income_upper_threshold_NC;
    
    var chartCanvas= svg2010s.append("g")
        .attr("x", margin/2)
        .attr("y", margin/2)
        .attr("width", width-margin)
        .attr("height", height-margin);
    
    var threshold2010 = 0;
    var threshold2010Text = 0;
    var threshold2010Val = 0;

    chartCanvas.selectAll("rect")
       .data(chartData2010s)
        .enter()
        .append("rect")
       .attr("x", function (d, i) { 
            var thresholdLimit = threshold2010;
            threshold2010 = threshold2010 + parseFloat(d.Value);
           return x(thresholdLimit);
        })
        .attr("y", height / 3)
        .attr("width", function (d, i) { return x(parseFloat(d.Value)) })
        .attr("height", 40)
       .style("fill", function (d) { return scaleClass(d.IncomeClass) })

    chartCanvas.selectAll("text")
        .data(chartData2010s)
        .enter()
        .append("text")
        .attr("class","chartText")
        .attr("x", function (d, i) {
            var thresholdLimit = threshold2010Text;
            threshold2010Text = threshold2010Text + parseFloat(d.Value);
            return x(thresholdLimit) +20 ;
        })
        .attr("y", height / 3+15)
        .text(function (d) { return d.IncomeClass });

    chartCanvas.selectAll()
        .data(chartData2010s)
        .enter()
        .append("text")
        .attr("class", "chartText")
        .attr("x", function (d, i) {
            var thresholdLimit = threshold2010Val;
            threshold2010Val = threshold2010Val + parseFloat(d.Value);
            return x(thresholdLimit) + 20;
        })
        .attr("y", height / 3 + 35)
        .text(function (d) { return d3.format(".0%")(d.Value/100) })
    
    if (criSelected == "Population share by income class"){
        chartCanvas
            .append("text")
            .attr("class", "annotText")
            .attr("x", x(chartData2010s[0].Value) - 20)
            .attr("y", height / 3 + 55)
            .text(d3.format("(.0f")(threshold_low / incomeTime * hhFactor))

        chartCanvas
            .append("text")
            .attr("class", "annotText")
            .attr("x", x(parseFloat(chartData2010s[0].Value) + parseFloat(chartData2010s[1].Value)) - 20)
            .attr("y", height / 3 +55)
            .text(d3.format("(.0f")(threshold_up / incomeTime * hhFactor))

        ////////////////
        // Median Income    
        ////////////////

        var medianIncome = dataThresholds.filter(function (d) { return d.country == crtSelected })[0].Median_NC;    
        chartCanvas
            .append("text")
            .attr("class", "annotText")
            .attr("x", function(){
                if (parseFloat(medianIncome) < parseFloat(threshold_low)){
                    var M_I = x((parseFloat(medianIncome) * (parseFloat(chartData2010s[0].Value))) / parseFloat(threshold_low))
                    return M_I;
                }
                else if (parseFloat(medianIncome) >= parseFloat(threshold_low) || parseFloat(medianIncome) <= parseFloat(threshold_up)) {
                    var M_I = x(parseFloat(chartData2010s[0].Value)) + x((parseFloat(medianIncome) - parseFloat(threshold_low)) * (parseFloat(chartData2010s[1].Value)) / (parseFloat(threshold_up) - parseFloat(threshold_low)));
                    return M_I - 20;
                    
                }
                else {
                    return x(parseFloat(threshold_up))
                }
            })
            .attr("y", height / 3 +60)
            .text(d3.format("(.0f")(medianIncome / incomeTime * hhFactor) )    



        chartCanvas
            .append("line")
            .attr("class","medianLine")
            .attr("x1", function () {
                if (parseFloat(medianIncome) < parseFloat(threshold_low)) {
                    var M_I = x((parseFloat(medianIncome) * (parseFloat(chartData2010s[0].Value))) / parseFloat(threshold_low))
                    return M_I;
                }
                else if (parseFloat(medianIncome) >= parseFloat(threshold_low) || parseFloat(medianIncome) <= parseFloat(threshold_up)) {
                    var M_I = x(parseFloat(chartData2010s[0].Value)) + x((parseFloat(medianIncome) - parseFloat(threshold_low)) * (parseFloat(chartData2010s[1].Value)) / (parseFloat(threshold_up) - parseFloat(threshold_low)));
                    return M_I ;

                }
                else {
                    return x(parseFloat(threshold_up))
                }
            })
            .attr("x2", function () {
                if (parseFloat(medianIncome) < parseFloat(threshold_low)) {
                    var M_I = x((parseFloat(medianIncome) * (parseFloat(chartData2010s[0].Value))) / parseFloat(threshold_low))
                    return M_I;
                }
                else if (parseFloat(medianIncome) >= parseFloat(threshold_low) || parseFloat(medianIncome) <= parseFloat(threshold_up)) {
                    var M_I = x(parseFloat(chartData2010s[0].Value)) + x((parseFloat(medianIncome) - parseFloat(threshold_low)) * (parseFloat(chartData2010s[1].Value)) / (parseFloat(threshold_up) - parseFloat(threshold_low)));
                    return M_I ;

                }
                else {
                    return x(parseFloat(threshold_up))
                }
            })
            .attr("y1", height / 3-10 )
            .attr("y2", height / 3 + 50)
            .attr("stroke-width", 0.5)
            .attr("stroke", "#575757")
            .style("stroke-dasharray", ("5, 5"));

        chartCanvas
            .append("text")
            .attr("class", "annotText")
            .attr("x", function () {
                if (parseFloat(medianIncome) < parseFloat(threshold_low)) {
                    var M_I = x((parseFloat(medianIncome) * (parseFloat(chartData2010s[0].Value))) / parseFloat(threshold_low))
                    return M_I;
                }
                else if (parseFloat(medianIncome) >= parseFloat(threshold_low) || parseFloat(medianIncome) <= parseFloat(threshold_up)) {
                    var M_I = x(parseFloat(chartData2010s[0].Value)) + x((parseFloat(medianIncome) - parseFloat(threshold_low)) * (parseFloat(chartData2010s[1].Value)) / (parseFloat(threshold_up) - parseFloat(threshold_low)));
                    return M_I - 60;

                }
                else {
                    return x(parseFloat(threshold_up))
                }
            })
            .attr("y", height / 3 -20)
            .text("Median income")    


    }
    if (incomeSelected !="your income"){

        chartCanvas.append("image")
            .attr("xlink:href", "icon.svg")
            .attr("x", function () {
                if (parseFloat(incomeSelected) < parseFloat(threshold_low) * hhFactor) {
                        var M_I = x((parseFloat(incomeSelected) * (parseFloat(chartData2010s[0].Value))) / (parseFloat(threshold_low)*hhFactor))
                        return M_I-30;
                    }
                else if (parseFloat(incomeSelected) >= parseFloat(threshold_low) * hhFactor && parseFloat(incomeSelected) <= parseFloat(threshold_up) * hhFactor) {

                    var M_I = x(parseFloat(chartData2010s[0].Value)) + x((parseFloat(incomeSelected) - parseFloat(threshold_low) * hhFactor) * (parseFloat(chartData2010s[1].Value)) / ((parseFloat(threshold_up) - parseFloat(threshold_low))*hhFactor));
                        return M_I - 30;

                    }
                    else if (parseFloat(incomeSelected) > parseFloat(threshold_up) * hhFactor && parseFloat(incomeSelected) <= 10 * parseFloat(threshold_up) * hhFactor){
                        var M_I = x(parseFloat(chartData2010s[0].Value) + parseFloat(chartData2010s[1].Value))+ (parseFloat(incomeSelected) - parseFloat(threshold_up)*hhFactor) * x(parseFloat(chartData2010s[2].Value)) / (hhFactor*(10*parseFloat(threshold_up) - parseFloat(threshold_up)));
                        return M_I - 30;
                        //return x(parseFloat(threshold_up))
                    }
                    else{
                        return  width-30;
                    }
                
            })
            .attr("y", -10)
            .attr("width",60)
            .attr("height", 60)
    }

    
}

function update2000() {
    svg2000s.selectAll("*").remove();

    var crtSelected = document.getElementById("ctrSel").options[document.getElementById("ctrSel").selectedIndex].value
    var incomeSelected = document.getElementById("incomeSel").value

    var chartData2000s = dataTot.filter(function (d) { return d.Country == crtSelected && d.Indicator == "Population share by income class" && d.Period == "Mid 2000s" })
    

    var chartCanvas = svg2000s.append("g")
        .attr("x", margin / 2)
        .attr("y", margin / 2)
        .attr("width", width - margin)
        .attr("height", height - margin);

    var threshold2000 = 0;
    var threshold2000Text = 0;
    var threshold2000Val = 0;
    chartCanvas.selectAll("rect")
        .data(chartData2000s)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            var thresholdLimit = threshold2000;
            threshold2000 = threshold2000 + parseFloat(d.Value);
            return x(thresholdLimit);
        })
        .attr("y", 0)
        .attr("width", function (d, i) { return x(parseFloat(d.Value)) })
        .attr("height", 40)
        .style("fill", function (d) { return scaleClass(d.IncomeClass) })

    chartCanvas.selectAll("text")
        .data(chartData2000s)
        .enter()
        .append("text")
        .attr("class", "chartText")
        .attr("x", function (d, i) {
            var thresholdLimit = threshold2000Text;
            threshold2000Text = threshold2000Text + parseFloat(d.Value);
            return x(thresholdLimit) + 20;
        })
        .attr("y", 15)
        .text(function (d) { return d.IncomeClass });

    chartCanvas.selectAll()
        .data(chartData2000s)
        .enter()
        .append("text")
        .attr("class", "chartText")
        .attr("x", function (d, i) {
            var thresholdLimit = threshold2000Val;
            threshold2000Val = threshold2000Val + parseFloat(d.Value);
            return x(thresholdLimit) + 20;
        })
        .attr("y", 35)
        .text(function (d) { return d3.format(".0%")(d.Value / 100) })

}