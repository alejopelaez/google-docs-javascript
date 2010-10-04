
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
		highlighter: {sizeAdjust: 7.5},
		cursor: {show: true}
	    });
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