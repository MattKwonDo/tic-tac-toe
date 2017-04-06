

# ID=2 OLDPW=aaa NEWPW=ddd TOKEN=xxxx sh scripts/change-password.sh
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
