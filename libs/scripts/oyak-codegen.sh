#!/bin/bash

if [[ $1 == "" ]]
then
  echo "service name must be entered: ./codegen.sh auth vb."
  exit;
fi
cd .. 
pwd 
curl -o ./$1.yaml -k http://pgtest.oyakyatirim.com.tr/swagger/v1/swagger.yaml
node_modules/@openapitools/openapi-generator-cli/main.js generate -i $1.yaml --generator-name typescript-axios -o api/$1
prettier --write ./api/$1/*.ts
cd scripts
./postCodegen.sh $1
cd ..
rm $1.yaml
 
