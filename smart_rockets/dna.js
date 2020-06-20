class DNA{
    constructor(genes){
        if(genes){
            this.genes = genes;
        } else{
            this.genes = [];
            for(let i=0; i<lifespan; i++){
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(maxf)
        }

        }
        
    }
    crossover(partner){
        let newgenes = [];
        let mid = floor(random(this.genes.length));
        for(let i=0; i< this.genes.length; i++){
            if(i>mid){
                newgenes[i] = this.genes[i];
            } else{
                newgenes[i] = partner.genes[i];
            }
            
        }
        return new DNA(newgenes);
    }
    mutation(){
        for(let i =0; i<this.genes.length; i++){
            if(random(1)< 0.01){
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(maxf);
            }
        }
    }
}