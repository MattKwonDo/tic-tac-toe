#!/bin/bash

# ID=6 TOKEN=BAhJIiVlZjc4ZWIyOTAzNGFkYmQ1NjQyNTg3Yzk2MTk5NThjYwY6BkVG--5cba12d8ba4ef870fcd961ddaeb7bbc420bda876 sh scripts/sign-out.sh
API="${API_ORIGIN:-http://localhost:4741}"
URL_PATH="/sign-out/$ID"
curl "${API}${URL_PATH}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=$TOKEN"

# data output from curl doesn't have a trailing newline
echo
