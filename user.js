var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function partage_nopartage(id, keys,share ,min_key, max_key) {
    firebase.database().ref('user/'+id).set({
      keys: keys,
      share: share,
      min_key: min_key,
      max_key: max_key
    });
  }

 

  function getOneUser(id) {
      
    var refUser = firebase.database().ref('user/'+id);
    refUser.on('value', function(snapshot) {
        console.log(snapshot.val());
         utilisateur= snapshot.val();   
    });
    return utilisateur;
  }

  function getUrlImage() {
    var imagess = firebase.database().ref('image/1');
     imagess.on('value', function(snapshot) {
         image_url= snapshot.val(); 
         console.log('image_url::::', image_url);  
         $("#image-secret").attr('src', image_url.url_image);
         $("#lien-secret").attr('href', image_url.url_image);
    });
   
  }


// $(document).ready(function(){ 
    var mon_id = getUrlParameter('id');

    if(mon_id){
        
        $("#admin").hide();
        $("#user").show();
        $("#mon_id").html(mon_id);
        $(".content-image").hide();
    }else{
        $("#user").hide();
        $("#admin").show();
        $(".content-image").hide();
    }


    
    $("#partage").on( "click", function() {
    utilisateur =getOneUser(mon_id);
    partage_nopartage(mon_id,utilisateur.keys,1, utilisateur.min_key ,utilisateur.max_key )
    console.log(getOneUser(mon_id));
    getData() ;

    });
    
    $("#no_partage").on( "click", function() {
        utilisateur =getOneUser(mon_id);
        partage_nopartage(mon_id,utilisateur.keys,0, utilisateur.min_key ,utilisateur.max_key)
        console.log(getOneUser(mon_id))
        getData() ;
        });

// });