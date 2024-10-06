* **Migrating from Vanilla to React. REACT FILES WILL BE UP SOON**

<img width="950" alt="image" src="https://github.com/user-attachments/assets/80ccffd8-a25f-4fdd-9336-66f6cadc3eea">

<br>
React version under dev

<img width="944" alt="image" src="https://github.com/user-attachments/assets/a8d766c7-2eb7-43bc-8938-ed5d40526db2">
<br>
Homescreen

<img width="944" alt="image" src="https://github.com/user-attachments/assets/5e5b6c56-4673-455e-8662-7470ee6f87e3">
<br>
Toggle between Layers

<img width="944" alt="image" src="https://github.com/user-attachments/assets/78de1dc7-11a0-49ed-b5b8-49cd95283cff">
<br>
Enable Feature Info Popup and get more info by clicking anywhere on map

<img width="946" alt="image" src="https://github.com/user-attachments/assets/9bd4c2c9-9cba-4438-8487-931370f66d56">
<br>
Do wildcard or exact matching using different operators on different layers

<img width="433" alt="image" src="https://github.com/user-attachments/assets/78c68aa6-8760-47de-81fd-9d446184f602">
<br>
Distance and Area Functionality (Vanilla)

<img width="442" alt="image" src="https://github.com/user-attachments/assets/dcbdffa8-462a-4eea-b7ce-236f9284686c">
<br>
Spatial Query from point of reference (Vanilla)

<img width="437" alt="image" src="https://github.com/user-attachments/assets/ec43dab2-fcfe-4e44-bcbb-6442ffce4f9f">
<br>
Spatial Query from line of reference (Vanilla)

<img width="451" alt="image" src="https://github.com/user-attachments/assets/7b0aa956-faad-409b-b073-f2cc3c9600d1">
<br>
Area based Spatial Query (Vanilla)

<img width="458" alt="image" src="https://github.com/user-attachments/assets/d2773189-d6ed-4f27-9c4b-d458b09f7644">
<br>
Line intersect spatial query (Vanilla)

<img width="451" alt="image" src="https://github.com/user-attachments/assets/81e869d1-ec2f-4983-b5f5-86b5421498cf">
<br>
Area based spatial query (2) (Vanilla)

<img width="452" alt="image" src="https://github.com/user-attachments/assets/6768374a-c5bc-43d8-b1ae-b14af384ed4b">
<br>
Auto-locate feature (location proxy used here) (Vanilla)

<img width="399" alt="image" src="https://github.com/user-attachments/assets/06784225-1adb-480b-92f4-98ab2e4ad708">
<br>
Edit Feature: Add new features to the Map (Vanilla)

<img width="410" alt="image" src="https://github.com/user-attachments/assets/056c5738-155d-41ab-8025-fc7ec58facf5">
<br>
Edit Feature: Modify existing features (Vanilla)

<img width="449" alt="image" src="https://github.com/user-attachments/assets/64770d6a-0aef-4157-84ce-f970c36c3d38">  <img width="453" alt="image" src="https://github.com/user-attachments/assets/633cab42-7a09-4439-ae06-0a3ec8c5222e">
<br>
Edit Feature: Delete existing features (Vanilla)

<img width="414" alt="image" src="https://github.com/user-attachments/assets/7fcc8656-921a-4f14-9cb0-428313b46b8a">
<br>
Live attribute search (like google search) (Vanilla)






* **Features**
- Attribute Query Functionality (Example: List all districts in India with prefix "bhav")
-  Spatial Query (buffer) Functionality (Example: List cities within 100 km of custom path/point)
-  Displaying User’s Live Location (Produce live location of the user)
-  Editing Functionality (add, modify, delete features on the map) (Example: Adding new infrastructure that has been built by the MCD)
-  Live Attribute Search (like google search)
-  Layer Switcher (toggle feature on multiple layers)
-  Mouse Position and Scale Bar
-  Feature Information Pop-Up
-  Custom Controls (Home button, Full-screen button, and Feature Info button)
-  Length and Area Measurements Controls between points (Distance between points or area bounded by points)
-  Custom Zoom-In and Zoom-Out Controls
  
* **Prerequisites**
  - Build data in "Final shapefiles" on local postgreSQL.
  - Create Workspace on Geoserver and link postgreSQL/pgAdmin
  - Make changes in the html and Js code (related to addresses, etc) and then launch the page
     
Open layers based project with multiple layers (toggle) of India with attribute and spatial query functionality. Advanced features being map editing (Add, Delete, Modify) and live attribute search (like google search). It also  supports common GIS operations like zoom, pan, layers on-off etc.
