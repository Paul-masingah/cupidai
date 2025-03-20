/**
 * Utilities for generating dynamic interest suggestions
 */

// Base interest categories
const interestCategories = {
  sports: [
    "Basketball", "Soccer", "Tennis", "Volleyball", "Swimming", 
    "Cycling", "Running", "Yoga", "Pilates", "Golf", "Hiking", 
    "Rock Climbing", "Skiing", "Snowboarding", "Martial Arts"
  ],
  arts: [
    "Painting", "Drawing", "Photography", "Sculpture", "Digital Art", 
    "Pottery", "Calligraphy", "Graphic Design", "Animation", "Fashion Design"
  ],
  music: [
    "Playing Piano", "Playing Guitar", "Singing", "Composing", "DJing", 
    "Music Production", "Classical Music", "Jazz", "Rock", "Hip Hop", "EDM"
  ],
  food: [
    "Cooking", "Baking", "Wine Tasting", "Craft Beer", "Food Photography", 
    "Vegetarian Cooking", "Vegan Cooking", "Barbecue", "International Cuisine"
  ],
  technology: [
    "Programming", "Web Development", "App Development", "Gaming", 
    "VR/AR", "AI", "Robotics", "3D Printing", "Blockchain"
  ],
  literature: [
    "Reading", "Writing", "Poetry", "Fiction", "Non-fiction", 
    "Book Clubs", "Creative Writing", "Journalism", "Blogging"
  ],
  travel: [
    "International Travel", "Road Trips", "Backpacking", "Solo Travel", 
    "Luxury Travel", "Adventure Travel", "Cultural Exploration", "Cruises"
  ],
  wellness: [
    "Meditation", "Mindfulness", "Fitness", "Nutrition", "Mental Health", 
    "Self-improvement", "Journaling", "Spa & Wellness"
  ],
  outdoors: [
    "Camping", "Fishing", "Gardening", "Bird Watching", "Astronomy", 
    "Kayaking", "Surfing", "Mountain Biking", "Nature Photography"
  ],
  social: [
    "Volunteering", "Community Service", "Public Speaking", "Networking", 
    "Socializing", "Party Planning", "Debate", "Politics", "Activism"
  ]
};

// Get all interests as a flat array
export const getAllInterests = (): string[] => {
  return Object.values(interestCategories).flat();
};

// Get suggested interests based on user input and existing interests
export const getSuggestedInterests = (
  userInput: string = "", 
  existingInterests: string[] = [],
  limit: number = 10
): string[] => {
  const allInterests = getAllInterests();
  
  // Filter out interests the user already has
  const availableInterests = allInterests.filter(
    interest => !existingInterests.includes(interest)
  );
  
  // If no input, return random suggestions
  if (!userInput.trim()) {
    return getRandomInterests(availableInterests, limit);
  }
  
  // Find interests that match the user input
  const matchingInterests = availableInterests.filter(
    interest => interest.toLowerCase().includes(userInput.toLowerCase())
  );
  
  // If we have enough matching interests, return them
  if (matchingInterests.length >= limit) {
    return matchingInterests.slice(0, limit);
  }
  
  // Otherwise, add some related interests from the same categories
  const matchingCategories = findMatchingCategories(userInput);
  
  // Get interests from matching categories
  const relatedInterests = matchingCategories.flatMap(category => 
    interestCategories[category as keyof typeof interestCategories]
  ).filter(
    interest => !existingInterests.includes(interest) && 
                !matchingInterests.includes(interest)
  );
  
  // Combine matching and related interests, up to the limit
  const combinedInterests = [...matchingInterests, ...relatedInterests];
  return combinedInterests.slice(0, limit);
};

// Get random interests
const getRandomInterests = (interests: string[], limit: number): string[] => {
  const shuffled = [...interests].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};

// Find categories that match user input
const findMatchingCategories = (userInput: string): string[] => {
  const input = userInput.toLowerCase();
  return Object.keys(interestCategories).filter(category => 
    category.includes(input) || 
    interestCategories[category as keyof typeof interestCategories].some(
      interest => interest.toLowerCase().includes(input)
    )
  );
};
