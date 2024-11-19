if (Test-Path ".env-db") {
    . .\.env-db
} else {
    Write-Host ".env file not found!"
    exit 1
}

$MAX_RETRIES = 3      # Maximum number of retries
$RETRY_DELAY = 2      # Delay in seconds between retries

$INITIAL_MIGRATION_NAME = "Ini"

# Function to execute a command with a retry mechanism
function Execute-WithRetry {
    param (
        [string]$Command
    )
    $Retries = 0

    do {
        try {
            Invoke-Expression $Command
            return $true
        } catch {
            $Retries++
            if ($Retries -lt $MAX_RETRIES) {
                Write-Host "Attempt $Retries failed. Retrying in $RETRY_DELAY seconds..."
                Start-Sleep -Seconds $RETRY_DELAY
            } else {
                Write-Host "Command failed after $MAX_RETRIES attempts."
                return $false
            }
        }
    } while ($Retries -lt $MAX_RETRIES)
}

# Function to reset the database
function Reset-Database {
    Write-Host "Resetting the database..."
    Write-Host "Database name = $env:DB_NAME"

    # Command to drop the database
    docker exec -it postgres_merchant_db psql -U $env:DB_USER -d postgres -c "DROP DATABASE IF EXISTS $env:DB_NAME;"

    # Remove migration directories
    Get-ChildItem -Recurse -Directory -Filter "Migrations" | Remove-Item -Recurse -Force

    Write-Host "Database $env:DB_NAME reset completed."
}

# Check if the 'reset' parameter is passed
if ($args -contains "reset") {
    Reset-Database
}

# Apply migrations and update the database for InventoryService
Write-Host "Applying migration and updating the database for InventoryService..."
if (-not (Execute-WithRetry "dotnet ef migrations add $INITIAL_MIGRATION_NAME --project $env:INVENTORY_PROJECT")) {
    exit 1
}
if (-not (Execute-WithRetry "dotnet ef database update --project $env:INVENTORY_PROJECT")) {
    exit 1
}

# Apply migrations and update the database for UserService
Write-Host "Applying migration and updating the database for UserService..."
if (-not (Execute-WithRetry "dotnet ef migrations add $INITIAL_MIGRATION_NAME --project $env:USER_PROJECT")) {
    exit 1
}
if (-not (Execute-WithRetry "dotnet ef database update --project $env:USER_PROJECT")) {
    exit 1
}

Write-Host "All migrations applied and databases updated."

