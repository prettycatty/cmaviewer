import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
    y?: number;
    x?: number;
    start?: number;
    duration?: number;
};

export const flyAndScale = (
    node: Element,
    params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;

    const scaleConversion = (
        valueA: number,
        scaleA: [number, number],
        scaleB: [number, number]
    ) => {
        const [minA, maxA] = scaleA;
        const [minB, maxB] = scaleB;

        const percentage = (valueA - minA) / (maxA - minA);
        const valueB = percentage * (maxB - minB) + minB;

        return valueB;
    };

    const styleToString = (
        style: Record<string, number | string | undefined>
    ): string => {
        return Object.keys(style).reduce((str, key) => {
            if (style[key] === undefined) return str;
            return str + `${key}:${style[key]};`;
        }, "");
    };

    return {
        duration: params.duration ?? 200,
        delay: 0,
        css: (t) => {
            const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
            const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
            const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

            return styleToString({
                transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                opacity: t
            });
        },
        easing: cubicOut
    };
};

export function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export function getShortString(str: string) {
    if (str.length > 15) {
        str = str.slice(0, 5) + "..." + str.slice(str.length - 5, str.length);
    }
    return str;
}

export const convertNumberToUSDFormat = (str: string) => {
    if (str == "") return;
    const num = parseFloat(str);
    let res = num.toLocaleString('en-US');
    return res;
}

export const getDOMValue = (listDate: string, soldDate: string | undefined | null) => {
    let date1 = new Date(listDate).getTime();
    let date2 = new Date().getTime();;

    if (!(soldDate == '' || soldDate == undefined || soldDate == null)) {        
        date2 = new Date(soldDate).getTime();
    }

    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

    const diffDays = Math.round(Math.abs((date2 - date1) / oneDay));

    return diffDays + " Days";
}