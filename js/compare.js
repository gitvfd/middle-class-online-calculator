function compare(){



    svgcompare.selectAll("*").remove();


    document.getElementById("selCouName").innerHTML = document.getElementById("ctrSel").options[document.getElementById("ctrSel").selectedIndex].innerHTML;  

    var crtSelected = document.getElementById("ctrSel").options[document.getElementById("ctrSel").selectedIndex].value

    var crtComparison = document.getElementById("compareSel").options[document.getElementById("compareSel").selectedIndex].value

    var chartCanvas = svgcompare.append("g")
        .attr("x", margin / 2)
        .attr("y", margin / 2)
        .attr("width", widthCompare - margin)
        .attr("height", heightCompare - margin);

    /** CHART COMPARED COUNTRY */
        chartCanvas
            .append("text")
            .attr("class", "chartTitle")
            .attr("x", 5)
            .attr("y", 15)
            .text(document.getElementById("ctrSel").options[document.getElementById("ctrSel").selectedIndex].innerHTML)
    
        var chartCanvas = svgcompare.append("g")
            .attr("x", margin / 2)
            .attr("y", margin / 2)
            .attr("width", widthCompare - margin)
            .attr("height", heightCompare - margin);

        var chartDataCompared = dataTot.filter(function (d) { return d.Country == crtSelected && d.Indicator == "Population share by income class" && d.Period == "Mid 2010s" })


        var thresholdCompared = 0;
        var thresholdComparedText = 0;
        var thresholdComparedVal = 0;

        chartCanvas.selectAll("rect")
            .data(chartDataCompared)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                var thresholdLimit = thresholdCompared;
                thresholdCompared = thresholdCompared + parseFloat(d.Value);
                return xCompare(thresholdLimit);
            })
            .attr("y", 25)
            .attr("width", function (d, i) { return xCompare(parseFloat(d.Value)) })
            .attr("height", 40)
            .style("fill", function (d) { return scaleClass(d.IncomeClass) })

        chartCanvas.selectAll("text")
            .data(chartDataCompared)
            .enter()
            .append("text")
            .attr("class", "chartText")
            .attr("x", function (d, i) {
                var thresholdLimit = thresholdComparedText;
                thresholdComparedText = thresholdComparedText + parseFloat(d.Value);

                return xCompare(thresholdLimit) + 20;
            })
            .attr("y",  40)
            .text(function (d) { return d.IncomeClass });

        chartCanvas.selectAll()
            .data(chartDataCompared)
            .enter()
            .append("text")
            .attr("class", "chartText")
            .attr("x", function (d, i) {
                var thresholdLimit = thresholdComparedVal;
                thresholdComparedVal = thresholdComparedVal + parseFloat(d.Value);
                return xCompare(thresholdLimit) + 20;
            })
            .attr("y",  60)
            .text(function (d) { return d3.format(".0%")(d.Value / 100) })


    /** CHART COMPARED COUNTRY */
        chartCanvas
            .append("text")
            .attr("class", "chartTitle")
            .attr("x", 5)
            .attr("y", heightCompare / 2 )
            .text(document.getElementById("compareSel").options[document.getElementById("compareSel").selectedIndex].innerHTML)

    var chartCanvas = svgcompare.append("g")
        .attr("x", margin / 2)
        .attr("y", margin / 2)
        .attr("width", widthCompare - margin)
        .attr("height", heightCompare - margin);

        var chartDataComp = dataTot.filter(function (d) { return d.Country == crtComparison && d.Indicator == "Population share by income class" && d.Period == "Mid 2010s" })


        var thresholdComp = 0;
        var thresholdCompText = 0;
        var thresholdCompVal = 0;

        chartCanvas.selectAll("rect")
            .data(chartDataComp)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                var thresholdLimit = thresholdComp;
                thresholdComp = thresholdComp + parseFloat(d.Value);
                return xCompare(thresholdLimit);
            })
            .attr("y", heightCompare / 2 +10 )
            .attr("width", function (d, i) { return xCompare(parseFloat(d.Value)) })
            .attr("height", 40)
            .style("fill", function (d) { return scaleClassCompare(d.IncomeClass) })

        chartCanvas.selectAll("text")
            .data(chartDataComp)
            .enter()
            .append("text")
            .attr("class", "chartText")
            .attr("x", function (d, i) {
                var thresholdLimit = thresholdCompText;
                thresholdCompText = thresholdCompText + parseFloat(d.Value);
                return xCompare(thresholdLimit) + 20;
            })
            .attr("y", heightCompare / 2 + 25)
            .text(function (d) { return d.IncomeClass });

        chartCanvas.selectAll()
            .data(chartDataComp)
            .enter()
            .append("text")
            .attr("class", "chartText")
            .attr("x", function (d, i) {
                var thresholdLimit = thresholdCompVal;
                thresholdCompVal = thresholdCompVal + parseFloat(d.Value);
                return xCompare(thresholdLimit) + 20;
            })
            .attr("y", heightCompare / 2  +45)
            .text(function (d) { return d3.format(".0%")(d.Value / 100) })

}