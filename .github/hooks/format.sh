#!/bin/bash

if [ "$TOOL_NAME" = "create" ] || [ "$TOOL_NAME" = "edit" ]; then
  npx prettier --write .
fi
