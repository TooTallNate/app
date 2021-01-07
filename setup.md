# New Farm Setup
## Nav Setup
1. Prequisite items

    Domain Name (Allows for SSL certificate to be setup)

    Take the SSL Certificate thumbprint and add it in Nav Administration (Credential Type: NavUserPassword will not work unless Certificate Thumbprint is setup and valid)

    OData Services
    
    1. Enable SSL
    2. Enable OData Services
    3. Enable V4 Endpoint
    4. Port needs to be open on the firewall
    5. Rest is default

## Nav Web Services
1. Delete defaults and add in Farm App Web Services
2. Update OData V4 URL from "MoglerFarms" to new Farms domain name
3. **URL formation:** Domain:port/NavInstanceName/ODataV4(default)/CompanyVar/URI
4. Check "Published"
5. This has a dependency on queries being setup in NavDeveloperTools

## User Setup
1. Setup a limited user
- Username (can be anything they want) **(stored in FormConfig.ts -- Mongo)**
- Access key **(stored in FormConfig.ts Mongo)**
- Super user

## Nav Queries
1. ID > 50,000 need to be copied in
 - Can these queries be exported/imported --> **check with solution dynamics to be able to run script to get queries on setup of new Nav instance**

# Mongo Setup
1. Clone one of the exist farmconfigs and update the fields for the new farm





