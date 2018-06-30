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
d3.csv('data/DadosCategorias.csv', function(error, data)
    {
    if (error) throw error;
    
    console.log(data);
    
    //carregar 2o infografico - loading our 2nd viz

    var svg = d3
    .select('#viz2')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '650px')
    .call(responsivefy)
    ;
    
    
    var simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(5))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('collision', d3.forceCollide().radius(function(d) {
    return d.radius
  }))
    
    
    
    
    
    
    }
)


//carregar 2o infografico - loading our 2nd viz


// var svg = d3
// .select('#viz2')
// .append('svg')
// .attr('width', '100%')
// .attr('height', '650px')
// .call(responsivefy)
// ;

// var elementw = svg.node().getBoundingClientRect();

// console.log(elementw.width);

// svg
// .append('circle')
// .attr('fill','purple')
// .attr('r', function(){return (elementw.width/1.5)*(Math.sqrt(Math.PI/71))})
// .attr('cx', function(){return 2*(elementw.width/3)})
// .attr('cy', '325')
// .attr('opacity', .5)
// ;

// svg
// .append('circle')
// .attr('fill','pink')
// .attr('r', function(){return (elementw.width/1.5)*(Math.sqrt(Math.PI/29))})
// .attr('cx', function(){return elementw.width/3})
// .attr('cy', '325')
// .attr('opacity', .5)
// ;


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