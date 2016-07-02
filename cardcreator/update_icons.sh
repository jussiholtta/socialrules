#!/bin/bash
FILES=images/iconsvg/*
for f in $FILES
do
  /Applications/Inkscape.app/Contents/Resources/bin/inkscape --export-png "$(pwd)/${f%.svg}.png" -C --export-text-to-path -d1200 "$(pwd)/$f"
done

mv images/iconsvg/*png images/

