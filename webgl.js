var canvas = document.getElementById('canvas3D');
var gl;
var colorBuffer;
var shaderProgram;
var vertexBuffer;
var angle = 2.0;//угол вращения в радианах
var angle2 = 0.0;//угол вращения в радианах
var zTranslation = -25.0; // смещение по оси Z
var yTranslation = 0.0; // смещение по оси Z
 
var mvMatrix = mat4.create(); 
var pMatrix = mat4.create();
 
function initShaders() {
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'shader-fs');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'shader-vs');
 
    shaderProgram = gl.createProgram();
 
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
 
    gl.linkProgram(shaderProgram);
      
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Не удалось установить шейдеры");
    }
      
    gl.useProgram(shaderProgram);
 
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
     
    shaderProgram.MVMatrix = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.ProjMatrix = gl.getUniformLocation(shaderProgram, "uPMatrix");
}
 
function setMatrixUniforms(){
    gl.uniformMatrix4fv(shaderProgram.ProjMatrix,false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.MVMatrix, false, mvMatrix);  
} 
 
function getShader(type,id) {
    var source = document.getElementById(id).innerHTML;
 
    var shader = gl.createShader(type);
     
    gl.shaderSource(shader, source);
 
    gl.compileShader(shader);
   
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Ошибка компиляции шейдера: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);   
        return null;
    }
    return shader;  
}

function initBuffers() {
    colors = [];
    vertices = [];
    sum = 0;
    sum2 = 0;
                if(formula[0] != null) {insertBuffer(0);}
                if(formula[1] != null) {insertBuffer(1);}
                if(formula[2] != null) {insertBuffer(2);}
                if(formula[3] != null) {insertBuffer(3);}
                if(formula[4] != null) {insertBuffer(4);}
                if(formula[5] != null) {insertBuffer(5);}
                if(formula[6] != null) {insertBuffer(6);}
                if(formula[7] != null) {insertBuffer(7);}
                if(formula[8] != null) {insertBuffer(8);}
                if(formula[9] != null) {insertBuffer(9);} 
     /*alert(formula);
     alert(vertices);
     alert(vertices.length);
     alert(sum2);
     alert(colors);*/
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    vertexBuffer.itemSize = 3;
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}
function insertBuffer(index)
 {
     var regExp1 = /=/;
     var regExp2 = /z/;
     if(regExp1.test(formula[index]) || regExp2.test(formula[index]) || regExp1.test(formula[index]) && regExp2.test(formula[index])) alert('unknown function');
     else
     {
        if(arrowBool) arrows();

        for (var y=yMinimum;y<(yMaximum+0.1);y+=0.1)
        {
            sum++;
            for (var x = xMinimum;x<(xMaximum+0.1);x+=0.1)
            {
                if(Math.abs(xMinimum)+xMaximum > 36)
                {
                    if(x == xMinimum)
                {
                    vertices.push(x, (eval(formula[index])), y);
                    colors.push(colorButtonMassive[index][0]);
                    colors.push(colorButtonMassive[index][1]);
                    colors.push(colorButtonMassive[index][2]);
                    colors.push(0);
                    sum2++;
                }
                else
                if(x == xMaximum)
                {
                    vertices.push(x, (eval(formula[index])), y);
                    colors.push(colorButtonMassive[index][0]);
                    colors.push(colorButtonMassive[index][1]);
                    colors.push(colorButtonMassive[index][2]);
                    colors.push(0);
                    sum2++;
                }
                }
                else {}
                if((eval(formula[index]))<zMinimum ) 
                {
                    vertices.push(x, zMinimum, y);
                    colors.push(colorButtonMassive[index][0]);
                    colors.push(colorButtonMassive[index][1]);
                    colors.push(colorButtonMassive[index][2]);
                    colors.push(0);
                    sum2++;
                }
                else
                if ((eval(formula[index]))>zMaximum)
                {
                    vertices.push(x, zMaximum, y);
                    colors.push(colorButtonMassive[index][0]);
                    colors.push(colorButtonMassive[index][1]);
                    colors.push(colorButtonMassive[index][2]);
                    colors.push(0);
                    sum2++;
                }
                else
                {
                    vertices.push(x, (eval(formula[index])), y);
                    colors.push(colorButtonMassive[index][0]);
                    colors.push(colorButtonMassive[index][1]);
                    colors.push(colorButtonMassive[index][2]);
                    colors.push(1);
                    sum2++;
                }
            }
        }
     }

 }
 function arrows()
    {
        var summaArrows;
        //по оси X
    //сама ось 
    vertices.push(xMinimum-2,0,0);
    vertices.push(xMaximum+2,0,0);

    //стрелка
    vertices.push(xMaximum+2,0,0);
    vertices.push(xMaximum+1.5,0.5,0);
    vertices.push(xMaximum+2,0,0);
    vertices.push(xMaximum+1.5,-0.5,0);
    vertices.push(xMaximum+2,0,0);
    vertices.push(xMaximum+1.5,0,0.5);
    vertices.push(xMaximum+2,0,0);
    vertices.push(xMaximum+1.5,0,-0.5);

    //по оси Z
    //сама ось
    vertices.push(0,zMinimum-2,0);
    vertices.push(0,zMaximum+2,0);

// стрелка
    vertices.push(0,zMaximum+2,0);
    vertices.push(0.5,zMaximum+1.5,0);
    vertices.push(0,zMaximum+2,0);
    vertices.push(-0.5,zMaximum+1.5,0);
    vertices.push(0,zMaximum+2,0);
    vertices.push(0,zMaximum+1.5,0.5);
    vertices.push(0,zMaximum+2,0);
    vertices.push(0,zMaximum+1.5,-0.5);

    //по оси Y
    //сама ось
    vertices.push(0,0,yMinimum-2);
    vertices.push(0,0,yMaximum+2);

    //стрелка
    vertices.push(0,0,yMaximum+2);
    vertices.push(0.5,0,yMaximum+1.5);
    vertices.push(0,0,yMaximum+2);
    vertices.push(-0.5,0,yMaximum+1.5);
    vertices.push(0,0,yMaximum+2);
    vertices.push(0,0.5,yMaximum+1.5);
    vertices.push(0,0,yMaximum+2);
    vertices.push(0,-0.5,yMaximum+1.5);

    summaArrows = 30;
    //отметины через единицу
//для X
    for(var i = xMinimum; i<xMaximum+1;i++)
    {
        vertices.push(i,0.5,0);
        vertices.push(i,-0.5,0);
        summaArrows+=2;
    }
    //для Z
    for(var i = zMinimum; i<zMaximum+1;i++)
    {
        vertices.push(0,i,0.5);
        vertices.push(0,i,-0.5);
        summaArrows+=2;
    }
    //для Y
    for(var i = yMinimum; i<yMaximum+1;i++)
    {
        vertices.push(0,0.5,i);
        vertices.push(0,-0.5,i);
        summaArrows+=2;
    }
    //цвета
    for (var i = 0; i<summaArrows; i++)
    {
        colors.push(colorButtonMassive[11][0]);
        colors.push(colorButtonMassive[11][1]);
        colors.push(colorButtonMassive[11][2]);
        colors.push(1);
    }
    }
function draw() {   
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
                         vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer); 
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 
                        4, gl.FLOAT, false, 0, 0);
  //  gl.drawElements(gl.LINES, indexBuffer.numberOfItems, gl.UNSIGNED_SHORT,0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.drawArrays(gl.LINES, 0, sum2);
}

function setupWebGL()
{    
    if(animateBool) {angle += parseFloat(document.getElementById('speedAnim').value)/100; }
    gl.clearColor(colorButtonMassive[10][0], colorButtonMassive[10][1], colorButtonMassive[10][2], 1.0);  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
     
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    mat4.perspective(pMatrix, 1.04, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix,mvMatrix,[0, 0, zTranslation]);
    mat4.translate(mvMatrix,mvMatrix,[0, yTranslation, 0]);
    mat4.rotate(mvMatrix,mvMatrix, angle, [0, 1, 0]);   
    mat4.rotate(mvMatrix,mvMatrix, angle2, [0, 0, 1]);  
}
  
function fun1(){
    formula = [null,null,null,null,null,null,null,null,null,null];
    if(document.getElementById('check1').checked == true) formula[0] = document.getElementById('text').value;
    if(document.getElementById('check2').checked == true) formula[1] = document.getElementById('text2').value;
    if(document.getElementById('check3').checked == true) formula[2] = document.getElementById('text3').value;
    if(document.getElementById('check4').checked == true) formula[3] = document.getElementById('text4').value;
    if(document.getElementById('check5').checked == true) formula[4] = document.getElementById('text5').value;
    if(document.getElementById('check6').checked == true) formula[5] = document.getElementById('text6').value;
    if(document.getElementById('check7').checked == true) formula[6] = document.getElementById('text7').value;
    if(document.getElementById('check8').checked == true) formula[7] = document.getElementById('text8').value;
    if(document.getElementById('check9').checked == true) formula[8] = document.getElementById('text9').value;
    if(document.getElementById('check10').checked == true) formula[9] = document.getElementById('text10').value;
    xMinimum = parseInt(document.getElementById('xMinimum').value);xMaximum =  parseInt(document.getElementById('xMaximum').value);
    zMinimum =  parseInt(document.getElementById('zMinimum').value);zMaximum =  parseInt(document.getElementById('zMaximum').value);
    yMinimum =  parseInt(document.getElementById('yMinimum').value);yMaximum =  parseInt(document.getElementById('yMaximum').value);
    var canvas = document.getElementById("canvas3D");
    try {
        gl = canvas.getContext("webgl", {preserveDrawingBuffer:true}) || canvas.getContext("experimental-webgl", {preserveDrawingBuffer:true});
    }
    catch(e) {}
   
      if (!gl) {
        alert("Ваш браузер не поддерживает WebGL");
      }
    if(gl){
document.addEventListener('keydown', handleKeyDown, false);
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        initShaders();
         
        initBuffers();
        // функция анимации
        (function animloop(){
            setupWebGL();
            setMatrixUniforms();
            draw(); 
          requestAnimFrame(animloop, canvas);
        })();
          
    }
}
function handleKeyDown(e){
    switch(e.keyCode)
    {
        case 39:  // стрелка вправо
            angle+=0.1;
            break;
        case 37:  // стрелка влево
            angle-=0.1;
            break;
        case 40:  // стрелка вниз
            angle2-=0.1;
            break;
        case 38:  // стрелка вверх
            angle2+=0.1;
            break;
    }
}
function rotateCanvasX()
    {
        rotX = document.getElementById('rotX').value-50+2;
        angle = rotX/10;
    }
function rotateCanvasY()
    {
        rotY = document.getElementById('rotY').value-50;
        angle2 = rotY/10;
    }   
function sizeCanvas()
    {
        size = document.getElementById("size").value-50;
        zTranslation = size;
    }
function sizeCanvasHeight()
    {
        size = document.getElementById("sizeHeight").value-50;
        yTranslation = -size;
    }
// настройка анимации
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     ||
         function(callback, element) {
           return window.setTimeout(callback, 1000/60);
         };
})();