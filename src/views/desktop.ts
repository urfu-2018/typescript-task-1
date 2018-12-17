import { BaseView } from './base';

export class DesktopView extends BaseView {
    constructor() {
        super({
            newsLimit: 3,
            measurementsLimit: 2,
            divClass: 'desktop'
        });
    }
}
