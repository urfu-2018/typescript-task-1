import { CommonView } from './common';

export class MobileView extends CommonView {
    constructor() {
        super();
        this.className = 'mobile';
        this.newsNeedCount = 1;
        this.weatherNeedCount = 1;
    }
}
