import fetchData from '../services/dataService';
import State from '../data/state';
import MessagingChannel, { NewsChannels } from '../messaging-channel/messagingChannel';
import * as Config from '../config/config';

class NewsArticlesViewModel {
    _hostElement;
    constructor() {
        this._messagingChannel = new MessagingChannel(); // Singleton instance
        this.setupHostElement();
        this.setupEventListeners();
    }

    setupHostElement() {
        this._hostElement = document.querySelector('#newsWrapper');
    }

    setupEventListeners() {
        this._messagingChannel.subscribe(NewsChannels.FilterChanged, this.loadArticles.bind(this));
    }

    async loadArticles(searchTerm) {
        if (!searchTerm) {
            this.renderInfoBar();
            return;
        }

        try {
            this.renderSpinner();
            const { articles } = await fetchData(`${Config.SOURCE_COUNTRY_CODE}/${searchTerm}`);
            State.articles = articles;
            if (State?.articles?.length > 0) {
                this.renderArticles();
            } else {
                this.renderNotification();
            }
        } catch (error) {
            console.error(error);
            this.renderNotification(error);
        }
    }

    renderSpinner() {
        const markup = `
        <section class="text-center">
        <div class="inline-flex items-center  transition ease-in-out duration-150 cursor-not-allowed">
              <svg class="animate-spin -ml-1 mr-3 h-14 w-14"
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24">
                    <circle class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"></circle>
                    <path class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
              </svg>
              <span class="italic">loading news for <span class="font-bold">${State.searchTerm}</span>.</span>
        </div>
  </section>
        `;
        this.clearDom();
        this._hostElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderNotification(errorMessage) {
        let markup = '';
        if (errorMessage) {
            markup = `
        <section>
            <div class="bg-red-100 border-t-4 border-red-400 rounded-b text-teal-900 px-4 py-3 shadow-md"
                role="alert">
                <div class="flex">
                        <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path
                                        d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                            </svg></div>
                        <div>
                            <p>Error occurred while fetching news articles for <span class="font-bold">${State.searchTerm}</span>.</p>
                            <p class="text-sm">${errorMessage}</p>
                        </div>
                </div>
            </div>
        </section>
        `;
        } else {
            markup = `
        <section>
            <div class="bg-green-100 border-t-4 border-green-400 rounded-b text-teal-900 px-4 py-3 shadow-md"
                role="alert">
                <div class="flex">
                        <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path
                                        d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                            </svg></div>
                        <div>
                            <p>No items found for search term <span class="font-bold">${State.searchTerm}</span>.</p>                            
                        </div>
                </div>
            </div>
        </section>
        `;
        }

        this.clearDom();
        this._hostElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderArticles() {
        const markup = `<div class="my-1">
        <h3
            class="inline-block  text-sm font-semibold text-gray-700 mr-2 mb-2">
              Search results for <span class="bg-gray-200 rounded-full px-3 py-1"><i>${State.searchTerm}</i></span>
        </h3>
  </div>
  <div class="section-body">
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              ${State.articles.map(renderArticle).join('')}
        </div>
        </div>`;
        this.clearDom();
        this._hostElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderInfoBar() {
        const markup = `
        <section class="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative"
                     role="alert">
                  <strong class="font-bold">Start by searching a term to see the results.</strong>
                  <span class="block sm:inline">Examples - manchester united, bitcoin, corona etc.</span>
            </section>
        `;
        this.clearDom();
        this._hostElement.insertAdjacentHTML('afterbegin', markup);
    }

    clearDom() {
        this._hostElement.innerHTML = '';
    }
}

function renderArticle(article) {
    return `
        <div class="rounded overflow-hidden shadow-lg">
              <a href="${article.url}" target="_blank">
                    <img class="w-full"
                          src="${article.urlToImage}"
                          alt="Forest">
                    <div class="px-6 py-4">
                          <div class="font-bold text-xl mb-2">${article.title}</div>
                          <p class="text-gray-700 text-base">
                                ${article.description}
                          </p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                        ${article.author ? renderTag(article.author) : ''}
                        ${
                            article.publishedAt ? renderTag(formatDate(article.publishedAt)) : ''
                        }                                                        
                    </div>
              </a>
        </div>`;
}

function renderTag(input) {
    return `<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    ${input}
</span>`;
}

function formatDate(isoString) {
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(isoString));
}

export default NewsArticlesViewModel;
