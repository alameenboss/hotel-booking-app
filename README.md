# Hotel Booking App 

Hotel Booking App is a web based hotel room reservation system.
[Download Source]  (<https://github.com/alameenboss/hotel-booking-app/archive/refs/heads/main.zip>)

## Instruction

* Username: superadmin@gmail.com (default adminuser)

* Password: Test@123

* You can register a new user with email and password , email confirmation link will be generated and written C:\TEMP\confirmemail.html instead of sending email . Login with super admin and go to the user list page and make other user Admin if required

* Guest can register with google external login. 

* Any user can be made as admin by another admin

* Create Room as admin as required

* Db configuration are in API project -> appsettings.json

## Features

* User Registeration,Password Reset,Confirm Password,Change Password
* Google Authentication
* Role Based Authization
* Room List, Add Room, Edit Room, Delete Room (Admin)
* Show Room Avalability Status for Admin on a given Date (Admin)
* List Register user , and make them admin (Admin)
* Search Room By Room Type & Date Range (Guest)
* Book Available Room (Guest)
* List Booking History (Guest)

## Technology Used

### Front End

* Angular 11
* Bootstarp 5
* NgxAlert
* NgxProgress
* NgBootstrap for Data Control
* Google Authentication

### API

* Dotnet Core 3.1 Web API
* Identity Server For Authentication and Authorization 
* Entity Framework
* JWT Token Generation,Validation
* Onion Architecture
* Swagger UI

## Migration commands

### Add Migration
`Add-Migration -Name "RenamedColumns" -OutputDir "EFCore\Migrations" -Project "HotelBooking.Data.Repository"`

### Add Migration
`Update-Database`

## Screens

### Home

![Home](./screens/01_Home.png)
![Home](./screens/01_Home_with_calender.png)
![Home](./screens/02_Search_Room_Result.png)

### Login

![Login](./screens/03_Login.png)

### Register

![Register](./screens/05_Register.png)

### Forgot Password

![ForgotPassword](./screens/04_Forgot_Password.png)

### Dashboard - Admin

![Dashboard](./screens/06_Dashboard.png)

### Dashboard DarkMode - Admin

![Dashboard_DarkMode](./screens/06_Dashboard_DarkMode.png)

### RoomList - Admin

![RoomList](./screens/07_RoomList.png)

### AddRoom - Admin

![AddRoom](./screens/08_AddRoom.png)

### Edit Delete Room - Admin

![Edit_Room](./screens/09_Edit_Room.png)

### User List - Admin

![User_List](./screens/10_UserList.png)

### Search and Book Room - Customer

![Search and Book Room](./screens/11_Seach_Book_Room.png)

### My Booking

![My Booking](./screens/11_View_Booked_Room.png)

### Swagger_API

![Swagger_API](./screens/Swagger_API.png)

### JWT_Authentication

![JWT_Authentication](./screens/API_02_JWT_Authentication.png)

### Flip Card Game

![Flip Card Game](./screens/11_Flip_Card_Game.png)