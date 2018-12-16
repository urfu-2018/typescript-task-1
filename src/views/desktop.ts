import { View } from '.';

export class DesktopView extends View {
    constructor() {
        super();
        this.articlesLimit = 3;
        this.measurementsLimit = 2;
        this.className = 'desktop';
    }
}
