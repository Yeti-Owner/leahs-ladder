import image1 from './assets/1.png';
import image2 from './assets/2.png';
import image3 from './assets/3.png';
import image4 from './assets/4.png';
import image5 from './assets/5.png'; 
import image6 from './assets/6.png';

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