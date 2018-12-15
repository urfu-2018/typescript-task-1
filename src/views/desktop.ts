import { ViewBase } from './types';

export class DesktopView extends ViewBase {
    constructor() {
        super();
        this.maxWeatherCount = 2;
        this.maxArticleCount = 3;
        this.viewName = 'desktop';
    }
}
