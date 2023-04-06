shell:
	cd application-shell && pnpm start

appcommon:
	cd react-app-common && pnpm dev

app1:
	cd react-app-1 && pnpm dev

app2:
	cd react-app-2 && pnpm dev

dev: shell appcommon app1 app2
