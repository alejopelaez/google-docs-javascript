jQuery.extend({
    View: function($dataOutput){
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
	$dataOutput.append($("<input type='button' value='Load'></input><br><br>").click(function(){
	    console.log("hola");
	    self.viewLoadData;
	}));

	/**
	 * Funcion dummy
	 */
	this.viewLoadData = function(){
	    
	    $.each(listener, function(i){
		listeners(i).viewLoadData();
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