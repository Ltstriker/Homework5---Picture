var data = new Array(1,2,3,4,
                     5,6,7,8,
                     9,10,11,12,
                     13,14,15,16);
var pan = 0;
var finish = 0;

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

//  document.getElementById('show_sign').onmouseover=function(){document.getElementById("show").className = "show_out";};
//  document.getElementById('show_sign').onmouseout = function(){ if(finish ==0)document.getElementById("show").className = "show_in";};
  document.getElementById('show_sign').onclick=move_auto;

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
    document.getElementById('win').className = 'win_out';
    finish = 1;
  }
}


function begin()
{
  pan = 1;
  finish = 0;

  document.getElementById('win').className = 'win_in';
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
    document.getElementById("block_"+data[c1-1].toString()).className = "position"+c1.toString();
    if (data[c1-1]==16) {
      emptyPosition = c1;
    }
  }
}


function move_auto()
{
  var wall_a =new Array(0,0,0,0,
                      0,0,0,0,
                      0,0,0,0,
                      0,0,0,0)
  function move_empty_but(t_position,wall)
  {
    var path = new Array();
    var cross = new Array();//1 u,2 d,3 l, 4 r,0 none.
    path[0]=emptyPosition;
    cross[0]=0;
    var empty_sign = emptyPosition;

    while(path.length==0||path[path.length-1]!=t_position)
    {
      // one round one step
      if((emptyPosition-1)%4==(t_position-1)%4)
      {
        //in same cloume
        if((emptyPosition-1)%4!=(wall-1)%4||(wall<t_position&&wall<emptyPosition)||(wall>t_position&&wall>emptyPosition))
        {
          //wall is not in the way
          if(emptyPosition>t_position)
          {
            path.push(emptyPosition-4);
            cross.push(0);
            emptyPosition-=4;
          }
          else
          {
            path.push(emptyPosition+4);
            cross.push(0);
            emptyPosition+=4;
          }
          continue;
        }
        else {
          //wall in the way
          if(emptyPosition>t_position)
          {
            if(emptyPosition-4==wall)
            {
              if((emptyPosition-1)%4!=3)
              {
                path.push(emptyPosition+1);
                cross.push(0);
                emptyPosition+=1;
              }
              else
              {
                path.push(emptyPosition-1);
                cross.push(0);
                emptyPosition-=1;
              }
            }
            else
            {
              path.push(emptyPosition-4);
              cross.push(0);
              emptyPosition-=4;
            }
          }
          else
          {
            if(emptyPosition+4==wall)
            {
              if((emptyPosition-1)%4!=3)
              {
                path.push(emptyPosition+1);
                cross.push(0);
                emptyPosition+=1;
              }
              else
              {
                path.push(emptyPosition-1);
                cross.push(0);
                emptyPosition-=1;
              }
            }
            else
            {
              path.push(emptyPosition+4);
              cross.push(0);
              emptyPosition+=4;
            }
          }
        }
      }
      else {
        //not in the same cloume
        if(parseInt((emptyPosition-1)/4)==parseInt((t_position-1)/4))
        {
          //in same row
          if(parseInt((emptyPosition-1)/4)!=parseInt((wall-1)/4)||(emptyPosition<wall&&t_position<wall)||(emptyPosition>wall&&t_position>wall))
          {
            //wall is not in the way
            if(emptyPosition<t_position)
            {
              path.push(emptyPosition+1);
              cross.push(0);
              emptyPosition+=1;
            }
            else {
              path.push(emptyPosition-1);
              cross.push(0);
              emptyPosition-=1;
            }
          }
          else {
            //wall is in the way
            if(emptyPosition<t_position)
            {
              if(wall==emptyPosition+1)
              {
                if(parseInt((emptyPosition-1)/4)==3)
                {
                  path.push(emptyPosition-4);
                  cross.push(0);
                  emptyPosition-=4;
                }
                else{
                  path.push(emptyPosition+4);
                  cross.push(0);
                  emptyPosition+=4;
                }
              }
              else
              {
                path.push(emptyPosition+1);
                cross.push(0);
                emptyPosition+=1;
              }
            }
            else {
              if(wall==emptyPosition-1)
              {
                if(parseInt((emptyPosition-1)/4)==3)
                {
                  path.push(emptyPosition-4);
                  cross.push(0);
                  emptyPosition-=4;
                }
                else{
                  path.push(emptyPosition+4);
                  cross.push(0);
                  emptyPosition+=4;
                }
              }
              else
              {
                path.push(emptyPosition-1);
                cross.push(0);
                emptyPosition-=1;
              }
            }
          }
        }
        else {
          //not in the same row and not the same cloume
          var method=1;//%2 =u 3=d 5=l 7=r
          if((emptyPosition-1)%4>(t_position-1)%4)
          {
            if(path.find(function(pos){return pos==emptyPosition-1;})==undefined&&(emptyPosition-1)!=wall)
            {
              method*=5;
            }
          }
          else
          {
            if(path.find(function(pos){return pos==emptyPosition+1;})==undefined&&(emptyPosition+1)!=wall)
            {
              method*=7;
            }
          }

          if(parseInt((emptyPosition-1)/4)>parseInt((t_position-1)/4))
          {
            if(path.find(function(pos){return pos==emptyPosition-4;})==undefined&&(emptyPosition-4)!=wall)
            {
              method*=2;
            }
          }
          else {
            if(path.find(function(pos){return pos==emptyPosition+4;})==undefined&&(emptyPosition+4)!=wall)
            {
              method*=3;
            }
          }

          if(method%7==0)
          {
            path.push(emptyPosition+1);
            cross.push(0);
            emptyPosition+=1;
          }
          else if (method%3==0) {
            path.push(emptyPosition+4);
            cross.push(0);
            emptyPosition+=4;
          }
          else if (method%5==0) {
            path.push(emptyPosition-1);
            cross.push(0);
            emptyPosition-=1;
          }
          else if (method%2==0) {
            path.push(emptyPosition-4);
            cross.push(0);
            emptyPosition-=4;
          }
          else
          {
            window.alert('???');
          }
        }
      }
    }

    for(var c1=1;c1<path.length;c1++)
    {
      document.getElementById("block_"+data[path[c1]-1].toString()).className = "position"+ path[c1-1].toString();
      document.getElementById("block_16").className = "position"+path[c1].toString();
      data[path[c1-1]-1] = path[c1];
      data[path[c1]-1] = 16;
    }
  }

  function move_empty_but2(t_position,wall1,wall2)
  {
    var path = new Array();
    var cross = new Array();//1 u,2 d,3 l, 4 r,0 none.
    path[0]=emptyPosition;
    cross[0]=0;
    var empty_sign = emptyPosition;

    while(path.length==0||path[path.length-1]!=t_position)
    {
      // one round one step
      if((emptyPosition-1)%4==(t_position-1)%4)
      {
        //in same cloume
        if((emptyPosition-1)%4!=(wall1-1)%4||(wall1<t_position&&wall1<emptyPosition)||(wall1>t_position&&wall1>emptyPosition)||
        (emptyPosition-1)%4!=(wall2-1)%4||(wall2<t_position&&wall2<emptyPosition)||(wall2>t_position&&wall2>emptyPosition))
        {
          //wall is not in the way
          if(emptyPosition>t_position)
          {
            path.push(emptyPosition-4);
            cross.push(0);
            emptyPosition-=4;
          }
          else
          {
            path.push(emptyPosition+4);
            cross.push(0);
            emptyPosition+=4;
          }
          continue;
        }
        else {
          //wall in the way
          if(emptyPosition>t_position)
          {
            if(emptyPosition-4==wall1||emptyPosition-4==wall2)
            {
              if((emptyPosition-1)%4!=3)
              {
                path.push(emptyPosition+1);
                cross.push(0);
                emptyPosition+=1;
              }
              else
              {
                path.push(emptyPosition-1);
                cross.push(0);
                emptyPosition-=1;
              }
            }
            else
            {
              path.push(emptyPosition-4);
              cross.push(0);
              emptyPosition-=4;
            }
          }
          else
          {
            if(emptyPosition+4==wall1||emptyPosition+4==wall2)
            {
              if((emptyPosition-1)%4!=3)
              {
                path.push(emptyPosition+1);
                cross.push(0);
                emptyPosition+=1;
              }
              else
              {
                path.push(emptyPosition-1);
                cross.push(0);
                emptyPosition-=1;
              }
            }
            else
            {
              path.push(emptyPosition+4);
              cross.push(0);
              emptyPosition+=4;
            }
          }
        }
      }
      else {
        //not in the same cloume
        if(parseInt((emptyPosition-1)/4)==parseInt((t_position-1)/4))
        {
          //in same row
          if(parseInt((emptyPosition-1)/4)!=parseInt((wall1-1)/4)||(emptyPosition<wall1&&t_position<wall1)||(emptyPosition>wall1&&t_position>wall1)||
            parseInt((emptyPosition-1)/4)!=parseInt((wall2-1)/4)||(emptyPosition<wall2&&t_position<wall2)||(emptyPosition>wall2&&t_position>wall2))
          {
            //wall is not in the way
            if(emptyPosition<t_position)
            {
              path.push(emptyPosition+1);
              cross.push(0);
              emptyPosition+=1;
            }
            else {
              path.push(emptyPosition-1);
              cross.push(0);
              emptyPosition-=1;
            }
          }
          else {
            //wall is in the way
            if(emptyPosition<t_position)
            {
              if(wall1==emptyPosition+1||wall2==emptyPosition+1)
              {
                if(parseInt((emptyPosition-1)/4)==3)
                {
                  path.push(emptyPosition-4);
                  cross.push(0);
                  emptyPosition-=4;
                }
                else{
                  path.push(emptyPosition+4);
                  cross.push(0);
                  emptyPosition+=4;
                }
              }
              else
              {
                path.push(emptyPosition+1);
                cross.push(0);
                emptyPosition+=1;
              }
            }
            else {
              if(wall1==emptyPosition-1||wall2==emptyPosition-1)
              {
                if(parseInt((emptyPosition-1)/4)==3)
                {
                  path.push(emptyPosition-4);
                  cross.push(0);
                  emptyPosition-=4;
                }
                else{
                  path.push(emptyPosition+4);
                  cross.push(0);
                  emptyPosition+=4;
                }
              }
              else
              {
                path.push(emptyPosition-1);
                cross.push(0);
                emptyPosition-=1;
              }
            }
          }
        }
        else {
          //not in the same row and not the same cloume
          var method=1;//%2 =u 3=d 5=l 7=r
          if((emptyPosition-1)%4>(t_position-1)%4)
          {
            if(path.find(function(pos){return pos==emptyPosition-1;})==undefined&&(emptyPosition-1)!=wall1&&(emptyPosition-1)!=wall2)
            {
              method*=5;
            }
          }
          else
          {
            if(path.find(function(pos){return pos==emptyPosition+1;})==undefined&&(emptyPosition+1)!=wall1&&(emptyPosition+1)!=wall2)
            {
              method*=7;
            }
          }

          if(parseInt((emptyPosition-1)/4)>parseInt((t_position-1)/4))
          {
            if(path.find(function(pos){return pos==emptyPosition-4;})==undefined&&(emptyPosition-4)!=wall1&&(emptyPosition-4)!=wall2)
            {
              method*=2;
            }
          }
          else {
            if(path.find(function(pos){return pos==emptyPosition+4;})==undefined&&(emptyPosition+4)!=wall1&&(emptyPosition+4)!=wall2)
            {
              method*=3;
            }
          }

          if(method%7==0)
          {
            path.push(emptyPosition+1);
            cross.push(0);
            emptyPosition+=1;
          }
          else if (method%3==0) {
            path.push(emptyPosition+4);
            cross.push(0);
            emptyPosition+=4;
          }
          else if (method%5==0) {
            path.push(emptyPosition-1);
            cross.push(0);
            emptyPosition-=1;
          }
          else if (method%2==0) {
            path.push(emptyPosition-4);
            cross.push(0);
            emptyPosition-=4;
          }
          else
          {
            window.alert('???');
          }
        }
      }
    }

    for(var c1=1;c1<path.length;c1++)
    {
      document.getElementById("block_"+data[path[c1]-1].toString()).className = "position"+ path[c1-1].toString();
      document.getElementById("block_16").className = "position"+path[c1].toString();
      data[path[c1-1]-1] = path[c1];
      data[path[c1]-1] = 16;
    }
  }

  function move_empty(t_position)
  {
    while((emptyPosition-1)%4!=(t_position-1)%4)
    {
      if((emptyPosition-1)%4>(t_position-1)%4)
      {
        document.getElementById("block_"+data[emptyPosition-2].toString()).className = "position"+ emptyPosition.toString();
        document.getElementById("block_16").className = "position"+data[emptyPosition-2].toString();
        data[emptyPosition-1] = data[emptyPosition-2];
        data[emptyPosition-2] = 16;
        emptyPosition = emptyPosition-1;
      }
      else {
        document.getElementById("block_"+data[emptyPosition].toString()).className = "position"+ emptyPosition.toString();
        document.getElementById("block_16").className = "position"+data[emptyPosition].toString();
        data[emptyPosition-1] = data[emptyPosition];
        data[emptyPosition] = 16;
        emptyPosition = emptyPosition;
      }
    }

    while(parseInt((emptyPosition-1)/4)!=parseInt((t_position-1)/4))
    {
      if(parseInt((emptyPosition-1)/4)>parseInt((t_position-1)/4))
      {
        document.getElementById("block_"+data[emptyPosition-5].toString()).className = "position"+ emptyPosition.toString();
        document.getElementById("block_16").className = "position"+data[emptyPosition-5].toString();
        data[emptyPosition-1] = data[emptyPosition-5];
        data[emptyPosition-5] = 16;
        emptyPosition = emptyPosition-4;
      }
      else {
        document.getElementById("block_"+data[emptyPosition+3].toString()).className = "position"+ emptyPosition.toString();
        document.getElementById("block_16").className = "position"+data[emptyPosition+3].toString();
        data[emptyPosition-1] = data[emptyPosition+3];
        data[emptyPosition+3] = 16;
        emptyPosition = emptyPosition+3;
      }
    }
  }

  function move(id,position)
  {
    //move id 11 to position 11
    var s_position=0;
    for(var c1=0;c1<16;c1++)
    {
      if(data[c1]==id)
        s_position = c1+1;
    }

    while(parseInt((s_position-1)/4)!=parseInt((position-1)/4))
    {
      if(parseInt((s_position-1)/4)>parseInt((position-1)/4))
      {
        move_empty_but(s_position-4,s_position);
        move_empty(s_position);
        s_position -=4;
      }
      else
      {
        move_empty_but(s_position+4,s_position);
        move_empty(s_position);
        s_position +=4;
      }
    }

    while((s_position-1)%4!=(position-1)%4)
    {
      if((s_position-1)%4>(position-1)%4)
      {
        move_empty_but(s_position-1,s_position);
        move_empty(s_position);
        s_position -=1;
      }
      else
      {
        move_empty_but(s_position+1,s_position);
        move_empty(s_position);
        s_position +=1;
      }
    }
  }

  function move_d(s_head,s_tail,t_head,t_tail)
  {
    //move q(12,16) ---q(head,tail)(position,position) to  q(q7,8) q(head,tail)(position,position)

    if(t_head%4 < 3)
    {
      //go left at first
      while(t_head%4 != s_head%4)
      {
        move_empty_but2(s_head-1,s_head,s_tail);
        move_empty(s_head);
        move_empty(s_tail);

        s_tail=s_head;
        s_head-=1;
      }
      move_empty_but2(s_head-4,s_head,s_tail);
      move_empty(s_head);
      move_empty(s_tail);

      s_tail=s_head;
      s_head-=4;
    }
    else {
      while(parseInt((t_head-1)/4) != parseInt((s_head-1)/4))
      {
        move_empty_but2(s_head-4,s_head,s_tail);
        move_empty(s_head);
        move_empty(s_tail);

        s_tail=s_head;
        s_head-=4;
      }
      move_empty_but2(s_head-1,s_head,s_tail);
      move_empty(s_head);
      move_empty(s_tail);

      s_tail=s_head;
      s_head-=1;
    }
  }



  function getRound()
  {
    //which round we are processing
    var r_round = 1;
    for(var c1=0;c1<4;c1++)
    {
      if(data[c1]!=c1+1||data[c1*4]!=c1*4+1)
        return r_round;
    }

    r_round++;
    for(var c1=1;c1<4;c1++)
    {
      if(data[c1+4]!=c1+5||data[c1*4+1]!=c1*4+2)
      return r_round;
    }

    r_round++;
    return r_round;
  }

  var step = setInterval(function(){//move a step
  var round =getRound();//how many round we are processing

    //move_left_top();
    if(round == 3)
    {
    //  move(11,11);//move id 11 to position 11
      clearInterval(step);
    }
    else if (round == 2) {
      move(6,6);
      wall_a[6]=1;

      move(8,16);
      move(7,12);
      move_d(12,16,7,8);//move q(12,16) ---q(head,tail)(position,position) to  q(q7,8) q(head,tail)(position,position)

  /*    move(10,16);
      move(14,12);
      move_d(16,12,10,14);*/
    }
    else if (round == 1) {
      move(1,1);
      wall_a[1]=1;
      move(2,2);
      wall_a[2]=1;
      move(5,5);
      wall_a[5]=1;

      move(4,16);
      move(3,12);
      move_d(12,16,3,4);

      move(9,16);
      move(13,12);
      move_d(16,12,9,13);
    }
    },1000);
}
