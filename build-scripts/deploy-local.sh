#!/bin/bash
# For local builds

# These variables are declared by the CI server automatically
# or in ther config files. I have not found a way to make travis-ci
# share environment variables declared in one shell script with
# other shell scripts in the same build, so for local builds
# they need to be declared also here.
# THIS IMPLIES THAT THIS LOCAL BUILD AND THE TRAVIS-CI BUILD
# MIGHT DIFFER. TO-DO: IF THIS BUILD STRUCTURE IS KEPT, A
# SCRIPT THAT BUILDS BOTH THIS SCRIPT AND .TRAVIS.YML FROM
# A SET OF COMMON VARIABLES COULD BE USEFUL.

export TRAVIS_BUILD_DIR=${PWD}
export GITHUB_WORKSPACE=${PWD}

################################################

# Get the absolute path of this script
# so we can call it from anywhere and keep the
# other scripts with relative paths

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Using source makes all of them run in the same shell process
# so they can share functions and variables

# This builds a project that can be deployed remotely in GitHub pages with the API where
# the testdeployment configuration says (currently Heroku)
ng build --configuration=testdeployment --baseHref="https://sitmun.github.io/admin-app/"

source $DIR/deploy.sh
