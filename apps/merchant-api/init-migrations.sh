#!/bin/bash

if [ -f .env ]; then
  source .db.env
else
  echo ".env file not found!"
  exit 1
fi

MAX_RETRIES=3      # Maximum number of retries
RETRY_DELAY=2      # Delay in seconds between retries

INITIAL_MIGRATION_NAME="Ini"

# Function to execute a command with retry mechanism
function execute_with_retry {
  local cmd="$1"
  local retries=0

  until $cmd
  do
    retries=$((retries + 1))
    if [ $retries -lt $MAX_RETRIES ]; then
      echo "Attempt $retries failed. Retrying in $RETRY_DELAY seconds..."
      sleep $RETRY_DELAY
    else
      echo "Command failed after $MAX_RETRIES attempts."
      return 1
    fi
  done
}

# Function to reset the database
function reset_database {
  echo "Resetting the database..."
  echo "database name = $DB_NAME"

  docker exec -it postgres_merchant_db psql -U $DB_USER  -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"

  find . -type d -name "Migrations" -exec rm -r {} +

  echo "Database $DB_NAME reset completed."
}

# Check if 'reset' parameter is passed
if [ "$1" == "reset" ]; then
  reset_database
fi

# Run migrations and database update for InventoryService
echo "Applying migration and updating database for InventoryService..."
execute_with_retry "dotnet ef migrations add $INITIAL_MIGRATION_NAME --project $INVENTORY_PROJECT"
execute_with_retry "dotnet ef database update --project $INVENTORY_PROJECT"

# Run migrations and database update for UserService
echo "Applying migration and updating database for UserService..."
execute_with_retry "dotnet ef migrations add $INITIAL_MIGRATION_NAME --project $USER_PROJECT"
execute_with_retry "dotnet ef database update --project $USER_PROJECT"


# Run migrations and database update for PAYMENT_PROJECT
echo "Applying migration and updating database for PAYMENT_PROJECT..."
execute_with_retry "dotnet ef migrations add $INITIAL_MIGRATION_NAME --project $PAYMENT_PROJECT"
execute_with_retry "dotnet ef database update --project $PAYMENT_PROJECT"

echo "All migrations applied and databases updated."
