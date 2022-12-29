/*
@title: Glory_it
@author: jashvnath
*/
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
    [
        player,
        bitmap`
................
................
................
.......000......
......06060.....
.......000......
....003003000...
....0.06600.0...
....0.06600.0...
...00.30030.00..
......00003.....
......0...0.....
......0...0.....
......0...0.....
.....00...00....
................`
    ],
    [
        box,
        bitmap`
................
................
................
...600030006....
...0...0...0....
...0...0...0....
...0...0...0....
...300060003....
...0...0...0....
...0...0...0....
...0...0...0....
...600030006....
................
................
................
................`
    ],
    [
        goal,
        bitmap`
................
................
................
.....77777......
.....70707......
.....7.7.7......
.....7LHL7......
.....7L.L7......
.....77777......
................
................
................
................
................
................
................`
    ],
    [
        wall,
        bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`
    ]
);

let level = 0;
const levels = [
    map`
p.w.
.bwg
....
....`,
      map`
.bg.g.
p.wwwb
.bwgw.
......
......`,
      map`
gb..
wpb.
....
...g`,

    map`
p.w.
.bwg
....
..bg`
];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("w", () => {
    getFirst(player).y -= 1;
});

onInput("s", () => {
    getFirst(player).y += 1;
});

onInput("a", () => {
    getFirst(player).x -= 1;
});

onInput("d", () => {
    getFirst(player).x += 1;
});

onInput("j", () => {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
});

setSolids([player, box, wall]);

setPushables({
    [player]: [box]
});

afterInput(() => {
    const numberCovered = tilesWith(goal, box).length;
    const targetNumber = tilesWith(goal).length;

    if (numberCovered === targetNumber) {
        // increase the current level number
        level = level + 1;

        const currentLevel = levels[level];

        // make sure the level exists and if so set the map
        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            addText("you win!", { y: 4, color: color`3` });
        }
    }
});