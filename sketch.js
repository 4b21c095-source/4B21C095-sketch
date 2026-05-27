let sound;
let circles = []; // 用來儲存多個圓圈特效的陣列

function preload() {
  // 預先載入音效檔 [cite: 22, 24, 39]
  sound = loadSound('effect.mp3'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(20); // 深色背景讓特效更明顯

  // 更新並繪製所有特效圓圈 
  for (let i = circles.length - 1; i >= 0; i--) {
    let c = circles[i];
    
    fill(c.color, c.opacity); // 設定隨機顏色與透明度 [cite: 282, 293]
    circle(c.x, c.y, c.size);
    
    // 特效動畫：圓圈變大、透明度降低
    c.size += 5;
    c.opacity -= 10;
    
    // 如果圓圈完全透明，就從陣列中刪除，節省效能
    if (c.opacity <= 0) {
      circles.splice(i, 1);
    }
  }
}

// 當滑鼠按下或手指觸碰時觸發 [cite: 32, 288]
function touchStarted() {
  // 1. 播放音效 [cite: 36, 42]
  // 檢查音檔是否載入，若正在播放則先停止再重新播放以產生清脆感
  userStartAudio();
  if (sound.isLoaded()) {
    sound.stop(); 
    sound.play();
  }

  // 2. 在點擊位置新增特效資訊 [cite: 266, 267]
  let newCircle = {
    x: mouseX,
    y: mouseY,
    size: 10,
    opacity: 255,
    color: color(random(100, 255), random(100, 255), random(255)) // 隨機亮色 
  };
  circles.push(newCircle);

  return false; // 防止行動裝置預設的縮放或捲動行為 [cite: 287, 291]
}