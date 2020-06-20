class Population{
    constructor(){
        this.rockets = [];
        this.popsize = 25;
        this.matingpool = [];
        for (let i = 0; i< this.popsize; i++){
            this.rockets[i] = new Rocket();
        }
    }
    run(){
        for (let i = 0; i< this.popsize; i++){
            this.rockets[i].update();
            //this.rockets[i].history.push(this.rockets[i].pos)
            this.rockets[i].show();
            
        }
    }
    evaluate(){
        let maxfit = 0;
        for(let i =0; i<this.popsize; i++){
            this.rockets[i].calcFitness();
            if(this.rockets[i].fitness > maxfit){
                maxfit = this.rockets[i].fitness;
            }
        }
        createP(maxfit)
        for(let i =0; i<this.popsize; i++){
            this.rockets[i].fitness /= maxfit;
        }

        this.matingpool = [];
        for(let i =0; i<this.popsize; i++){
            let n =this.rockets[i].fitness*100;
            for (let j = 0; j < n; j++){
                this.matingpool.push(this.rockets[i]);
            }
        }    
    }
    selection(){
        let newRockets =[];
        for(let i=0; i< this.rockets.length; i++){
            let parentA = random(this.matingpool).dna;
            let parentB = random(this.matingpool).dna;
            let child = parentA.crossover(parentB);
            child.mutation();
            newRockets[i] = new Rocket(child);
        }
        this.rockets = newRockets
    }
    }
