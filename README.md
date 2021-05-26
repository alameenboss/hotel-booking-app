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

## Screens

### Home

![Home](./screens/01_Home.png)

### Login

![Login](./screens/02_Login.png)

### Register

![Register](./screens/03_Register.png)

### ForgotPassword

![ForgotPassword](./screens/04_ForgotPassword.png)

### Admin_Home

![Admin_Home](./screens/05_Admin_Home.png)

### Admin_Dashboard

![Admin_Dashboard](./screens/06_Admin_Dashboard.png)

### RoomList

![RoomList](./screens/07_RoomList.png)

### AddRoom

![AddRoom](./screens/08_AddRoom.png)

### Admin_Edit_Delete_Room

![Admin_Edit_Delete_Room](./screens/09_Admin_Edit_Delete_Room.png)

### User_List

![User_List](./screens/10_User_List.png)

### Customer_Home

![Customer_Home](./screens/11_Customer_Home.png)

### Customer_Find_and_Book_Room

![Customer_Find_and_Book_Room](./screens/12_Customer_Find_and_Book_Room.png)

### Customer_My_Booking

![Customer_My_Booking](./screens/12_Customer_My_Booking.png)

### Swagger_API

![Swagger_API](./screens/Swagger_API.png)

### JWT_Authentication

![JWT_Authentication](./screens/API_02_JWT_Authentication.png)