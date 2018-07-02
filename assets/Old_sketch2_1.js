// cores #f16664 #ff7c8d #ff99b1 #ffb6c1

//dando oi para o navegador - hi to our browser
console.log('hi dere');

var data = [
    {tipo: 'Estrutura', abs: 100, per: 2, nome: 'Estrutura'}, 
    {tipo: 'Direitos trabalhistas', abs: 553, per: 13, nome: 'Direitos'}, 
    {tipo: 'Discriminação, assédio e violência', abs: 617, per: 15, nome: 'Discriminacao'}, 
    {tipo: 'Liderança', abs: 741, per: 17, nome: 'Lideranca'}, 
    {tipo: 'Gestão de pessoas', abs: 748, per: 18, nome: 'Gestao'}, 
    {tipo: 'Rotina de trabalho', abs: 738, per: 17, nome: 'Rotina'}, 
    {tipo: 'Relacionamento entre funcionários', abs: 522, per: 12, nome: 'Funcionarios'}, 
    {tipo: 'Relacionamento com cliente', abs: 74, per: 2, nome: 'Relacionamento'}, 
    {tipo: 'Dinâmica da agência', abs: 156, per: 4, nome: 'Dinamica'}];

//carregando tabela - loading table

console.log(data);
    
//carregar 2o infografico - loading our 2nd viz

var svg = d3
.select('#viz2_1')
.append('svg')
.attr('class', 'secondViz')
.attr('width', '75%')
.attr('height', '450px')
.style('background-color','snow')
.call(responsivefy)
;

var elementw = svg.node().getBoundingClientRect();
console.log(elementw.width);
console.log(elementw.height);

var width = elementw.width;
var height = elementw.height;

var simulation = d3.forceSimulation(data)
.force('charge', d3.forceManyBody().strength(5))
.force('center', d3.forceCenter(width / 3, height / 2.75))
.force('collision', d3.forceCollide().radius(function(d) {
    return d.abs/11;
    }))
.on('tick', ticked)
;



function ticked() {

    var u = d3.select('#viz2_1')
    .select('svg')
    .selectAll('circle')
    .data(data)
    ;
    
    var t = d3.select('#viz2_1')
    .select('svg')
    .selectAll('text.nodelabel')
    .data(data)
    ;
    
    u.enter()
    .append('circle')
    .attr('fill','#ffb6c1')
    .attr('class', function(d){return d.per})
    .attr('nome', function(d){return d.nome})
    .attr('stroke', 'snow')
    .attr('stroke-width', '2px')
    .attr('opacity', 0.5)
    .attr('id', function(d){return d.abs})
    .attr('r', function(d) {return d.abs/10;})
    .merge(u)
    .on('mouseover', m_on)
    .on('mouseout', m_out)
    .attr('cx', function(d) {return d.x;})
    .attr('cy', function(d) {return d.y;})
    ;
    
    u.exit().remove();

    t.enter()
    .append('text')
    .text(function(d){return d.tipo})
    .attr('class', 'nodelabel')
    .attr('id', function(d){return d.nome + '_Label'})
    .attr('text-anchor', 'middle')
    .merge(t)
    .attr('x', function(d){return d.x;})
    .attr('y', function(d){return d.y;})
    ;

}

function m_on(){
    var This = d3.select(this);
    
    This
    .attr('stroke', '#f16664')
    .attr('opacity', 1)
    ;
    
    var thisId = This.attr('id');
    var thisX = This.attr('cx');
    var thisY = This.attr('cy');
    var thisCl = This.attr('class');
    var thisName = This.attr('nome');
    
    console.log('#' + thisName + '_Label');
    
    d3
    .select('#' + thisName + '_Label')
    .style('font-weight', 700)
    ;
    
    d3.select('#viz2_2')
    .append('div')
    .attr('class','infocard')
    .html('<div class="firstCont"><span class="BigNumber">' + thisId + '</span><br>MENÇÕES</div><div class="secCont>' +  + '</div>')
    ;
}

function m_out(){
    
    var This = d3.select(this);

    This
    .attr('stroke', 'none')
    .attr('opacity', 0.5)
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
    
    d3.select('#viz2_2 .infocard')
    .remove('div.infocard')
    // .attr('class','infocard')
    // .html('<div class="firstCont"><span class="BigNumber">' + thisId + '</span><br>MENÇÕES</div><div class="secCont>' +  + '</div>')
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


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// cores #f16664 #ff7c8d #ff99b1 #ffb6c1

//dando oi para o navegador - hi to our browser
console.log('hi dere');

var data = [
    {tipo: 'Gestão de pessoas', abs: 748, per: 18, nome: 'Gestao'}, 
    {tipo: 'Liderança', abs: 741, per: 17, nome: 'Lideranca'}, 
    {tipo: 'Rotina de trabalho', abs: 738, per: 17, nome: 'Rotina'}, 
    {tipo: 'Discriminação, assédio e violência', abs: 617, per: 15, nome: 'Discriminacao'}, 
    {tipo: 'Direitos trabalhistas', abs: 553, per: 13, nome: 'Direitos'}, 
    {tipo: 'Relacionamento entre funcionários', abs: 522, per: 12, nome: 'Funcionarios'}, 
    {tipo: 'Dinâmica da agência', abs: 156, per: 4, nome: 'Dinamica'},
    {tipo: 'Estrutura', abs: 100, per: 2, nome: 'Estrutura'}, 
    {tipo: 'Relacionamento com cliente', abs: 74, per: 2, nome: 'Relacionamento'}
    ];

//carregando tabela - loading table

console.log(data);
    
//carregar 2o infografico - loading our 2nd viz

var svg = d3
.select('#viz2_1')
.append('svg')
.attr('class', 'secondViz')
.attr('width', '100%')
.attr('height', '450px')
.style('background-color','snow')
.call(responsivefy)
;

var elementw = svg.node().getBoundingClientRect();
console.log(elementw.width);
console.log(elementw.height);

var width = elementw.width;
var height = elementw.height;

var spacer = width/10;
var spacerH = height/5;

var g = svg
.selectAll('g.categorias')
.data(data)
.enter()
.append('g')
.attr('transform',function(d,i){
    if (i<3) return 'translate(' + (i+3)*spacer + ', ' + 1*spacerH + ')';
    else if (i>=3 && i<6) return 'translate(' + (i+(i-3))*spacer + ', ' + 2*spacerH + ')';
    else if (i>=6) return 'translate(' + (i+(i-5))*spacer  + ', ' + 3*spacerH + ')';
})
;

g
.append('circle')
.attr('fill','#ffb6c1')
.attr('class', function(d){return d.per})
.attr('nome', function(d){return d.nome})
.attr('stroke', 'snow')
.attr('stroke-width', '2px')
.attr('opacity', 0.5)
.attr('id', function(d){return d.abs})
.on('mouseover', m_on)
.on('mouseout', m_out)
.attr('cx', 0)
.attr('cy', 0)
.attr('r', function(d,i){return 1.1*(Math.sqrt(d.abs/Math.PI))})
// .attr('r', function(d,i) {return Number(d.abs)/12 + 'px'})
;

g
.append('circle')
.attr('fill','none')
.attr('stroke','#f16664')
.attr('stroke-dasharray', '3')
.attr('cx', 0)
.attr('cy', 0)
.attr('r', function(){return 1.1*(Math.sqrt(4249/Math.PI))})
;

g
.append('text')
.text(function(d){return d.tipo})
.attr('class', 'nodelabel')
.attr('id', function(d){return d.nome + '_Label'})
.attr('text-anchor', 'middle')
.attr('x', 0)
.attr('y', function(d,i){ return 1.2*(Math.sqrt(4249/Math.PI));})
.call(wrap)
;



function m_on(){
    var This = d3.select(this);
    
    This
    .attr('stroke', '#f16664')
    .attr('opacity', 1)
    ;
    
    var thisId = This.attr('id');
    var thisX = This.attr('cx');
    var thisY = This.attr('cy');
    var thisCl = This.attr('class');
    var thisName = This.attr('nome');
    
    console.log('#' + thisName + '_Label');
    
    d3
    .select('#' + thisName + '_Label')
    .style('font-weight', 700)
    ;
    
    d3.select('#viz2_2')
    .append('div')
    .attr('class','infocard')
    .html('<div class="firstCont"><span class="BigNumber">' + thisId + '</span><br>MENÇÕES</div><div class="secCont>' +  + '</div>')
    ;
}

function m_out(){
    
    var This = d3.select(this);

    This
    .attr('stroke', 'none')
    .attr('opacity', 0.5)
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
    
    d3.select('#viz2_2 .infocard')
    .remove('div.infocard')
    // .attr('class','infocard')
    // .html('<div class="firstCont"><span class="BigNumber">' + thisId + '</span><br>MENÇÕES</div><div class="secCont>' +  + '</div>')
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
