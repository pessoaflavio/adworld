var svg = d3
.select('#viz0')
.append('svg')
.attr('width', '1px')
.attr('height', '1px')
.call(responsivefy)
;

var elementw = svg.node().getBoundingClientRect();
console.log(elementw.width);
console.log(elementw.height);

var width = elementw.width;
var height = elementw.height;

var spacer = width/8;

var tr = [3*spacer, height / 3.8];
var scale = [width * .67];

console.log(tr);

var map = d3.geomap.choropleth()
    .geofile('data/BRA.json')
    // .projection(d3.geo.albersUsa)
    .column('total')
    .unitId('fips')
    .scale(scale)
    .translate(tr)
    .legend(true);

d3.csv('data/mapabr.csv', function(error, data) {
    d3.select('#viz0')
        .datum(data)
        .call(map.draw, map)
        ;
});


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