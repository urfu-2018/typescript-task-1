import { GeneralView } from './types';

export class DesktopView extends GeneralView {
    private articleCount: number = 3;
    private measurementCount: number = 2;
    private deviceClass: string = 'desktop';
    public render() {
        this.prepareContent(this.articleCount, this.measurementCount);
        const content = this.getContent(this.deviceClass);
        console.log(content);
    }
}
