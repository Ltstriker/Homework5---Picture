
var data = new Array(1,2,3,
                     4,5,6,
                     7,8,9);


var whoCanMove = new Array(5,-1,7,-1);

var pan = 0;
var emptyPosition = 8;

function isFinish()
{
  for(var c1=0;c1<8;c1++)
    if(data[c1]!=c1+1)
      return false;
  return true;
}

function emptyMove()
{

  if(emptyPosition>2)
    whoCanMove[0]=emptyPosition-3;
  else {
    whoCanMove[0]=-1;
  }

  if (emptyPosition<6) {
    whoCanMove[1]=emptyPosition+3;
  }
  else {
    whoCanMove[1]=-1;
  }

  if(emptyPosition%3!=0)
    whoCanMove[2]=emptyPosition-1;
  else {
    whoCanMove[2]=-1;
  }

  if(emptyPosition%3!=2)
    whoCanMove[3]=emptyPosition+1;
  else {
    whoCanMove[3]=-1;
  }
}

function direction(positionInBlock)
{
  switch (whoCanMove.indexOf(positionInBlock)) {
    case 0:
      down(positionInBlock);
      break;
    case 1:
      up(positionInBlock);
      break;
    case 2:
      right(positionInBlock);
      break;
    case 3:
      left(positionInBlock);
      break;
    default:
      break;
  }
  emptyMove();
}

function right(positionInBlock)
{
  var _id=document.getElementById("block_"+data[positionInBlock].toString());
  var _temp1= 0;
  if(positionInBlock%3==0)
    _temp1=242;
    else if (positionInBlock%3==1) {
      _temp1=474;
    }
  _id.style.left=_temp1.toString()+"px";

  var _id2=document.getElementById("block_"+data[positionInBlock+1].toString());
  var _temp2=0;
  if(positionInBlock%3==0)
    _temp2=10;
    else if (positionInBlock%3==1) {
      _temp2=242;
    }
  _id2.style.left= _temp2.toString()+"px";

  var temp=data[positionInBlock];
  data[positionInBlock]=data[positionInBlock+1];
  data[positionInBlock+1]=temp;

  emptyPosition-=1;
}

function left(positionInBlock)
{
  var _id=document.getElementById("block_"+data[positionInBlock].toString());
  var _temp1= 0;
  if(positionInBlock%3==1)
    _temp1=10;
    else if (positionInBlock%3==2) {
      _temp1=242;
    }
  _id.style.left=_temp1.toString()+"px";

  var _id2=document.getElementById("block_"+data[positionInBlock-1].toString());
  var _temp2=0;
  if(positionInBlock%3==1)
    _temp2=242;
    else if (positionInBlock%3==2) {
      _temp2=474;
    }
  _id2.style.left= _temp2.toString()+"px";

  var temp=data[positionInBlock];
  data[positionInBlock]=data[positionInBlock-1];
  data[positionInBlock-1]=temp;

  emptyPosition+=1;
}

function up(positionInBlock)
{
  var _id=document.getElementById("block_"+data[positionInBlock].toString());
  var _temp1= 0;
  if(positionInBlock>5)
    _temp1=242;
    else {
      _temp1=10;
    }
  _id.style.top=_temp1.toString()+"px";

  var _id2=document.getElementById("block_"+data[positionInBlock-3].toString());
  var _temp2=0;
  if(positionInBlock>5)
    _temp2=474;
    else {
      _temp2=242;
    }
  _id2.style.top= _temp2.toString()+"px";

  var temp=data[positionInBlock];
  data[positionInBlock]=data[positionInBlock-3];
  data[positionInBlock-3]=temp;

  emptyPosition+=3;
}

function down(positionInBlock)
{
  var _id=document.getElementById("block_"+data[positionInBlock].toString());
  var _temp1= 0;
  if(positionInBlock<3)
    _temp1=242;
    else {
      _temp1=472;
    }
  _id.style.top=_temp1.toString()+"px";

  var _id2=document.getElementById("block_"+data[positionInBlock+3].toString());
  var _temp2=0;
  if(positionInBlock<3)
    _temp2=10;
    else {
      _temp2=242;
    }
  _id2.style.top= _temp2.toString()+"px";

  var temp=data[positionInBlock];
  data[positionInBlock]=data[positionInBlock+3];
  data[positionInBlock+3]=temp;

  emptyPosition-=3;
}


function gogogo(id_position)
{
  if(pan == 0)
    window.alert("The game hasn't started yet.");
  else
  {
    direction(data.indexOf(id_position));

    if(isFinish())
    {
      window.alert("You win!!!")
      pan = 0;
    }
  }
}

function begin()
{
  pan = 1;
  var temp=0;
  var c_temp=0;
  var range = new Array(1,2,3,4,5,6,7,8,9)
  for(var c1=0;c1<9;c1++)
  {
    temp=parseInt(Math.random()*(9-c1));//0~8
    data[c1]=range[temp];
    var temp_id = document.getElementById("block_"+data[c1].toString());

    if(c1%3 == 0)
      temp_id.style.left="10px";
    else if (c1%3 == 1) {
      temp_id.style.left="242px";
    }
    else {
      temp_id.style.left="474px";
    }

    if(c1<3)
    {
      temp_id.style.top ="10px";
    }
    else if (c1>5) {
      temp_id.style.top = "474px";
    }
    else {
      temp_id.style.top = "242px";
    }
    range.splice(temp,1);
  }

  emptyPosition=data.indexOf(9);

  emptyMove();
}

function init()
{
  pan = 0;
  
  for(var c1=0;c1<9;c1++)
  {
    data[c1]=c1+1;
    var temp_id = document.getElementById("block_"+data[c1].toString());
    if(c1%3 == 0)
      temp_id.style.left="10px";
    else if (c1%3 == 1) {
      temp_id.style.left="242px";
    }
    else {
      temp_id.style.left="474px";
    }

    if(c1<3)
    {
      temp_id.style.top ="10px";
    }
    else if (c1>5) {
      temp_id.style.top = "474px";
    }
    else {
      temp_id.style.top = "242px";
    }
  }

  emptyPosition=8;
  emptyMove();
}
