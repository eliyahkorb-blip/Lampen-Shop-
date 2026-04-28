#!/usr/bin/env bash
set -e

echo "1/6 Hole neuesten Stand von GitHub..."
git pull --rebase || git pull

echo "2/6 Prüfe ZIP..."
if [ ! -f "dito-lampen-shop.zip" ]; then
  echo "FEHLER: dito-lampen-shop.zip liegt nicht im Hauptordner."
  echo "Bitte die ZIP zuerst über GitHub hochladen und dann dieses Script nochmal starten."
  exit 1
fi

echo "3/6 Lösche falsche alte Dateien, aber behalte .git und die ZIP..."
find . -mindepth 1 -maxdepth 1 \
  ! -name ".git" \
  ! -name "dito-lampen-shop.zip" \
  -exec rm -rf {} +

echo "4/6 Entpacke Shop-Projekt..."
unzip -q dito-lampen-shop.zip

if [ ! -d "dito-lampen-shop" ]; then
  echo "FEHLER: Im ZIP wurde kein Ordner dito-lampen-shop gefunden."
  exit 1
fi

echo "5/6 Verschiebe Projekt richtig ins Repository..."
shopt -s dotglob
mv dito-lampen-shop/* .
shopt -u dotglob
rm -rf dito-lampen-shop META-INF dito-lampen-shop.zip

echo "6/6 Speichere und pushe zu GitHub..."
git add -A
git commit -m "Import shop project with correct structure" || echo "Nichts Neues zu committen."
git push

echo ""
echo "FERTIG ✅"
echo "Dein Repository sollte jetzt app, components, lib, public und package.json im Hauptordner haben."
