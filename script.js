// Simple client-side handlers written clearly for college evaluation

const bookingStorageKey = 'bookingSearchHistory';
const bookingForm = document.getElementById('bookingForm');
const bookingTableBody = document.querySelector('#bookingTable tbody');
const clearBookingsBtn = document.getElementById('clearBookingsBtn');

function addBookingRow(booking) {
  if (!bookingTableBody) return;

  const row = bookingTableBody.insertRow();
  const values = [
    booking.tripType,
    booking.destination,
    booking.when,
    booking.rooms,
    booking.adults,
    booking.children
  ];

  values.forEach((value) => {
    const cell = row.insertCell();
    cell.textContent = value;
  });
}

function loadSavedBookings() {
  const savedBookings = JSON.parse(localStorage.getItem(bookingStorageKey) || '[]');
  savedBookings.forEach(addBookingRow);
}

function clearBookings() {
  if (bookingTableBody) {
    bookingTableBody.innerHTML = '';
  }
  localStorage.removeItem(bookingStorageKey);
}

// Set default date picker to tomorrow
window.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('checkInDate');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.value = tomorrow.toISOString().split('T')[0];
});

// Handle search form submission
if (bookingForm) {
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const roomSelect = document.getElementById('rooms');
    const adultSelect = document.getElementById('adults');
    const childSelect = document.getElementById('children');

    const booking = {
      tripType: document.getElementById('tripType').value,
      destination: document.getElementById('destination').value.trim(),
      when: document.getElementById('checkInDate').value,
      rooms: roomSelect.options[roomSelect.selectedIndex].text,
      adults: adultSelect.options[adultSelect.selectedIndex].text,
      children: childSelect.options[childSelect.selectedIndex].text
    };

    const savedBookings = JSON.parse(localStorage.getItem(bookingStorageKey) || '[]');
    savedBookings.push(booking);
    localStorage.setItem(bookingStorageKey, JSON.stringify(savedBookings));

    addBookingRow(booking);
    bookingForm.reset();
  });
}

if (clearBookingsBtn) {
  clearBookingsBtn.addEventListener('click', clearBookings);
}

loadSavedBookings();

// Carousel arrows simple demo trigger
function prevSlide() {
  alert('Showing previous hotel recommendations.');
}

function nextSlide() {
  alert('Showing next hotel recommendations.');
}