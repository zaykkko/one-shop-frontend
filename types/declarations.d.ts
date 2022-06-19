declare module "*.scss" {
    const content: Record<string, string>;

    export default content;
}

declare module "*.svg?url" {
    const url: string;

    export default url;
}

declare module "*.svg" {
    const ReactComponent: React.ComponentClass<React.SVGProps<SVGSVGElement>>;

    export default ReactComponent;
}
