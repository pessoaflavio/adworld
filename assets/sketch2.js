//dando oi para o navegador - hi to our browser
console.log('hi dere');

var data = [
    {tipo: 'Estrutura', abs: 100, per: 2}, 
    {tipo: 'Direitos trabalhistas', abs: 553, per: 13}, 
    {tipo: 'Discriminação, assédio e violência', abs: 617, per: 15}, 
    {tipo: 'Liderança', abs: 741, per: 17}, 
    {tipo: 'Gestão de pessoas', abs: 748, per: 18}, 
    {tipo: 'Rotina de trabalho', abs: 738, per: 17}, 
    {tipo: 'Relacionamento entre funcionários', abs: 522, per: 12}, 
    {tipo: 'Relacionamento com cliente', abs: 74, per: 2}, 
    {tipo: 'Dinâmica da agência', abs: 156, per: 4}];


//carregando tabela - loading table

    console.log(data);
    
//carregar 2o infografico - loading our 2nd viz

var svg = d3
.select('#viz2')
.append('svg')
.attr('width', '100%')
.attr('height', '650px')
.call(responsivefy)
;

var elementw = svg.node().getBoundingClientRect();
console.log(elementw.width);
console.log(elementw.height);

var width = elementw.width;
var height = elementw.height;

var simulation = d3.forceSimulation(data)
.force('charge', d3.forceManyBody().strength(5))
.force('center', d3.forceCenter(width / 3, height / 2))
.force('collision', d3.forceCollide().radius(function(d) {
    return d.abs/8;
    }))
.on('tick', ticked)
;

var nodelabels = svg.selectAll(".nodelabel") 
   .data(data)
   .enter()
   .append("text")
   .text(function(d){return d.tipo;})
   .attr('x', function(d){return d.x;})
   .attr('y', function(d){return d.y;})
   .attr('class', 'nodelabel')
   .attr('fill', 'black')
   .attr('font-size', '12px')
   .attr('text-anchor', 'middle')
    ;   

function ticked() {
    var u = d3.select('#viz2')
    .select('svg')
    .attr('class', 'secondViz')
    .selectAll('circle')
    .data(data)
    ;
    
    u.enter()
    .append('circle')
    .attr('fill','pink')
    .attr('opacity', .5)
    .attr('class', 'tipos')
    .attr('id', function(d){return d.tipo})
    .attr('r', function(d) {return d.abs/7;})
    .on('mouseover', m_on)
    .on('mouseout', m_out)
    .merge(u)
    .attr('cx', function(d) {return d.x;})
    .attr('cy', function(d) {return d.y;})
    ;
    
    u.exit().remove();
  
      // console.log('wat');
    d3.select('#viz2')
    .select('svg')
    .selectAll('.nodelabel')
    .attr("x", function(d) { return d.x; }) 
    .attr("y", function(d) { return d.y; });

}

function m_on(){
    
    var This = d3.select(this);
    
    This
    .attr('stroke', 'red')
    .attr('opacity', 1)
    ;
    
    var thisId = This.attr('id');
    var thisX = This.attr('cx');
    var thisY = This.attr('cy');
    
    console.log(thisId);
    
    d3.select('#vi')
    .append('text')
    .text(thisId)
    .attr('font-size', '12px')
    .attr('x', 2.4*(width / 3))
    .attr('y', thisY)
    ;
}

function m_out(){
    // console.log('note');
    d3.select(this)
    .attr('stroke', 'none')
    .attr('opacity', 0.5)
    // .each(function(){console.log(this.id)})
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