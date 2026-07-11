#!/bin/bash
cd "/Users/sapirtsory/Desktop/Luna/Onboarding"
export PATH="/Users/sapirtsory/Desktop/Luna/Onboarding/.tools/node/bin:$PATH"
exec npm run dev -- --port 5183 --strictPort
