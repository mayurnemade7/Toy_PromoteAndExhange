/**
 * @file reelDataset.js
 * @description ES Module containing the @ojas_met_krishna reel dataset, schema definitions,
 * and utility query helpers for integration with the Ravet Parent Toy Exchange Web Platform.
 */

import reelData from './reelDataset.json' with { type: 'json' };

/**
 * Filter reels by target toddler age in months.
 * @param {number} ageMonths 
 * @returns {Array} Array of matching reels
 */
export function getReelsByAgeMonths(ageMonths) {
  return reelData.reels.filter(reel => {
    const min = reel.targetToy.recommendedAgeMonths.min;
    const max = reel.targetToy.recommendedAgeMonths.max;
    return ageMonths >= min && ageMonths <= max;
  });
}

/**
 * Filter reels by developmental skill category.
 * @param {string} skillId (e.g. 'SKILL_FINE_MOTOR', 'SKILL_STEM')
 * @returns {Array} Array of matching reels
 */
export function getReelsBySkill(skillId) {
  return reelData.reels.filter(reel => 
    reel.metadata.primarySkillIds.includes(skillId)
  );
}

/**
 * Filter reels by sub-locality in Ravet/PCMC area.
 * @param {string} subLocality 
 * @returns {Array} Array of matching reels
 */
export function getReelsBySubLocality(subLocality) {
  const searchTerm = subLocality.toLowerCase();
  return reelData.reels.filter(reel => 
    reel.targetToy.currentOwnerLocation.toLowerCase().includes(searchTerm)
  );
}

/**
 * Search reels by ManyChat keyword.
 * @param {string} keyword 
 * @returns {Object|null} Reel matching keyword
 */
export function getReelByManyChatKeyword(keyword) {
  const formattedKeyword = keyword.trim().toUpperCase();
  return reelData.reels.find(reel => reel.webPlatformMapping.manyChatKeyword === formattedKeyword) || null;
}

export { reelData };
export default reelData;
