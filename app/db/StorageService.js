import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'savedBooks';

class StorageService {
    // 获取所有保存的书本
    static async getBooks() {
        try {
            const storedBooks = await AsyncStorage.getItem(STORAGE_KEY);
            return storedBooks ? JSON.parse(storedBooks) : [];
        } catch (error) {
            console.error('Error getting books:', error);
            return [];
        }
    }

    // 保存书本（新增或更新）
    static async saveBook(book) {
        try {
            const savedBooks = await this.getBooks();
            // 如果书本已经存在，就更新，否则添加新的书本
            const existingBookIndex = savedBooks.findIndex(b => b.id === book.id);
            if (existingBookIndex !== -1) {
                // 替换已有书本
                savedBooks[existingBookIndex] = book;
            } else {
                // 添加新的书本
                savedBooks.push(book);
            }
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedBooks));
            console.log('Book saved:', book);
        } catch (error) {
            console.error('Error saving book:', error);
        }
    }

    // 删除书本
    static async deleteBook(bookId) {
        try {
            const savedBooks = await this.getBooks();
            const updatedBooks = savedBooks.filter((book) => book.id !== bookId);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
            console.log('Book deleted:', bookId);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }

    // 更新书本信息（根据 bookId 更新）
    static async updateBook(bookId, updatedBook) {
        try {
            const savedBooks = await this.getBooks();
            const bookIndex = savedBooks.findIndex((book) => book.id === bookId);
            if (bookIndex !== -1) {
                savedBooks[bookIndex] = { ...savedBooks[bookIndex], ...updatedBook };
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedBooks));
                console.log('Book updated:', updatedBook);
            } else {
                console.log('Book not found for update');
            }
        } catch (error) {
            console.error('Error updating book:', error);
        }
    }

    // 清空所有书本
    static async clearAllBooks() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            console.log('All books cleared');
        } catch (error) {
            console.error('Error clearing books:', error);
        }
    }
}

export default StorageService;
