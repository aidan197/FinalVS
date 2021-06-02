var salesData=[{State:"AS", Qty:2},{State:"DF", Qty:150}, {State:"GT", Qty:63},{State:"sr", Qty:8}]


fetch('https://covid2020-api.herokuapp.com/infectedByState').then(function(res){
    return res.json();
}).then(function(data){
        console.log(data[0].Estado);
        var svg=d3.select('#svg');

    var padding={top:20,right:30,bottom:40,left:80};


    var chartArea={
        "width":parseInt(svg.style("width"))-padding.left-padding.right,
        "height":parseInt(svg.style("height"))-padding.top-padding.bottom
    };

    var yScale = d3.scaleLinear()
        .domain([0,d3.max(data,function(d,i){
            if(i>10){
            return data[i].Cantidad}
        })])
        .range([chartArea.height,0]).nice();

    var xScale = d3.scaleBand()
        .domain(data.map(function(d,i){if(i>10){
            return data[i].Estado}}
            ))
        .range([0,chartArea.width])
        .padding(0.2);


    var xAxis = svg.append("g")
        .classed("xAxis",true)
        .attr(
            'transform','translate('+padding.left+','+(chartArea.height + padding.top)+')'
        ).call(d3.axisBottom(xScale));

    var yAxisFn = d3.axisLeft(yScale);

    var yAxis = svg.append("g")
        .classed("yAxis",true)
        .attr(
            'transform','translate('+padding.left+','+padding.top+')'
        );
    yAxisFn(yAxis);

    xAxis.append('text')
        .attr('y',40)
        .attr('x', innerWidth/2)
        .text('State')
        .attr('font-size','large')
        .attr('fill','black');
    yAxis.append('text')
        .attr('x',-130)
        .attr('y',-65)
        .attr('transform','rotate(-90)')
        .text('Quantity')
        .attr('font-size','large')
        .attr('fill','black');
    var rectGrp = svg.append("g").attr(
        'transform','translate('+padding.left+','+padding.top+')'
    );

    rectGrp.selectAll("rect").data(data).enter()
        .append("rect")
        .attr("width",xScale.bandwidth())
        .attr("height",function(d,i) {
            if(i>10){
                return chartArea.height-yScale(data[i].Cantidad);
            }
            // return chartArea.height-yScale(data[i].Cantidad);
        })
        .attr("x",function(d,i){
            return xScale(data[i].Estado);
        })
        .attr("y",function(d,i){
            return yScale(data[i].Cantidad);
        })
        


})

