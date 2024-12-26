import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'savedWords';

class WordStorageService {
    // 获取所有保存的单词
    static async getWords() {
        try {
            const storedWords = await AsyncStorage.getItem(STORAGE_KEY);
            return storedWords ? JSON.parse(storedWords) : [];
        } catch (error) {
            console.error('Error getting words:', error);
            return [];
        }
    }

    // 保存单词（新增或更新）
    static async saveWord(word) {
        try {
            const savedWords = await this.getWords();
            // 如果单词已经存在，就更新，否则添加新的单词
            const existingWordIndex = savedWords.findIndex(w => w.id === word.id);
            if (existingWordIndex !== -1) {
                // 替换已有单词
                savedWords[existingWordIndex] = word;
            } else {
                // 添加新的单词
                savedWords.push(word);
            }
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedWords));
            console.log('Word saved:', word);
        } catch (error) {
            console.error('Error saving word:', error);
        }
    }

    // 删除单词
    static async deleteWord(wordId) {
        try {
            const savedWords = await this.getWords();
            const updatedWords = savedWords.filter((word) => word.id !== wordId);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWords));
            console.log('Word deleted:', wordId);
        } catch (error) {
            console.error('Error deleting word:', error);
        }
    }

    // 更新单词信息（根据 wordId 更新）
    static async updateWord(wordId, updatedWord) {
        try {
            const savedWords = await this.getWords();
            const wordIndex = savedWords.findIndex((word) => word.id === wordId);
            if (wordIndex !== -1) {
                savedWords[wordIndex] = { ...savedWords[wordIndex], ...updatedWord };
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedWords));
                console.log('Word updated:', updatedWord);
            } else {
                console.log('Word not found for update');
            }
        } catch (error) {
            console.error('Error updating word:', error);
        }
    }

    // 清空所有单词
    static async clearAllWords() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            console.log('All words cleared');
        } catch (error) {
            console.error('Error clearing words:', error);
        }
    }
}

export default WordStorageService;
