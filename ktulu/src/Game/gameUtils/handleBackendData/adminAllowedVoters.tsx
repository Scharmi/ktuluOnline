import * as Interfaces from 'interfaces/interfaces'
export const adminAllowedVoters = ((gameData:any, setGameState: Function, props: any) => {
    console.log("POTENCJALNE MIEJSCE BŁĘDU", props);
    setGameState((prevState: Interfaces.AdminGameState | Interfaces.GameState) => (
        {
            ...prevState,
            remainingVoters: props,
            voteState: "adminRemainingVoters",
            isVote: true,
        }
    ));
});
