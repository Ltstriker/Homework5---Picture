var data = new Array(1,2,3,4,
                     5,6,7,8,
                     9,10,11,12,
                     13,14,15,16);
var pan = 0;

var emptyPosition = 16;

window.onload = function()
{
  /*for(var c1=1;c1<17;c1++)
  {
    (function(c1){

    document.getElementById("block_"+c1.toString()).addEventListener('click',
      function(){gogogo(c1)},false);
    })(c1);
  }*/
  document.getElementById("block_1").onclick = function(){gogogo(1);};
  document.getElementById("block_2").onclick = function(){gogogo(2);};
  document.getElementById("block_3").onclick = function(){gogogo(3);};
  document.getElementById("block_4").onclick = function(){gogogo(4);};
  document.getElementById("block_5").onclick = function(){gogogo(5);};
  document.getElementById("block_6").onclick = function(){gogogo(6);};
  document.getElementById("block_7").onclick = function(){gogogo(7);};
  document.getElementById("block_8").onclick = function(){gogogo(8);};
  document.getElementById("block_9").onclick = function(){gogogo(9);};
  document.getElementById("block_10").onclick = function(){gogogo(10);};
  document.getElementById("block_11").onclick = function(){gogogo(11);};
  document.getElementById("block_12").onclick = function(){gogogo(12);};
  document.getElementById("block_13").onclick = function(){gogogo(13);};
  document.getElementById("block_14").onclick = function(){gogogo(14);};
  document.getElementById("block_15").onclick = function(){gogogo(15);};
  document.getElementById("block_16").onclick = function(){gogogo(16);};

  document.getElementById('show_sign').onmouseover=function(){document.getElementById("show").className = "show_out";};
  document.getElementById('show_sign').onmouseout = function(){document.getElementById("show").className = "show_in";};

}

function isFinish()
{
  for(var c1=0;c1<16;c1++)
    if(data[c1]!=c1+1)
      return false;
  return true;
}


function gogogo(position)
{
  if(pan == 0)
    return;

  var id_position = 0;

  for(var c1=0;c1<16;c1++)
  {
    if(data[c1]==position)
    {
      id_position = c1+1;
    }
  }
  if(id_position ==emptyPosition+4||id_position ==emptyPosition-4||id_position ==emptyPosition+1||id_position ==emptyPosition-1 ) {
      document.getElementById("block_"+position.toString()).className = "position"+ emptyPosition.toString();
      document.getElementById("block_16").className = "position"+id_position.toString();
      data[emptyPosition-1] = position;
      data[id_position-1] = 16;
      emptyPosition = id_position;
  }

  if(isFinish())
  {
    document.getElementById("show").className = "show_out";
  }
}


function begin()
{
  pan = 1;
  document.getElementById("show").className = "show_in";
  function isValid()
  {
    var count = 0;
    for (var c1 = 0; c1 < 16; c1++) {
        for (var c2 = c1+1; c2 < 16; c2++) {
            if (data[c2] < data[c1]) {
                count++;
            }
        }
    }

    for(var c1=0;c1<16;c1++)
    {
      if(data[c1]== 16)
      {
        count += c1/4  + c1%4;
      }
    }

    return count%2==0;
  }

  do{
    var range = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16)
    for(var c1=0;c1<16;c1++)
    {
      temp=parseInt(Math.random()*(16-c1));//0~8
      data[c1]=range[temp];
      range.splice(temp,1);
    }
  }while(isValid());

  for(var c1=1;c1<=16;c1++)
  {
    document.getElementById("block_"+data[c1-1].toString()).className = "position"+c1.toString();
    if (data[c1-1]==16) {
      emptyPosition = c1;
    }
  }
}
