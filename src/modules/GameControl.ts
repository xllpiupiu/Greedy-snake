//游戏控制器 控制其他的所有类
import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

//游戏控制器，控制其他的所有类
class GameControl{
  //定义三个属性
  snake:Snake;
  food: Food;
  scorePanel: ScorePanel;
  //创建一个属性存储蛇的移动方向
  direction: string;
  //isLive记录游戏是否结束
  isLive = true;
  constructor(){
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.direction = '';
    this.init();
  }
  //游戏初始化
  init(){
    //需要蛇动 跟随鼠标动  绑定键盘按下事件
    document.addEventListener('keydown',this.keydownHandler.bind(this));
    //调用蛇的方法
    this.snakeRun();
  }
  //创建一个键盘按下的相应函数 KeyboardEvent是类型
  keydownHandler(event:KeyboardEvent){
    //修改direction属性
    // 赋值之前需要检查event.key是否为上下左右按键
    this.direction = event.key;
  }
  //控制蛇移动
  snakeRun(){
    /* 
    * 使用this.direction改变蛇位置 
    * 向上 top 减少
    * 向下 top 增加
    * 向左 left 减少
    * 向右 left 增加
    */
  //  获取蛇原来的坐标
  let X = this.snake.X;
  let Y = this.snake.Y;
  // console.log(this.direction);
  //这里考虑兼容ie 所以有8种情况
    switch(this.direction){
      case "ArrowUp":
      case "Up":Y-=10;
        break;
      case "ArrowDown":
      case "Down":Y+=10;
        break;
      case "ArrowLeft":X-=10;
      case "Left":
        break;
      case "ArrowRight":X+=10;
      case "Right":
        break;
      default:break;
    }
    //修改蛇位置X  Y
    this.snake.X = X;
    this.snake.Y = Y;
    this.isLive&&setTimeout(this.snakeRun.bind(this),300-(this.scorePanel.level-1)*30);
  }
}

export default GameControl;
