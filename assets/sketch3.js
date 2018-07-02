//dando oi para o navegador - hi to our browser
console.log('hi dere');

var t = d3.transition()
    .duration(25)
    // .ease(d3.easeLinear)
    ;

//carregando tabela - loading table

d3.csv('data/DadosSubCategorias.csv', function(error, data)
    {
    if (error) throw error;
    
    // console.log(data);
    
    var div1 = d3
    .select('#subcat_holder')
    .selectAll('div.subcats')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'subcats')
    .attr('id', function(d,i){return 'subcat_' + d.cat[0] + i})
    .html(function(d){return '<h3>' + d.cat + '</h3>'})
    ;
    
    div1
    .append('p')
    .text(function(d){return d.desc})
    ;
    
    div1
    .append('div')
    .attr('class','example')
    .attr('id', function(d,i){return 'Exemplo_' + d.cat[0] + i})
    // .append('html')
    .html('O que foi dito:<br>')
    ;
    
    var valueHolder = div1
    .append('div')
    .attr('class','valueHolder')
    ;
    
    valueHolder
    .append('div')
    .attr('class','_holder')
    .attr('id','gpholder')
    .style('background-color', '#f16664')
    .style('border-left', 'none')
    .html(function(d){return '<small>Grand Prix</small><br><span class="BigNumber">' + d.gp_valor + '%</span><br><p class="detalhe">' + d.gp_nome + '</p>'})
    .on('mouseenter', mouseON1)
    .on('mouseleave', mouseOut1)
    ;
    
    function mouseON1(d,i){
    d3
    .select('body')
    .select('#gpholder')
    // .transition(t)
    .style('opacity',1)
    ;
    
    d3
    .select('body')
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('circle.gp')
    // .transition(t)
    .attr('opacity',1)
    .attr('stroke','black')
    ;
    
    d3
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('#Exemplo_' + d.cat[0] + i)
    .append('text')
    .attr('class','bigexample')
    .text(d.gp_cit1)
    ;
    }
    function mouseOut1(d,i){

    d3
    .select('body')
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('#gpholder')
    // .transition(t)
    .style('opacity',.6)
    ;
    
    d3
    .select('body')
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('circle.gp')
    // .transition(t)
    .attr('opacity',.6)
    .attr('stroke','none')
    ;
    
   d3
    .select('#subcat_' + d.cat[0] + i)
    .select('#Exemplo_' + d.cat[0] + i)
    .selectAll('.bigexample')
    .remove()
    ;
    
    }
    
    valueHolder
    .append('div')
    .attr('class','_holder')
    .attr('id','ouroholder')
    .style('background-color', '#f98646')
    .html(function(d){return '<small>Ouro</small><br><span class="BigNumber">' + d.o_valor + '%</span><br><p class="detalhe">' + d.o_nome + '</p>'})
    .on('mouseenter', mouseON2)
    .on('mouseleave', mouseOut2)
    ;
    
    function mouseON2(d,i){
    d3
    .select('body')
    .select('#ouroholder')
    // .transition(t)
    .style('opacity',1)
    ;
    
    d3
    .select('body')
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('circle.ouro')
    // .transition(t)
    .attr('opacity',1)
    .attr('stroke','black')
    ;
    
    d3
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('#Exemplo_' + d.cat[0] + i)
    .append('text')
    .attr('class','bigexample')
    .text(d.o_cit1)
    ;
    }
    function mouseOut2(d,i){

    d3
    .select('body')
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('#ouroholder')
    // .transition(t)
    .style('opacity',.6)
    ;
    
    d3
    .select('body')
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('circle.ouro')
    // .transition(t)
    .attr('opacity',.6)
    .attr('stroke','none')
    ;
    
    d3
    .select('#subcat_' + d.cat[0] + i)
    .select('#Exemplo_' + d.cat[0] + i)
    .selectAll('.bigexample')
    .remove()
    ;
    
}
    
    valueHolder
    .append('div')
    .attr('class','_holder')
    .attr('id','prataholder')
    .style('background-color', '#ff99b1')
    .html(function(d){return '<small>Prata</small><br><span class="BigNumber">' + d.p_valor + '%</span><br><p class="detalhe">' + d.p_nome + '</p>'})
    .on('mouseenter', mouseON3)
    .on('mouseleave', mouseOut3)
    ;
    
    function mouseON3(d,i){
    d3
    .select('body')
    .select('#prataholder')
    // .transition(t)
    .style('opacity',1)
    ;
    
    d3
    .select('body')
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('circle.prata')
    // .transition(t)
    .attr('opacity',1)
    .attr('stroke','black')
    ;
    
    d3
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('#Exemplo_' + d.cat[0] + i)
    .append('text')
    .attr('class','bigexample')
    .text(d.p_cit1)
    ;
    }
    function mouseOut3(d,i){

    d3
    .select('body')
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('#prataholder')
    // .transition(t)
    .style('opacity',.6)
    ;
    
    d3
    .select('body')
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('circle.prata')
    // .transition(t)
    .attr('opacity',.6)
    .attr('stroke','none')
    ;
    
   d3
    .select('#subcat_' + d.cat[0] + i)
    .select('#Exemplo_' + d.cat[0] + i)
    .selectAll('.bigexample')
    .remove()
    ;
    
    }

    valueHolder
    .append('div')
    .attr('class','_holder')
    .attr('id','bronzeholder')
    .style('background-color', '#ffb6c1')
    .html(function(d){return '<small>Bronze</small><br><span class="BigNumber">' + d.b_valor + '%</span><br><p class="detalhe">' + d.b_nome + '</p>'})
    .on('mouseenter', mouseON4)
    .on('mouseleave', mouseOut4)
    ;
    
    function mouseON4(d,i){
    d3
    .select('body')
    .select('#bronzeholder')
    // .transition(t)
    .style('opacity',1)
    ;
    
    d3
    .select('body')
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('circle.bronze')
    // .transition(t)
    .attr('opacity',1)
    .attr('stroke','black')
    ;
    
    d3
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('#Exemplo_' + d.cat[0] + i)
    .append('text')
    .attr('class','bigexample')
    .text(d.b_cit1)
    ;
    }
    
    function mouseOut4(d,i){

    d3
    .select('body')
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('#bronzeholder')
    // .transition(t)
    .style('opacity',.6)
    ;
    
    d3
    .select('body')
    .select('#subcat_' + d.cat[0] + i)
    .selectAll('circle.bronze')
    // .transition(t)
    .attr('opacity',.6)
    .attr('stroke','none')
    ;
    
    d3
    .select('#subcat_' + d.cat[0] + i)
    .select('#Exemplo_' + d.cat[0] + i)
    .selectAll('.bigexample')
    .remove()
    ;
    
}
    
    var svg = div1
    .append('svg')
    .attr('width', '100%')
    .attr('id', function(d,i){return 'dots_' + d.cat[0] + i})
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
            .attr('id', function(datum,j){return '_' + j + '_' + datum.cat})
            .attr('cx', function(datum,j){
                if (j>=0 && j<40)
                return (j*wstep)+(wstep);
                else if (j>=40 && j<80)
                return ((j-40)*wstep)+(wstep);
                else if (j>=80 && j<120)
                return ((j-80)*wstep)+(wstep);
                else if (j>=120 && j<160)
                return ((j-120)*wstep)+(wstep);
                else if (j>=160 && j<200)
                return ((j-160)*wstep)+(wstep);
                else if (j>=200 && j<240)
                return ((j-200)*wstep)+(wstep);
                else if (j>=240 && j<280)
                return ((j-240)*wstep)+(wstep);
                else if (j>=280 && j<320)
                return ((j-280)*wstep)+(wstep);
                else if (j>=320 && j<360)
                return ((j-320)*wstep)+(wstep);
                else if (j>=360 && j<400)
                return ((j-360)*wstep)+(wstep);
                else if (j>=400 && j<440)
                return ((j-400)*wstep)+(wstep);
                else if (j>=440 && j<480)
                return ((j-440)*wstep)+(wstep);
                else if (j>=480 && j<520)
                return ((j-480)*wstep)+(wstep);
                else if (j>=520 && j<560)
                return ((j-520)*wstep)+(wstep);
                else if (j>=560 && j<600)
                return ((j-560)*wstep)+(wstep);
                else if (j>=600 && j<640)
                return ((j-600)*wstep)+(wstep);
                else if (j>=640 && j<680)
                return ((j-640)*wstep)+(wstep);
                else if (j>=680 && j<720)
                return ((j-680)*wstep)+(wstep);
                else if (j>=720 && j<760)
                return ((j-720)*wstep)+(wstep);
                
            })
            .attr('cy', function(datum,j){return hstep+(Math.floor(j/40)*wstep)})
            .attr('r', '6')
            .attr('fill', function(datum,j){
                if (j < Number(datum.gpValor)) return '#f16664';
                else if (j < (Number(datum.gpValor) + Number(datum.oValor)) && j >= Number(datum.gpValor) ) return '#f98646';  
                else if (j < (Number(datum.gpValor) + Number(datum.oValor) + Number(datum.pValor)) && j >= (Number(datum.gpValor) + Number(datum.oValor))) return '#ff99b1';
                else if (j < (Number(datum.gpValor) + Number(datum.oValor) + Number(datum.pValor) + Number(datum.bValor)) && j >= (Number(datum.gpValor) + Number(datum.oValor) + Number(datum.pValor))) return '#ffb6c1';
                else return 'white';
            })
            .attr('class', function(datum,j){
                if (j < Number(datum.gpValor)) return 'gp';
                else if (j < (Number(datum.gpValor) + Number(datum.oValor)) && j >= Number(datum.gpValor) ) return 'ouro';  
                else if (j < (Number(datum.gpValor) + Number(datum.oValor) + Number(datum.pValor)) && j >= (Number(datum.gpValor) + Number(datum.oValor))) return 'prata';
                else if (j < (Number(datum.gpValor) + Number(datum.oValor) + Number(datum.pValor) + Number(datum.bValor)) && j >= (Number(datum.gpValor) + Number(datum.oValor) + Number(datum.pValor))) return 'bronze';
                else return 'white';
            })
            .attr('stroke', function(datum,j){
                if (j < (Number(datum.gpValor) + Number(datum.oValor) + Number(datum.pValor) + Number(datum.bValor))) return 'white';
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