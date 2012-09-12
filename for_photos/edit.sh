#!/bin/bash

TARGET="./edited"
SOURCE="./unedited"

if [ ! -d $TARGET ]; then mkdir $TARGET; fi;

# creates the screen image
for f in $SOURCE/*.jpg;
do
    echo "Processing $f"
    convert -quality 85 $f $TARGET/$(basename $f)
done

