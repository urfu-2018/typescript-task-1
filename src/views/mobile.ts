import { Device } from './device';

export class MobileView extends Device {
    constructor() {
        super();
        this.htmlClass = 'mobile';
        this.articleCount = 1;
        this.weatherCount = 1;
    }
}
