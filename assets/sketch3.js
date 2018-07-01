//dando oi para o navegador - hi to our browser
console.log('hi dere');

//carregando tabela - loading table

d3.csv('data/DadosSubCategorias.csv', function(error, data)
    {
    if (error) throw error;
    
    console.log(data);
    
    var div1 = d3
    .select('#subcat_holder')
    .selectAll('div.subcats')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'subcats')
    .attr('id', function(d){return 'subcat_' + d.cat})
    .html(function(d){return '<h3>' + d.cat + '</h3>'})
    ;
    
    div1
    .append('p')
    .text(function(d){return d.desc})
    ;
    
    var valueHolder = div1
    .append('div')
    .attr('class','valueHolder')
    ;
    
    valueHolder
    .append('div')
    .attr('class','_holder')
    .style('background-color', '#f16664')
    .style('border-left', 'none')
    .html(function(d){return '<small>Grand Prix</small><br><span class="BigNumber">' + d.gp_valor + '%</span><br><p class="detalhe">' + d.gp_nome + '</p>'})
    ;
    
    valueHolder
    .append('div')
    .attr('class','_holder')
    .style('background-color', '#f98646')
    .html(function(d){return '<small>Ouro</small><br><span class="BigNumber">' + d.o_valor + '%</span><br><p class="detalhe">' + d.o_nome + '</p>'})
    ;
    
    valueHolder
    .append('div')
    .attr('class','_holder')
    .style('background-color', '#ff99b1')
    .html(function(d){return '<small>Prata</small><br><span class="BigNumber">' + d.p_valor + '%</span><br><p class="detalhe">' + d.p_nome + '</p>'})
    ;
    
    valueHolder
    .append('div')
    .attr('class','_holder')
    .style('background-color', '#ffb6c1')
    .html(function(d){return '<small>Bronze</small><br><span class="BigNumber">' + d.b_valor + '%</span><br><p class="detalhe">' + d.b_nome + '</p>'})
    ;
    
    var svg = div1
    .append('svg')
    .attr('width', '100%')
    .attr('id', function(d){return 'dots_' + d.cat})
    .attr('class', 'dotsViz')
    .attr('height', '650px')
    ;
    
    var elementw = svg.node().getBoundingClientRect();
    // console.log(elementw.width);
    
    var width = elementw.width;

    svg
    .each(function(d,i){

        var list = [];
        for (var j = 1; j <= d.total; j++) {
            var uniqCircle = new Object();
            
            uniqCircle.id = j;
            uniqCircle.cat = d.cat;
            uniqCircle.gp = d.gp_nome;
            uniqCircle.gpValor = d.gp_abs;
            uniqCircle.gpPorc = d.gp_valor;
            uniqCircle.ouro = d.o_nome;
            uniqCircle.oValor = d.o_abs;
            uniqCircle.oPorc = d.o_valor;            
            uniqCircle.prata = d.p_nome;
            uniqCircle.pValor = d.p_abs;
            uniqCircle.pPorc = d.p_valor;            
            uniqCircle.bronze = d.b_nome;
            uniqCircle.bValor = d.b_abs;
            uniqCircle.bPorc = d.b_valor;            
            uniqCircle.outros = d.outros_nome;
            uniqCircle.outrosValor = d.outros_abs;
            uniqCircle.outrosPorc = d.outros_valor;
                
            list.push(uniqCircle);
        }
        var wstep = width/41;
        var hstep = width/40;
        // console.log(list);

        d3.select(this)    
        .attr('height', function(d){return (Math.floor(d.total/40)*wstep)+(2*wstep) + 'px'})
        .call(responsivefy)
        ;

        // cores #f16664 #ff7c8d #ff99b1 #ffb6c1
        
        var circles = d3
        .select(this)
            .selectAll('circle')
            .data(list)
            .enter()
            .append('circle')
            .attr('id', function(d,i){return '_' + i + '_' + d.cat})
            .attr('cx', function(d,i){
                if (i>=0 && i<40)
                return (i*wstep)+(wstep);
                else if (i>=40 && i<80)
                return ((i-40)*wstep)+(wstep);
                else if (i>=80 && i<120)
                return ((i-80)*wstep)+(wstep);
                else if (i>=120 && i<160)
                return ((i-120)*wstep)+(wstep);
                else if (i>=160 && i<200)
                return ((i-160)*wstep)+(wstep);
                else if (i>=200 && i<240)
                return ((i-200)*wstep)+(wstep);
                else if (i>=240 && i<280)
                return ((i-240)*wstep)+(wstep);
                else if (i>=280 && i<320)
                return ((i-280)*wstep)+(wstep);
                else if (i>=320 && i<360)
                return ((i-320)*wstep)+(wstep);
                else if (i>=360 && i<400)
                return ((i-360)*wstep)+(wstep);
                else if (i>=400 && i<440)
                return ((i-400)*wstep)+(wstep);
                else if (i>=440 && i<480)
                return ((i-440)*wstep)+(wstep);
                else if (i>=480 && i<520)
                return ((i-480)*wstep)+(wstep);
                else if (i>=520 && i<560)
                return ((i-520)*wstep)+(wstep);
                else if (i>=560 && i<600)
                return ((i-560)*wstep)+(wstep);
                else if (i>=600 && i<640)
                return ((i-600)*wstep)+(wstep);
                else if (i>=640 && i<680)
                return ((i-640)*wstep)+(wstep);
                else if (i>=680 && i<720)
                return ((i-680)*wstep)+(wstep);
                else if (i>=720 && i<760)
                return ((i-720)*wstep)+(wstep);
                
            })
            .attr('cy', function(d,i){return hstep+(Math.floor(i/40)*wstep)})
            .attr('r', '6')
            .attr('fill', function(d,i){
                if (i < Number(d.gpValor)) return '#f16664';
                else if (i < (Number(d.gpValor) + Number(d.oValor)) && i >= Number(d.gpValor) ) return '#f98646';  
                else if (i < (Number(d.gpValor) + Number(d.oValor) + Number(d.pValor)) && i >= (Number(d.gpValor) + Number(d.oValor))) return '#ff99b1';
                else if (i < (Number(d.gpValor) + Number(d.oValor) + Number(d.pValor) + Number(d.bValor)) && i >= (Number(d.gpValor) + Number(d.oValor) + Number(d.pValor))) return '#ffb6c1';
                else return 'white';
            })
            .attr('stroke', function(d,i){
                if (i < (Number(d.gpValor) + Number(d.oValor) + Number(d.pValor) + Number(d.bValor))) return 'white';
                else return 'lightpink';
            })
            .attr('opacity',0.6)
            ;
    })
    ;
    }
);

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