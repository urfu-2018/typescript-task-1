import { Device } from './device';

export class DesktopView extends Device {
    constructor() {
        super();
        this.htmlClass = 'desktop';
        this.articleCount = 3;
        this.weatherCount = 2;
    }
}
