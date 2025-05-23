export function rollStat(method: "3d6" | "drop-lowest" = "3d6"): number {
    let rolls = Array.from({ length: method === "3d6" ? 3 : 4 }, () => Math.floor(Math.random() * 6) + 1);

    if (method === "drop-lowest") {
        rolls.sort((a, b) => a - b);
        rolls.shift();
    }

    return rolls.reduce((sum, roll) => sum + roll, 0);
}

export function makeARoll(modifier: number, dice: number = 1, sides: number = 20): { total: number, rolls: number[] } {
    const rolls = Array.from({ length: dice }, () => Math.floor(Math.random() * sides) + 1);
    return { total: rolls.reduce((sum, roll) => sum + roll, modifier), rolls };
}