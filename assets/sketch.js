//dando oi para o navegador - hi to our browser
console.log('hi dere');

//dados simples - simple array of data
var data = [{type: 'positive', percentage: 29}, {type: 'negative', percentage: 71}];

console.log(data);

//carregar 1o infografico - loading our 1st viz


var svg = d3
.select('#viz1')
.append('svg')
.attr('width', '100%')
.attr('height', '650px')
.call(responsivefy)
;

var elementw = svg.node().getBoundingClientRect();

console.log(elementw.width);

svg
.append('circle')
.attr('fill','purple')
.attr('r', function(){return (elementw.width/1.5)*(Math.sqrt(Math.PI/71))})
.attr('cx', function(){return 2*(elementw.width/3)})
.attr('cy', '325')
.attr('opacity', .5)
;

svg
.append('circle')
.attr('fill','pink')
.attr('r', function(){return (elementw.width/1.5)*(Math.sqrt(Math.PI/29))})
.attr('cx', function(){return elementw.width/3})
.attr('cy', '325')
.attr('opacity', .5)
;


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