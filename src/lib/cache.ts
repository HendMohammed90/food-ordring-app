import{unstable_cache as nextCache } from 'next/cache';
import{cache as reactCache } from 'react';

type Callback = (...args: any[]) => Promise<any>;

export const cache = <T extends Callback>  (cb: T, Keyparts: string[] , options: {revalidate?: number | false; tags?: string[] }) => {
    return nextCache(reactCache(cb), Keyparts ,options);
};