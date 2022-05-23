#!/usr/bin/env bash

if [[ $# -ne 2 ]]; then
	echo "usage: ${0} username password"
	exit 1
fi

username=${1}
password=${2}

curl -X POST 'http://localhost:8080/realms/Ripple-HotSeat/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=password' \
 --data-urlencode 'client_id=ripple-hotseat' \
 --data-urlencode 'client_secret=cRo0Zlf4kBXUy80ct6yafIFYPlPmQMWf' \
 --data-urlencode "username=${username}" \
 --data-urlencode "password=${password}"
