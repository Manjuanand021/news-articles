import State from '../data/state';
import MessagingChannel, { NewsChannels } from '../messaging-channel/messagingChannel';

const KEYBOARD_EVENT_KEY = {
    ENTER: 13,
};

class FindNewsArticlesViewModel {
    constructor() {
        this._messagingChannel = new MessagingChannel(); // Singleton instance
        this._element = document.querySelector('#searchInput');
        this.setupEventListeners();
        this.clearSearchInput();
    }

    setupEventListeners() {
        this._element.addEventListener('keypress', (keyboardEvent) => {
            if (keyboardEvent?.keyCode !== KEYBOARD_EVENT_KEY.ENTER) return;
            this.fetchNews(keyboardEvent?.target?.value);
        });
    }

    fetchNews(searchTerm) {
        State.searchTerm = searchTerm;
        this._messagingChannel.publish(NewsChannels.FilterChanged, searchTerm);
    }

    clearSearchInput() {
        this._element.value = '';
    }
}

export default FindNewsArticlesViewModel;
