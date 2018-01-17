var app = {
    
    subjects : {
        
        store: ['coding' , 'drifting' , 'wine' , 'biking' , 'stunt' , 'skydive' , 'samoyed' , 'the office'],

        element: document.getElementsByClassName('query-wrapper')[0],

        render: function(){
            
            var newHTML = '';

            for( var i = 0; i < app.subjects.store.length; i++ ){
                newHTML += '<div class="button query-item">'+ app.subjects.store[i] +'</div>';
            }

            this.element.innerHTML = newHTML;

        }

    },

    startUp : function(){
        this.subjects.render();
    }

}

app.startUp();