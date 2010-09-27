jQuery.extend({
    Model: function(){
	/**
	 * referencia a nosotros (truco!!)
	 */
	var self = this;
	/**
	 * listeners del modelo
	 */
	var listeners = new Array();	
	
	/**
	 * load lots of data from the server
	 * or return data from cache if it's already
	 * loaded
	 */
	this.getAll = function(){
	    //Se notifican los listeners que estamos
	    //haciendo algo
	    self.onLoadBegin();
            $.Model.callback = function(root) {
                var rows = root.table.rows;
                var result = [];

                for ( r in rows ) {
                    result.push( rows[r].c[0].v );
                }
                self.onLoadEnd(result);
            }

            // Leer de google docs
            var e = document.createElement("script");
            e.src = 'http://spreadsheets.google.com/tq?tqx=responseHandler:$.Model.callback&tq=select%20A&key=tvL0_bf3YSbCW9dmKBU0neg&pub=1';
            e.type="text/javascript";
            document.getElementsByTagName("head")[0].appendChild(e); 
	}
	
	/**
	 * Añade un listener
	 */
	this.addListener = function(list){
	    listeners.push(list);
	}
	
	/**
	 * Función que se llama en los listeners
	 * del modelo cuando se empieza a cargar.
	 */
	this.onLoadBegin = function(){	    
	    $.each(listeners, function(i){
		listeners[i].onLoadBegin();
	    });
	}
	/**
	 * Función que se llama en los listeners
	 * del modelo cuando se termina de cargar.
	 */
	this.onLoadEnd = function(result){	    
	    $.each(listeners, function(i){
		listeners[i].onLoadEnd(result);
	    });
	}
    },
    
    /**
     * Funcion para crear un listener del modelo facilmente.
     */
    ModelListener: function(list) {
	if(!list) list = {};
	return $.extend({
	    onLoadBegin : function(){},
	    onLoadEnd : function(){}
	}, list);
    }
});