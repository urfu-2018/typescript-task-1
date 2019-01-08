import { CommonView } from './common';

export class DesktopView extends CommonView {
    constructor() {
        super();
        this.articlesCount = 3;
        this.measurementsCount = 2;
        this.viewType = '"desktop"';
    }
}
