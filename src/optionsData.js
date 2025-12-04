import stardew from './assets/Stardew.png';

export const optionsData = [
  {
    title: "Minecraft",
    description: "We play some craft, you build more pink stuff and I mine,",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202407/0401/670c294ded3baf4fa11068db2ec6758c63f7daeb266a35a1.png",
    tags: ["games"]
  },
  {
    title: "Terraria",
    description: "We don't play this much, but there's plenty to do + some bosses.",
    image: "https://m.media-amazon.com/images/M/MV5BZWJkZWNkZDgtOTMzMS00NjlhLTk5MTEtZWFiMTQ0MzE4MzAyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    tags: ["games"]
  },
  {
    title: "Stardew Valley",
    description: "We can run up the Slay farm.",
    image: stardew,
    tags: ["games"]
  },
  {
    title: "No Man's Sky",
    description: "I still wana play this, but the performance bug is annoying...",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202407/1713/cf5584c9702f961ec2b6e6e283599230b47606b0af728d6f.png",
    tags: ["games"]
  },
  {
    title: "Roblox",
    description: "Some business sim, flower farm, or whatever.",
    image: "https://images.rbxcdn.com/5348266ea6c5e67b19d6a814cbbb70f6.jpg",
    tags: ["games"]
  },
  {
    title: "Left 4 Dead 2",
    description: "We actually both have this game but you never played and I only played once.",
    image: "https://clan.fastly.steamstatic.com/images/964095/215c949156daaa20244411bbbb7713ba34d96e06_400x225.jpg",
    tags: ["games"]
  },
  {
    title: "Hadestown (Pro Shot)",
    description: "Technically it isn't released yet so...",
    image: "https://upload.wikimedia.org/wikipedia/en/7/75/Hadestown_musical_poster.png",
    tags: ["movies"]
  },
  {
    title: "Barbie Life in the Dreamhouse",
    description: "This is a series but 2 seasons is ~1.5 hours so we can treat it as a show or movie.",
    image: "https://images.justwatch.com/poster/188028096/s718/barbie-life-in-the-dreamhouse.jpg",
    tags: ["episodes", "movies"]
  },
  {
    title: "Les Miserables",
    description: "I don't remember this except it was boring lowk, but it's worth rewatching.",
    image: "https://resizing.flixster.com/1zLOrsw_MLsSBZqw8mpjTbdpUQE=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzY5MDI2ZTQ5LTU2NDItNDBiZC04OTJiLWRkYTdkOWIyN2VmNC5qcGc=",
    tags: ["movies"]
  },
  {
    title: "Wendy and Lucy",
    description: "THIS MOVIE IS SAD. Not as sad as Only the Brave though.",
    image: "https://m.media-amazon.com/images/M/MV5BMTI3MTE1NjAwNV5BMl5BanBnXkFtZTcwMDM3MzMwMg@@._V1_FMjpg_UX1000_.jpg",
    tags: ["movies"]
  },
  {
    title: "R.L. Stine's Haunting Hour",
    description: "There's still plenty of episodes to watch.",
    image: "https://m.media-amazon.com/images/I/91VrQaJb-NL._AC_UF894,1000_QL80_.jpg",
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