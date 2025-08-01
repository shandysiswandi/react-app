#!/bin/sh

# Replace env vars in template
envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

exec "$@"
