class NoteManager{
    constructor(game, poolSize){
        this.poolSize = poolSize;
        this.game = game;
        this.pool = []
        this.createPool();
        this.timer = 0;
        this.startTime = 0;
        this.startedPlaying = false;
        this.currentNoteIndex = 0;
        this.song;
        this.nextHitNoteIndex = 0;
    }

    createPool(){
        for(let i = 0; i < this.poolSize; i++){
            this.pool.push(this.game.physics.add.image(0, -1000, 'note'));
        }
        
    }

    update(){
        if(this.startedPlaying == true && this.song.finished == false){
            this.timer = this.game.time.now - this.startTime;

            let nextNote = this.song.nextNote;
            //console.log(this.timer, nextNote.spawnTime)
            if(this.timer >= nextNote.spawnTime){
                //console.log(this.pool[0].y)
                if(this.poolSize-1 == this.currentNoteIndex){
                    this.currentNoteIndex = 0;
                }
                this.pool[this.currentNoteIndex].x = nextNote.side;
                this.pool[this.currentNoteIndex].y = 0;
                this.pool[this.currentNoteIndex].setVelocity(0, this.song.speed);
                this.currentNoteIndex += 1;
                this.song.next();
            }
            if(this.poolSize-1 == this.nextHitNoteIndex){
                this.nextHitNoteIndex = 0;
            }
            if(this.pool[this.nextHitNoteIndex].y >= height-75){
                
                //console.log("HIT", this.nextHitNoteIndex)
                //this.pool[this.nextHitNoteIndex].x = 0;
                let hit = checkOverlap(this.pool[this.nextHitNoteIndex], player);
                if(hit == true){
                    this.pool[this.nextHitNoteIndex].x = 0;
                }
                this.nextHitNoteIndex += 1;
            }

        }
    }

    playSong(song){
        console.log("Playing", song.name)
        this.startTime = this.game.time.now
        this.startedPlaying = true;
        this.song = song;
        song.play();
    }

}