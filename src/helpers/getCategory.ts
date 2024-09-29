import { categoryMapper } from './categoryMapper';

export const getCategory = (text: string) => {
  text = text.toLowerCase();
  for (const category in categoryMapper) {
    if (categoryMapper[category].some((keyword) => text.includes(keyword))) {
      return category;
    }
  }
  return 'Misc';
};
