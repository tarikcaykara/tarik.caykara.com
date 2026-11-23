#!/usr/bin/env bash
# Checks a running copy of the site against nginx.conf: one-URL redirects, status
# codes, headers and <meta name="version">. Run from the repo root:
#
#   bash scripts/check-site.sh <base-url> [version]
#
# base-url  http://127.0.0.1:8080 (container) or https://tarik.caykara.com, no trailing slash
# version   expected <meta name="version">; defaults to package.json
# CHECK_RESOLVE=host:443:ip pins DNS for curl, e.g. right after a DNS change.
# Over https it also expects HSTS and nosniff, which the Cloudflare zone adds.
set -eu

base=${1:?usage: bash scripts/check-site.sh <base-url> [version]}
want=${2:-$(sed -n 's/^  "version": "\([^"]*\)",$/\1/p' package.json)}
failures=0

fetch() { # status line and headers for a path; the body is discarded
  curl -sS --path-as-is -m 15 -o /dev/null -D - \
    ${CHECK_RESOLVE:+--resolve} ${CHECK_RESOLVE:+"$CHECK_RESOLVE"} "$base$1" | tr -d '\r'
}

header() { # value of the first header named $2 in the headers $1
  printf '%s\n' "$1" | awk -v n="$2" 'BEGIN { n = tolower(n) }
    { i = index($0, ":"); if (i && tolower(substr($0, 1, i - 1)) == n) {
        v = substr($0, i + 1); sub(/^ +/, "", v); print v; exit } }'
}

report() { # report ok|FAIL message
  printf '%-4s %s\n' "$1" "$2"
  if [ "$1" != ok ]; then failures=$((failures + 1)); fi
}

expect() { # expect path status [location]
  local h code loc
  h=$(fetch "$1")
  code=$(printf '%s\n' "$h" | awk 'NR == 1 { print $2 }')
  loc=$(header "$h" location)
  if [ "$code" = "$2" ] && [ "$loc" = "${3-}" ]; then
    report ok "$1 -> $code${loc:+ $loc}"
  else
    report FAIL "$1 -> $code${loc:+ $loc} (want $2${3:+ $3})"
  fi
}

expect_header() { # expect_header path name value
  local v
  v=$(header "$(fetch "$1")" "$2")
  if [ "$v" = "$3" ]; then report ok "$1 $2: $v"; else report FAIL "$1 $2: '$v' (want '$3')"; fi
}

expect / 200
expect /index 301 /
expect /index.html 301 /
expect /notes 200
expect /notes.html 301 /notes
expect '/notes.html?utm_source=check' 301 '/notes?utm_source=check'
expect /notes/ 301 /notes
expect /notes/any-note.html 301 /notes/any-note
expect /notes/any-note/ 301 /notes/any-note
expect /google5489f3ca6464b08c.html 200
expect /404.html 404
expect /404 404
expect /missing-page 404
expect /_astro 404
expect //evil.example/ 404
for path in /rss.xml /sitemap-index.xml /robots.txt /og.png /favicon.svg; do
  expect "$path" 200
done

expect_header / cache-control 'public, max-age=0, must-revalidate'
expect_header / referrer-policy strict-origin-when-cross-origin
expect_header / permissions-policy 'camera=(), microphone=(), geolocation=()'

page=$(curl -sS -m 15 ${CHECK_RESOLVE:+--resolve} ${CHECK_RESOLVE:+"$CHECK_RESOLVE"} "$base/")
asset=$(printf '%s' "$page" | grep -o '/_astro/[^"]*' | head -n 1)
if [ -n "$asset" ]; then
  expect_header "$asset" cache-control 'public, max-age=31536000, immutable'
else
  report FAIL "/ links no /_astro/ file"
fi

got=$(printf '%s' "$page" | sed -n 's/.*<meta name="version" content="\([^"]*\)".*/\1/p' | head -n 1)
if [ "$got" = "$want" ]; then report ok "version $got"; else report FAIL "version '$got' (want '$want')"; fi

case $base in
https://*)
  expect_header / x-content-type-options nosniff
  hsts=$(header "$(fetch /)" strict-transport-security)
  if [ -n "$hsts" ]; then report ok "/ strict-transport-security: $hsts"; else report FAIL "/ strict-transport-security missing"; fi
  ;;
esac

if [ "$failures" -ne 0 ]; then
  echo "$failures check(s) failed"
  exit 1
fi
echo "all checks passed"
