var block={
	"s1":{
		"pos":[1,2,2,2,2,3,3,3],
		"color":"#FB4E4E"
	},
	"s2":{
		"pos":[1,2,2,2,2,1,3,1],
		"color":"#FB6BE2"
	},
	"q1":{
		"pos":[1,2,1,3,2,3,3,3],
		"color":"#AF6DFC"
	},
	"q2":{
		"pos":[1,1,1,2,2,1,3,1],
		"color":"#5CCEF9"
	},
	"fan":{
		"pos":[1,1,1,2,2,1,2,2],
		"color":"#5DF770"
	},
	"ll":{
		"pos":[1,2,2,2,3,2,4,2],
		"color":"#CCD833"
	},
	"T":{
		"pos":[2,1,2,2,1,2,2,3],
		"color":"#F97F1E"
	}
};
var save=[],can;
var sX=3,sY=-1,ge=20,Time=2000,tim,po,po1,dom,t,count=0;

$(window).keydown(function(e){
	let key=Number(e.originalEvent.keyCode);
	switch (key) {
		case 38:
			if(t!=0)
			change(dom);
			break;
		case 39:
			if(t!=0)
			right(dom);
			break;
		case 40:
			if(Time!=70){
				tim=Time;
				clearTimeout(t);
				Time=70;
				down(dom);
			}						
			break;
		case 37:
			if(t!=0)
			left(dom);
			break;
		default:
			console.log('check your input');
			break;
	}
})

$(window).keyup(function(e){
	let key=Number(e.originalEvent.keyCode);
	switch (key) {
		case 40:
			Time=tim;
			break;
	}
})


window.onload=function(){
	can1=document.getElementById('tip');
	can=document.getElementById('is');
	tip=can1.getContext('2d');
	ctx=can.getContext('2d');
	can.width=240;
	can.height=400;
	
	ctx.strokeStyle='#B1B1B1';
	ctx.lineWidth=1;

	for(let i=0;i<can.width/ge;i++){
		ctx.moveTo(ge*i,0);
		ctx.lineTo(ge*i,can.height);
	}
	for(let i=0;i<can.height/ge;i++){
		ctx.moveTo(0,ge*i);
		ctx.lineTo(can.width,ge*i);
	}
	ctx.stroke();
	for(let i=0;i<can.height/ge;i++){
		save[i]=[];
		for(let j=0;j<can.width/ge;j++){
			save[i][j]=0;
		}
	}
	po=random();
	po1=random();
	po=eval('block.'+po);
	po1=eval('block.'+po1);
	draw(po1)
	select(po);
	

	$('#ui').click(function(){
		$('#set').toggleClass('en');
	})
	$('.o').mousedown(function(e){
		$(this).mousemove(function(e){
			if(e.clientX>38&&e.clientX<223){
				$(this).css({
					'left':e.clientX-38+'px'
				})
				$('#set1').text(((e.clientX-38)/185)*100+'%');
			}
			

		})
	});
	$('.o').mouseup(function(e){
		$(this).unbind('mousemove');
		Time=(1-(e.clientX-38)/92)*Time;
	});

	$('.btn').click(function(){
		if($(this).text()=='暂停'){
			$(this).text('开始').removeClass('red').addClass('green');
			clearTimeout(t);
		}
		else if($(this).text()=='重新开始'){
			window.location.reload();
		}
		else{
			$(this).text('暂停').removeClass('green').addClass('red');
			t=setTimeout(down,Time,dom)
		}
	})

	$('.btn').mousedown(function(){
		if($(this).text()=='暂停'){
			$(this).addClass('blackred');
		}
		else{
			$(this).addClass('blackgreen');
		}
	})

	$('.btn').mouseup(function(){

			$(this).removeClass('blackred blackgreen');
	})
}

function draw(x){
	tip.clearRect(0,0,can1.width,can1.height);
	tip.strokeStyle='#B1B1B1';
	tip.lineWidth=1;

	for(let i=0;i<can1.width/ge;i++){
		tip.moveTo(ge*i,0);
		tip.lineTo(ge*i,can1.height);
	}

	for(let i=0;i<can1.height/ge;i++){
		tip.moveTo(0,ge*i);
		tip.lineTo(can1.height,ge*i);
	}
	tip.stroke();
	tip.fillStyle=x.color;
	for(let i=0;i<4;i++){
		tip.fillRect(x.pos[i*2+1]*ge+1,x.pos[i*2]*ge+1,ge-2,ge-2);
	}
}

function random(){
	let a=Math.floor(Math.random()*7);
	switch(a){
		case 0:return 's1';break;
		case 1:return 's2';break;
		case 2:return 'q1';break;
		case 3:return 'q2';break;
		case 4:return 'fan';break;
		case 5:return 'll';break;
		case 6:return 'T';break;
	}
}

function select(b){
	dom=b.pos.concat(),a=0;
	for(let i=0;i<4;i++){
		ctx.fillStyle=b.color;
		if((sY+dom[i*2+1])>=0)
		{
			if(save[sY+dom[i*2]][sX+dom[i*2+1]]==1){
				a=1;break;
			}
			save[sY+dom[i*2]][sX+dom[i*2+1]]=1;
			ctx.fillRect((sX+dom[i*2+1])*ge+1,(sY+dom[i*2])*ge+1,ge-2,ge-2);
		}
	}
	if(a==0)
		t=setTimeout(down,Time,dom);
	else{
		console.log('over');
		$('.btn').text('重新开始').css({'width':80}).removeClass('red').addClass('green');
	}
}

function left(x){
	let check=0,empty=x.concat();
	for(let i=0;i<4;i++){
		if(sX+x[i*2+1]-1<0){
			check=1;break;
		}
		for(let j=1;j<empty.length/2-i;j++){
			if(empty[i*2]==empty[(i+j)*2]){
				if(empty[i*2+1]<empty[(i+j)*2+1]){
					empty.splice((i+j)*2,2);
				}
				else{
					empty.splice(i*2,2);
				}
				j-=1;
			}
		}
	}
	for(let i=0;i<empty.length/2;i++){
		if(save[sY+empty[i*2]][sX+empty[i*2+1]-1]==1){
			check=1;break;
		}
	}
	if(check==0){
		for(let i=0;i<4;i++){
			ctx.clearRect((sX+x[i*2+1])*ge+1,(sY+x[i*2])*ge+1,ge-2,ge-2);
			save[sY+x[i*2]][sX+x[i*2+1]]=0;
		}
		ctx.fillStyle=po.color;
		sX-=1;
		for(let i=0;i<4;i++){
			save[sY+x[i*2]][sX+x[i*2+1]]=1;
			ctx.fillRect((sX+x[i*2+1])*ge+1,(sY+x[i*2])*ge+1,ge-2,ge-2);
		}
	}	
}

function right(x){
	let check=0,empty=x.concat();
	for(let i=0;i<4;i++){
		if(sX+x[i*2+1]+1>11){
			check=1;break;
		}
		for(let j=1;j<empty.length/2-i;j++){
			if(empty[i*2]==empty[(i+j)*2]){
				if(empty[i*2+1]>empty[(i+j)*2+1]){
					empty.splice((i+j)*2,2);
				}
				else{
					empty.splice(i*2,2);
				}
				j-=1;
			}
		}
	}
	for(let i=0;i<empty.length/2;i++){
		if(save[sY+empty[i*2]][sX+empty[i*2+1]+1]==1){
			check=1;break;
		}
	}
	if(check==0){
		for(let i=0;i<4;i++){
			ctx.clearRect((sX+x[i*2+1])*ge+1,(sY+x[i*2])*ge+1,ge-2,ge-2);
			save[sY+x[i*2]][sX+x[i*2+1]]=0;
		}
		ctx.fillStyle=x.color;
		sX+=1;
		for(let i=0;i<4;i++){
			save[sY+x[i*2]][sX+x[i*2+1]]=1;
			ctx.fillRect((sX+x[i*2+1])*ge+1,(sY+x[i*2])*ge+1,ge-2,ge-2);
		}
	}	
}

function change(x){
	let check=0,empty=x.concat(),empty1;
	if(po.color!='#5DF770'){
		for(let i=0;i<4;i++){
			let a=empty[i*2];
				empty[i*2]=empty[i*2+1];
				empty[i*2+1]=4-a;
		}
		empty1=empty.concat();
		for(let i=0;i<empty.length;i++){
			for(let j=0;j<4;j++){
				if(x[j*2]==empty[i*2]&&x[j*2+1]==empty[i*2+1])
				{	
					empty.splice(i*2,2);
					i-=1;
				}
			}
		}
		for(let i=0;i<empty1.length/2;i++){
			if(sX+empty1[i*2+1]>11||sX+empty1[i*2+1]<0){
				check=1;break;
			}
			if(i<empty.length/2)
			if(save[sY+empty[i*2]][sX+empty[i*2+1]]==1){
				check=1;break;
			}
		}
		if(check==0){
			for(let i=0;i<4;i++){
				ctx.clearRect((sX+x[i*2+1])*ge+1,(sY+x[i*2])*ge+1,ge-2,ge-2);
				save[sY+x[i*2]][sX+x[i*2+1]]=0;
			}
			ctx.fillStyle=po.color;
			for(let i=0;i<4;i++){
				let a=x[i*2];
				x[i*2]=x[i*2+1];
				x[i*2+1]=4-a;
				ctx.fillRect((sX+x[i*2+1])*ge+1,(sY+x[i*2])*ge+1,ge-2,ge-2);
				save[sY+x[i*2]][sX+x[i*2+1]]=1;
			}
		}
	}
}

function down(x){
	let check=0,empty=x.concat();
	for(let i=0;i<4;i++){
		ctx.clearRect((sX+x[i*2+1])*ge+1,(sY+x[i*2])*ge+1,ge-2,ge-2);
		for(let j=1;j<empty.length/2-i;j++){
			if(empty[i*2+1]==empty[(i+j)*2+1]){
				if(empty[i*2]>empty[(i+j)*2]){
					empty.splice((i+j)*2,2);
				}
				else{
					empty.splice(i*2,2);
				}
				j-=1;
			}
				
		}
	}
	for(let i=0;i<empty.length/2;i++){
		if(sY+empty[i*2]+1>19){
			check=1;break;
		}
		if(save[sY+empty[i*2]+1][sX+empty[i*2+1]]==1){
			check=1;
		}
	}
	for(let i=0;i<4;i++){
		save[sY+x[i*2]][sX+x[i*2+1]]=0;
	}
	if(check==0){
		sY+=1;
		ctx.fillStyle=po.color;
		for(let i = 0; i < 4; i ++){
		save[sY+x[i*2]][sX+x[i*2+1]]=1;
		ctx.fillRect((sX+x[i*2+1])*ge+1,(sY+x[i*2])*ge+1,ge-2,ge-2);
		}
		t=setTimeout(down,Time,x);
	}	
	else{
		ctx.fillStyle='#515151';
		let a=0
		for(let i = 0; i < 4; i ++){
			if(sY+x[i*2]<0) {console.log('heheh');a=1;}
			save[sY+x[i*2]][sX+x[i*2+1]]=1;
			ctx.fillRect((sX+x[i*2+1])*ge+1,(sY+x[i*2])*ge+1,ge-2,ge-2);
		}
			
		if(a==0){
			po=po1;
			//po=random();
			po1=eval('block.'+random());
			clear_block(x);
			sX=3;sY=-1;
			//po=eval('block.'+po);
			draw(po1);
			select(po);
		}
		else{
			console.log('over');
			$('.btn').text('重新开始').removeClass('red').addClass('green');
		} 
			
	}
}

function clear_block(x){
	let ui=[],check=1,max=-1;
	for(let i=0;i<4;i++){
		for(let j=0;j<can.width/ge;j++){	
			if(save[sY+x[i*2]][j]==0){
				check=0;break;
			}
		}
		if(check==1){

			if(ui.indexOf(sY+x[i*2])==-1){
				ui.push((sY+x[i*2]));
				if(max==-1) max=sY+x[i*2];
				else if(max<sY+x[i*2]) max=sY+x[i*2];
			}
			
		}
		check=1;
	}
	for(let i=0;i<ui.length;i++){
		for(let j=0;j<can.width/ge;j++){
			ctx.clearRect(j*ge+1,ui[i]*ge+1,ge-2,ge-2);
			save[ui[i]][j]=0;
		}
	}
	if(ui.length)
		move(ui,max)
}

function move(s,m){
	let x=sort(s);
	ctx.fillStyle='#515151';
	for(let i=1;;i++){
		if(x.indexOf(x[x.length-1]-i)==-1){
			for(let j=0;j<can.width/ge;j++){
				ctx.clearRect(j*ge+1,x[x.length-1]*ge+1,ge-2,ge-2);
				ctx.clearRect(j*ge+1,(x[x.length-1]-i)*ge+1,ge-2,ge-2);
				save[x[x.length-1]][j]=save[x[x.length-1]-i][j];
				save[x[x.length-1]-i][j]=0;
				if(save[x[x.length-1]][j]==1){
					ctx.fillRect(j*ge+1,(x[x.length-1])*ge+1,ge-2,ge-2);
				}
			}
			x.unshift(x[x.length-1]-i);x.pop();x=sort(x);
			i=0;
		}
		if(x[0]==0){
			break;
		}
	}
}

function sort(x){
	for(let i=0;i<x.length-1;i++)
	{
		for(let j=1;j<x.length-i;j++){
			if(x[i]>x[i+j]){
				let a=x[i];
				x[i]=x[i+j];
				x[i+j]=a;
			}
		}
	}
	return x;
}






