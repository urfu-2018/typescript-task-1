import { View } from './types';

export class DesktopView extends View {
    public render() {
        console.log(this.renderFormat('desktop', 3, 2));
    }
}
