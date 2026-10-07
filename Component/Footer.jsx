import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0f1115] text-gray-300 pt-10 pb-6 mt-10 border-t border-gray-700">
      <div className="container mx-auto px-6 text-center">
        {/* Top Section */}
        <div className="flex flex-wrap justify-center gap-16 mb-8">
          <div>
            <h3 className="text-base font-semibold text-white mb-2">Customer Support</h3>
            <p className="text-sm text-gray-400">24/7 assistance for all your bookings</p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white mb-2">Booking Confirmation</h3>
            <p className="text-sm text-gray-400">Resend your ticket details anytime</p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white mb-2">Newsletter</h3>
            <p className="text-sm text-gray-400">Subscribe for latest movie updates</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6">
          <h2 className="text-xl font-bold text-white mb-1 tracking-wide">BOOK_MOVIE_TICKET</h2>
          <p className="text-sm text-gray-400 mb-2 italic">
            Your trusted platform for hassle‑free movie booking
          </p>
          <p className="text-sm text-gray-400">
            Created & Developed by <span className="text-blue-400 font-medium">Viswanadh</span>
          </p>
          <p className="text-xs mt-2 text-gray-500">
            © {new Date().getFullYear()} BOOK_MOVIE_TICKET. All Rights Reserved.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 text-left text-sm">
          <div>
            <h4 className="text-white font-semibold mb-2">About</h4>
            <ul className="space-y-1 text-gray-400">
              <li>About Us</li>
              <li>Our Vision</li>
              <li>Careers</li>
              <li>Press & Media</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Help</h4>
            <ul className="space-y-1 text-gray-400">
              <li>FAQs</li>
              <li>Contact Support</li>
              <li>Ticket Cancellation</li>
              <li>Refund Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Policies</h4>
            <ul className="space-y-1 text-gray-400">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
              <li>Data Protection</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Contact</h4>
            <ul className="space-y-1 text-gray-400">
              <li>Email: support@bookmovieticket.com</li>
              <li>Phone: +91 9247166974</li>
              <li>Location: Hyderabad, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-xs text-gray-500">
          <p>
            The content and images used on this site are copyright protected and intended solely for promoting movies and events. 
            Unauthorized use is strictly prohibited and punishable by law.
          </p>
        </div>
      </div>
    </footer>
  );
}
