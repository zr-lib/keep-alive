export interface ConfigProps {
    store: any;
    maxLength: number;
    useStorage?: 'sessionStorage' | 'localStorage';
}
declare const configKeepAlive: (props?: Partial<ConfigProps>) => {
    store: any;
    maxLength: number;
    useStorage?: "sessionStorage" | "localStorage" | undefined;
    cacheName: string;
};
export default configKeepAlive;
