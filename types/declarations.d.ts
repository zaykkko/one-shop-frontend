declare module "*.scss" {
    const content: Record<string, string>;

    export default content;
}

declare module "*.svg?url" {
    const url: string;

    export default url;
}

declare module "*.svg?sprite" {
    type SpriteSymbol = {
        id: string;
        viewBox: string;
        content: string;
    };

    const svgSymbol: SpriteSymbol;

    export default svgSymbol;
}

declare module "*.svg" {
    const ReactComponent: React.ComponentClass<React.SVGProps<SVGSVGElement>>;

    export default ReactComponent;
}
