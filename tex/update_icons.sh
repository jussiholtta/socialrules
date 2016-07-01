#!/bin/bash
FILES=images/iconsvg/*
for f in $FILES
do
  /Applications/Inkscape.app/Contents/Resources/bin/inkscape --export-png "$(pwd)/${f%.svg}.png" --export-text-to-path -d300 "$(pwd)/$f"
done

mv images/iconsvg/*png images/

