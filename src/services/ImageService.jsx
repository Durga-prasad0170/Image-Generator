// src/services/imageService.js
import { createApi } from 'unsplash-js';

// Create the Unsplash API client
const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  // No need for nodeFetch in browser environment
});

export const generateImage = async (prompt) => {
  try {
    const result = await unsplash.search.getPhotos({
      query: prompt,
      perPage: 20,
      orientation: 'squarish'
    });

    if (result.errors) {
      throw new Error(result.errors[0]);
    }

    // If no photos found, throw error
    if (result.response.results.length === 0) {
      throw new Error('No images found for this prompt');
    }

    // const photo = result.response.results[10];
    const photos = result.response.results.map(photo => ({
        url: photo.urls.regular,
        attribution: {
          photographer: photo.user.name,
          photographerUrl: photo.user.links.html,
          unsplashUrl: photo.links.html
        }
      }));
      
    
    return photos
    
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};

// Optional: If you want to keep the random image functionality
export const getRandomImage = async (prompt = '') => {
  try {
    const result = await unsplash.photos.getRandom({
      query: prompt,
      count: 1
    });

    if (result.errors) {
      throw new Error(result.errors[0]);
    }

    const photo = result.response[0];
    
    return {
      url: photo.urls.regular,
      attribution: {
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
        unsplashUrl: photo.links.html
      }
    };
  } catch (error) {
    console.error('Error fetching random image:', error);
    throw error;
  }
};