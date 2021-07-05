import MessagingChannel from './messaging-channel/messagingChannel';
import FindNewsArticlesViewModel from './viewModels/findNewsArticlesViewModel';
import NewsArticlesViewModel from './viewModels/NewsArticlesViewModel';

function init() {
    const messagingChannel = new MessagingChannel(); // Singleton instance
    const findNewsArticlesViewModel = new FindNewsArticlesViewModel();
    const newsArticlesViewModel = new NewsArticlesViewModel();
    findNewsArticlesViewModel.fetchNews();
}

window.addEventListener('DOMContentLoaded', () => init());
