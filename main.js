var video = ""
var objects = [];
var sataus = "";
function preload(){
    video = createVideo('video.mp4');
}                                    

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: Destectando humanos";
}

function modelLoaded(){
    console.log("modelo descarregado")
    status = true;
    video.loop();
    video.speed(1);
    video.volume(00);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status: pessoas destectadas";
            document.getElementById("numberOfObjects").innerHTML  = "quantidade de pessoas destectadas" + objects.length;
            fill("#ff000");
            percent = floor(objects[i].confidense * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff000");
             rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        
    }
}
