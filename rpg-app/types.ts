
export enum CharacterClassEnum
{
    Barbarian = 0,
    Fighter = 1,
    Sorcerer = 2
}

export enum CharacterRaceEnum
{
    Human,
    Elf,
}

export const RaceArray: string[] = Object.keys(CharacterRaceEnum).filter(key => isNaN(Number(key)));

export const ClassArray: string[] = Object.keys(CharacterClassEnum).filter(key => isNaN(Number(key)));


const raceNames: Record<number, string> = {
    [CharacterRaceEnum.Human]: "Human",
    [CharacterRaceEnum.Elf]: "Elf",
};

const classNames: Record<number, string> = {
    [CharacterClassEnum.Barbarian]: "Barbarian",
    [CharacterClassEnum.Fighter]: "Fighter",
    [CharacterClassEnum.Sorcerer]: "Sorcerer",
};

export enum RarityEnum
    {
        Common,
        Uncommon,
        Rare,
        VeryRare,
        Legendary,
        Artifact
    }

export enum ItemCategoryEnum
    {
        Weapon,
        Armor,
        Consumable,
        Tool,
        Miscellaneous
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

export type ItemType = {
    itemId: number;
    characterId: number;
    name: string;
    description: string;
    quantity: number;
    rarity: RarityEnum;
    category: ItemCategoryEnum;
    strengthModifier: number;
    dexterityModifier: number;
    intelligenceModifier: number;
    charismaModifier: number;
    wisdomModifier: number;
    constitutionModifier: number;
    isEquipped: boolean;
}

export type quests = {
    questId: number;
    characterId: number;
    name: string;
    description: string;
    reward: string;
    isCompleted: boolean;
}

export type noteType = {
    noteId: number;
    characterId: number;
    title: string;
    content: string;
    lastUpdated: Date;
    created: Date;
}

export type characterWithRelationsType = characterType & {
    items: ItemType[];
    quests: quests[];
    notes: noteType[];
}