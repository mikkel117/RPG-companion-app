export enum CharacterClassEnum
{
    Barbarian,
    Fighter,
    Sorcerer,
}

export enum CharacterRaceEnum
{
    Human,
    Elf,
}


export type characterType = {
    characterId: number;
    userId: number;
    name: string
    characterClass: CharacterClassEnum;
    characterRace: CharacterRaceEnum;
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