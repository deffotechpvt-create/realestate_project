# Real Estate Platform (NoBroker Clone)

This project is a high-performance real estate platform designed to connect owners directly with tenants/buyers, eliminating middlemen.

## Core Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose (Geospatial Indexing)
- **State Management:** Redux Toolkit / Zustand
- **Authentication:** NextAuth.js / JWT
- **Payments:** Razorpay
- **Maps:** Google Maps API / Mapbox GL JS

## Database Schema Design

### User Schema (`models/User.js`)
- Stores user details including name, email, phone, and role (tenant, buyer, owner, admin).
- Handles authentication (password/Google OAuth).
- Manages subscription plans and contact unlock limits.
- Tracks shortlisted properties.

### Property Schema (`models/Property.js`)
- Stores property details including title, description, type, status, and specifications.
- **Geospatial Indexing:** Uses GeoJSON format for `location.coordinates` to enable efficient radius-based searches using MongoDB's `$geoWithin` operator.
- Includes media (images/videos), price, verification status, and availability.

## API Structure

### Property Search API
- **Endpoint:** `GET /api/properties/search`
- **Controller:** `controllers/propertyController.js`
- **Query Parameters:**
    - `latitude` (required): Latitude of the search center.
    - `longitude` (required): Longitude of the search center.
    - `radius` (optional): Search radius in kilometers (default: 5km).
    - `type` (optional): Property type (apartment, house, etc.).
    - `status` (optional): Property status (rent, sale).
    - `minPrice` (optional): Minimum price.
    - `maxPrice` (optional): Maximum price.
    - `bhk` (optional): Number of bedrooms.
- **Logic:**
    - Validates coordinates.
    - Constructs a MongoDB query using `$geoWithin` and `$centerSphere` to find properties within the specified radius.
    - Applies additional filters for type, status, price, and BHK.
    - Returns a list of matching properties sorted by creation date.

## Key Features

- **Geospatial Search:** Efficiently finds properties near a user's location.
- **Scalability:** Built on Node.js to handle high concurrent traffic.
- **Direct Connection:** Facilitates direct communication between owners and seekers.
- **Legal Tools:** (Planned) Rent agreement generator, stamp duty calculator, etc.

## Next Steps

1.  Implement User Authentication (Signup/Login).
2.  Build the Property Listing Form (Frontend).
3.  Integrate Map Interface for Search.
4.  Develop the Real-time Chat System using Socket.io.
