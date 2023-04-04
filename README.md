```bash
cd ./application-shell
pnpm install

cd ../react-app-common
pnpm install

cd ../react-app-1
pnpm install

cd ../react-app-2
pnpm install

cd ../
make dev -j 4
```

Memo: https://github.com/joeldenning/vite-single-spa-root-config
