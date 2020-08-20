#!/bin/bash

# Setting timestamp so that the frontend can tell if the server has restarted or not.
# Should NOT be run on production like environments 
PREVIOUS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. >/dev/null 2>&1 && pwd )"
FILE="${PREVIOUS_DIR}/src/.server-restart-version.js"

timestamp=$(date +%s)

echo "Setting server restart version to ${timestamp} for ${FILE}"
echo "${timestamp}" > "$FILE"

cat > "${FILE}" <<-EOF
export const lastRestartTimestamp = () => {
  return "$timestamp";
};
EOF