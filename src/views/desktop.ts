import { CommonView } from './common';

export class DesktopView extends CommonView {
    protected weatherNeedCount = 3;
    protected newsNeedCount = 2;
    protected className = 'desktop';

    // constructor() {
    //     super('desktop', 3, 2);
    // }
}
