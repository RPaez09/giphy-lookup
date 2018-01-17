var app = {
    
    subjects : {
        
        store: ['coding' , 'drifting' , 'wine' , 'biking' , 'stunt' , 'skydive' , 'samoyed' , 'the office'],

        element: document.getElementsByClassName('query-wrapper')[0],

        add: function( newSubject ){
            this.store.unshift( newSubject );
            this.render();
        },

        remove: function( index ){
            this.store.splice( index , 1 );
            this.render();
        },

        render: function(){
            
            var newHTML = '';

            for( var i = 0; i < app.subjects.store.length; i++ ){
                newHTML += '<div class="button query-item">'+ app.subjects.store[i] +'<div class="del-btn" data-index="'+ i +'">X</div></div>';
            }

            this.element.innerHTML = newHTML;

        }

    },

    startUp : function(){
        this.subjects.render();

        // event delegation for deleting an item from the queries
        document.getElementsByClassName( 'query-wrapper' )[0].addEventListener( 'click' , function( e ){ 
            if( e.target.matches('.del-btn') ){
                app.subjects.remove( e.target.attributes['data-index'].value );
            };
        });
        
    }

}

app.startUp();