jQuery.extend({
    View: function($gdoc, $dataOutput){
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
	 * Muestra la información
	 */
	this.show = function(datos){	  
	    $dataOutput.append(datos);
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