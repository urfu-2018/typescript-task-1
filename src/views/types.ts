export interface IView {
    render(): void;
}

export enum ViewType {
    Desktop = 'desktop',
    Mobile = 'mobile'
}
