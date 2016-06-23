#!/bin/bash
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8

mkdir -p out
mkdir -p textmp

COUNT=0
OLDIFS=$IFS
IFS=";"
while read modifier level gamemode1 gamemode2 gamemode3; do
  FILENAME="textmp/${level}_${COUNT}.tex"
  sed "s/TEMPLATEMODIFIER.*TEMPLATEMODIFIER/${modifier}/g" < back_template.tex | \
  sed "s/TEMPLATELEVEL/${level}/g" | \
  sed "s/TEMPLATEGAMEMODE1/${gamemode1}/g" | \
  sed "s/TEMPLATEGAMEMODE2/${gamemode2}/g" | \
  sed "s/TEMPLATEGAMEMODE3/${gamemode3}/g" > $FILENAME
  #|sed "s/newline/\\\\\\\\/g" > $FILENAME
  let COUNT++
done <cards.csv
IFS=$OLDIFS

FILES=textmp/*
for f in $FILES
do
  echo "Processing $f file..."
  pdflatex -output-directory=out $f
done

#FILES=out/*pdf
#for f in $FILES
#do
#  echo "Processing $f file..."
#  convert -density 300 $f -quality 90 "out/$f.png"
#done
mkdir -p final
mv out/*.pdf final/
rsync -av final/ ~/Google\ Drive/Work/_Rules/cards
rm out/*
rm textmp/*

