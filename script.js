var data = new Array(1,2,3,4,
                     5,6,7,8,
                     9,10,11,12,
                     13,14,15,16);
var pan = 0;
var finish = 0;
var _pic =0;
var emptyPosition = 16;

window.onload = function()
{
  for(var c1 = 1;c1<=16;c1++)
    $("#block_"+c1.toString()).bind('click',c1,gogogo);

  $('#show_sign').mouseenter(
    function(){
      document.getElementById("show").className = "show_out pic"+_pic.toString();
    }).mouseleave(
    function(){
      if(finish ==0)
        document.getElementById("show").className = "show_in pic"+_pic.toString();
    });
  $('#pic_sign').click(
    function()
    {
      _pic = 1- _pic;
      for(var cc1=1;cc1<=16;cc1++)
      {
        document.getElementById("block_"+data[cc1-1].toString()).className = "position"+cc1.toString()+" pic"+_pic.toString();
      }
    });
}

function isFinish()
{
  for(var c1=0;c1<16;c1++)
    if(data[c1]!=c1+1)
      return false;
  return true;
}


function gogogo(event)
{
  var position = event.data;
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
  if(id_position ==emptyPosition+4||id_position ==emptyPosition-4||(id_position ==emptyPosition+1&&(id_position-1)%4==(emptyPosition-1)%4+1)||(id_position ==emptyPosition-1&&(id_position-1)%4==(emptyPosition-1)%4-1)) {
      document.getElementById("block_"+position.toString()).className = "position"+ emptyPosition.toString()+" pic"+_pic.toString();
      document.getElementById("block_16").className = "position"+id_position.toString()+" pic"+_pic.toString();
      data[emptyPosition-1] = position;
      data[id_position-1] = 16;
      emptyPosition = id_position;
  }

  if(isFinish())
  {
    document.getElementById("show").className = "show_out pic"+_pic.toString();;
    document.getElementById('win').className = 'win_out';
    finish = 1;
  }
}


function begin()
{
  pan = 1;
  finish = 0;

  document.getElementById('win').className = 'win_in';
  document.getElementById("show").className = "show_in pic"+_pic.toString();;
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
        count += parseInt(c1/4)  + c1%4;
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
  }while(!isValid());

  for(var c1=1;c1<=16;c1++)
  {
    document.getElementById("block_"+data[c1-1].toString()).className = "position"+c1.toString()+" pic"+_pic.toString();
    if (data[c1-1]==16) {
      emptyPosition = c1;
    }
  }
}
//before 136
