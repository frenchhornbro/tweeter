#!/bin/bash

bash zipDist.sh && bash uploadLambdas.sh && bash updateLayers.sh && echo -e '\n\nLambdas fully updated'