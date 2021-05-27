//一个对象一个对象的写
//定义类 食物
class Food {
  //定义一个属性表示食物对应的元素
  element: HTMLElement;
  constructor(){
    // !表示不可能为空  获取页面中的元素并讲其赋值给element
    this.element = document.getElementById('food')!;
  }
  //获取食物坐标x
  get X(){
    return this.element.offsetLeft;
  }
  //获取食物Y坐标
  get Y(){
    return this.element.offsetTop;
  }
  //修改食物位置的方法 随机
  //食物最小位置为0 最大位置为290 🐍一次移动一个10px
  change(){
   let top = Math.round(Math.random()*29)*10;
   let left = Math.round(Math.random()*29)*10;
    this.element.style.left = top + 'px';
    this.element.style.top = left + 'px';
  }
}

export default Food;
