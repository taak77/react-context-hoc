#!/bin/bash

set -e -o pipefail

if [ "$USE_CLOUD" = "true" ]; then
  ./sauce/sauce_connect_setup.sh
  ./sauce/sauce_connect_block.sh
fi
