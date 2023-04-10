declare module '@/assets/icons/*.svg' {
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module "@/*.json" {
    const value: any;
    export default value;
}

declare module '*.scss' {
    const resource: { [key: string]: string };
    export = resource;
}

declare module "*.png" {
    const value: any;
    export = value;
}

declare module '*.mp3' {
    const src: string;
    export default src;
}



declare var process: {
    env: {
        NODE_ENV: string
        USER_EMAIL: string
        USER_PASSWORD: string
        API_TOKEN: string
        API_MARKER: string
    }
}
