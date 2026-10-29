#!/bin/sh
# usage: scripts/bump.sh N   — marks a new build so every device reloads and re-fetches all scripts
N=$1
sed -i "s/\.js?v=[0-9]*\"/.js?v=$N\"/g" index.html
sed -i "s/const BUILD=[0-9]*;/const BUILD=$N;/" autoupdate.js
echo $N > version.txt

sed -i "s/\"build [0-9]*\"/\"build $N\"/" showkit.js
sed -i "s/const JB_BUILD=[0-9]*;/const JB_BUILD=$N;/" join.html
