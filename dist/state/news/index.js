"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observable_1 = require("../../utils/observable");
class NewsState extends observable_1.Observable {
    constructor() {
        super(...arguments);
        this.articles = [];
    }
    getArticles() {
        return this.articles;
    }
    setArticles(articles) {
        this.articles.push(...articles);
        this.notifyObservers();
    }
}
exports.NewsState = NewsState;
