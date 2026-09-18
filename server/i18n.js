import {readFileSync as nativeReadFileSync} from 'node:fs';
import {join} from 'node:path';
import tryCatch from 'try-catch';

export const readTranslations = (lang, baseDir, {readFileSync = nativeReadFileSync} = {}) => {
    const paths = [
        join(baseDir, '..', 'json', 'i18n', `${lang}.json`),
        join(baseDir, '..', 'json', 'i18n', 'en.json'),
    ];

    for (const dictPath of paths) {
        const [error, jsonString] = tryCatch(readFileSync, dictPath, 'utf8');
        
        if (!error && jsonString) {
            return JSON.parse(jsonString);
        }
    }

    return {};
};
