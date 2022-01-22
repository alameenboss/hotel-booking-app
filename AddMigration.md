## Add Migration For the First time

---

### API Project

- Set the API Project as the startup project and execute the below commands in PMC

`Add-Migration -Name "Initial" -OutputDir "Migrations" -Project "HotelBooking.Data.EFCore" -Context "ApplicationDbContext"`

`Update-Database -Project "HotelBooking.Data.EFCore" -Context "ApplicationDbContext"`

---

### Identity Project

- Set the Identity Project as the startup project and execute the below commands in PMC

`Add-Migration -Name "Initial" -OutputDir "Migrations" -Project "HotelBooking.IdentityServer" -Context "UserDbContext"`

`Update-Database -Project "HotelBooking.IdentityServer" -Context "UserDbContext"`

---