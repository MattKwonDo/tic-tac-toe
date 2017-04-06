

# ID=7 OLDPW=aaa NEWPW=ddd TOKEN=BAhJIiU5MjFlMjNkZTFhMjYzMTY3NjZiZDllYzM3OGJlNDZjOQY6BkVG--b91933da56de7fda89d95502d083e49ad453caf3 sh scripts/change-password.sh
API="${API_ORIGIN:-http://localhost:4741}"
URL_PATH="/change-password/$ID"
curl --include --request PATCH "${API}${URL_PATH}" \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'
