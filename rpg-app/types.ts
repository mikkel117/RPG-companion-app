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