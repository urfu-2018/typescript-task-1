import { BaseView } from './base';

export class MobileView extends BaseView {
    constructor() {
        super({
            newsLimit: 1,
            measurementsLimit: 1,
            divClass: 'mobile'
        });
    }
}
