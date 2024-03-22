import fs from 'fs';
import path from 'path';

type Route = {
    path: string;
    name: string;
};

function getFiles(dir: string): string[] {
    const subdirs: string[] = fs.readdirSync(dir);
    const files: string[][] = subdirs.filter(subDir => {
        const regexp = /page\.(js|tsx)$/;
        return regexp.test(subDir) || fs.statSync(path.resolve(dir, subDir)).isDirectory();
    }).map((subdir) => {
        const res = path.resolve(dir, subdir);
        if (fs.statSync(res).isDirectory()) return getFiles(res);
        return [res.replace(path.join(`${__dirname}/..`, '.'), '').replace('/page', '')];
    });
    return files.reduce((a, f) => a.concat(f), []);
}

function buildRoutes (path: string) { 
    const files = getFiles(path);

    const routesConfig: Route[] = files.map((file) => {
        let name = file.split('.').slice(0, -1).join('.');
        return {
            path: name === '' ? '/' : name,
            name: name === '' ? '/index' : name,
        };
    });
    return routesConfig;
}
const routes = buildRoutes(path.join(`${__dirname}/..`, '.'));
fs.writeFileSync(path.join(`${__dirname}/..`, 'routes.ts'), `type Route = { path: string;name: string; };\n const routes: Route[] = ${JSON.stringify(routes)};\nexport { routes };\n`);
export default routes;