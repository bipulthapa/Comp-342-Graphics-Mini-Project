let r1 = 100;
let r2 = 100;
let m1 = 20;
let m2 = 20;
let a1 = Math.PI/2;
let a2 = Math.PI/2;
let a1_v = 0;
let a2_v = 0;
let g = 1;

let px2 = -1;
let py2 = -1;
let cx,cy;

let pg;

// let c=1;
// let d=1;

function setup() {
  createCanvas(600,600)
  cx = width/2;
  cy = 100;
  pg = createGraphics(600,600); 
  pg.background(255);
  pg.translate(cx,cy);
}

function draw() {
  // image(pg,0,0);
  background(255);
  image(pg,0,0);
  
  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = (a1_v * a1_v * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;

  translate(cx,cy);
  stroke(0);
  strokeWeight(2);

  let x1 = r1*Math.sin(a1);
  let y1 = r1*Math.cos(a1);
  
  let x2 = x1 + r2*Math.sin(a2);
  let y2 = y1 + r2*Math.cos(a2);

  dda_for_line(0,0,x1,y1);
  fill(202,204,209);
  ellipse_draw(x1,y1,m1,m1);
  ellipse(x1,y1,m1+20,m1+20);

  //for second line & ellipse


  dda_for_line(x1,y1,x2,y2);
  fill(202,204,209);
  ellipse_draw(x2,y2,m2,m2);
  ellipse(x2,y2,m2+20,m2+20);
  
  a1_v += a1_a;
  a2_v -= a2_a;
  a1 += a1_v ;
  a2 -= a2_v;

  
  pg.strokeWeight(4);
  pg.stroke(0);  
  if (frameCount > 1){
    pg.stroke(0)
    pg.strokeWeight(1);
    pg.line(px2,py2,x2,y2);
  }

  px2 = x2;
  py2 = y2;
  

  // pg.point(x1,y1);
  // console.log(x2 + " " + y2);
  //points are coming but it is not printing it well

  

}

function dda_for_line(x0,y0,x1,y1){
  // var vertices = [];
  dx = x1-x0;
  dy = y1-y0;
  if (Math.abs(dx)> Math.abs(dy)){
    step = Math.abs(dx);
  }else{
    step = Math.abs(dy);
  }
  xInc = dx/step;
  yInc = dy/step;

  x = x0;
  y = y0;
  // console.log(step)
  beginShape()
    for(i=0;i<step;++i){
        vertex(x,y);
        x += xInc;
        y += yInc;
    }
    stroke(color(0, 0, 255));
    strokeWeight(4);
  endShape();
}


function ellipse_draw(x,y,r_x,r_y){
  stroke('#C71717');
  strokeWeight(4);
  translate(x,y);
  x_coord = 0;
  y_coord = r_y;
  let p_R1,p_R2;
  p_R1 = r_y*r_y-r_x*r_x*r_y+0.25*r_x*r_x;

  // for region -1
  while(!(2*r_y*r_y*x_coord >= 2*r_x*r_x*y_coord)){
      if (p_R1<0){
          ellipse(x_coord,y_coord,1);
          x_coord++;
          p_R1 += 2*r_y*r_y*x_coord+r_y*r_y;
      }else{
          ellipse(x_coord,y_coord,1);
          x_coord++;
          y_coord--;
          p_R1 += 2*r_y*r_y*x_coord-2*r_x*r_x*y_coord+r_y*r_y;
      }
      console.log(x_coord+ " " +y_coord);
      console.log(p_R1);

      // console.log(x_coord+ " "+y_coord);
      corres_points(x_coord,y_coord);
  }

  // For region-2
  if ((2*r_y*r_y*x_coord >= 2*r_x*r_x*y_coord)){
  
      p_R2 = Math.pow(r_y,2)*Math.pow(x_coord+0.5,2)+Math.pow(r_x,2)*Math.pow(y_coord-1,2)-r_x*r_x*r_y*r_y;
      while((x_coord!=8 && y_coord!=0)){
          if(p_R2<0){
              ellipse(x_coord,y_coord,1);
              x_coord++;
              y_coord--;
              p_R2 += 2*r_y*r_y*x_coord-2*r_x*r_x*y_coord+r_x*r_x;
          }else{
              ellipse(x_coord,y_coord,1);
              y_coord--;
              p_R2 += r_x*r_x-2*r_x*r_x*y_coord;
          }
          corres_points(x_coord,y_coord);
      }
  }    
  translate(-x,-y);
}

function corres_points(x,y){
  ellipse(x,-y,1);
  ellipse(-x,y,1);
  ellipse(-x,-y,1);
}