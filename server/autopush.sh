#!/bin/sh
cd codefile/$1_pipeline
git add .
git commit -m "$2 $3 $4"
git push