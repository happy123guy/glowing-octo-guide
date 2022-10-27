Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
})    
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is "+prediction_1;
    speak_data_2 = "The Second Prediction is "+prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/SChsSCEYt/model.json',modelLoaded);

function modelLoaded(){
    console.log('modelLoaded');
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}

function gotResult(error,results){
    if (results){

        console.log(results);
        document.getElementById("result_emotion_1").innerHTML = results[0].label;
        document.getElementById("result_emotion_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        console.log(prediction_1);
        console.log(prediction_2);
        speak();

        //first emoji
        if(results[0].label == "No"){
            document.getElementById("update_emoji_1").innerHTML = "&#129292;";
        }
        if(results[0].label == "Yes"){
            document.getElementById("update_emoji_1").innerHTML = "&#9994;";
        }
        if(results[0].label == "Fine"){
            document.getElementById("update_emoji_1").innerHTML = "&#128076;";
        }

        //second emoji
        if(results[1].label == "No"){
            document.getElementById("update_emoji_2").innerHTML = "&#129292;";
        }
        if(results[1].label == "Yes"){
            document.getElementById("update_emoji_2").innerHTML = "&#9994;";
        }
        if(results[1].label == "Fine"){
            document.getElementById("update_emoji_2").innerHTML = "&#128076;";
        }
    }
}