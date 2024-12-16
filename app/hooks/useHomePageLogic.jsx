import { useState, useContext } from 'react';
import { MessageContext } from '../utils/Message';

const useHomePageLogic = (navigation) => {
    const [hasSignedIn, setHasSignedIn] = useState(false);
    const { showMessage } = useContext(MessageContext);

    const handleSignIn = () => {
        setHasSignedIn(true);
        showMessage('签到成功！');
    };

    const toLearn = () => {
        navigation.navigate('Learn');
    };

    const toReview = () => {
        navigation.navigate('Review');
    };

    return {
        hasSignedIn,
        handleSignIn,
        toLearn,
        toReview,
    };
};

export default useHomePageLogic;
