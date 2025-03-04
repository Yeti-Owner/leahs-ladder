import minecraft from './assets/Minecraft.png';
import terraria from './assets/Terraria.png';
import stardew from './assets/Stardew.png';
import nomanssky from './assets/NoMansSky.png';
import roblox from './assets/Roblox.png';
import worldwarz from './assets/WorldWarZ.png';
import l4d2 from './assets/L4D2.png';
import dinnerinamerica from './assets/DinnerInAmerica.png';
import hadestown from './assets/HadesTown.png';
import asteroidcity from './assets/AsteroidCity.png';
import silentvoice from './assets/SilentVoice.png';
import barbiedreamhouse from './assets/BarbieDreamhouse.png';
import lemis from './assets/LesMiserables.png';
import wendylucy from './assets/WendyLucy.png';
import illusionist from './assets/TheIllusionist.png';
import hauntinghour from './assets/HauntingHour.png';

export const optionsData = [
  {
    title: "Minecraft",
    description: "We play some craft, you build some pink stuff and I do some mining,",
    image: minecraft,
    tags: ["games"]
  },
  {
    title: "Terraria",
    description: "We don't play this much, but there's plenty to do + some bosses.",
    image: terraria,
    tags: ["games"]
  },
  {
    title: "Stardew Valley",
    description: "We can run up the Slay farm and pet the cat.",
    image: stardew,
    tags: ["games"]
  },
  {
    title: "No Man's Sky",
    description: "I still wana play this, but the performance bug is annoying...",
    image: nomanssky,
    tags: ["games"]
  },
  {
    title: "Roblox",
    description: "There are trillions of games including Flower Sim that you liked.",
    image: roblox,
    tags: ["games"]
  },
  {
    title: "World War Z",
    description: "We haven't played this yet actually, but I wanna make sure there's time for it.",
    image: worldwarz,
    tags: ["games"]
  },
  {
    title: "Left 4 Dead 2",
    description: "We actually both have this game but you never played and I only played once.",
    image: l4d2,
    tags: ["games"]
  },
  {
    title: "Dinner In America",
    description: "It's a RomCom about a Punk Band and a fangirl who go on a roadtrip.",
    image: dinnerinamerica,
    tags: ["movies"]
  },
  {
    title: "Hadestown (Pro Shot)",
    description: "Technically it isn't released yet so.....",
    image: hadestown,
    tags: ["movies"]
  },
  {
    title: "Asteroid City",
    description: "My personal fav Wes Anderson movie, I think you'll like it but not love it.",
    image: asteroidcity,
    tags: ["movies"]
  },
  {
    title: "A Silent Voice",
    description: "This one is marked sad, I haven't seen it yet but it's on my list.",
    image: silentvoice,
    tags: ["movies"]
  },
  {
    title: "Barbie Life in the Dreamhouse",
    description: "This is a series but 2 seasons is ~1.5 hours so we can treat it as a show or movie.",
    image: barbiedreamhouse,
    tags: ["episodes", "movies"]
  },
  {
    title: "Les Miserables",
    description: "I don't remember this besides the fact it was boring lowk, but it's worth rewatching.",
    image: lemis,
    tags: ["movies"]
  },
  {
    title: "Wendy and Lucy",
    description: "THIS MOVIE IS SAD. Not as sad as Only the Brave though.",
    image: wendylucy,
    tags: ["movies"]
  },
  {
    title: "The Illusionist (2010)",
    description: "VERY VERY SAD MOVIE VERY SAD.",
    image: illusionist,
    tags: ["movies"]
  },
  {
    title: "R.L. Stine's Haunting Hour",
    description: "There's still plenty of episodes to watch.",
    image: hauntinghour,
    tags: ["episodes"]
  },
];

// Helper function to get unique tags
export const getUniqueTags = () => {
  const allTags = optionsData.flatMap(option => option.tags);
  return [...new Set(allTags)];
};

// Helper function to filter by tag
export const filterByTag = (tag) => {
  return optionsData.filter(option => option.tags.includes(tag));
};

// Helper function to filter by multiple categories
export const filterByCategories = (categories) => {
  return optionsData.filter(option => 
    option.tags.some(tag => categories.includes(tag))
  );
};