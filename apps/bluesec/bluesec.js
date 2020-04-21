var hour_hand = {
    width : 61, height : 8, bpp : 1,
    transparent : 0,
    buffer : E.toArrayBuffer(atob("/////////////////////////////////////////////////////////////////////////////////w=="))
};
var minute_hand = {
    width : 100, height : 8, bpp : 1,
    transparent : 0,
    buffer : E.toArrayBuffer(atob("/////////////////////////////////////////////////////////////////////////w=="))
};


var second_hand = {
    width : 25, height : 2, bpp : 4,
    transparent : 0,
    buffer : E.toArrayBuffer(atob("/////////////////////////////////////////////////////////////////////////w=="))
};

//g.fillRect(0,24,239,239); // Apps area
let intervalRef = null;
let intervalRef2 = 1000;
const p180 = Math.PI/180;
const clock_center = {x:Math.floor((240-1)/2), y:24+Math.floor((239-24)/2)};
// ={ x: 119, y: 131 }
const radius = Math.floor((239-24+1)/2); // =108
const seconds_clock = {x:84, y:160};
const date_clock = {x:119, y:90};

let tick0 = Graphics.createArrayBuffer(30,8,1);
tick0.fillRect(0,0,tick0.getWidth()-1, tick0.getHeight()-1);
let tick5 = Graphics.createArrayBuffer(20,6,1);
tick5.fillRect(0,0,tick5.getWidth()-1, tick5.getHeight()-1);
let tick1 = Graphics.createArrayBuffer(8,4,1);
tick1.fillRect(0,0,tick1.getWidth()-1, tick1.getHeight()-1);
let tick6 = Graphics.createArrayBuffer(8,4,1);
tick1.fillRect(0,0,tick6.getWidth()-1, tick1.getHeight()-1);

function big_wheel_x(angle){
    return clock_center.x + radius * Math.cos(angle*p180);
}
function small_wheel_x(angle){
    return seconds_clock.x + radius * Math.cos(angle*p180);
}

function big_wheel_y(angle){
    return clock_center.y + radius * Math.sin(angle*p180);
}

function small_wheel_y(angle){
    return seconds_clock.y + radius * Math.sin(angle*p180);
}

function rotate_around_x(center_x, angle, tick){
    return center_x + Math.cos(angle*p180) * tick.getWidth()/2;
}

function rotate_around_y(center_y, angle, tick){
    return center_y + Math.sin(angle*p180) * tick.getWidth()/2;
}
function hour_pos_x(angle){
    return clock_center.x + Math.cos(angle*p180) * hour_hand.width/2;
}
function hour_pos_y(angle){
    return clock_center.y + Math.sin(angle*p180) * hour_hand.width/2;
}
function minute_pos_x(angle){
    return clock_center.x + Math.cos(angle*p180) * minute_hand.width/2;
}
function minute_pos_y(angle){
    return clock_center.y + Math.sin(angle*p180) * minute_hand.width/2;
}

function minute2_pos_x(angle){
    return clock_center.x + Math.cos(angle*p180) * minute_hand2.width/2;
}
function minute2_pos_y(angle){
    return clock_center.y + Math.sin(angle*p180) * minute_hand2.width/2;
}



function second_pos_x(angle){
    return seconds_clock.x + Math.cos(angle*p180) * second_hand.width/2;
}
function second_pos_y(angle){
    return seconds_clock.y + Math.sin(angle*p180) * second_hand.width/2;
}

function second_angle(date){
    //let minutes = date.getMinutes() + date.getSeconds()/60;
    let seconds = date.getSeconds();
    return 6*seconds - 90;
}

function minute_angle(date){
    //let minutes = date.getMinutes() + date.getSeconds()/60;
    let minutes = date.getMinutes();
    return 6*minutes - 90;
}
function hour_angle(date){
    let hours= date.getHours() + date.getMinutes()/60;
    return 30*hours - 90;
}

function draw_clock(){
    //console.log("draw_clock");
    let date = new Date();
    g.clear();
    g.setBgColor(0,0,0);
    g.setColor(0,0,0);
    g.fillRect(0,24,239,239); // clear app area
  //Date
    g.setColor(0,0,0);
    g.fillCircle(date_clock.x, date_clock.y, 30);
    g.setColor(0,0,0.6);
    g.fillCircle(date_clock.x, date_clock.y, 30);
    //Draw cirlces to take out of date
  g.drawCircle(date_clock.x, date_clock.y+9, 19);
    g.setColor(0,0,0);
    g.fillCircle(date_clock.x, date_clock.y+40, 40);
   
    g.setColor(1,1,1);
    //Display Date
    g.setColor(1,1,1);
    g.setFont("Vector", 16);
    g.setFontAlign(0,0);
    g.drawString(date.getDate(), date_clock.x+2, date_clock.y-15);
    //g.setColor(1,1,1);
    //g.drawCircle(date_clock.x, date_clock.y, 30);
    // draw cross lines for testing
    // g.setColor(1,0,0);
    // g.drawLine(clock_center.x - radius, clock_center.y, clock_center.x + radius, clock_center.y);
    // g.drawLine(clock_center.x, clock_center.y - radius, clock_center.x, clock_center.y + radius);
  
    g.setColor(0,0.3,1.5);
    let ticks = [0, 90, 180, 270];
    ticks.forEach((item)=>{
        let agl = item+180;
        g.drawImage(tick0.asImage(), rotate_around_x(big_wheel_x(item), agl, tick0), rotate_around_y(big_wheel_y(item), agl, tick0), {rotate:agl*p180});
    });
    ticks = [30, 60, 120, 150, 210, 240, 300, 330];
    ticks.forEach((item)=>{
        let agl = item+180;
        g.drawImage(tick5.asImage(), rotate_around_x(big_wheel_x(item), agl, tick5), rotate_around_y(big_wheel_y(item), agl, tick5), {rotate:agl*p180});
    });
    
     // draw minute ticks. Takes long time to draw!
   // g.setColor(0,0.1,1.5);
    //for (var i=0; i<60; i++){
    //    let agl = i*6+180;
    //    g.drawImage(tick1.asImage(), rotate_around_x(big_wheel_x(i*6), agl, tick1), rotate_around_y(big_wheel_y(i*6), agl, tick1), {rotate:agl*p180});
   // }
  
    let hour_agl = hour_angle(date);
    let minute_agl = minute_angle(date);
  
  //draw minute and hour hand
    g.setColor(1,1,1);
    g.drawImage(hour_hand, hour_pos_x(hour_agl), hour_pos_y(hour_agl), {rotate:hour_agl*p180}); //
    g.drawImage(minute_hand, minute_pos_x(minute_agl), minute_pos_y(minute_agl), {rotate:minute_agl*p180}); //
    
  
    g.setColor(1,1,1);
    g.fillCircle(clock_center.x, clock_center.y, 6);
    g.setColor(0,0,0);
    g.fillCircle(clock_center.x, clock_center.y, 3);
    g.setColor(1,0,0);
   
    // draw minute ticks. Takes long time to draw!
//    g.setColor(0,0.1,1.5);
//    for (var i=0; i<60; i++){
//        let agl = i*6+180;
//        g.drawImage(tick1.asImage(), rotate_around_x(big_wheel_x(i*6), agl, tick1), //rotate_around_y(big_wheel_y(i*6), agl, tick1), {rotate:agl*p180});
//    }

    g.flip();
    //console.log(date);
}

function drawSecondFace() {
  g.setColor(0,0.5,1);   
  g.fillCircle(seconds_clock.x, seconds_clock.y, 27);
  g.setColor(0,0.2,0.9);   
  g.fillCircle(seconds_clock.x, seconds_clock.y, 18);
   g.setColor(0,0.1,0.7);   
  g.fillCircle(seconds_clock.x, seconds_clock.y, 9);
   g.setColor(0,0,0.5);   
  g.fillCircle(seconds_clock.x, seconds_clock.y, 4);
    
}

function drawSecondHand() {
  //console.log("Drawing Secondhand!");
  g.setColor(0,0.5,1);
  g.fillCircle(seconds_clock.x, seconds_clock.y, 27);
  drawSecondFace();
  let date =new Date();
  let second_agl = second_angle(date);
  //draw second hand
    g.setColor(1,1,1);
    g.drawImage(second_hand, second_pos_x(second_agl), second_pos_y(second_agl), {rotate:second_agl*p180});
}

function clearTimers(){
    //console.log("clearTimers");
    if(intervalRef) {
        clearInterval(intervalRef);
        intervalRef = null;
        //console.log("interval is cleared");
    }
}

function clearSeconds(){
    //console.log("clearSeconds");
    if(intervalRef2) {
        clearInterval(intervalRef2);
        intervalRef2 = null;
        //console.log("interval is cleared");
    }
}

function startSeconds(){
    //console.log("startSeconds");
    if(intervalRef2) clearSeconds();
    intervalRef2 = setInterval(drawSecondHand, 1000);
   // if(intervalRef) clearTimers();
   //intervalRef = setInterval(draw_clock, 60*1000);
    //console.log("Seconds interval is set");
    
    drawSecondHand();
}

function startTimers(){
    //console.log("startTimers");
    if(intervalRef) clearTimers();
    //intervalRef = setInterval(drawSecondHand, 100);
   // if(intervalRef) clearTimers();
   intervalRef = setInterval(draw_clock, 60*1000);
    //console.log("interval is set");
  
    draw_clock();
    
    
}



Bangle.on('lcdPower', (on) => {
    if (on) {
        //console.log("lcdPower: on");
        Bangle.drawWidgets();
       
        startTimers();
      startSeconds();
       
      
        
    } else {
        //console.log("lcdPower: off");
        
      clearTimers();
      clearSeconds();
    }
});
Bangle.on('faceUp',function(up){
    //console.log("faceUp: " + up + " LCD: " + Bangle.isLCDOn());
    if (up && !Bangle.isLCDOn()) {
        //console.log("faceUp and LCD off");
        clearTimers();
        Bangle.setLCDPower(true);
    }
});

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();

startTimers();
startSeconds();

// Show launcher when middle button pressed
setWatch(Bangle.showLauncher, BTN2, {repeat:false,edge:"falling"});
