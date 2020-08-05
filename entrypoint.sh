#!/bin/bash

yarn webdriver-manager clean
yarn webdriver-manager update --standalone
yarn webdriver-manager start &

# while ! nc -z 127.0.0.1 4444; do echo "Waiting for selenium on 127.0.0.1"; sleep 5; done

sleep 20; yarn test