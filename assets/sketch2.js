// cores #f16664 #ff7c8d #ff99b1 #ffb6c1

//dando oi para o navegador - hi to our browser
console.log('hi dere');

var data = [
    {tipo: 'Gestão de pessoas', abs: 748, per: 18, nome: 'Gestão'}, 
    {tipo: 'Liderança', abs: 741, per: 17, nome: 'Liderança'}, 
    {tipo: 'Rotina de trabalho', abs: 738, per: 17, nome: 'Rotina'}, 
    {tipo: 'Discriminação, assédio e violência', abs: 617, per: 15, nome: 'Discriminação'}, 
    {tipo: 'Direitos trabalhistas', abs: 553, per: 13, nome: 'Direitos'}, 
    {tipo: 'Relacionamento entre funcionários', abs: 522, per: 12, nome: 'Funcionários'}, 
    {tipo: 'Dinâmica da agência', abs: 156, per: 4, nome: 'Dinâmica'},
    {tipo: 'Estrutura', abs: 100, per: 2, nome: 'Estrutura'}, 
    {tipo: 'Relacionamento com cliente', abs: 74, per: 2, nome: 'Clientes'}
    ];

//carregando tabela - loading table

console.log(data);
    
//carregar 2o infografico - loading our 2nd viz

var svg = d3
.select('#viz2')
.append('svg')
.attr('class', 'secondViz')
.attr('width', '100%')
.attr('height', '550px')
.style('background-color','snow')
.call(responsivefy)
;

var elementw = svg.node().getBoundingClientRect();
console.log(elementw.width);
console.log(elementw.height);

var width = elementw.width;
var height = elementw.height;

var spacer = width/8;
var spacerH = height/4;

var g = svg
.selectAll('g.categorias')
.data(data)
.enter()
.append('g')
.attr('transform',function(d,i){
    if (i<3) return 'translate(' + ((i+2))*spacer + ', ' + 0.65*spacerH + ')';
    else if (i>=3 && i<6) return 'translate(' + ((i-1))*spacer + ', ' + 1.9*spacerH + ')';
    else if (i>=6) return 'translate(' + ((i-4))*spacer  + ', ' + 3.15*spacerH + ')';
})
;

g
.append('circle')
.attr('fill','#ffb6c1')
.attr('class', function(d){return d.per})
.attr('nome', function(d){return d.nome})
.attr('tipo', function(d){return d.tipo})
.attr('stroke', 'snow')
.attr('stroke-width', '2px')
// .attr('opacity', 0.5)
.attr('id', function(d){return d.abs})
.on('mouseover', m_on)
.on('mouseout', m_out)
.attr('cx', 0)
.attr('cy', 0)
.attr('r', function(d,i){return 10*(Math.sqrt(d.per/Math.PI))})
;

g
.append('circle')
.attr('fill','none')
.attr('stroke','#f16664')
.attr('stroke-dasharray', '3')
.attr('cx', 0)
.attr('cy', 0)
.attr('r', function(){return 10*(Math.sqrt(100/Math.PI))})
;

g
.append('text')
.text(function(d){return d.nome})
.attr('class', 'nodelabel')
.attr('id', function(d){return d.nome + '_Label'})
.attr('text-anchor', 'middle')
.attr('x', 0)
.attr('y', function(d,i){ return 14*(Math.sqrt(100/Math.PI));})
;



function m_on(){
    
    var This = d3.select(this);
    
    This
    .attr('stroke', 'black')
    .attr('stroke-width', 4)
    ;
    
    var thisId = This.attr('id');
    var thisTipo = This.attr('tipo');
    var thisX = This.attr('cx');
    var thisY = This.attr('cy');
    var thisCl = This.attr('class');
    var thisName = This.attr('nome');
    
    console.log('#' + thisName + '_Label');
    
    d3
    .select('#' + thisName + '_Label')
    .style('font-weight', 700)
    ;
    
    d3.select('.xtraData')
    .remove()
    ;
    
    var t = d3.select('#viz2')
    .select('svg.secondViz')
    .append('g')
    .attr('class','xtraData')
    .attr('id',thisName + '_groupTxt')
    ;
    
    t
    .append('text')
    .text(thisTipo)
    .attr('x', function(){ return 5*spacer})
    .attr('y', function(){ return 0.4*spacerH})
    .attr('font-size', '14px')
    .attr('fill', '#f16664')
    .style('text-transform', 'uppercase')
    .style('letter-spacing','1px')
    .style('font-weight','700')
    ;
    
    t
    .append('text')
    .text(thisId)
    .attr('class','BigNumber')
    .attr('x', function(){ return 5*spacer})
    .attr('y', function(){ return 1*spacerH} )
    ;
    
    t
    .append('text')
    .text('MENÇÕES')
    .attr('x', function(){ return 5*spacer})
    .attr('y', function(){ return 1.2*spacerH} )
    ;
    
    t
    .append('line')
    .attr('x1',function(){ return 5*spacer})
    .attr('y1', function(){ return 1.4*spacerH})
    .attr('x2',function(){ return 6.5*spacer})
    .attr('y2', function(){ return 1.4*spacerH})
    .attr('stroke','black')
    ;
    
    t
    .append('text')
    .text(thisCl + '%')
    .attr('class','BigNumber')
    .attr('x', function(){ return 5*spacer})
    .attr('y', function(){ return 1.8*spacerH} )
    ;
    
    t
    .append('text')
    .text('DO TOTAL')
    .attr('x', function(){ return 5*spacer})
    .attr('y', function(){ return 2*spacerH} )
    ;
    
    t
    .append('line')
    .attr('x1',function(){ return 5*spacer})
    .attr('y1', function(){ return 2.2*spacerH})
    .attr('x2',function(){ return 6.5*spacer})
    .attr('y2', function(){ return 2.2*spacerH})
    .attr('stroke','black')
    ;
    
}

function m_out(){
    
    var This = d3.select(this);

    This
    .attr('stroke', 'none')
    // .attr('opacity', 0.5)
    ;
    
    var thisId = This.attr('id');
    var thisX = This.attr('cx');
    var thisY = This.attr('cy');
    var thisCl = This.attr('class');
    var thisName = This.attr('nome');
    
    d3
    .select('#' + thisName + '_Label')
    .style('font-weight', 500)
    ;

}

// desenhar o gráfico de maneira responsiva / responsive redrawing of our viz
function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type, 
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}

// wrapping the labels
// function wrap(text, width) {
//   text.each(function() {
//     var text = d3.select(this),
//         words = text.text().split(/\s+/).reverse(),
//         word,
//         line = [],
//         lineNumber = 0,
//         lineHeight = 1.1, // ems
//         y = text.attr("y"),
//         dy = parseFloat(text.attr("dy")),
//         tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
//     while (word = words.pop()) {
//       line.push(word);
//       tspan.text(line.join(" "));
//       if (tspan.node().getComputedTextLength() > width) {
//         line.pop();
//         tspan.text(line.join(" "));
//         line = [word];
//         tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
//       }
//     }
//   });
// }