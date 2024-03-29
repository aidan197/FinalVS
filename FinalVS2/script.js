
fetch('http://covid2020-api.herokuapp.com/infectedByDate').then(function(res){
    return res.json();
}).then(function(data){
    var selection = document.querySelector('select'); 
        console.log(data[0].Fecha);
        var svg=d3.select('#svg');

    var padding={top:20,right:30,bottom:40,left:80};


    var chartArea={
        "width":parseInt(svg.style("width"))-padding.left-padding.right,
        "height":parseInt(svg.style("height"))-padding.top-padding.bottom
    };

    var yScale = d3.scaleLinear()
        .domain([0,d3.max(data,function(d){return d.Cantidad})])
        .range([chartArea.height,0]).nice();

    var xScale = d3.scaleBand()
        .domain(data.map(function(d){return d.Fecha}))
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
        .text('Date')
        .attr('font-size','large')
        .attr('fill','black');
    yAxis.append('text')
        .attr('x',-130)
        .attr('y',-60)
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
        .attr("height",function(d) {
            return chartArea.height-yScale(d.Cantidad);
        })
        .attr("x",function(d){
            return xScale(d.Fecha);
        })
        .attr("y",function(d){
            return yScale(d.Cantidad);
        })
    
    // function updateG(s){
    //         var svg=d3.select('#svg');
    //         svg.selectAll("*").remove();
    
    //     var padding={top:20,right:30,bottom:40,left:80};
    
    
    //     var chartArea={
    //         "width":parseInt(svg.style("width"))-padding.left-padding.right,
    //         "height":parseInt(svg.style("height"))-padding.top-padding.bottom
    //     };
    
    //     var yScale = d3.scaleLinear()
    //         .domain([0,d3.max(data,function(d,i){
    //             if(s==1){
    //                 if(i<1000){
    //                     return d.Cantidad;
    //                 }
    //             }else if(s==2){
    //                 if(i>=1000 && i<2000){
    //                     return d.Cantidad;
    //                 }
    //             }else if(s==3){
    //                 if(i>=2000){
    //                     return d.Cantidad;
    //                 }
    //             }else{
    //                 return d.Cantidad;    
    //             } 
    //         })])
    //         .range([chartArea.height,0]).nice();
    
    //     var xScale = d3.scaleBand()
    //         .domain(data.map(function(d,i){
    //             if(s==1){
    //                 if(i<7){
    //                     return d.Fecha;
    //                 }
    //             }else if(s==2){
    //                 if(i>=7 && i<15){
    //                     return d.Fecha;
    //                 }
    //             }else if(s==3){
    //                 if(i>=15){
    //                     return d.Fecha;
    //                 }
    //             }else {
    //                 return d.Fecha;    
    //             }
    //         }
    //             ))
    //         .range([0,chartArea.width])
    //         .padding(0.2);
    
    
    //     var xAxis = svg.append("g")
    //         .classed("xAxis",true)
    //         .attr(
    //             'transform','translate('+padding.left+','+(chartArea.height + padding.top)+')'
    //         ).call(d3.axisBottom(xScale));
    
    //     var yAxisFn = d3.axisLeft(yScale);
    
    //     var yAxis = svg.append("g")
    //         .classed("yAxis",true)
    //         .attr(
    //             'transform','translate('+padding.left+','+padding.top+')'
    //         );
    //     yAxisFn(yAxis);
    
    //     xAxis.append('text')
    //         .attr('y',40)
    //         .attr('x', innerWidth/2)
    //         .text('State')
    //         .attr('font-size','large')
    //         .attr('fill','black');
    //     yAxis.append('text')
    //         .attr('x',-130)
    //         .attr('y',-65)
    //         .attr('transform','rotate(-90)')
    //         .text('Quantity')
    //         .attr('font-size','large')
    //         .attr('fill','black');
    //     var rectGrp = svg.append("g").attr(
    //         'transform','translate('+padding.left+','+padding.top+')'
    //     );
    
    //     rectGrp.selectAll("rect").data(data).enter()
    //         .append("rect")
    //         .attr("width",xScale.bandwidth())
    //         .attr("height",function(d,i) {
    //                     return chartArea.height-yScale(d.Cantidad);    
    //                 })
    //         .attr("x",function(d,i){
    //             return xScale(d.Fecha); 
    //         })
    //         .attr("y",function(d,i){
    //                 return yScale(d.Cantidad);    
    //         }) 
    //     }
    //     selection.addEventListener('change',()=>{
    //     updateG(selection.selectedIndex);
    //     });


})

