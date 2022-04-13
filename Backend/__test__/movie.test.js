const Movie = require("../models/Movie");
const MovieDetails = require("../models/MovieDetails");


    describe('Testing Movie Collection', () => {
        it("Checking Database Connection",  async (done) => {
        
            const movie = await MovieDetails.find({});
        
            done()
        })

    })
    
//Test Driven development + Elastic Search yet to be done



