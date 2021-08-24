const { dziwka } = require("./CharacterActions/dziwka");
const { szeryf } = require("./CharacterActions/szeryf");
const { pastor } = require("./CharacterActions/pastor");
const { hazardzista } = require("./CharacterActions/hazardzista");
const { hazardzistaKilling } = require("./CharacterActions/hazardzistaKilling");
const { opoj } = require("./CharacterActions/opoj");
const { kat } = require("./CharacterActions/kat");
const { uwodziciel } = require("./CharacterActions/uwodziciel");
const { bandyciInspection } = require("./CharacterActions/bandyciInspection");
const { bandyciStatue } = require("./CharacterActions/bandyciStatue");
const { bandyciSendInfo } = require("./CharacterActions/bandyciSendInfo");
const { msciciel } = require("./CharacterActions/msciciel");
const { zlodziej } = require("./CharacterActions/zlodziej");
const { szuler } = require("./CharacterActions/szuler");
const { indianieKilling } = require("./CharacterActions/indianieKilling");
const { indianieStatue } = require("./CharacterActions/indianieStatue");
const { indianieSendInfo } = require("./CharacterActions/indianieSendInfo");
const { szamanka } = require("./CharacterActions/szamanka");
const { szaman } = require("./CharacterActions/szaman");
const { wojownik } = require("./CharacterActions/wojownik");
const { samotnyKojot } = require("./CharacterActions/samotnyKojot");
const { lornecieOko } = require("./CharacterActions/lornecieOko");
const { szantazysta } = require("./CharacterActions/szantazysta");
const { plonacySzal } = require("./CharacterActions/plonacySzal");
const { duelsTurn } = require("./CharacterActions/duelsTurn");
exports.admin = function(socket, io, gameData) {
    let playerActions = {
        dziwka: dziwka,
        pastor: pastor,
        szeryf: szeryf,
        opoj: opoj,
        uwodziciel: uwodziciel,
        hazardzista: hazardzista,
        hazardzistaKilling: hazardzistaKilling,
        kat: kat,
        bandyciInspection: bandyciInspection,
        bandyciStatue: bandyciStatue,
        bandyciSendInfo: bandyciSendInfo,
        msciciel: msciciel,
        zlodziej: zlodziej,
        szuler: szuler,
        szantazysta: szantazysta,
        indianieSendInfo: indianieSendInfo,
        indianieKilling: indianieKilling,
        indianieStatue: indianieStatue,
        wojownik: wojownik,
        szamanka: szamanka,
        szaman: szaman,
        samotnyKojot: samotnyKojot,
        lornecieOko: lornecieOko,
        plonacySzal: plonacySzal,
        duelsTurn: duelsTurn,
    }
    gameData.kill = function(characterName) {
        if(characterName !== gameData.prison) {
            for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                if( gameData.allFullInfoPlayers[i].characterName === characterName) {
                  gameData.allFullInfoPlayers[i].isAlive = false;
                  io.to("everyone").emit("fullInfoPlayers", [gameData.allFullInfoPlayers[i]]);
                }
              }
              for(let i = 0; i < gameData.playersArray.length; i++) {
                if( gameData.playersArray[i].name === gameData.characterNick(characterName)) {
                  gameData.playersArray[i].isAlive = false;
                  io.to("everyone").emit("All players", [gameData.allFullInfoPlayers[i]]);
                }
              }
              io.to(characterName).emit("fullInfoPlayers", gameData.allFullInfoPlayers)
        }
        else {
            gameData.gameStages.splice(gameData.counter + 1, 0 , gameData.stageName);
        }
    }
    function runStage(counter, gameData) {
        if(counter < gameData.gameStages.length) {
            socket.removeAllListeners("action");
            socket.removeAllListeners("duelInvite");
            gameData.counter = counter;
            let stageName = gameData.gameStages[counter];
            console.log("STAGE", stageName, gameData.isTurnPlaying(stageName), "STATUE:", gameData.statue);
            let activePlayer = gameData.activePlayer(gameData.turnCharacter[stageName])
            let simulatePlayer = gameData.activePlayerSimulate(gameData.turnCharacter[stageName])
            gameData.stageName = stageName
            gameData.turn = stageName;
            function listenToAction() {
                socket.once("action", (str, obj) => {
                    if((str === activePlayer) && (obj.turn  === gameData.turn)) {
                        gameData.actionObject = {...obj};
                        playerActions[stageName](socket, io, gameData);
                    }
                    else {
                        console.log("BAD ACTION", str, obj, activePlayer, gameData.turn);
                        listenToAction();
                    }
                })
            }
            function listenToEnd() {
                socket.once("turnSkip", (turn,player) => {
                    if((player === simulatePlayer) && (turn === gameData.turn)) {
                        socket.emit("end", gameData.stageName)
                    }
                    else {
                        console.log("WRONG TURNSKIP", turn, player)
                        listenToEnd();
                    }
                })
            }
 
            if(gameData.isTurnPlaying(stageName) === "play") {
                io.to(activePlayer).emit("All players", gameData.playersArray);
                io.to(activePlayer).emit("start", gameData.turn, activePlayer);
                listenToAction();
            }
            if(gameData.isTurnPlaying(stageName) === "simulatePrison") {
                io.to(simulatePlayer).emit("manualSkip", gameData.turn, simulatePlayer);
                listenToEnd();
            }
            if(gameData.isTurnPlaying(stageName) === "simulateUsedSkill") {
                io.to(simulatePlayer).emit("manualSkip", gameData.turn, simulatePlayer);
                listenToEnd();
            }
            if(gameData.isTurnPlaying(stageName) === "nonActionTurn") {
                playerActions[stageName](socket, io, gameData);
            }
            if(gameData.isTurnPlaying(stageName) === "skip") {
                counter++;
                runStage(counter, gameData);
            }
            else {
                function endListener(arg) {
                    if(arg === stageName) {
                        if(stageName === "duelTurn") {
                            socket.removeAllListeners("duelInvite");
                            socket.removeAllListeners("duelDecline");
                            socket.removeAllListeners("duelAccept");
                        }
                        socket.removeAllListeners("action");
                        counter++;
                        runStage(counter, gameData);
                    }
                    else {
                        socket.once("end", endListener)
                    }
                }
                socket.once("end", endListener)
            }
        }
    }
    socket.emit("Full Players Info", gameData.allFullInfoPlayers, gameData.namesArray)
    socket.once("allPlayersConnected", () => {
        runStage(0, gameData);
        socket.on("reconnection", (player) => {
            //Resend wyzwań do pojedynków
            //Resend ujawnionych ludzi (w tym tych z teamu)
            for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                if(player === gameData.allFullInfoPlayers[i].name) {
                    player = gameData.allFullInfoPlayers[i];
                }
            }
            if(gameData.playingCharacter === player.characterName) {
                io.to(player.characterName).emit("All players", gameData.playersArray);
                io.to(player.characterName).emit("start", gameData.turn, gameData.playingCharacter);
            }

        })
    })
}