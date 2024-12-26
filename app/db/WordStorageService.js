import AsyncStorage from '@react-native-async-storage/async-storage';

const WORD_STORAGE_KEY = 'savedWords';

class WordStorageService {
    // 获取所有单词
    static async getWords() {
        try {
            const storedWords = await AsyncStorage.getItem(WORD_STORAGE_KEY);
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
            await AsyncStorage.setItem(WORD_STORAGE_KEY, JSON.stringify(savedWords));
            console.log('Word saved:', word);
        } catch (error) {
            console.error('Error saving word:', error);
        }
    }

    // 更新单词的学习次数
    static async updateLearningCount(wordId, learningCount) {
        try {
            const savedWords = await this.getWords();
            const wordIndex = savedWords.findIndex(w => w.id === wordId);
            if (wordIndex !== -1) {
                const updatedWord = savedWords[wordIndex];
                updatedWord.learningCount = learningCount;

                savedWords[wordIndex] = updatedWord;
                await AsyncStorage.setItem(WORD_STORAGE_KEY, JSON.stringify(savedWords));
                console.log('Word learning count updated:', updatedWord);
            } else {
                console.log('Word not found for updating learning count');
            }
        } catch (error) {
            console.error('Error updating learning count:', error);
        }
    }

    // 更新单词的标熟状态
    static async updateFamiliarStatus(wordId, isFamiliar) {
        try {
            const savedWords = await this.getWords();
            const wordIndex = savedWords.findIndex(w => w.id === wordId);
            if (wordIndex !== -1) {
                const updatedWord = savedWords[wordIndex];
                updatedWord.isFamiliar = isFamiliar;

                savedWords[wordIndex] = updatedWord;
                await AsyncStorage.setItem(WORD_STORAGE_KEY, JSON.stringify(savedWords));
                console.log('Word familiar status updated:', updatedWord);
            } else {
                console.log('Word not found for updating familiar status');
            }
        } catch (error) {
            console.error('Error updating familiar status:', error);
        }
    }

    // 更新单词的下一次复习日期
    static async updateNextReviewDate(wordId, nextReviewDate) {
        try {
            const savedWords = await this.getWords();
            const wordIndex = savedWords.findIndex(w => w.id === wordId);
            if (wordIndex !== -1) {
                const updatedWord = savedWords[wordIndex];
                updatedWord.nextReviewDate = nextReviewDate;

                savedWords[wordIndex] = updatedWord;
                await AsyncStorage.setItem(WORD_STORAGE_KEY, JSON.stringify(savedWords));
                console.log('Word next review date updated:', updatedWord);
            } else {
                console.log('Word not found for updating next review date');
            }
        } catch (error) {
            console.error('Error updating next review date:', error);
        }
    }

    // 清空所有单词
    static async clearAllWords() {
        try {
            await AsyncStorage.removeItem(WORD_STORAGE_KEY);
            console.log('All words cleared');
        } catch (error) {
            console.error('Error clearing words:', error);
        }
    }
}

export default WordStorageService;
