#!/bin/bash
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8

mkdir -p svgtmp

#just copy files to avoid mess with static paths in svg
cp images/* svgtmp/

COUNT=0
OLDIFS=$IFS
IFS=";"
while read modifier level gamemode1 gamemode2 gamemode3; do
  FILENAME="svgtmp/${level}_${COUNT}.svg"
  sed "s/TEMPLATEMODIFIER.*TEMPLATEMODIFIER/${modifier}/g" < images/front_template.svg | \
  sed "s/TEMPLATELEVEL/${level}/g" | \
  sed "s/TEMPLATEGAMEMODE1/${gamemode1}/g" | \
  sed "s/TEMPLATEGAMEMODE2/${gamemode2}/g" | \
  sed "s/TEMPLATEGAMEMODE3/${gamemode3}/g" > $FILENAME
  #|sed "s/newline/\\\\\\\\/g" > $FILENAME
  let COUNT++
done <cards.csv
IFS=$OLDIFS

FILES=svgtmp/*svg
for f in $FILES
do
  #/Applications/Inkscape.app/Contents/Resources/bin/inkscape --export-eps "$(pwd)/output.eps" -d300 "$(pwd)/front_template.svg"
  /Applications/Inkscape.app/Contents/Resources/bin/inkscape --export-eps "$(pwd)/$f.eps" --export-text-to-path "$(pwd)/$f"
done
mkdir -p final
mv svgtmp/*.eps final/
#rsync -av final/ ~/Google\ Drive/Work/_Rules/cards
rm svgtmp/*

