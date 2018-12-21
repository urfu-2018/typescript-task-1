import { CommonView } from './common';

export class DesktopView extends CommonView {
    constructor() {
        super();
        this.className = 'desktop';
        this.newsNeedCount = 3;
        this.weatherNeedCount = 2;
    }
}
