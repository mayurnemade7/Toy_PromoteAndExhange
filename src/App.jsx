import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import IGReelSection from './components/IGReelSection';
import ExchangeFeed from './components/ExchangeFeed';
import SanitizationSection from './components/SanitizationSection';
import Footer from './components/Footer';

// Modals
import ToyDetailModal from './components/ToyDetailModal';
import ListToyModal from './components/ListToyModal';
import GeminiAIMatchmakerModal from './components/GeminiAIMatchmakerModal';
import MyExchangesModal from './components/MyExchangesModal';

// Mock Initial Data
import { initialToys } from './data/toysData';

export default function App() {
  // State Management
  const [toys, setToys] = useState(initialToys);
  const [exchangeTickets, setExchangeTickets] = useState([
    {
      id: '901',
      toyId: 'toy-101',
      toyTitle: 'LEGO Duplo Deluxe Steam Train Set',
      toyImage: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80',
      ownerName: 'Priya Sharma',
      societyName: 'Celestial City, Ravet',
      requesterName: 'Aarav\'s Parent',
      offerSummary: '120 Eco Points',
      pickupSlot: 'Weekend Morning (10 AM - 12 PM)',
      notes: 'Super excited to pick this up!',
      status: 'UV Sanitizing',
      createdTime: '2 hours ago'
    }
  ]);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedSociety, setSelectedSociety] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal States
  const [selectedToyForDetail, setSelectedToyForDetail] = useState(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isAIMatchmakerOpen, setIsAIMatchmakerOpen] = useState(false);
  const [isTicketsModalOpen, setIsTicketsModalOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handlers
  const handleAddToy = (newToy) => {
    setToys([newToy, ...toys]);
    showToast(`🎉 "${newToy.title}" listed successfully in Ravet catalog!`);
  };

  const handleSubmitExchangeTicket = (ticketData) => {
    const newTicket = {
      ...ticketData,
      id: Math.floor(1000 + Math.random() * 9000).toString()
    };

    setExchangeTickets([newTicket, ...exchangeTickets]);
    showToast(`🎟️ Swap ticket #${newTicket.id} submitted to ${ticketData.ownerName}!`);
  };

  const handleUpdateTicketStatus = (ticketId, newStatus) => {
    setExchangeTickets(exchangeTickets.map(t => 
      t.id === ticketId ? { ...t, status: newStatus } : t
    ));
    showToast(`Status updated to "${newStatus}" for ticket #${ticketId}`);
  };

  const handleDeleteTicket = (ticketId) => {
    setExchangeTickets(exchangeTickets.filter(t => t.id !== ticketId));
    showToast(`Ticket #${ticketId} cancelled.`);
  };

  const scrollToFeed = () => {
    const el = document.getElementById('exchange-feed-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSanitization = () => {
    const el = document.getElementById('sanitization-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 10000,
          background: '#0F172A',
          color: '#FFF',
          padding: '14px 22px',
          borderRadius: '99px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.88rem',
          fontWeight: 600,
          border: '1.5px solid #FF5A5F',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '1rem' }}>
            ✕
          </button>
        </div>
      )}

      {/* Top Sticky Header */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenListModal={() => setIsListModalOpen(true)}
        onOpenAIMatchmaker={() => setIsAIMatchmakerOpen(true)}
        onOpenTicketsModal={() => setIsTicketsModalOpen(true)}
        activeTicketsCount={exchangeTickets.length}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <HeroBanner
          onOpenListModal={() => setIsListModalOpen(true)}
          onOpenAIMatchmaker={() => setIsAIMatchmakerOpen(true)}
          scrollToFeed={scrollToFeed}
          scrollToSanitization={scrollToSanitization}
        />

        {/* IG Reels Showcase Section */}
        <IGReelSection />

        {/* Main Toy Feed Catalog */}
        <ExchangeFeed
          toys={toys}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedAge={selectedAge}
          setSelectedAge={setSelectedAge}
          selectedSociety={selectedSociety}
          setSelectedSociety={setSelectedSociety}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSelectToy={(toy) => setSelectedToyForDetail(toy)}
          onRequestSwap={(toy) => setSelectedToyForDetail(toy)}
        />

        {/* Hygiene & 4-Step UV Sanitization Standard Section */}
        <SanitizationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {selectedToyForDetail && (
        <ToyDetailModal
          toy={selectedToyForDetail}
          onClose={() => setSelectedToyForDetail(null)}
          onSubmitExchangeTicket={handleSubmitExchangeTicket}
          userListedToys={toys.filter(t => t.ownerName === 'You')}
        />
      )}

      {isListModalOpen && (
        <ListToyModal
          onClose={() => setIsListModalOpen(false)}
          onAddToy={handleAddToy}
        />
      )}

      {isAIMatchmakerOpen && (
        <GeminiAIMatchmakerModal
          onClose={() => setIsAIMatchmakerOpen(false)}
          toys={toys}
          onRequestSwap={(toy) => setSelectedToyForDetail(toy)}
        />
      )}

      {isTicketsModalOpen && (
        <MyExchangesModal
          onClose={() => setIsTicketsModalOpen(false)}
          tickets={exchangeTickets}
          onUpdateTicketStatus={handleUpdateTicketStatus}
          onDeleteTicket={handleDeleteTicket}
        />
      )}

    </div>
  );
}
