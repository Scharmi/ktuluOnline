export function transmitter(socket: any, gameData?: any) {
    socket.on("action", (str: any,obj: Object) => {
        socket.emit("action", str, obj)
    })
    socket.on("turnSkip", (turn: any, player: any) => {
        socket.emit("turnSkip", turn, player)
    })
    socket.on("end", (arg: any) => {
        socket.emit("end", arg)
    })
    socket.on("duelInvite", (p1: string, p2: string) => {
        socket.emit("duelInvite", p1, p2)
    })
    socket.on("duelDecline", (p1: string, p2: string) => {
        socket.emit("duelDecline", p1, p2)
    })
    socket.on("duelAccept", (p1: string, p2: string) => {
        socket.emit("duelAccept", p1, p2)
    })
    socket.on("vote", (name: string, id: number, options:any) => {
        socket.emit("vote", name, id, options);
    })
    socket.on("voteEnd", (id: number) => {
        socket.emit("voteEnd", id);
    })
    socket.on("disclose", (name: string) => {
        socket.emit("disclose", name);
    })
}