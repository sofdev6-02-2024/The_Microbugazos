#!/bin/bash

run_migration() {
    local project_path=$1
    echo "Updating database for $project_path..."
    dotnet ef database update --project $project_path
}

inventory_project="InventoryService/src/InventoryService.Api/"
user_project="UserService/src/UserService.Api/"

run_migration $inventory_project
run_migration $user_project

echo "Migrations and updates completed for all projects."

