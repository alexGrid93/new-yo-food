const EMOJI_LENGTH = 2

export const removeEmoji = (food: string): string => food.slice(EMOJI_LENGTH).trim()

export const removeEmojiByCondition = (food: string, condition: (item: string) => boolean): string => condition(food) ? food : removeEmoji(food)
