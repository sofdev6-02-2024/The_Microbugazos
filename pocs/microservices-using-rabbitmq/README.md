# Microservices using RabbitMQ

## Project Overview

This project demonstrates a microservices architecture where services communicate asynchronously using **RabbitMQ** as the messaging broker. It consists of multiple services, each with its own responsibilities, that interact through message queues to perform tasks such as ticket processing for the Formula Airline system.

### Services:
1. **FormulaAirline.API**: Acts as the entry point for the system, receiving ticket booking requests.
2. **FormulaAirline.TicketProcessing**: Handles ticket processing and fulfillment based on requests sent from the API service.

RabbitMQ is used for communication between the API service and the Ticket Processing service to ensure decoupled and scalable microservices.

## Prerequisites

- Docker and Docker Compose installed
- .NET Core SDK installed

## Running the Project

### 1. Build and Run with Docker

The project uses Docker to orchestrate the microservices and RabbitMQ. To set up the entire environment, navigate to the root of the project directory and run the following command:

```bash
docker-compose up --build
```

This will:
    Launch a RabbitMQ broker, which handles the message communication between services.

### 2. Running the Services Locally

Navigate to the FormulaAirline.API directory and use the following command to run the service:

```bash
dotnet run --project FormulaAirline.API
```

Running the FormulaAirline.TicketProcessing Service

Similarly, navigate to the FormulaAirline.TicketProcessing directory and run the service:

```bash
dotnet run --project FormulaAirline.TicketProcessing
```

Make sure that RabbitMQ is running locally or via Docker, and that the microservices are properly configured to connect to it.
RabbitMQ Management

RabbitMQ provides a management interface to monitor and manage the queues. You can access the RabbitMQ Management interface by visiting:
```bash 
http://localhost:15672

Default credentials:

    Username: danuser
    Password: danpassword

```