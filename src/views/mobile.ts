import { ViewBase } from './types';

export class MobileView extends ViewBase {
    constructor() {
        super();
        this.maxWeatherCount = 1;
        this.maxArticleCount = 1;
        this.viewName = 'mobile';
    }
}
