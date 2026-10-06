"use strict";

/* ================= GET ELEMENTS ================= */

const bookingForm = document.getElementById("bookingForm");

const fullName = document.getElementById("fullName");
const phone = document.getElementById("phone");
const bookingDate = document.getElementById("bookingDate");
const timeSlot = document.getElementById("timeSlot");
const guests = document.getElementById("guests");

const confirmation = document.getElementById("confirmation");
const receiptDetails = document.getElementById("receiptDetails");

const currentYear = document.getElementById("currentYear");


/* ================= CURRENT YEAR ================= */

currentYear.textContent = new Date().getFullYear();


/* ================= MINIMUM DATE ================= */

const today = new Date();

const year = today.getFullYear();

const month = String(
    today.getMonth() + 1
).padStart(2, "0");

const day = String(
    today.getDate()
).padStart(2, "0");

const todayString =
    `${year}-${month}-${day}`;

bookingDate.min = todayString;


/* ================= FORM SUBMIT ================= */

bookingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /* Get user values */

        const nameValue =
            fullName.value.trim();

        const phoneValue =
            phone.value.trim();

        const dateValue =
            bookingDate.value;

        const timeValue =
            timeSlot.value;

        const guestValue =
            Number(guests.value);


        /* ================= VALIDATION ================= */

        let isValid = true;


        /* Name */

        if (nameValue.length < 2) {

            fullName.classList.add(
                "is-invalid"
            );

            isValid = false;

        } else {

            fullName.classList.remove(
                "is-invalid"
            );
        }


        /* Phone */

        if (!/^[0-9]{10}$/.test(phoneValue)) {

            phone.classList.add(
                "is-invalid"
            );

            isValid = false;

        } else {

            phone.classList.remove(
                "is-invalid"
            );
        }


        /* Date */

        if (!dateValue) {

            bookingDate.classList.add(
                "is-invalid"
            );

            isValid = false;

        } else {

            bookingDate.classList.remove(
                "is-invalid"
            );
        }


        /* Time */

        if (!timeValue) {

            timeSlot.classList.add(
                "is-invalid"
            );

            isValid = false;

        } else {

            timeSlot.classList.remove(
                "is-invalid"
            );
        }


        /* Guests */

        if (
            !Number.isInteger(guestValue) ||
            guestValue < 1 ||
            guestValue > 15
        ) {

            guests.classList.add(
                "is-invalid"
            );

            isValid = false;

        } else {

            guests.classList.remove(
                "is-invalid"
            );
        }


        /* Stop if validation fails */

        if (!isValid) {

            confirmation.style.display = "none";

            return;
        }


        /* ================= FORMAT DATE ================= */

        const selectedDate =
            new Date(dateValue + "T00:00:00");

        const formattedDate =
            selectedDate.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );


        /* ================= CREATE RECEIPT ================= */

        receiptDetails.innerHTML = `

            <div class="receipt-row">
                <strong>Guest Name</strong>
                <span>${nameValue}</span>
            </div>

            <div class="receipt-row">
                <strong>Phone</strong>
                <span>${phoneValue}</span>
            </div>

            <div class="receipt-row">
                <strong>Date</strong>
                <span>${formattedDate}</span>
            </div>

            <div class="receipt-row">
                <strong>Time</strong>
                <span>${timeValue}</span>
            </div>

            <div class="receipt-row">
                <strong>Guests</strong>
                <span>${guestValue}</span>
            </div>

        `;


        /* ================= SHOW CONFIRMATION ================= */

        confirmation.style.display = "block";


        /* ================= RESET FORM ================= */

        bookingForm.reset();

        guests.value = 2;

        bookingDate.min = todayString;


        /* ================= SCROLL ================= */

        setTimeout(function () {

            confirmation.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);

    }
);