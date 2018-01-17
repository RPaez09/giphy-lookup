var app = {
    
    subjects : {
        
        store: ['coding' , 'drifting' , 'wine' , 'biking' , 'stunt' , 'skydive' , 'samoyed' , 'the office'],

        element: document.getElementsByClassName('query-wrapper')[0],

        inputBox: document.getElementsByClassName('search-box')[0],

        add: function( ){
            if( this.inputBox.value != "" ){
                this.store.unshift( this.inputBox.value );
                this.inputBox.value = "";
                this.render();
            }
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

    results : {
        createQuery : function( subject ){
            return "https://api.giphy.com/v1/gifs/search?api_key=fNmH3bq6TtGUIEPZLAotDnsoCRR2aHuN&q="+ subject +"&limit=10&offset=0&rating=G&lang=en"
        },

        makeRequest : function( query ){
            var xhr = new XMLHttpRequest();
            
            xhr.open('GET' , this.createQuery("the office") );

            xhr.send(null);

            xhr.onreadystatechange = function(){
                if( xhr.readyState === 4 ) { //request done
                    if( xhr.status === 200 ){
                        console.log( xhr.response );
                    } else {
                        console.error('Error: ' + xhr.status + ' an error occurred during the request made to the server.');
                    }
                }
            };

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

        //events for adding an item to the queries
        document.getElementsByClassName( 'search-btn' )[0].addEventListener('click' , function(e){
            app.subjects.add();
        });

        document.getElementsByClassName( 'search-box' )[0].addEventListener('keyup' , function(e){
            if( e.which === 13 ){ // on enter key
                app.subjects.add();
            }
        });

    }

}

app.startUp();