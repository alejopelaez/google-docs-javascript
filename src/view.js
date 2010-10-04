
jQuery.extend({
    View: function($gdoc, $dataOutput, $candidatos, $chart){
	console.log($dataOutput);
	/**
	 * Referencia a uno mismo (Truco!!)
	 */
	var self = this;
	
	/**
	 * Arreglo con los listeners de esta vista.
	 */
	var listeners = new Array();
	
	/**
	 * Se añade un listener a esta vista.
	 */
	this.addListener = function(list){
	    listeners.push(list);
	}

	/**
	 * Pega los botones.
	 */
	$gdoc.append($("<input type='button' value='Load'></input><br><br>").click(function(){
	    candidatos = { "jojoy" : 0, "piedad" : 0, "reyes" : 0 };
	    self.viewLoadData($("#key").val());
	}));

	/**
	 * Funcion dummy
	 */
	this.viewLoadData = function(key){	    
	    $.each(listeners, function(i){
		listeners[i].viewLoadData(key);
	    });
	}
	/**
	  * Muestra los totales nacionales de los candidatos
	  */
	this.showCandidatos =  function(datos)
	{
	    candidates = [];
	    totals = [];
	    html = "";
	    for( i in datos )
	    {
		html += "<strong>" + i + "</strong>: ";
		candidates.push(i);
		html += datos[i] + "<br/>";
		totals.push(datos[i]);
	    }
	    $candidatos.html(html);
	    //Resets the chart
	    $chart.html("");
	    //Makes the chart
	    plot = $.jqplot($chart.attr('id'), [totals], {
		legend:{show:true, location:'ne', xoffset:55},
		title:'Resultados Totales',
		seriesDefaults:{
		    renderer:$.jqplot.BarRenderer, 
		    rendererOptions:{barPadding: 8, barMargin: 20}
		},
		series:[{label:'Votos'}],
		axes:{
		    xaxis:{
			renderer:$.jqplot.CategoryAxisRenderer, 
			ticks:candidates
		    }, 
		    yaxis:{min:0}
		},
		highlighter: {sizeAdjust: 7.5, showTooltip: true, tooltipLocation: 'n', tooltipAxes: 'y'},
		cursor: {show: true, showTooltip: true, followMouse: true}
	    });
	}

	/**
	 * Funcion que muestra los resultados parciales por region.
	 */
	this.showTable = function(node,depth,html,alt){
	    if(depth == 0){
		html += "<strong>Tabla de resultados</strong>";
		html += "<table id=\"resultTable\" border = \"0\" cellspacing=\"0\">";
		html += "<thead><tr><th colspan=\"4\" align=\"center\">Resultados</th><th>jojoy</th><th>reyes</th><th>piedad</th></tr></thead>";
		
		html += "<tbody><tr>";
	    }
	    html += "<td colspan=\"0\">";

	  
	    
	    var first = true;
	    if((node+"").match("^mesa")=="mesa")
	    {
		for(i in totales[node]){
		    if(!first){
			html += "<td>";		    
		    }
		    first = false;
		    html += (totales[node][i]);
		}
		html += "</tr><tr>";
	    }
	    else
	    {
		html += node;
		for(i in totales[node]){
		    if(!first){
			html += "</tr><tr>";
			for(var j = 0; j < depth+1; ++j)
			    html += "<td>";		    
		    }
		    first = false;
		    html = this.showTable(totales[node][i],depth+1,html,alt);
		}
	    }
	    html += "</td>";
	    if(depth == 0){		
		html += "</tr></tbody>";
		html += "</table>";
		$('#tabla').html(html);
		//Estilo mas bonito pero se necesita que
		//el arbol quede bien.
		//$('#tabla').dataTable();
	    }
	    else
		return html;
	}

	/**
	 * Muestra la información
	 */
	this.show = function(datos){	  
	    $dataOutput.html(datos);
	}
    },
    
    /**
     * Funcion para crear listener de la vista facilmente.
     */
    ViewListener: function(list) {
	if(!list) list = {};
	return $.extend({
	    viewLoadData : function(){}
	}, list);
    }
});