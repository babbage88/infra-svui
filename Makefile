DOCKER_HUB:=jtrahan88/infraui:
DOCKER_HUB_TEST:=jtrahan88/infraui-test:

buildandpush:
	docker buildx use infrauibuilder
	docker buildx build --build-arg NODE_ENV=production --platform linux/amd64,linux/arm64 -t $(DOCKER_HUB)$(tag) . --push

buildandpushlocalk3:
	docker buildx use infrauibuilder
	docker buildx build --build-arg NODE_ENV=test --platform linux/amd64,linux/arm64 -t $(DOCKER_HUB_TEST)$(tag) . --push
deployk3: buildandpush
	kubectl apply -f deployment/kubernetes/deployment.yaml
	kubectl rollout restart deployment infraui

deploylocalk3: buildandpushlocalk3
	kubelocal apply -f deployment/kubernetes/localdev/deployment.yaml
	kubelocal rollout restart deployment infraui