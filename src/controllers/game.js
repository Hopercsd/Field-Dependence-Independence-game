const gameService = require('../services/game');

const indexGames = async (req, res, next) =>{
    const games = await gameService.getAllGames();
    if(!games){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
    return res.status(200).json({
        Games: games 
    });
}

const create = async (req, res, next) =>{
    const body = req.body;
    const game = await gameService.create(body);
    return res.status(200).json({
        Game: game
    });
}

module.exports = {
    indexGames,
    create,
}