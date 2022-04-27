export const templateCrewmates = [
    {
        id: 23,
        name: "Kizo",
        characterId: 102,
        characterName: "Mściciel",
        team: "bandyci",
        isAlive: false,
    },
    {
        id: 41,
        name: "Żabson",
        characterId: 104,
        characterName: "Szantażysta",
        team: "bandyci",
        isAlive: true
    },
    {
        id: 12,
        name: "Trill Pem",
        characterId: 110,
        characterName: "Szuler",
        team: "bandyci",
        isAlive: true,
        isDrunk: true,
    },
    {
        id: 14,
        name: "Kastet THC",
        characterId: 101,
        characterName: "Herszt",
        team: "bandyci",
        isAlive: false
    }
];
export const templateDisclosed = [
    {
        id: 2,
        name: "Szpaku",
        characterId: 203,
        characterName: "Szaman",
        team: "indianie",
        isAlive: false,
    },
    {
        id: 15,
        name: "Quebonafide",
        isAlive: false,
        characterId: 201,
        characterName: "Szamanka",
        team: "indianie"

    },
    {
        id: 213,
        name: "12345678901234567890",
        isAlive: false,
        characterId: 11,
        characterName: "Dobry Rewolwerowiec",
        team: "miastowi"
    },
    {
        id: 7,
        name: "Wac Toja",
        isAlive: false,
        characterId: 303,
        characterName: "Zielona Macka",
        team: "ufoki"
    },
    {
        id: 24,
        name: "Kaz Bałagane",
        isAlive: false,
        characterId: 204,
        characterName: "Lornecie Oko",
        team: "indianie"
    },
    {
        id: 121,
        name: "Grzechu",
        isAlive: true,
        characterId: 8,
        characterName: "Sędzia",
        team: "miastowi"
    },
];
export const templatePlayer = {
    id: 12,
    name: "Mariusz",
    isAlive: true,
}
export const templateFullInfoPlayer = {
    id: 2137,
    name: "Ładowanie...",
    characterId: 2137,
    characterName: "",
    isAlive: true,
    team: "",
}
export const templatePlayers = [
    {
        id: 12,
        name: "Trill Pem",
        isAlive: true,
    },
    {
        id: 34,
        name: "Qry",
        isAlive: true
    },
    {
        id: 41,
        name: "Żabson",
        isAlive: true
    },
    {
        id: 23,
        name: "12345678901234567890",
        isAlive: false
    },
    {
        id: 14,
        name: "Kastet THC",
        isAlive: false,
    },
    {
        id: 121,
        name: "White",
        isAlive: true
    },
    {
        id: 3,
        name: "Malik",
        isAlive: true
    },
    {
        id: 2,
        name: "Szpaku",
        isAlive: false
    },
    {
        id: 4,
        name: "Wstrzymuję się od głosu",
        isAlive: true
    },
    {
        id: 7,
        name: "Wac Toja",
        isAlive: false
    },
    {
        id: 67,
        name: "Bedoes",
        isAlive: true
    },
    {
        id: 99,
        name: "Belmondo",
        isAlive: true
    },
    {
        id: 24,
        name: "Kaz Bałagane",
        isAlive: false
    },
    {
        id: 111,
        name: "Beteo",
        isAlive: true
    },
    {
        id: 15,
        name: "Quebonafide",
        isAlive: false
    },
]
export const templateVoteResult = [
    {
        optionName: "Wieszamy",
        isChosen: 1,
        voters: [
            {
                id: 21,
                name: "Andrzej"
            },
            {
                id: 23,
                name: "Marcin"
            },
            {
                id: 43,
                name: "Krystian"
            },
            {
                id: 12,
                name: "Tomasz"
            },
            {
                id: 41,
                name: "Mati"
            }
        ]
    },
    {
        optionName: "Nie wieszamy",
        isChosen: 0,
        voters: [
            {
                id: 11,
                name: "BoczaAs"
            },
            {
                id: 13,
                name: "Bożek"
            },
            {
                id: 123,
                name: "Paweł"
            },  
            {
                id: 2115,
                name: "Pablito"
            }
        ]
    },
]
export const templateActionButtons = [
    {
        text: "Wyzwij na pojedynek",
        function: (name: string) => {console.log("Wyzwano na pojedynek gracza " + name)},
        isEnabled: true
    },
    {
        text: "Zgłoś do przeszukania",
        function: (name: string) => {console.log("Zgłoszono do przeszukania gracza " + name)},
        isEnabled: true
    }
]
export const templateSpecialButtons = [
    {   
        id: 12,
        extraButtons: [
            {
                text: "Wyzwij na pojedynek",
                function: (name: string) => {console.log("Wyzwano na pojedynek gracza " + name)},
                isEnabled: true
            },
            {
                text: "Zgłoś do przeszukania",
                function: (name: string) => {console.log("Zgłoszono do przeszukania gracza " + name)},
                isEnabled: true
            },
            {
                text: "Podaj ziółka",
                function: (name: string) => {console.log("Podano ziółka graczowi " + name)},
                isEnabled: false
            },
            {
                text: "Zabij",
                function: (name: string) => {console.log("Zabito gracza " + name)},
                isEnabled: false
            }
        ]
    },
    {
        id: 121,
        extraButtons: [
            {
                text: "Podaj mefedron Darii",
                function: (name: string) => {console.log("Wyzwano na pojedynek gracza " + name)},
                isEnabled: true
            },
            {
                text: "Nie spierdol matury z matmy",
                function: (name: string) => {console.log("Zgłoszono do przeszukania gracza " + name)},
                isEnabled: false
            },
            {
                text: "Idź na studia do Warszawy",
                function: (name: string) => {console.log("Podano ziółka graczowi " + name)},
                isEnabled: false
            },
            {
                text: "Idź na UG",
                function: (name: string) => {console.log("Zabito gracza " + name)},
                isEnabled: true
            }
        ]
    }
]
export const templateGameInfo = {
    gameTime: {
        dayNumber: 3,
        dayTime: "night",
    },
    whoseTurn: "szeryf",
    whoHasStatue: "bandyci",

}
export const templateAdminData = {
        id: -1,
        name: "Admin",
        characterId: -1,
        characterName: "Admin",
        isAlive: true,
        team: "",
}
export const templateAdminActionButtons = [
    {
        text: "Wyrzuć gracza",
        function: (name: string) => {console.log("Wyrzucono gracza " + name)},
        isEnabled: true
    },
    {
        text: "Zabij grcza",
        function: (name: string) => {console.log("Zabito gracza " + name)},
        isEnabled: true
    },
    {
        text: "Przywróć gracza do życia",
        function: (name: string) => {console.log("Przywrócono do życia gracza " + name)},
        isEnabled: true
    },
]
export default templateCrewmates;