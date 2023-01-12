#!/usr/bin/env sh

# abort on errors
set -e

# build
npm ci
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git config --global user.email "vincent.dimarco1@gmail.com"
git config --global user.name "Vincentdm31"

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:vincentdm31/Mealaway.git main:pages

cd -