
var CANVSA_WIDTH = document.documentElement.clientWidth || 1024;
var CANVAS_HEIGHT = document.documentElement.clientHeight || 768;

var MARGIN_LEFT = Math.round(CANVSA_WIDTH/10) || 30; //第一个左边距的距离
var MARGIN_TOP = Math.round(CANVAS_HEIGHT / 5 ) || 60; //上边距的距离
var RADIUS = (CANVSA_WIDTH *4 /5 /108) -1 ||8;

var num = 2.5;//小时数
var endTime = new Date();

endTime.setTime(endTime.getTime() + 60 * 60 * 1000 * num)

var balls = [];

const colors = ['#FFF68F','#FF7F50','#FF69B4','#DB7093','#D15FEE','#CD6090','#ADFF2F','#8FBC8F','#0000EE','#00FF00','#228B22'];//小球的颜色

var curShowTimeSeconds = 0; //当前时间距倒计时结束的秒数

window.onload = function () {

	console.log(document.body.clientHeight);
	console.log(document.documentElement.clientHeight);
	console.log(window.screen.availHeight);


	var canvas = document.getElementById('canvas');
	var context =  canvas.getContext('2d');

	canvas.width =  CANVSA_WIDTH;
	canvas.height = CANVAS_HEIGHT;

	curShowTimeSeconds = getCurrentShowTimeSeconds();

	setInterval(function () {
		render(context);
		update(); //更新下一个状态
	}, 100);

}

/**
 * 绘制倒计时显示
 * @param  {[type]} ctx 绘制上下文
 * @return {[type]}  
 */
function render(ctx) {

	//把之前的canvas 图像清除
	ctx.clearRect(0,0,CANVSA_WIDTH,CANVAS_HEIGHT);


	var hours =parseInt(curShowTimeSeconds / 3600);
	var minutes = parseInt(curShowTimeSeconds %3600 / 60);
	var seconds = parseInt(curShowTimeSeconds % 60);

	// console.log('curShowTimeSeconds:',curShowTimeSeconds);
	// console.log('hours:',hours);
	// console.log('minutes:',minutes);
	// console.log('seconds:',seconds);

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
	renderDigit(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx);

	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,ctx); // :

	renderDigit(MARGIN_LEFT +39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx);
	renderDigit(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx);

	renderDigit(MARGIN_LEFT +69*(RADIUS+1),MARGIN_TOP,10,ctx); //:

	renderDigit(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx);
	renderDigit(MARGIN_LEFT +93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx);


	//绘制小球
	for (var i = 0; i < balls.length; i++) {

		var ball = balls[i];
		ctx.fillStyle = ball.color;

		ctx.beginPath();
		ctx.arc(ball.x,ball.y,RADIUS,0,2*Math.PI);
		ctx.closePath();

		ctx.fill();
	}
	
}

/**
 * 更新下一个状态
 * 
 * @return {[type]} [description]
 */
function update() {
	//下一时刻的时间
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	var nextHours =parseInt(nextShowTimeSeconds / 3600) ;
	var nextMinutes = parseInt(nextShowTimeSeconds %3600 / 60);
	var nextSeconds = parseInt(nextShowTimeSeconds % 60);


	//当前的时间
	var curHours =parseInt(curShowTimeSeconds / 3600) ;
	var curMinutes = parseInt(curShowTimeSeconds %3600 / 60);
	var curSeconds = parseInt(curShowTimeSeconds % 60);

	if(nextSeconds != curSeconds){

		//添加小球---小时改变
		if(parseInt(nextHours/10) != parseInt(curHours/10)){
			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10))
		}

		if(parseInt(nextHours%10) != parseInt(curHours%10)){
			addBalls(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10))
		}

		//分钟
		if(parseInt(nextMinutes/10) != parseInt(curMinutes/10)){
			addBalls(MARGIN_LEFT +39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10))
		}

		if(parseInt(nextMinutes%10) != parseInt(curMinutes%10)){
			addBalls(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10))
		}

		//秒
		if(parseInt(nextSeconds/10) != parseInt(curSeconds/10)){
			addBalls(MARGIN_LEFT +78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10))
		}

		if(parseInt(nextSeconds%10) != parseInt(curMinutes%10)){
			addBalls(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10))
		}


		curShowTimeSeconds  = nextShowTimeSeconds;

	}

	//更新小球
	updateBall();

	// console.log(balls.length);

}

/**
 * 得到当前时间距倒计时结束的秒数
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
function getCurrentShowTimeSeconds() {
	var currentDate = new Date();

	//var currentTime = Date.now();

	/**
	var ret =  endTime.getTime() - currentDate.getTime(); //倒计时

	return ret > 0 ? ret/1000 : 0; //返回的是倒计时的秒
	*/

	var retTemp = currentDate.getHours() * 3600 + currentDate.getMinutes() * 60 + currentDate.getSeconds();

	return retTemp
}

/**
 * 绘制倒计时的数字
 * @param  {[type]} x   开始绘制x轴开始位置
 * @param  {[type]} y   开始绘制y轴开始位置
 * @param  {[type]} num 要绘制的数字
 * @param  {[type]} ctx ctx 绘制上下文
 * @return {[type]}     [description]
 */
function renderDigit(x,y,num,ctx) {

	ctx.fillStyle = 'rgb(0,102,153)';

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] == 1){
				ctx.beginPath();
				ctx.arc(x+(RADIUS+1)*(2*j + 1),y+(RADIUS+1)*(2*i + 1),RADIUS,0, 2*Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}

/**
 * 在指定位置的数字加上数字化的小球
 * @param {[string]} x 数字距左边的距离
 * @param {[string]} y 数字距上边的距离
 * @param {[number]} num  小球画的数字
 */
function addBalls(x,y,num) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] == 1){
				var aball = {
					x:x+(RADIUS+1)*(2*j + 1),//圆心x
					y:y+(RADIUS+1)*(2*i + 1),//圆心y
					g:1.5 + Math.random(),
					vx: Math.pow(-1,Math.ceil(Math.random() * 1000)) * 4,
					vy:-5,
					color:colors[Math.floor(Math.random() *colors.length)]
				}

				balls.push(aball)
			}
		}
	}
}

//更新运动的小球
function updateBall() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y >= (CANVAS_HEIGHT -RADIUS) ){
			balls[i].y = (CANVAS_HEIGHT -RADIUS);

			balls[i].vy = - balls[i].vy * 0.75;

		}
	}

	//维护小球的数组
	var cnt = 0;
	for (var i = 0; i < balls.length; i++) {
		if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS  < CANVSA_WIDTH){ //小球没有出左右边缘
			balls[cnt++] = balls[i];//符合条件的小球
		}
	}

	while(balls.length > Math.min(cnt,300)){
		balls.pop();
	}
}