export type characterType = {
    id: number;
    userId: number;
    name: string
    class: string;
    level: number;
    health: number;
    intelligence: number;
    strength: number;
    dexterity: number;
    charisma: number;
    wisdom: number;
};

export type userType = {
    id: number;
    username: string;
    characters: characterType[];
};