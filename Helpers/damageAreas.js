export const imageSource = require('../assets/damage-areas.jpg');
export const GLASS_IDS = ['Windshield', 'Rear Glass'];

export function isGlass(id) {
    return !!~GLASS_IDS.indexOf(id);
}

export const DAMAGES_MAPPING = [
    {
        id: "1",
        name: "Front Valance",
        shape: "rectangle",
        x1: 84,
        y1: 3,
        x2: 192,
        y2: 20,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "rgba(0, 0, 0, 0.5)"
    },
    {
        id: "2",
        name: "Front Bumper",
        shape: "rectangle",
        x1: 103,
        y1: 22,
        x2: 171,
        y2: 38,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "3",
        name: "Grille",
        shape: "rectangle",
        x1: 79,
        y1: 39,
        x2: 194,
        y2: 57,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "4",
        name: "Hood",
        shape: "rectangle",
        x1: 82,
        y1: 58,
        x2: 193,
        y2: 92,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "5",
        name: "Left Front Fascia",
        shape: "rectangle",
        x1: 47,
        y1: 21,
        x2: 102,
        y2: 41,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "6",
        name: "Right Front Fascia",
        shape: "rectangle",
        x1: 171,
        y1: 22,
        x2: 226,
        y2: 40,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "7",
        name: "Left Front Wing",
        shape: "rectangle",
        x1: 23,
        y1: 57,
        x2: 79,
        y2: 100,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "8",
        name: "Right Front Wing",
        shape: "rectangle",
        x1: 195,
        y1: 57,
        x2: 252,
        y2: 97,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "9",
        name: "Windshield",
        shape: "rectangle",
        x1: 105,
        y1: 93,
        x2: 170,
        y2: 118,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "10",
        name: "Left A-Pillar",
        shape: "rectangle",
        x1: 80,
        y1: 94,
        x2: 104,
        y2: 136,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "11",
        name: "Right A-Pillar",
        shape: "rectangle",
        x1: 172,
        y1: 95,
        x2: 193,
        y2: 137,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "12",
        name: "Left Rocker Panel",
        shape: "rectangle",
        x1: 3,
        y1: 98,
        x2: 26,
        y2: 194,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "13",
        name: "Left Front Door",
        shape: "rectangle",
        x1: 30,
        y1: 101,
        x2: 77,
        y2: 149,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "14",
        name: "Left Center Pillar",
        shape: "rectangle",
        x1: 80,
        y1: 137,
        x2: 101,
        y2: 189,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "15",
        name: "Roof",
        shape: "rectangle",
        x1: 104,
        y1: 120,
        x2: 170,
        y2: 205,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "16",
        name: "Right Center Pillar",
        shape: "rectangle",
        x1: 172,
        y1: 138,
        x2: 192,
        y2: 189,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "17",
        name: "Right Front Door",
        shape: "rectangle",
        x1: 194,
        y1: 99,
        x2: 244,
        y2: 149,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "18",
        name: "Right Rocker Panel",
        shape: "rectangle",
        x1: 244,
        y1: 99,
        x2: 270,
        y2: 194,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "19",
        name: "Left Back Door",
        shape: "rectangle",
        x1: 29,
        y1: 149,
        x2: 78,
        y2: 190,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "20",
        name: "Right Back Door",
        shape: "rectangle",
        x1: 195,
        y1: 151,
        x2: 242,
        y2: 191,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "21",
        name: "Left Back Wing",
        shape: "rectangle",
        x1: 23,
        y1: 192,
        x2: 92,
        y2: 239,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "22",
        name: "Rear Glass",
        shape: "rectangle",
        x1: 95,
        y1: 207,
        x2: 175,
        y2: 223,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "23",
        name: "Right Back Wing",
        shape: "rectangle",
        x1: 178,
        y1: 192,
        x2: 251,
        y2: 241,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "24",
        name: "Trunk",
        shape: "rectangle",
        x1: 92,
        y1: 227,
        x2: 180,
        y2: 246,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "25",
        name: "Left Rear Fascia",
        shape: "rectangle",
        x1: 45,
        y1: 260,
        x2: 86,
        y2: 285,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "26",
        name: "Read Bumper",
        shape: "rectangle",
        x1: 88,
        y1: 261,
        x2: 188,
        y2: 284,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "27",
        name: "Right Rear Fascia",
        shape: "rectangle",
        x1: 190,
        y1: 261,
        x2: 227,
        y2: 286,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "28",
        name: "Rear Valance",
        shape: "rectangle",
        x1: 89,
        y1: 284,
        x2: 186,
        y2: 299,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    },
    {
        id: "29",
        name: "Wheel",
        shape: "rectangle",
        x1: 7,
        y1: 245,
        x2: 43,
        y2: 277,
        prefill: "rgba(255, 255, 255, 0.5)",
        fill: "blue"
    }
];
