import { View } from './types';

export class DesktopView extends View {
    public render() {
        this.cutLatestNews(3, 2);
        console.log(this.renderFormat('desktop'));
    }
}
