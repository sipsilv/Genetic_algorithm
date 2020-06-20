class Rocket{
    constructor(dna){
        if(dna){
            this.dna = dna;
        } else{
            this.dna = new DNA();
        }
        this.pos = createVector(width/2, 390);
        this.vel = createVector();
        this.acc = createVector();
        this.counter = 0;
        this.fitness = 0;
        this.completed = false;
        this.crashed = false;
        //this.history = [];

    }
    applyForce(force){
        this.acc.add(force);
    }
    update(){
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        
        if(d<10){
            this.completed = true;
            this.pos = target.copy()
        }
        if (this.pos.x > rx && this.pos.x < rx+rw && this.pos.y > ry && this.pos.y < ry+rh){
            this.crashed = true;
        }
        if(this.pos.x > width || this.pos.x < 0){
            this.crashed = true;
        }
        if(this.pos.y > height || this.pos.y < 0){
            this.crashed = true;
        }
        this.applyForce(this.dna.genes[this.counter])
        this.counter++;
        
        if(!this.completed && !this.crashed){
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            
        } 
        
    }
    show(){
        push()
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading()+ 3.14/2);
        image(img,0 ,0, img.width/50, img.height/50)
        pop();
        
    }
    calcFitness(){
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = map(d, 0, width, width, 0);
        if(this.completed){
            this.fitness *= 10;
        }
        if(this.crashed){
            this.fitness /= 10;
        }
    }

}