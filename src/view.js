jQuery.extend({
    View: function($gdoc, $dataOutput, $candidatos){
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
	//"0As2pD6IuRl_7dE14LWlTYjhoVDFQRENMTVlmUzRzNGc"
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
	    html = "";
	    for( i in datos )
	    {
		html += "<strong>" + i + "</strong>: ";
		html += datos[i] + "<br/>";
	    }
	    $candidatos.html(html);
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