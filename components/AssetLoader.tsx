import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
    atomFamily,
    selectorFamily,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";
import { DefaultLoadingManager, LoadingManager, TextureLoader } from "three";

// Loads in assets at root and makes available by url as id
// to other components
const atomAssetFamily = atomFamily({
    key: "assetFamily",
    default: null,
});

const assetSelectorFamily = selectorFamily<Array<any>, Array<string>>({
    key: "assetSelector",
    get:
        (links: Array<string>) =>
        ({ get }) =>
            links.map((link) => get(atomAssetFamily(link))),
    set:
        (links: Array<string>) =>
        ({ set }, dataArr) => {
            if (!Array.isArray(dataArr))
                throw Error("assetSelectorFamily value must be an array");
            links.forEach((link, index) => {
                set(atomAssetFamily(link), dataArr[index]);
            });
        },
});

export const useAssetLoader = (links: Array<string>) => {
    let setData = useSetRecoilState(assetSelectorFamily(links));
    useEffect(() => {
        DefaultLoadingManager.onProgress = (url, loaded, total) => {
            console.log(url, loaded, total);
        };
    }, [setData]);
};

export const useAssets = (links: string[]) => {
    return useRecoilValue(assetSelectorFamily(links));
};

export function AssetLoader() {
    const links = [
        "https://images.unsplash.com/photo-1692496508898-18963724d9e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
        "https://cdn.bmschoi.dev/noisemaps/Perlin/Perlin%2010%20-%20512x512.png",
    ];
    useAssetLoader(links);
    return null;
}
