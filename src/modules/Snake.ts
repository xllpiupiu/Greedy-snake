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
    this.head.style.left = value + 'px';
  }
  set Y(value: number){
    if(this.Y===value){
      return ;
    }
    if(value<0||value>280){
      throw new Error('蛇撞墙了！！！')
    }
    this.head.style.top = value + 'px';
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
}

export default Snake;
