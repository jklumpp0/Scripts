#!/bin/bash

#
# Filename: rename.sh
# Description: Renames files and folders to lowercase recursively
#              from the current directory
# Variables: Source = x
#            Destination = y

#
# Rename all directories. This will need to be done first.
#

# Process each directory’s contents before the directory  itself
SOURCE="unedited"

for x in $SOURCE/*;
do
  # Translate Caps to Small letters
  y=$(echo $x | tr '[A-Z]' '[a-z]');

  # check if the source and destination is the same
  if [ "$x" != "$y" ]; then
    mv $x $y
  fi

done

exit 0


