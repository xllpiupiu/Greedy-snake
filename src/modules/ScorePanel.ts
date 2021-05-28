//积分牌类
class ScorePanel {
  score = 0;
  level = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  //设置变量限制等级
  maxLevel: number;
  //设置达到分数升级
  upScore: number;
  constructor(maxLevel: number=10,upScore: number = 10){
    this.maxLevel = maxLevel;
    this.upScore = upScore;
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.score = 0;
  }
  //方法  加分方法
  addScore(){
    // console.log(this.score);
    
   this.scoreEle.innerHTML =++this.score+'';
   //表示每20分升级
   if(this.score % this.upScore === 0){
     this.levelUp();
   }
  }
  //提升等级 升级应该由分数达到多少控制
  levelUp(){
    if(this.level<this.maxLevel){
    this.levelEle.innerHTML = ++this.level + '';
    }
  }
}

export default ScorePanel;
