
$("#generate-pieces").hide();
$("#file").on('change', function(event){
    selectedFile=event.target.files[0];
    $("#generate-pieces").show();
    $('#original-int256')
    .val(selectedFile.name)
    .trigger('change');
});
function addUrlImage(url_image) {
    firebase.database().ref('image/1').set({
      url_image : url_image
    });
  }


  



// var image_url = getUrlImage();
// console.log('amar', image_url);

function uploadfile() {
    var filename = selectedFile.name;
    var storageRef = firebase.storage().ref('/amar/' + filename);
    var uploadTask= storageRef.put(selectedFile);
    uploadTask.on('state_changed', function (snapshot) {
        console.log("Amar");

    }, function(error) {

    }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            addUrlImage(downloadURL);
          });
       
    });
}
