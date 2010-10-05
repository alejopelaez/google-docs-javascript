
jQuery.extend({
    View: function($gdoc, $dataOutput, $candidatos, $chart){
	//console.log($dataOutput);
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
	    self.viewLoadData($("#key").val());
	}));
	/**
	  * Crea una grafica de pasteles
	  */
	this.crearPie = function(hash, label)
	{
	    $("html").append("<div id='"+label+"' style='heigh:400px;width:400px'></div>");
	    createAction(label);
	    pieline = [];
	    for(i in hash)
		pieline.push([i,hash[i]]);
	    p1 = $.jqplot(label, [pieline], {
		title: label,
		seriesDefaults:{renderer:$.jqplot.PieRenderer},
		legend:{show:true}
	    });
	    $( "#"+label).dialog({
		title : label,
		minHeight: 425,
		minWidth: 410,
		autoOpen: false,
		modal: true,
		buttons: {
		    Ok: function() {
			$( this ).dialog( "close" );
		    }
		}
	    });
	}
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
	    for( i in datos )
	    {
		candidates.push(i);
		totals.push(datos[i]);
	    }
	    var temp = ssort(candidates, totals);
	    candidates = temp['c'];
	    totals = temp['t'];
	    html = "";
	    for(i in totals)
	    {
	    	html += "<strong>" + candidates[i] + "</strong>: ";
	    	html += totals[i] + "<br/>";
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
		html += "<thead><tr><th colspan=\"4\" align=\"center\">Resultados</th><th>jojoy</th><th>piedad</th><th>reyes</th</tr></thead>";
		
		html += "<tbody><tr>";
	    }
	    var first = true;
	    if((node+"").match("^mesa")=="mesa")
	    {
		html += "<td colspan=\"0\">"+totales[node]['jojoy']+"</td>";
		html += "<td>"+totales[node]['piedad']+"</td>";
		html += "<td>"+totales[node]['reyes']+"</td>";
		html += "</tr><tr>";
	    }
	    else
	    {
		//if(depth == 1)
		html += "<td colspan=\"0\" class='"+node+" special'>"+node;
		//else
		//  html += "<td colspan=\"0\">"+node;
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