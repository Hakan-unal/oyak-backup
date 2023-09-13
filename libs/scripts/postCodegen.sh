#!/bin/bash

cd ..  
if [ -d "src/api/$1/" ]; then
    cd src/api/$1  
    sed -i.bak '21i\
    // @ts-ignore
    ' api.ts
 
    pwd
    git checkout -- base.ts
    rm package.json
    rm README.md
    rm tsconfig.json
    rm git_push.sh
    rm api.ts.bak
    rm -rf .*
fi
 

