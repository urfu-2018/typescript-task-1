import { CommonView } from './common';

export class MobileView extends CommonView {
    constructor() {
        super();
        this.articlesCount = 1;
        this.measurementsCount = 1;
        this.viewType = '"mobile"';
    }
}
