import * as Interfaces from 'interfaces/interfaces'
export const adminAllowedVoters = ((gameData:any, setGameState: Function, props: any) => {
    setGameState((prevState: Interfaces.AdminGameState | Interfaces.GameState) => (
        {
            ...prevState,
            remainingVoters: props,
            voteState: "adminRemainingVoters",
            isVote: true,
        }
    ));
});
