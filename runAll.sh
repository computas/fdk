#!/usr/bin/env bash
set -e

. ./buildGroupsEnv.sh

# We will build what is needed and download images that are missing
for i in "${!BUILD_APPS[@]}"; do
    ./buildOrPullApplication.sh "${BUILD_APPS[$i]}" "${BUILD_CMD[$i]}"
done

docker-compose down --remove-orphans

docker-compose up -d
