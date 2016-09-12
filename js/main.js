/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */

var app = angular.module('tutorialWebApp', ['ngRoute']);

/**
 * Configure the Routes
 */


app.config(['$routeProvider', function ($routeProvider) {
 
  $routeProvider
   
    .when("/level1", {templateUrl: "partials/level1.html", controller: "level1Ctrl"}) 
    .when("/level2", {templateUrl: "partials/level2.html", controller: "level2Ctrl"});
    
}]);

app.controller('level1Ctrl', function ($scope,$window) {
  $(document).ready(function(){
    $('.tooltipped').tooltip({delay: 50});
  });


  var count;

  reload1();

  $scope.reload=function(){
    count=10;
    array=[];
    setupOperators();
    init(10);
    setupNumPad(10,4);
    changeNumPadColor(4);
    chanegOperatorColor();
    document.getElementById('num1').innerHTML="";
    document.getElementById('num2').innerHTML="";
    document.getElementById('opt').innerHTML="";
    document.getElementById('answer').innerHTML="";
    document.getElementById('check').innerHTML="";
    setInterval(countdown,1000);
  }

  function reload1(){
    count=10;
    array=[];
    setupOperators();
    init(10);
    setupNumPad(10,4);
    changeNumPadColor(4);
    chanegOperatorColor();
    document.getElementById('num1').innerHTML="";
    document.getElementById('num2').innerHTML="";
    document.getElementById('opt').innerHTML="";
    document.getElementById('answer').innerHTML="";
    document.getElementById('check').innerHTML="";
    setInterval(countdown,1000);
  }

  function setupOperators(){
    pattern=[["+","-","*","/"],["*","/","+","-"],["+","/","*","-"],["/","-","+","*"]];
    var x = Math.floor((Math.random() * 4));

    document.getElementById("o0").innerHTML=pattern[x][0];
    document.getElementById("o0").value=pattern[x][0];

    document.getElementById("o1").innerHTML=pattern[x][1];
    document.getElementById("o1").value=pattern[x][1];

    document.getElementById("o2").innerHTML=pattern[x][2];
    document.getElementById("o2").value=pattern[x][2];

    document.getElementById("o3").innerHTML=pattern[x][3]; 
    document.getElementById("o3").value=pattern[x][3];
  }

  function chanegOperatorColor(){
    color=[["blue","green","orange","purple"],["purple","orange","blue","green"],["orange","blue","green","purple"],["green","orange","purple","blue"]];
    var x = Math.floor((Math.random() * 4));
    $("#o0").toggleClass(color[x][0]);
    $("#o1").toggleClass(color[x][1]);
    $("#o2").toggleClass(color[x][2]);
    $("#o3").toggleClass(color[x][3]);
  }

  var target; var num1;var num2; var array=[];
  function init(range){
    var operator=["+","-","*","/"];
    
    var opt=operator[Math.floor((Math.random() *4))];
    
    if(opt=="+"){
      target = Math.floor((Math.random() *range)+1);

      var a=Math.floor((Math.random()*2));
      if(a==0){
        num1=Math.floor((Math.random() *range-1)+1);
      }else{
        num1=-1*(Math.floor((Math.random() *range-1)+1));
      }
      num2=target-num1;
    }else if(opt=="-"){
      target = Math.floor((Math.random() *range)+1);

      var a=Math.floor((Math.random()*2));
      if(a==0){
        num1=Math.floor((Math.random() *range-1)+1);
      }else{
        num1=-1*(Math.floor((Math.random() *range-1)+1));
      }
      num2=num1-target;
    }else if(opt=="*"){
      //target = Math.floor((Math.random() *range)+1);

      var a=Math.floor((Math.random()*2));
      var b=Math.floor((Math.random()*2));
      if(a==0){
        num1=Math.floor((Math.random() *(range/2))+1);
      }else{
        num1=-1*(Math.floor((Math.random() *(range/2))+1));
      }

      if(b==0){
        num2=Math.floor((Math.random() *(range/2))+1);
      }else{
        num2=-1*(Math.floor((Math.random() *(range/2))+1));
      }
      target=num1*num2;
    }else{
      var a=Math.floor((Math.random()*2));
      var b=Math.floor((Math.random()*2));
      if(a==0){
        num1=Math.floor((Math.random() *(range/2))+1);
      }else{
        num1=-1*(Math.floor((Math.random() *(range/2))+1));
      }

      if(b==0){
        num2=Math.floor((Math.random() *(range/2))+1);
      }else{
        num2=-1*(Math.floor((Math.random() *(range/2))+1));
      }
      var c=num1*num2;
      target=num1;
      num1=c;
    }
    $scope.target="make "+target;
    console.log(target+"="+num1+"("+opt+")"+num2);
  }

  function setupNumPad(range,size){
    var s=size;
    //console.log(Math.floor(s/2));
    var index1=Math.floor((Math.random() *s));
    var index2=Math.floor((Math.random() *s));
    while(index1==index2){
      console.log('sa');
      index2=Math.floor((Math.random() *s));
    }
    console.log(index1+" "+index2);
    for(var i=0;i<s;i++){
      if(i==index1){
        document.getElementById(i.toString()).innerHTML=num1;
        document.getElementById(i.toString()).value=num1;
      }else if(i==index2){
        document.getElementById(i.toString()).innerHTML=num2;
        document.getElementById(i.toString()).value=num2;
      }else{
        var a=Math.floor((Math.random() *range)+1);
        document.getElementById(i.toString()).innerHTML=a;
        document.getElementById(i.toString()).value=a;
      }
      //console.log(document.getElementById(i.toString()).innerHTML);
    }
  }

  function changeNumPadColor(size){
    var color=["green darken-4","brown","grey","cyan"];
    var a=Math.floor((Math.random() *4));
    for(var i=0;i<size;i++){
      $("#"+i).toggleClass(color[a]);
    }
  }

  //######################################### number pad buttons
 
  $("#0").click(function() {
    if(array.length==0){
      array.push(parseInt(document.getElementById("0").value));
      document.getElementById("num1").innerHTML="("+document.getElementById("0").value+")";
    }else if(array.length==1){
      Materialize.toast('Select an Operator', 4000);
    }else if(array.length==2){
      document.getElementById("num2").innerHTML="("+document.getElementById("0").value+")";
      array.push(parseInt(document.getElementById("0").value));
      check();
    }
  });

  $("#1").click(function() {
    if(array.length==0){
      array.push(parseInt(document.getElementById("1").value));
      document.getElementById("num1").innerHTML="("+document.getElementById("1").value+")";
    }else if(array.length==1){
      Materialize.toast('Select an Operator', 4000);
    }else if(array.length==2){
      document.getElementById("num2").innerHTML="("+document.getElementById("1").value+")";
      array.push(parseInt(document.getElementById("1").value));
      check();
    }
  });

  $("#2").click(function() {
    if(array.length==0){
      array.push(parseInt(document.getElementById("2").value));
      document.getElementById("num1").innerHTML="("+document.getElementById("2").value+")";
    }else if(array.length==1){
      Materialize.toast('Select an Operator', 4000);
    }else if(array.length==2){
      document.getElementById("num2").innerHTML="("+document.getElementById("2").value+")";
      array.push(parseInt(document.getElementById("2").value));
      check();
    }
  });
  $("#3").click(function() {
    if(array.length==0){
      array.push(parseInt(document.getElementById("3").value));
      document.getElementById("num1").innerHTML="("+document.getElementById("3").value+")";
    }else if(array.length==1){
      Materialize.toast('Select an Operator', 4000);
    }else if(array.length==2){
      document.getElementById("num2").innerHTML="("+document.getElementById("3").value+")";
      array.push(parseInt(document.getElementById("3").value));
      check();
    }
  });
   

  //###################################### Operators

  $("#o0").click(function() {
    if(array.length==1){
      array.push(document.getElementById("o0").value);
      document.getElementById("opt").innerHTML=document.getElementById("o0").value;
    }

  });

  $("#o1").click(function() {
    if(array.length==1){
      array.push(document.getElementById("o1").value);
      document.getElementById("opt").innerHTML=document.getElementById("o1").value;
    }
  });
  $("#o2").click(function() {
    if(array.length==1){
      array.push(document.getElementById("o2").value);
      document.getElementById("opt").innerHTML=document.getElementById("o2").value;
    }
  });
  $("#o3").click(function() {
    if(array.length==1){
      array.push(document.getElementById("o3").value);
      document.getElementById("opt").innerHTML=document.getElementById("o3").value;
    }
  });
  
  function check(){
    var a;
    console.log(array[1]);
    if(array[1]=="+"){
      
      if(target==(array[0]+array[2])){
        document.getElementById("check").innerHTML="<i class='fa fa-check icon-green'></i>";

      }else{
        document.getElementById("check").innerHTML="<i class='fa fa-times icon-red'></i>";
      }
    }else if(array[1]=="-"){
      
      if(target==(array[0]-array[2])){
        document.getElementById("check").innerHTML="<i class='fa fa-check icon-green'></i>";
      }else{
        document.getElementById("check").innerHTML="<i class='fa fa-times icon-red'></i>";
      }
    }else if(array[1]=="*"){
      
      if(target==(array[0]*array[2])){
        document.getElementById("check").innerHTML="<i class='fa fa-check icon-green'></i>";
      }else{
        document.getElementById("check").innerHTML="<i class='fa fa-times icon-red'></i>";
      }
    }else{
      
      if(target==(array[0]/array[2])){
        document.getElementById("check").innerHTML="<i class='fa fa-check icon-green'></i>";
      }else{
        document.getElementById("check").innerHTML="<i class='fa fa-times icon-red'></i>";
      }
    }
    document.getElementById("answer").innerHTML=" = "+target;
  }

  function countdown(){
    document.getElementById("countdown").innerHTML=count;
    if(count>0){
      count -=1;
    }
  }

});
app.controller('level2Ctrl',function($scope,$window){
   var count;

  reload1();

  $scope.reload=function(){
    count=10;
    array=[];
    setupOperators();
    init(10);
    setupNumPad(10,9);
    changeNumPadColor(9);
    chanegOperatorColor();
    document.getElementById('num1').innerHTML="";
    document.getElementById('num2').innerHTML="";
    document.getElementById('opt').innerHTML="";
    document.getElementById('answer').innerHTML="";
    document.getElementById('check').innerHTML="";
    setInterval(countdown,1000);
  }

  function reload1(){
    count=10;
    array=[];
    setupOperators();
    init(10);
    setupNumPad(10,9);
    changeNumPadColor(9);
    chanegOperatorColor();
    document.getElementById('num1').innerHTML="";
    document.getElementById('num2').innerHTML="";
    document.getElementById('opt').innerHTML="";
    document.getElementById('answer').innerHTML="";
    document.getElementById('check').innerHTML="";
    setInterval(countdown,1000);
  }

  function setupOperators(){
    pattern=[["+","-","*","/"],["*","/","+","-"],["+","/","*","-"],["/","-","+","*"]];
    var x = Math.floor((Math.random() * 4));

    document.getElementById("o0").innerHTML=pattern[x][0];
    document.getElementById("o0").value=pattern[x][0];

    document.getElementById("o1").innerHTML=pattern[x][1];
    document.getElementById("o1").value=pattern[x][1];

    document.getElementById("o2").innerHTML=pattern[x][2];
    document.getElementById("o2").value=pattern[x][2];

    document.getElementById("o3").innerHTML=pattern[x][3]; 
    document.getElementById("o3").value=pattern[x][3];
  }

  function chanegOperatorColor(){
    color=[["blue","green","orange","purple"],["purple","orange","blue","green"],["orange","blue","green","purple"],["green","orange","purple","blue"]];
    var x = Math.floor((Math.random() * 4));
    $("#o0").toggleClass(color[x][0]);
    $("#o1").toggleClass(color[x][1]);
    $("#o2").toggleClass(color[x][2]);
    $("#o3").toggleClass(color[x][3]);
  }

  var target; var num1;var num2; var array=[];
  function init(range){
    var operator=["+","-","*","/"];
    
    var opt=operator[Math.floor((Math.random() *4))];
    
    if(opt=="+"){
      target = Math.floor((Math.random() *range)+1);

      var a=Math.floor((Math.random()*2));
      if(a==0){
        num1=Math.floor((Math.random() *range-1)+1);
      }else{
        num1=-1*(Math.floor((Math.random() *range-1)+1));
      }
      num2=target-num1;
    }else if(opt=="-"){
      target = Math.floor((Math.random() *range)+1);

      var a=Math.floor((Math.random()*2));
      if(a==0){
        num1=Math.floor((Math.random() *range-1)+1);
      }else{
        num1=-1*(Math.floor((Math.random() *range-1)+1));
      }
      num2=num1-target;
    }else if(opt=="*"){
      //target = Math.floor((Math.random() *range)+1);

      var a=Math.floor((Math.random()*2));
      var b=Math.floor((Math.random()*2));
      if(a==0){
        num1=Math.floor((Math.random() *(range/2))+1);
      }else{
        num1=-1*(Math.floor((Math.random() *(range/2))+1));
      }

      if(b==0){
        num2=Math.floor((Math.random() *(range/2))+1);
      }else{
        num2=-1*(Math.floor((Math.random() *(range/2))+1));
      }
      target=num1*num2;
    }else{
      var a=Math.floor((Math.random()*2));
      var b=Math.floor((Math.random()*2));
      if(a==0){
        num1=Math.floor((Math.random() *(range/2))+1);
      }else{
        num1=-1*(Math.floor((Math.random() *(range/2))+1));
      }

      if(b==0){
        num2=Math.floor((Math.random() *(range/2))+1);
      }else{
        num2=-1*(Math.floor((Math.random() *(range/2))+1));
      }
      var c=num1*num2;
      target=num1;
      num1=c;
    }
    $scope.target="make "+target;
    console.log(target+"="+num1+"("+opt+")"+num2);
  }

  function setupNumPad(range,size){
    var s=size;
    //console.log(Math.floor(s/2));
    var index1=Math.floor((Math.random() *s));
    var index2=Math.floor((Math.random() *s));
    while(index1==index2){
      console.log('sa');
      index2=Math.floor((Math.random() *s));
    }
    console.log(index1+" "+index2);
    for(var i=0;i<s;i++){
      if(i==index1){
        document.getElementById(i.toString()).innerHTML=num1;
        document.getElementById(i.toString()).value=num1;
      }else if(i==index2){
        document.getElementById(i.toString()).innerHTML=num2;
        document.getElementById(i.toString()).value=num2;
      }else{
        var a=Math.floor((Math.random() *range)+1);
        document.getElementById(i.toString()).innerHTML=a;
        document.getElementById(i.toString()).value=a;
      }
      //console.log(document.getElementById(i.toString()).innerHTML);
    }
  }

  function changeNumPadColor(size){
    var color=["green darken-4","brown","grey","cyan"];
    var a=Math.floor((Math.random() *4));
    for(var i=0;i<size;i++){
      $("#"+i).toggleClass(color[a]);
    }
  }

  //######################################### number pad buttons
 
  $("#0").click(function() {
    if(array.length==0){
      array.push(parseInt(document.getElementById("0").value));
      document.getElementById("num1").innerHTML="("+document.getElementById("0").value+")";
    }else if(array.length==1){
      Materialize.toast('Select an Operator', 4000);
    }else if(array.length==2){
      document.getElementById("num2").innerHTML="("+document.getElementById("0").value+")";
      array.push(parseInt(document.getElementById("0").value));
      check();
    }
  });

  $("#1").click(function() {
    if(array.length==0){
      array.push(parseInt(document.getElementById("1").value));
      document.getElementById("num1").innerHTML="("+document.getElementById("1").value+")";
    }else if(array.length==1){
      Materialize.toast('Select an Operator', 4000);
    }else if(array.length==2){
      document.getElementById("num2").innerHTML="("+document.getElementById("1").value+")";
      array.push(parseInt(document.getElementById("1").value));
      check();
    }
  });

  $("#2").click(function() {
    if(array.length==0){
      array.push(parseInt(document.getElementById("2").value));
      document.getElementById("num1").innerHTML="("+document.getElementById("2").value+")";
    }else if(array.length==1){
      Materialize.toast('Select an Operator', 4000);
    }else if(array.length==2){
      document.getElementById("num2").innerHTML="("+document.getElementById("2").value+")";
      array.push(parseInt(document.getElementById("2").value));
      check();
    }
  });
  $("#3").click(function() {
    if(array.length==0){
      array.push(parseInt(document.getElementById("3").value));
      document.getElementById("num1").innerHTML="("+document.getElementById("3").value+")";
    }else if(array.length==1){
      Materialize.toast('Select an Operator', 4000);
    }else if(array.length==2){
      document.getElementById("num2").innerHTML="("+document.getElementById("3").value+")";
      array.push(parseInt(document.getElementById("3").value));
      check();
    }
  });
  $("#4").click(function() {
    if(array.length==0){
      array.push(parseInt(document.getElementById("4").value));
      document.getElementById("num1").innerHTML="("+document.getElementById("4").value+")";
    }else if(array.length==1){
      Materialize.toast('Select an Operator', 4000);
    }else if(array.length==2){
      document.getElementById("num2").innerHTML="("+document.getElementById("4").value+")";
      array.push(parseInt(document.getElementById("4").value));
      check();
    }
  });
    $("#5").click(function() {
    if(array.length==0){
      array.push(parseInt(document.getElementById("5").value));
      document.getElementById("num1").innerHTML="("+document.getElementById("5").value+")";
    }else if(array.length==1){
      Materialize.toast('Select an Operator', 4000);
    }else if(array.length==2){
      document.getElementById("num2").innerHTML="("+document.getElementById("5").value+")";
      array.push(parseInt(document.getElementById("5").value));
      check();
    }
  });
     $("#6").click(function() {
    if(array.length==0){
      array.push(parseInt(document.getElementById("6").value));
      document.getElementById("num1").innerHTML="("+document.getElementById("6").value+")";
    }else if(array.length==1){
      Materialize.toast('Select an Operator', 4000);
    }else if(array.length==2){
      document.getElementById("num2").innerHTML="("+document.getElementById("6").value+")";
      array.push(parseInt(document.getElementById("6").value));
      check();
    }
  });
      $("#7").click(function() {
    if(array.length==0){
      array.push(parseInt(document.getElementById("7").value));
      document.getElementById("num1").innerHTML="("+document.getElementById("7").value+")";
    }else if(array.length==1){
      Materialize.toast('Select an Operator', 4000);
    }else if(array.length==2){
      document.getElementById("num2").innerHTML="("+document.getElementById("7").value+")";
      array.push(parseInt(document.getElementById("7").value));
      check();
    }
  });
       $("#8").click(function() {
    if(array.length==0){
      array.push(parseInt(document.getElementById("8").value));
      document.getElementById("num1").innerHTML="("+document.getElementById("8").value+")";
    }else if(array.length==1){
      Materialize.toast('Select an Operator', 4000);
    }else if(array.length==2){
      document.getElementById("num2").innerHTML="("+document.getElementById("8").value+")";
      array.push(parseInt(document.getElementById("8").value));
      check();
    }
  });

  //###################################### Operators

  $("#o0").click(function() {
    if(array.length==1){
      array.push(document.getElementById("o0").value);
      document.getElementById("opt").innerHTML=document.getElementById("o0").value;
    }

  });

  $("#o1").click(function() {
    if(array.length==1){
      array.push(document.getElementById("o1").value);
      document.getElementById("opt").innerHTML=document.getElementById("o1").value;
    }
  });
  $("#o2").click(function() {
    if(array.length==1){
      array.push(document.getElementById("o2").value);
      document.getElementById("opt").innerHTML=document.getElementById("o2").value;
    }
  });
  $("#o3").click(function() {
    if(array.length==1){
      array.push(document.getElementById("o3").value);
      document.getElementById("opt").innerHTML=document.getElementById("o3").value;
    }
  });
  
  function check(){
    var a;
    console.log(array[1]);
    if(array[1]=="+"){
      
      if(target==(array[0]+array[2])){
        document.getElementById("check").innerHTML="<i class='fa fa-check icon-green'></i>";

      }else{
        document.getElementById("check").innerHTML="<i class='fa fa-times icon-red'></i>";
      }
    }else if(array[1]=="-"){
      
      if(target==(array[0]-array[2])){
        document.getElementById("check").innerHTML="<i class='fa fa-check icon-green'></i>";
      }else{
        document.getElementById("check").innerHTML="<i class='fa fa-times icon-red'></i>";
      }
    }else if(array[1]=="*"){
      
      if(target==(array[0]*array[2])){
        document.getElementById("check").innerHTML="<i class='fa fa-check icon-green'></i>";
      }else{
        document.getElementById("check").innerHTML="<i class='fa fa-times icon-red'></i>";
      }
    }else{
      
      if(target==(array[0]/array[2])){
        document.getElementById("check").innerHTML="<i class='fa fa-check icon-green'></i>";
      }else{
        document.getElementById("check").innerHTML="<i class='fa fa-times icon-red'></i>";
      }
    }
    document.getElementById("answer").innerHTML=" = "+target;
  }

  function countdown(){
    document.getElementById("countdown").innerHTML=count;
    if(count>0){
      count -=1;
    }
  }

});