#!/bin/bash

docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Abcd1234*" -p 1433:1433 --name sql-server -d microsoft/mssql-server-linux:2017-latest
cd Backend_test.Repository
dotnet ef --startup-project ../Backend_test.API database update
cd ..
cd Publish
dotnet Backend_test.API.dll