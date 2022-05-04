import * as Interfaces from 'interfaces/interfaces'
export const votesNumber = ((gameData:any, setGameState: Function, data: any) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, votesNumber: {votes: data.votes, allVotes: data.allVotes}}))
});