.PHONY: build deploy tag clean

ORG_NAME ?= cobrijani

build:
	${INFO} "Building all images..."
	${INFO} "Building Gateway..."
	@ cd ./../gateway && mvn package -Pprod -DskipTests jib:dockerBuild
	${INFO} "Building Blog-app..."
	@ cd ./../blog-app && mvn package -Pprod -DskipTests jib:dockerBuild
	${INFO} "Building Follower-app..."
	@ cd ./../follower && mvn package -Pprod -DskipTests jib:dockerBuild
	${INFO} "Build Complete!"

clean:
	${INFO} "Cleaning images ..."
	@ docker system prune
	${INFO} "Clean complete!"

tag:
	${INFO} "Tagging images..."
	@ docker tag gateway $(ORG_NAME)/gateway
	@ docker tag blog $(ORG_NAME)/blog
	@ docker tag follower $(ORG_NAME)/follower
	${INFO} "Tagging complete!"	


deploy:
	${INFO} "Deploying images to k8s..."
	@ bash kubectl-apply.sh




# Cosmetics
YELLOW := "\e[1;33m"
NC := "\e[0m"

# Shell Functions
INFO := @bash -c '\
  printf $(YELLOW); \
  echo "=> $$1"; \
  printf $(NC)' SOME_VALUE
