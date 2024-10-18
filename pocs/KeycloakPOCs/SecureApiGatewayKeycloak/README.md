# SecureApiGatewayKeycloak

## Project Overview

This project demonstrates how to set up authentication in a microservices architecture using **Keycloak**. The Keycloak server is configured via the provided files, and two distinct users with different roles and permissions are created. The API Gateway handles the routing and security while integrating with the Keycloak server.

- **Open Endpoints:** Certain endpoints for viewing events do not require authentication.
- **Secured Endpoints:** Event registration, ticket management, and user-specific features require proper authentication and role-based access control.

### User Accounts and Roles

1. **Customer User**
   - **Username:** `customer`
   - **Password:** `customer123`
   - **Role:** `customer-client`
   - **Permissions:**
     - Register for events
     - Cancel event registration

2. **Admin User**
   - **Username:** `daniel`
   - **Password:** `daniel123`
   - **Role:** `admin-client`
   - **Permissions:**
     - Create, update, and delete tickets
     - View registered users for events

## Prerequisites

- Docker and Docker Compose installed
- .NET Core SDK installed for running microservices locally

## Steps to Run the Project

### 1. Build and Run the Docker Environment

Start the Keycloak server and configure it with the required settings by running the following command in the root directory of the project:

```bash
docker-compose --build up
```

This command will build and run the Keycloak server using the configurations provided in the docker-compose.yml file and the keycloak-config folder.


### 2. Start the API Gateway

Once the Keycloak server is running, navigate to the KeycloakPOC.ApiGateway directory and run the API Gateway service with HTTPS:

```bash
dotnet run --project KeycloakPOC.ApiGateway --launch-profile "https"
```
This service will act as the gateway between users and the microservices, ensuring authentication and routing requests properly.


### 3. Start the Other Microservices

After starting the API Gateway, run the following microservices in their respective directories:

Event Management Service (Handles events and their states):

```bash
dotnet run --project KeycloakPOC.EventManagementService
```

Ticket Reservation Service (Handles event registrations and ticket management):

```bash
dotnet run --project KeycloakPOC.TicketReservationService
```

### Accessing the Endpoints

- Access to Swagger UI: https://localhost:5001/index.html
- Open Event Endpoints: No authentication required for viewing events.
- Secured Endpoints: Use the provided user credentials to interact with event registration, ticket management, and user-related features.



### Testing

You can now test the authentication flows by using the two users mentioned above:

- Customer User: Can register for events and cancel registrations.
-  Admin User: Can create, update, delete tickets, and view event statuses.

