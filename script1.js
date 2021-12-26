colorButtonMassive = [
    [0,0,1],
    [1,0,0],
    [0,1,0],
    [1,1,0],
    [1,0,1],
    [0,1,1],
    [1,1,1],
    [0,0,1],
    [1,0,0],
    [0,0,0],
    [1,1,1],
    [0,0,0]
];
animateBool = true;
arrowBool = true;

function changeBool(e)
    {
        if(e.id == 'animBool')
            {
                if(e.checked) animateBool = true;
                else animateBool = false;
            }
       if(e.id == 'arrowChecked')
            {
                if(e.checked) arrowBool = true;
                else arrowBool = false;
            }
        
    }
function fun2(e)
{
    switch(e.id)
        {
            case "color1":{colorButtonMassive[0] = [Math.round(Math.random()),Math.round(Math.random()),Math.round(Math.random())];colorType(e, colorButtonMassive[0]);break;}
            case "color2":{colorButtonMassive[1] = [Math.round(Math.random()),Math.round(Math.random()),Math.round(Math.random())];colorType(e, colorButtonMassive[1]);break;}
            case "color3":{colorButtonMassive[2] = [Math.round(Math.random()),Math.round(Math.random()),Math.round(Math.random())];colorType(e, colorButtonMassive[2]);break;}
            case "color4":{colorButtonMassive[3] = [Math.round(Math.random()),Math.round(Math.random()),Math.round(Math.random())];colorType(e, colorButtonMassive[3]);break;}
            case "color5":{colorButtonMassive[4] = [Math.round(Math.random()),Math.round(Math.random()),Math.round(Math.random())];colorType(e, colorButtonMassive[4]);break;}
            case "color6":{colorButtonMassive[5] = [Math.round(Math.random()),Math.round(Math.random()),Math.round(Math.random())];colorType(e, colorButtonMassive[5]);break;}
            case "color7":{colorButtonMassive[6] = [Math.round(Math.random()),Math.round(Math.random()),Math.round(Math.random())];colorType(e, colorButtonMassive[6]);break;}
            case "color8":{colorButtonMassive[7] = [Math.round(Math.random()),Math.round(Math.random()),Math.round(Math.random())];colorType(e, colorButtonMassive[7]);break;}
            case "color9":{colorButtonMassive[8] = [Math.round(Math.random()),Math.round(Math.random()),Math.round(Math.random())];colorType(e, colorButtonMassive[8]);break;}
            case "color10":{colorButtonMassive[9] = [Math.round(Math.random()),Math.round(Math.random()),Math.round(Math.random())];colorType(e, colorButtonMassive[9]);break;}
            case "color11":{colorButtonMassive[10] = [Math.round(Math.random()),Math.round(Math.random()),Math.round(Math.random())];colorType(e, colorButtonMassive[10]);break;}
            case "color12":{colorButtonMassive[11] = [Math.round(Math.random()),Math.round(Math.random()),Math.round(Math.random())];colorType(e, colorButtonMassive[11]);break;}
        }
}
function colorType(e, object)
{
    
    if (object[0] == 0 && object[1] == 0 && object[2] == 1) e.style.backgroundColor = 'blue';
    if (object[0] == 0 && object[1] == 1 && object[2] == 0) e.style.backgroundColor = 'green';
    if (object[0] == 1 && object[1] == 0 && object[2] == 0) e.style.backgroundColor = 'red';
    if (object[0] == 1 && object[1] == 0 && object[2] == 1) e.style.backgroundColor = 'magenta';
    if (object[0] == 1 && object[1] == 1 && object[2] == 1) e.style.backgroundColor = 'white';
    if (object[0] == 0 && object[1] == 1 && object[2] == 1) e.style.backgroundColor = 'cyan';
    if (object[0] == 1 && object[1] == 1 && object[2] == 0) e.style.backgroundColor = 'yellow';
    if (object[0] == 0 && object[1] == 0 && object[2] == 0) e.style.backgroundColor = 'black';
}
function saveAsJPG()
 {
    var myCanvas = document.getElementById('canvas3D');
    var dataUri = myCanvas.toDataURL('image/jpeg');
    console.log(myCanvas.toDataURL('image/jpeg'));
    document.getElementById('linkJpg').href = dataUri;
 }
 function objectsChanged(e)
    {
        if(e.id == 'speedAnim')
        {
            if(e.value < 0.1 || e.value > 20)
            {
                document.getElementById('speedAnim').value = 0.1;
            }
        }
        else
        if(e.id == 'zMinimum' || e.id == 'zMaximum')
        {
            if(document.getElementById('zMinimum').value > document.getElementById('zMaximum').value) document.getElementById('resultGrafx').disabled = true; 
            else document.getElementById('resultGrafx').disabled = false;
        }
        else
        if(e.id == 'xMinimum' || e.id == 'xMaximum')
        {
            if(document.getElementById('xMinimum').value>document.getElementById('xMaximum').value) document.getElementById('resultGrafx').disabled = true; 
            else document.getElementById('resultGrafx').disabled = false;
        }
        else
        if(e.id == 'yMinimum' || e.id == 'yMaximum')
        {
            if(document.getElementById('yMinimum').value>document.getElementById('yMaximum').value) document.getElementById('resultGrafx').disabled = true; 
            else document.getElementById('resultGrafx').disabled = false;
        }
    }