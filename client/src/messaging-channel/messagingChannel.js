class MessagingChannel {
    constructor() {
        if (!MessagingChannel.instance) {
            this.subscribers = {};
            MessagingChannel.instance = this;
        }
        return MessagingChannel.instance;
    }

    publish(channelId, value) {
        if (!this.subscribers[channelId]) return;
        this.subscribers[channelId].forEach((subscriberCallback) => subscriberCallback(value));
    }

    subscribe(channelId, callback) {
        if (!this.subscribers[channelId]) {
            this.subscribers[channelId] = [];
        }
        this.subscribers[channelId].push(callback);
    }
}

export const NewsChannels = {
    FilterChanged: 'filter-changed',
};

export default MessagingChannel;
