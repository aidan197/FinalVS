
fetch('http://covid2020-api.herokuapp.com/intubatedByAge').then(function(res){
    return res.json();
}).then(function(data){
        var selection = document.querySelector('select'); 
        var s = 0;
        console.log(data[0].Edad);
        var svg=d3.select('#svg');

    var padding={top:20,right:30,bottom:40,left:100};


    var chartArea={
        "width":parseInt(svg.style("width"))-padding.left-padding.right,
        "height":parseInt(svg.style("height"))-padding.top-padding.bottom
    };

    var yScale = d3.scaleLinear()
        .domain([0,d3.max(data,function(d){return d.Cantidad})])
        .range([chartArea.height,0]).nice();

    var xScale = d3.scaleBand()
        .domain(data.map(function(d){return d.Edad}))
        .range([0,chartArea.width])
        .padding(0.8);


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
        .text('Age')
        .attr('font-size','large')
        .attr('fill','black');
    yAxis.append('text')
        .attr('x',-130)
        .attr('y',-50)
        .attr('transform','rotate(-90)')
        .text('Quantity')
        .attr('font-size','large')
        .attr('fill','black');


    var circleGrp = svg.append("g").attr(
        'transform','translate('+padding.left+','+padding.top+')'
    );
    

        
    circleGrp.selectAll("circle").data(data).enter()
        .append("circle")
        .attr("r",8)
        .attr("cx",function(d){
            return xScale(d.Edad);
        })
        .attr("cy",function(d){
            return yScale(d.Cantidad);
        })
        function updateG(s){
            var svg=d3.select('#svg');
            svg.selectAll("*").remove();
    
            var padding={top:20,right:30,bottom:40,left:80};
        
        
            var chartArea={
                "width":parseInt(svg.style("width"))-padding.left-padding.right,
                "height":parseInt(svg.style("height"))-padding.top-padding.bottom
            };
        
            var yScale = d3.scaleLinear()
                .domain([0,d3.max(data,function(d,i){
                    if(s==1){
                        if(i<25){
                            return d.Cantidad;
                        }
                    }else if(s==2){
                        if(i>=25 && i<55){
                            return d.Cantidad;
                        }
                    }else if(s==3){
                        if(i>=55){
                            return d.Cantidad;
                        }
                    }
                })])
                .range([chartArea.height,0]).nice();
        
            var xScale = d3.scaleBand()
                .domain(data.map(function(d,i){
                    if(s==1){
                        if(i<25){
                            return d.Edad;
                        }
                    }else if(s==2){
                        if(i>=25 && i<55){
                            return d.Edad;
                        }
                    }else if(s==3){
                        if(i>=55){
                            return d.Edad;
                        }
                    }
                }
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
                var circleGrp = svg.append("g").attr(
                    'transform','translate('+padding.left+','+padding.top+')'
                );
                
            
                    
                circleGrp.selectAll("circle").data(data).enter()
                    .append("circle")
                    .attr("r",8)
                    .attr("cx",function(d){
                        return xScale(d.Edad);
                    })
                    .attr("cy",function(d){
                        return yScale(d.Cantidad);
                    })
        }
        selection.addEventListener('change',()=>{
        updateG(selection.selectedIndex);
        });


})

