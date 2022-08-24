export declare const signup: (req: any, res: any) => Promise<void>;
export declare const signin: (req: any, res: any) => Promise<any>;
export declare const logout: (req: {
    headers: {
        [x: string]: any;
    };
}, res: any) => Promise<void>;
export declare const encryptPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, recievedPassword: string) => Promise<boolean>;
