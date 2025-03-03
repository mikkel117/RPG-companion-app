
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


/* export type characterType = {
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
}; */

export class characterType {
    characterId: number;
    userId: number;
    name: string;
    characterClass: CharacterClassEnum;
    characterRace: CharacterRaceEnum;
    level: number;
    health: number;
    intelligence: number;
    strength: number;
    dexterity: number;
    charisma: number;
    wisdom: number;

    constructor(
        characterId: number,
        userId: number,
        name: string,
        characterClass: CharacterClassEnum,
        characterRace: CharacterRaceEnum,
        level: number,
        health: number,
        intelligence: number,
        strength: number,
        dexterity: number,
        charisma: number,
        wisdom: number
    ) {
        this.characterId = characterId;
        this.userId = userId;
        this.name = name;
        this.characterClass = characterClass;
        this.characterRace = characterRace;
        this.level = level;
        this.health = health;
        this.intelligence = intelligence;
        this.strength = strength;
        this.dexterity = dexterity;
        this.charisma = charisma;
        this.wisdom = wisdom;
    }
    get characterClassName(): string {
        return classNames[this.characterClass] || "Unknown";
    }

    // Getter for characterRaceName
    get characterRaceName(): string {
        return raceNames[this.characterRace] || "Unknown";
    }
}

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

/* export type characterWithRelationsType = characterType & {
    items: ItemType[];
    quests: quests[];
    notes: noteType[];
} */

export class characterWithRelationsType extends characterType {
    items: ItemType[];
    quests: quests[];
    notes: noteType[];

    constructor(
        characterId: number,
        userId: number,
        name: string,
        characterClass: CharacterClassEnum,
        characterRace: CharacterRaceEnum,
        level: number,
        health: number,
        intelligence: number,
        strength: number,
        dexterity: number,
        charisma: number,
        wisdom: number,
        items: ItemType[],
        quests: quests[],
        notes: noteType[]
    ) {
        super(characterId, userId, name, characterClass, characterRace, level, health, intelligence, strength, dexterity, charisma, wisdom);
        this.items = items;
        this.quests = quests;
        this.notes = notes;
    }
}