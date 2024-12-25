import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Sound from 'react-native-sound';

const PrefixApi = 'http://192.168.31.10:808/deslre';

const url = {
    getPageData: '/codes/getPageData',
};

const ChapterDetailComponent = ({ route, navigation }) => {
    const { id, chapterNumber, itemsPerChapter } = route.params;

    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [loading, setLoading] = useState(false);

    // 独立的状态管理
    const [amerPlaying, setAmerPlaying] = useState(false);
    const [britishPlaying, setBritishPlaying] = useState(false);
    const [amerVolumeLevel, setAmerVolumeLevel] = useState(0);
    const [britishVolumeLevel, setBritishVolumeLevel] = useState(0);

    const [amerSound, setAmerSound] = useState(null);
    const [britishSound, setBritishSound] = useState(null);

    const volumeIcons = ['volume-low-sharp', 'volume-medium-sharp', 'volume-high-sharp'];

    // 获取当前章节的单词数据
    const getPageData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                PrefixApi + url.getPageData,
                { bookId: id, page: chapterNumber, size: itemsPerChapter },
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );
            const result = response.data;

            if (result.code === 200) {
                setWords(result.data);
            } else {
                console.error('Error fetching data:', result.message);
            }
        } catch (error) {
            console.error('Request failed:', error);
        } finally {
            setLoading(false);
        }
    };

    // 初始化加载数据
    useEffect(() => {
        getPageData();
    }, []);

    // 切换到下一个单词
    const goToNextWord = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowTranslation(false); // 重置显示状态
        }
    };

    // 切换到上一个单词
    const goToPreviousWord = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowTranslation(false); // 重置显示状态
        }
    };



    const playSound = (url, isAmerican) => {
        if ((isAmerican && amerPlaying) || (!isAmerican && britishPlaying)) return;

        const setPlaying = isAmerican ? setAmerPlaying : setBritishPlaying;
        const setVolumeLevel = isAmerican ? setAmerVolumeLevel : setBritishVolumeLevel;
        const setSound = isAmerican ? setAmerSound : setBritishSound;

        setPlaying(true);

        const soundInstance = new Sound(url, null, (error) => {
            if (error) {
                console.log('Failed to load sound', error);
                setPlaying(false);
                return;
            }

            soundInstance.play((success) => {
                if (success) {
                    console.log('Sound finished playing');
                } else {
                    console.log('Playback failed');
                }
                setPlaying(false);
                setAmerVolumeLevel(0);
                setBritishVolumeLevel(0);
                clearInterval(volumeInterval);
            });
        });

        setSound(soundInstance);

        const volumeInterval = setInterval(() => {
            setVolumeLevel((prevLevel) => (prevLevel + 1) % 3);
        }, 200);

        soundInstance.setVolume(1.0);
    };

    const currentWord = words[currentIndex];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.progressText}>{currentIndex + 1}/{words.length}</Text>

                <Text style={styles.headerTitle}>第 {chapterNumber} 章单词刷题</Text>
            </View>

            <View style={styles.content}>
                {loading ? (
                    <Text style={styles.loadingText}>加载中...</Text>
                ) : currentWord ? (
                    <>
                        <Text style={styles.wordText}>{currentWord.word}</Text>
                        <TouchableOpacity
                            style={styles.translationCard}
                            onPress={() => setShowTranslation(!showTranslation)}
                        >
                            <View style={styles.translationShadow}>
                                <Text style={styles.translationText}>
                                    {showTranslation ? currentWord.trans : '点击查看释义'}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.audioContainer}>
                            <TouchableOpacity
                                onPress={() => playSound(currentWord.amerPronoun, true)}
                                style={styles.speakerButton}
                            >
                                <Ionicons
                                    name={volumeIcons[amerVolumeLevel]}
                                    size={36}
                                    color="#007BFF"
                                />
                                <Text style={styles.speakerText}>美式</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => playSound(currentWord.britishPronoun, false)}
                                style={styles.speakerButton}
                            >
                                <Ionicons
                                    name={volumeIcons[britishVolumeLevel]}
                                    size={36}
                                    color="#007BFF"
                                />
                                <Text style={styles.speakerText}>英式</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.navigationContainer}>
                            <TouchableOpacity
                                onPress={goToPreviousWord}
                                disabled={currentIndex === 0}
                                style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
                            >
                                <Text style={styles.navButtonText}>上一个</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={goToNextWord}
                                disabled={currentIndex === words.length - 1}
                                style={[styles.navButton, currentIndex === words.length - 1 && styles.disabledButton]}
                            >
                                <Text style={styles.navButtonText}>下一个</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <Text style={styles.noDataText}>没有更多单词了！</Text>
                )}
            </View>
        </View>
    );
};

export default ChapterDetailComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007BFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        position: 'absolute',
        left: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    progressText: {
        fontSize: 16,
        color: '#fff',
        position: 'absolute',
        right: 16,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        fontSize: 18,
        color: '#555',
    },
    wordText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#222',
    },
    translationCard: {
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    translationShadow: {
        padding: 10,
    },
    translationText: {
        fontSize: 20,
        color: '#444',
    },
    audioContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-around',
        width: '80%',
    },
    speakerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#E8F0FE',
        borderRadius: 10,
        width: '40%',
    },
    speakerText: {
        marginTop: 8,
        fontSize: 16,
        color: '#007BFF',
        textAlign: 'center',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    navButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#4caf50',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    navButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    noDataText: {
        fontSize: 18,
        color: '#333',
    },
});
