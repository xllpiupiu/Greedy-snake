class Snake {
  //表示蛇头的元素
  head: HTMLElement;
  //蛇的身体
  bodies: HTMLCollection;
  // 获取蛇的容器 因为后序需要增加蛇的身体
  element: HTMLElement;
  constructor(){
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake>.snake-body') as HTMLElement;
    this.bodies = document.getElementById('snake')!.getElementsByClassName('snake-body');
  }
  //获取蛇头坐标
  get X(){
    return this.head.offsetLeft;
  }
  get Y(){
    return this.head.offsetTop;
  }
  //设置蛇头坐标
  set X(value: number){
    //新值和旧值相同不做修改
    if(this.X===value){
      return ;
    }
    // X的范围 0-290
    if(value<0||value>280){
      //蛇撞墙了
      throw new Error('蛇撞墙了！！！')
    }
    //修改X 的时候是修改水平坐标 向左移动就不能向右掉头
    if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetLeft === value){
      // console.log('水平方向掉头了');
      // 如果发生掉头 让蛇向反方向继续移动 
      if(value>this.X){
        //新的值大于value 证明蛇想向右走 所以我们不让她掉头继续想左
        value = this.X -10;
      }else {
        value = this.X + 10;
      }
    }
    this.moveBody();
    this.head.style.left = value + 'px';
    this.checkHeadBody();
  }
  set Y(value: number){
    if(this.Y===value){
      return ;
    }
    if(value<0||value>280){
      throw new Error('蛇撞墙了！！！')
    }
    //修改Y 的时候是修改垂直坐标 向下移动就不能上右掉头
    if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetTop === value){
      // console.log('水平方向掉头了');
      // 如果发生掉头 让蛇向反方向继续移动 
      if(value>this.Y){
        //新的值大于value 证明蛇想向下走 所以我们不让她掉头继续向上
        value = this.Y -10;
      }else {
        value = this.Y + 10;
      }
    }
    this.moveBody();
    this.head.style.top = value + 'px';
    this.checkHeadBody();
  }
  //蛇吃到食物变长
  addBody(){
    //向element中添加一个div
    const snakeHTML = `
    <div class="snake-body">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    </div>
    `
    this.element.insertAdjacentHTML("beforeend",snakeHTML);
  }
  // 添加蛇身体移动方法
  moveBody(){
    //遍历所有身体
    // console.log(this.bodies.length);
    for(let i=this.bodies.length-1;i>0;i--){
      // 获取前一位身体的位置
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
      //将值设置到当前的节点身上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }
  //检查头是否撞上身体
  checkHeadBody(){
    // 获取所有身体
    for(let i=1;i<this.bodies.length;i++){
      let bd = (this.bodies[i] as HTMLElement);
      if(this.X === bd.offsetLeft&&this.Y === bd.offsetTop){
        //进入判断 说明蛇头撞到了身体
        throw new Error('蛇自杀了！！！救命啊')
      }
    }
  }
}

export default Snake;
