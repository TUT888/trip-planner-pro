# Nine2Six - Trip Planner Pro

Trip Planner Pro is a React travel-planning app for managing trips, packing tasks, and travel budget data.

The app uses:

- [**Redux Toolkit**](https://redux.js.org/tutorials/quick-start) for client state
- [**shadcn/ui**](https://ui.shadcn.com/) and [**Tailwind CSS**](https://tailwindcss.com/) for UI
- [**JSON Server**](https://www.npmjs.com/package/json-server) as a mock backend

## Setup Guide

### Installation

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the mock API:

   ```bash
   npm run mock-api
   ```

4. In another terminal, start the Vite app:

   ```bash
   npm run dev
   ```

The frontend expects the mock API to run at `http://localhost:3001`.

### Adding Shadcn Components

This project uses shadcn/ui. Since the project uses JavaScript configuration with path aliases, follow these steps to add new UI components:

1. Browse the [shadcn documentation](https://ui.shadcn.com/docs/components) to find a component.
2. Run the installation command in your terminal:

   ```bash
   npx shadcn@latest add <component-name>
   ```

## Feature List

### Data Persistence

- Mock data is persisted through `json-server` in `db.json`.
- The current authenticated user and selected trip are persisted in `localStorage`.

### User Authentication

- Basic login with email and password.
- Basic registration with username, email, and password.
- Persisted session by storing user data in `localStorage`.
- Logout clears app state and removes the stored session.

### User Authorization

- Guests see a welcome screen and can choose to log in or register.
- Users can only access trips they own or trips shared with them.
- Trip owners have full access and edit permissions.
- Shared users can access trips as guests with restricted editing permissions.

### Trip Management

- Trip owners can create trips, reset trip data, delete trips, and share trips with other users by email.
- Owners and guests can export the currently selected trip as JSON.

### Packing Checklist

- Trip owners can add, edit, delete, and toggle packing items as packed or unpacked.
- Owners and guests can view packing status and progress.
- The checklist can be filtered by category or status, with an option to clear filters.
- Owners see changes immediately after editing; guests may need to refresh the page.

### Travel Budget

- Trip owners can create, update, and delete budget items.
- Owners and guests can view budget status, spending totals, paid spending, and estimated-versus-actual cost.
- The app shows warning and critical budget alerts at 80% and 100% usage.
- Budget items can be filtered, and category breakdowns show total cost per category.

### Trip Dashboard

The dashboard shows:

- Itinerary grouped by date
- Packing progress
- Budget usage
- Itinerary completion percentage
- Packing completion percentage
- Budget usage percentage
- Number of unpaid budget items
- Number of overdue activities

### Itinerary Management

Users can:

- Add, edit, and delete itinerary items
- Change activity status
- Filter itinerary items by date, category, status, and priority
- See overdue activities highlighted visually

## State Structure Explanation
### General Flow

- On startup, the app reads session data from `localStorage`, including the current user and selected trip id.
- After the user logs in, the `currentUser` state is set, and the app fetches trips accessible to the current user. By default, the app restores the saved selected trip if possible. Otherwise, it selects the first available trip or sets `selectedTrip` to `null` if there are no trips.
- When the user opens a page, the app uses the selected trip id to fetch related data and save it to Redux state.
- Based on user interactions:
  - For global app data such as auth, trips, packing, itinerary, and budget, the app dispatches the related thunk and updates Redux state when the request is fulfilled.
    > Exception: the Itinerary feature currently uses local `useState` for its page data instead of Redux.
  - For component-only state, such as form inputs, modal open/close state, and filter options, each component manages its own state with `useState`.
- When the selected trip changes, related components that depend on the trip id re-render and fetch data again.
- When the user logs out, related Redux state is cleared, along with the user session and selected trip saved in `localStorage`.

### Redux Store

The Redux store is configured in `src/app/store.js` with five slices:

```js
{
  auth: authReducer,
  trips: tripReducer,
  packing: packingReducer,
  itinerary: itineraryReducer,
  budget: budgetReducer,
}
```

#### `auth`

```js
{
  currentUser: User | null
}
```

- `currentUser` is loaded from local storage when the app starts.
- `loginUser.fulfilled` stores the logged-in user in Redux and local storage.
- `logout` clears the current user and stored session data.

User objects are stored in `db.json` like:

```js
{
  id: string,
  name: string,
  email: string,
  password: string,
}
```

#### `trips`

```js
{
  items: Trip[],
  selectedTrip: Trip | null
}
```

- `items` contains trips owned by or shared with the current user.
- `selectedTrip` stores the active trip used by packing, budget, itinerary, and dashboard features.
- `selectedTrip.id` is persisted in local storage with the key `selectedTripId`.
- When trips are fetched, the app restores the saved selected trip if possible; otherwise, it selects the first accessible trip.
- Creating a trip automatically selects the new trip.
- Deleting the selected trip selects the next available trip or clears the selection.
- Sharing, budget updates, trip reset, and trip clear operations update the affected trip in both `items` and `selectedTrip`.

Trip objects are stored in `db.json` like:

```js
{
  id: string,
  name: string,
  budget: number,
  ownerId: string,
  sharedWith: string[]
}
```

#### `packing`

```js
{
  checklist: PackingItem[]
}
```

- `checklist` contains packing items for the selected trip.
- Checklist items are fetched by `tripId`.
- Add, update, remove, toggle packed, and clear all operations update the mock API first, then update Redux when the thunk succeeds.
- The slice clears the checklist when the user logs out, the selected trip is deleted, or trip data is reset.
- Selectors provide filtered items and packing progress.

Packing items are stored in `db.json` like:

```js
{
  id: string,
  tripId: string,
  name: string,
  category: string,
  quantity: number,
  requiredStatus: string,
  packedStatus: string
}
```

#### `budget`

```js
{
  items: BudgetItem[]
}
```

- `items` contains budget rows for the selected trip.
- Budget items are fetched by `tripId`.
- Add, update, delete, set initial budget, and reset budget are handled through async thunks.
- The selected trip's `budget` field is used as the initial budget.
- Selectors provide estimated cost, actual cost, paid actual cost, remaining budget, usage percentage, category breakdown, and budget alerts.
- The slice clears its items when the user logs out, the selected trip is deleted, or trip data is reset.

Budget items are stored in `db.json` like:

```js
{
  id: string,
  tripId: string,
  name: string,
  category: string,
  estimatedCost: number,
  actualCost: number,
  paymentStatus: string
}
```

#### `itinerary`

```js
{
  items: ItineraryItem[]
}
```

- `items` contains itinerary records fetched by selected `tripId`.
- The dashboard fetches itinerary items so dashboard summaries can access them from Redux.
- The slice clears itinerary items when the user logs out, the selected trip is deleted, or trip data is reset.

### Mock API Data

The mock backend stores data in `db.json` under these collections:

```js
{
  users: [],
  trips: [],
  itineraryItems: [],
  packingItems: [],
  budgetItems: []
}
```

All trip-related records are connected by `tripId`. Because `json-server` is only a lightweight mock backend, some operations fetch and delete related records one by one.

## Known Limitations

### Itinerary

- `Itinerary.jsx` currently uses local `useState` instead of Redux, so data sync is more limited than in other features.
    - The list display depends on local state.
    - Create, update, and delete requests are still sent to the mock backend, but itinerary changes made by other components are not reflected until the page refreshes.
- `itinerarySlice` is still used for basic fetching and clearing data for the dashboard.
- After clearing trip data, the itinerary page needs to be reloaded to show the updated state.

### UI

- The app is not fully responsive or mobile-friendly yet.
- Color themes and component styling are not fully unified across the app.

### Shared Trips

- There are no real-time updates for shared trips. Owners see their own edits immediately, but guests need to refresh the page to see changes from the owner's side.

### Mock Backend

- The app depends on `json-server`; there is no real backend, database, token authentication, or production authorization layer.
- There is no auth token.
- Passwords are not hashed.
- Shared trip access is enforced in frontend thunks and selectors by fetching all trips and filtering them manually.
- Error and loading state are handled locally in some components, but most Redux slices do not keep shared `loading` or `error` fields.
- `json-server` does not support bulk deletes, so reset and delete operations remove related packing, itinerary, and budget records one request at a time.

### Testing

- Testing is not currently implemented in the project.
