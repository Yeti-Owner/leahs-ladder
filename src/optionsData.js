import image1 from './assets/1.png';
import image2 from './assets/2.png';
import image3 from './assets/3.png';
import image4 from './assets/4.png';
import image5 from './assets/5.png';
import image6 from './assets/6.png';
import image7 from './assets/7.png';
import image8 from './assets/8.png';
import image9 from './assets/9.png';
import image10 from './assets/10.png';
import image11 from './assets/11.png';
import image12 from './assets/12.png';

export const optionsData = [
  {
    title: "Option 1",
    description: "This is the first option",
    image: image1,
    tags: ["games"]
  },
  {
    title: "Option 2",
    description: "This is the second option",
    image: image2,
    tags: ["movies"]
  },
  {
    title: "Option 3",
    description: "This is the third option",
    image: image3,
    tags: ["episodes"]
  },
  {
    title: "Option 4",
    description: "This is the fourth option",
    image: image4,
    tags: ["games"]
  },
  {
    title: "Option 5",
    description: "This is the fifth option",
    image: image5,
    tags: ["movies"]
  },
  {
    title: "Option 6",
    description: "This is the sixth option",
    image: image6,
    tags: ["episodes"]
  },
  {
    title: "Option 7",
    description: "A thrilling adventure game",
    image: image7,
    tags: ["games"]
  },
  {
    title: "Option 8",
    description: "A classic romantic movie",
    image: image8,
    tags: ["movies"]
  },
  {
    title: "Option 9",
    description: "An intense drama episode",
    image: image9,
    tags: ["episodes"]
  },
  {
    title: "Option 10",
    description: "A fantasy strategy game",
    image: image10,
    tags: ["games"]
  },
  {
    title: "Option 11",
    description: "A sci-fi blockbuster movie",
    image: image11,
    tags: ["movies"]
  },
  {
    title: "Option 12",
    description: "A mystery thriller episode",
    image: image12,
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