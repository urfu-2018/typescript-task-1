import { View } from '.';

export class MobileView extends View {
    constructor() {
        super();
        this.articlesLimit = 1;
        this.measurementsLimit = 1;
        this.className = 'mobile';
    }
}
