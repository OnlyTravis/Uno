const character_list = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"

export function randomInt(from: number, to: number): number {
    return Math.floor((to-from+1)*Math.random())+from;
}

export function randomInt_(n: number): number {
    return Math.floor(n*Math.random());
}

export function randomText(length: number, type: number=1): string {
    let text = "";
    switch (type) {
        case 1:
            for (let i = 0; i < length; i++) {
                text += character_list[randomInt_(character_list.length)];
            }
            break;
    }
    return text;
}