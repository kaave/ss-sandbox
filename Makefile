shell:
	cd application-shell && pnpm start

appcommon:
	cd react-app-common && pnpm dev

app1:
	cd react-app-1 && pnpm dev

app2:
	cd react-app-2 && pnpm dev

browser:
	open http://localhost:9000/react-1

dev: browser shell appcommon app1 app2
