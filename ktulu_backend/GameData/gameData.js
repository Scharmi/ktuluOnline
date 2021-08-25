var characters = require('./characters.json')
exports.gameDataGenerator = function() {
    let gameData = new Object();
    gameData.gameStages = [
        "duelsTurn",
        "dziwka",
        "szantazysta",
        "uwodziciel",
        "szeryf", 
        "pastor", 
        "opoj", 
        "kat",
        "hazardzista",
        "bandyciSendInfo", 
        "bandyciInspection", 
        "bandyciStatue", 
        "msciciel", 
        "zlodziej",
        "szuler", 
        "indianieSendInfo",
        "indianieStatue",
        "indianieKilling",
        "szaman",
        "szamanka", 
        "wojownik",
        "samotnyKojot",
        "lornecieOko"
    ];
    gameData.statue = "herszt"
    gameData.namesArray = [];
    gameData.idsArray = [];
    gameData.playersArray = [];
    gameData.allFullInfoPlayers = [];
    gameData.chosenCharacters = [];
    gameData.disconnectedPlayers = [];
    gameData.disclosed = [];
    gameData.characters = [...characters]
    gameData.gameStage = "preGame";
    gameData.forbiddenNames = ["admin", "allPlayers"];
    gameData.turn = "";
    gameData.prison = "";
    gameData.herbs = "";
    gameData.drunk = [];
    gameData.usedSkills = [];
    gameData.knowsTeammates = [];
    gameData.voteId = 0;
    gameData.playingCharacter = "";
    gameData.activeChat = [];
    gameData.duelsLimit = 2;
    gameData.voteResults = [];
    gameData.disclosed = [];
    gameData.duel = false;
    gameData.members = function(team) {
        let newArr = [];
        for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
          if(gameData.allFullInfoPlayers[i].team === team) newArr.push(gameData.allFullInfoPlayers[i]);
        }
        return newArr;
      }
      gameData.banditLeader = function() {
        let min = 213769;
        let index = -1;
        for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
          if(gameData.allFullInfoPlayers[i].team === "bandyci") {
            if((!gameData.drunk.includes(gameData.allFullInfoPlayers[i].characterName)) && (gameData.allFullInfoPlayers[i].characterName !== gameData.prison)) {
              if(gameData.allFullInfoPlayers[i].characterId < min) {
                index = i;
                min = gameData.allFullInfoPlayers[i].characterId;
              }
            }
          }
        }
        if(index !== -1)
        return gameData.allFullInfoPlayers[index].characterName;
        return "ERROR"
      }
      gameData.characterNick = function(characterName) {
        for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
          if(gameData.allFullInfoPlayers[i].characterName === characterName) return gameData.allFullInfoPlayers[i].name;
        }
      }
      
      gameData.isActive = function(name){
          for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
            if(gameData.allFullInfoPlayers[i].characterName === name) {
              let player = {...gameData.allFullInfoPlayers[i]};
              if(player.isAlive === false) return "dead";
              if(gameData.drunk.includes(player.characterName)) return "simulate";
              if(player.characterName === gameData.prison) return "simulate";
              return "active";
            }
          }
          let status = "dead";
          for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
            if(gameData.allFullInfoPlayers[i].team === name) {
              let player = {...gameData.allFullInfoPlayers[i]};
              if(gameData.drunk.includes(player.characterName)) status = "simulate";
              else {
                if(player.characterName === gameData.prison) status = "simulate"; 
                else {
                  return "active";
                }          
              }
            }
          }
          return status;
        }
        gameData.statueTeam = function() {
          if(gameData.statue !== "") {
            for(let i = 0; i < gameData.characters.length; i++) {
              if(gameData.characters[i].characterName === gameData.statue) return gameData.team(gameData.characters[i].characterId);
            }
            return undefined;
          }
          else {
            return undefined;
          }
        }
        gameData.team = function(id) {
          id /= 100;
          id = Math.floor(id);
          if(id === 0) return "miastowi";
          if(id === 1) return "bandyci";
          if(id === 2) return "indianie";
          if(id === 3) return "ufoki"
        }
        gameData.szuleredPlayer = "";
        gameData.drunkPlayer = "";
        gameData.opojOnce = false;


        gameData.shiftTurn = function(turn) {
            gameData.gameStages.splice(gameData.counter + 1, 0 , turn);
        }
        gameData.actionObject = new Object();
        gameData.turnCharacter = {
            dziwka: "dziwka",
            pastor: "pastor",
            szeryf: "szeryf",
            opoj: "opój",
            kat: "kat",
            uwodziciel: "uwodziciel",
            hazardzista: "hazardzista",
            hazardzistaKilling: "hazardzista",
            pijanySedzia: "pijany sędzia",
            bandyciSendInfo: "bandyci",
            bandyciStatue: "bandyci",
            bandyciInspection: "bandyci",
            msciciel: "mściciel",
            zlodziej: "złodziej",
            szuler: "szuler",
            szantazysta: "szantażysta",
            indianieSendInfo: "indianie",
            indianieStatue: "indianie",
            indianieKilling: "indianie",
            szaman: "szaman",
            szamanka: "szamanka",
            wojownik: "wojownik",
            samotnyKojot: "samotny kojot",
            plonacySzal: "płonący szał",
            cichaStopa: "cicha stopa",
            lornecieOko: "lornecie oko"
        }
        gameData.turnInfo = {
          dziwka: "dziwka",
          pastor: "pastor",
          szeryf: "szeryf",
          opoj: "opój",
          kat: "kat",
          uwodziciel: "uwodziciel",
          hazardzista: "hazardzista",
          hazardzistaKilling: "hazardzista",
          pijanySedzia: "pijany sędzia",
          bandyciSendInfo: "bandyci",
          bandyciStatue: "bandyci wybierają kto ma mieć posążek",
          bandyciInspection: "bandyci wybierają kogo przeszukać",
          msciciel: "mściciel",
          zlodziej: "złodziej",
          szuler: "szuler",
          szantazysta: "szantażysta",
          indianieSendInfo: "indianie",
          indianieStatue: "indianie wybierają kto ma mieć posążek",
          indianieKilling: "indianie wybierają kogo zabić",
          szaman: "szaman",
          szamanka: "szamanka",
          wojownik: "wojownik",
          samotnyKojot: "samotny kojot",
          plonacySzal: "płonący szał",
          cichaStopa: "cicha stopa",
          lornecieOko: "lornecie oko",
          duelsTurn: "Tura pojedynków"
      }
        gameData.isCharacter = function(text) {
            for(let i = 0; i < gameData.characters.length; i++) {
                if(text === gameData.characters[i].characterName) return true;
            }
            return false;
        }
        gameData.isTeam = function(text) {
            if(text === "miastowi") return true;
            if(text === "bandyci") return true;
            if(text === "indianie") return true;
            if(text === "ufoki") return true;
        }
        gameData.isTurnPlaying = function(turnName) {
            if((turnName === "samotnyKojot") && (!gameData.isSamotnyKojot())) return "skip";
            if((turnName === "bandyciSendInfo")) return "nonActionTurn"
            if((turnName === "indianieSendInfo")) return "nonActionTurn"
            if((turnName === "duelsTurn")) return "nonActionTurn"
            if((turnName === "bandyciInspection") && (gameData.statueTeam() === "bandyci")) return "skip";
            if((turnName === "bandyciStatue") && (gameData.statueTeam() !== "bandyci")) return "skip";
            if((turnName === "indianieStatue") && (gameData.statueTeam() !== "indianie")) return "skip";
            let playingCharacter = gameData.turnCharacter[turnName];
            gameData.playingCharacter = playingCharacter;
            if(gameData.isCharacter(playingCharacter)) {
                if(gameData.isActive(playingCharacter) === "dead") return "skip";
                if(gameData.isActive(playingCharacter) === "simulate") return "simulatePrison";
                if(gameData.usedSkills.includes(playingCharacter)) return "simulateUsedSkill"
                if(gameData.isActive(playingCharacter) === "active") return "play";
            }
            if(gameData.isTeam(playingCharacter)) {
                if(gameData.isActive(playingCharacter) === "dead") return "skip";
                if(gameData.isActive(playingCharacter) === "simulate") return "simulatePrison";
                if(gameData.isActive(playingCharacter) === "active") return "play";
            }
            return "skip";
        }
        gameData.activePlayer = function(characterName) {
            if(gameData.isCharacter(characterName)) return characterName;
            if(gameData.isTeam(characterName)) return gameData.teamLeader(characterName);
        }
        gameData.activePlayerSimulate = function(characterName) {
            if(gameData.isCharacter(characterName)) return characterName;
            if(gameData.isTeam(characterName)) return gameData.simulateLeader(characterName);
        }
        gameData.teamLeader = function(team) {
            let min = 213769;
            let index = -1;
            for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
              if(gameData.allFullInfoPlayers[i].team === team) {
                if(((!gameData.drunk.includes(gameData.allFullInfoPlayers[i].characterName)) && (gameData.allFullInfoPlayers[i].characterName !== gameData.prison)) && (gameData.allFullInfoPlayers[i].isAlive === true)){
                  if(gameData.allFullInfoPlayers[i].characterId < min) {
                    index = i;
                    min = gameData.allFullInfoPlayers[i].characterId;
                  }
                }
              }
            }
            if(index !== -1)
            return gameData.allFullInfoPlayers[index].characterName;
            return "ERROR"
        }
        gameData.simulateLeader = function(team) {
            let min = 213769;
            let index = -1;
            for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
              if(gameData.allFullInfoPlayers[i].team === team) {
                if(gameData.allFullInfoPlayers[i].isAlive === true){
                  if(gameData.allFullInfoPlayers[i].characterId < min) {
                    index = i;
                    min = gameData.allFullInfoPlayers[i].characterId;
                  }
                }
              }
            }
            if(index !== -1)
            return gameData.allFullInfoPlayers[index].characterName;
            return "ERROR"
        }
        gameData.activeMembers = function(team) {
            let members = gameData.members(team);
            let newArr = [];
            for(let i = 0; i < members.length; i++) {
                if((members[i].characterName !== gameData.prison) && (!gameData.drunk.includes(members[i].characterName)))
                newArr.push(members[i]);
            }
            return newArr;
        }
        gameData.playerProps = function(nick) {
            for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                if(gameData.allFullInfoPlayers[i].name === nick) return gameData.allFullInfoPlayers[i];
            }
            return undefined;
        }

        gameData.szeryfAlive = function() {
            for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                if(gameData.allFullInfoPlayers[i].characterName === "szeryf") {
                    return true;
                }
            }
            return false;
        }
        gameData.forceKill = function(characterName) {
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
        }
        gameData.isSamotnyKojot = function() {
            let indianie = gameData.members("indianie");
            for(let i = 0; i < indianie.length; i++) {
                let player = indianie[i].characterName;
                if((player !== "samotny kojot") && (player !== gameData.prison) && (!gameData.drunk.includes(player)))
                return false;
            }
            return true;
        }
    return gameData;
}