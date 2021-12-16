ui/node_modules: ui/package.json
	(cd ui && npm i)

ui/build/static: ui/src ui/node_modules
	(cd ui && npm run build)

docker-build: ui/build/static
	docker build -t jspc/wg-map .

docker-push:
	docker push jspc/wg-map
