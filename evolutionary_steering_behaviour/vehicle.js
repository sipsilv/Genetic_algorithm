let mr = 0.01;
class Vehicle{
    constructor(x,y, dna){
        this.pos = createVector(x,y);
        this.vel = createVector();
        this.acc = createVector();
        this.maxspeed = 5;
        this.r = 4;
        this.maxforce = 0.2;
        this.dna = [];
        this.health = 1;
        if(dna == undefined){
            //food weight
            this.dna[0] = random(-2, 2);
            //poison weight
            this.dna[1] = random(-2, 2);
            //food perception
            this.dna[2] = random(10, 100);
            //poison perception
            this.dna[3] = random(10, 100);
           
        } else{
            //Mutations
            this.dna[0] = dna[0];
            if(random(1)< mr){
                this.dna[0] += random(-0.1, 0.1);
            }
            this.dna[1] = dna[1];
            if(random(1)< mr){
                this.dna[1] += random(-0.1, 0.1);
            }
            this.dna[2] = dna[2];
            if(random(1)< mr){
                this.dna[2] += random(-0.1, 0.1);
            }
            this.dna[3] = dna[3];
            if(random(1)< mr){
                this.dna[3] += random(-0.1, 0.1);
            }   
        }  
    }
    is_dead(){
        return (this.health < 0)
    }
    boundaries(){
        let desired = null;
        let d = 25;
        
        if(this.pos.x < d){
            desired = createVector(this.maxspeed, this.vel.y);
        } else if(this.pos.x > width - d){
            desired = createVector(-this.maxspeed, this.vel.y);
        }
        if(this.pos.y < d){
            desired = createVector(this.vel.x, this.maxspeed);
        } else if(this.pos.y > height - d){
            desired = createVector(this.vel.x,-this.maxspeed);
        }
        if (desired != null){
            desired.normalize();
            desired.mult(this.maxspeed);
            let steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxforce);
            this.apply_force(steer);
        }
    }
    //physX engine
    update(){
        this.health -= 0.005;
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    apply_force(force){
        this.acc.add(force)
    }

    //key algorithm craig-reynolds genetic algorithm
    seek(target){
        // desired = error
        let desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxspeed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;
    }

    eat(list, vitamins, perception){
        let record = Infinity;
        let closest = null;
        for(let i = list.length-1; i >= 0 ; i--){
            let d = dist(this.pos.x, this.pos.y, list[i].x, list[i].y );
            if (d < this.maxspeed){
                list.splice(i,1);
                this.health += vitamins;
            } else{
                if(d< record && d <= perception){
                    record = d;
                    closest = list[i];
                }
            }
            
        }    
        if (closest != null) {
            return this.seek(closest);
        }

        return createVector(0,0);
        
        
    }
    display(){
        
        push();
        translate(this.pos.x, this.pos.y);
        let angle = this.vel.heading() + 3.14/2;
        rotate(angle);

        if(debug.checked()== true){
            stroke(0,255,0);
            strokeWeight(3);
            noFill();
            line(0,0,0, -this.dna[0]*20);
            ellipse(0,0, this.dna[2]*2);
            

            //visualizations of weights
            stroke(255,0,0);
            strokeWeight(2);
            noFill();
            line(0,0,0, -this.dna[1]*20);
            ellipse(0,0, this.dna[3]*2);

        }
        

        let gr = color(0,255,0);
        let rd = color(255, 0, 0);
        let col = lerpColor(rd, gr, this.health)
        fill(col);
        stroke(col);
        strokeWeight(1);

        //triangle shape
        beginShape();
        vertex(0, -this.r *2);
        vertex(-this.r, this.r *2);
        vertex(this.r, this.r *2);
        endShape(CLOSE);
        
        pop();
    }

    behaviours(good, bad){
        let foodSteer = this.eat(good, 0.2, this.dna[2]);
        let poisonSteer = this.eat(bad, -0.2, this.dna[3]);
        foodSteer.mult(this.dna[0]);
        foodSteer.mult(this.dna[1]);
        this.apply_force(foodSteer);
        this.apply_force(poisonSteer);

    }

    clone(){
        if(random(1)< 0.001){
            return new Vehicle(this.pos.x, this.pos.y, this.dna)
        } else{
            return null;
        }
    }

}